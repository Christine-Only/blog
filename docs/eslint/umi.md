# 首屏加载时间优化

## 为什么首屏加载需要优化

因为做了很多事情：
初始化 webView -> 请求页面 -> 下载数据 -> 解析 HTML -> 请求 js/css 资源 -> dom 渲染 -> 解析 JS 执行 -> JS 请求数据 -> 解析渲染 -> 下载渲染图片

在 `dom渲染` 之前用户看到的都是白屏，在 `下载渲染图片` 后，用户才能看到完整的页面。首屏秒开优化就是要减少这个过程的耗时。

对首屏启动速度影响最大的就是网络请求。由于业务需求，导致我们不得不引入很多第三方包(类如：antd，moment，echarts 等)来实现功能，这些包恰恰会容易影响到网络请求。

## 分析产物

在 `umi` 项目中，执行 `ANALYZE=1 umi build` 来分析下产物。

**配置脚本**

```json
// package.json
{
  "scripts": {
    "analyze": "cross-env ANALYZE=1 umi build"
  }
}
```

执行 `npm run analyze`便能看到下图啦

![alt 拆包前](/blog/init.png)

这个是初始打包出来的 js 大小，可以清晰的看到，vendors.js 6.1M 真的超级大。这个时候我们想拆出来怎么办呢。
有两种优化的方法：

1. 通过 webpack 提供的 splitChunks 方法进行拆分

```ts
// config.ts
chunks: ['vendors', 'umi', 'echarts', 'antd', 'bizcharts'],
chainWebpack: function (config) {
    //过滤掉momnet的那些不使用的国际化文件
    config
      .plugin('replace')
      .use(require('webpack').ContextReplacementPlugin)
      .tap(() => {
        return [/moment[/\\]locale$/, /zh-cn/];
      });
    config.merge({
      module: {
        rules: [
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            loader: 'url-loader',
            options: {
              // 图片大小小于8kb，就会被base64处理
              // 优点：减少请求数量（减轻服务器压力）
              // 缺点： 图片体积会更大（文件请求速度更慢）
              limit: 10 * 1024,
              // outputPath: "img/",
            },
          },
        ],
      },
      optimization: {
        splitChunks: {
            chunks: 'all', //提取 chunks 的时候从哪里提取
            name: true,  // chunk 的名称，如果设置为固定的字符串那么所有的 chunk 都会被合并成一个，这就是为什么 umi 默认只有一个 vendors.async.js。
            minSize: 30000, // byte, == 30 kb，越大那么单个文件越大，chunk 数就会变少（针对于提取公共 chunk 的时候，不管再大也不会把动态加载的模块合并到初始化模块中）当这个值很大的时候就不会做公共部分的抽取了
            maxSize: 0, // 文件的最大尺寸，优先级：maxInitialRequest/maxAsyncRequests < maxSize < minSize，需要注意的是这个如果配置了，umi.js 就可能被拆开，最后构建出来的 chunkMap 中可能就找不到 umi.js 了。
            minChunks: 1, // 被提取的一个模块至少需要在几个 chunk 中被引用，这个值越大，抽取出来的文件就越小
            maxAsyncRequests: 10, // 在做一次按需加载的时候最多有多少个异步请求，为 1 的时候就不会抽取公共 chunk 了
            maxInitialRequests: 5, // 针对一个 entry 做初始化模块分隔的时候的最大文件数，优先级高于 cacheGroup，所以为 1 的时候就不会抽取 initial common 了。
          cacheGroups: {
            vendor: {
              name: 'vendors',
              test: /^.*node_modules[\\/](?!echarts|bizcharts|antd|@ant-design).*$/, //除去需要拆分的node_modules包
              chunks: 'all',
              priority: 10,
            },
            antd: { // antdsign
                name: 'antd',
                chunks: 'all',
                test: /[\\/]node_modules[\\/]antd|@ant-design[\\/]/,
                priority: 10,
            },
            echarts: {
                name: 'echarts',
                chunks: 'all',
                test: /[\\/]node_modules[\\/]echarts[\\/]/,
                priority: 10,
            },
            bizcharts: {
                name: 'bizcharts',
                chunks: 'all',
                test: /[\\/]node_modules[\\/]bizcharts[\\/]/,
                priority: 10,
            },
          },
      },
    });
  },
```
我们先看下 `cacheGroups` 下的属性，其他属性在下文中会讲解，先实现需求为重。

`cacheGroups` 下的属性为 `key-value` 的对象形式，`key` 可以自行命名，那 `value` 的值呢，我们继续往下看：

`name`: 拆分块的名称，提供字符串或函数使您可以使用自定义名称,如果 `name` 与 `chunks` 名称匹配，则进行拆分。
`test`: 正则匹配路径，符合入口的都会被拆分，装到 name 名称下的包中。
`priority`: 拆包的优先级，越大优先级越高。顺序很重要，先把大包分出去，在将剩余的 `node_modules` 分成 `vendors` 包。
`enforce`: 不管这个包的大小，都会进行分包处理。

![alt 拆包后](/blog/splitChunks.png)
上图可以清晰地看到使用splitChunks的方法，vendors.js大小缩小到1.88M，`echarts`、`antd`和`bizcharts`已经从vendors.js中拆分出来了。

2. 通过 externals 结合 scripts 的方法设置哪些模块不被打包

```ts
// config.ts
chunks: ['antd', 'antPro', 'vendors', 'umi'],
chainWebpack: function (config) {
    //过滤掉momnet的那些不使用的国际化文件
    config
      .plugin('replace')
      .use(require('webpack').ContextReplacementPlugin)
      .tap(() => {
        return [/moment[/\\]locale$/, /zh-cn/];
      });
    config.merge({
      module: {
        rules: [
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            loader: 'url-loader',
            options: {
              // 图片大小小于8kb，就会被base64处理
              // 优点：减少请求数量（减轻服务器压力）
              // 缺点： 图片体积会更大（文件请求速度更慢）
              limit: 10 * 1024,
              // outputPath: "img/",
            },
          },
        ],
      },
      optimization: {
        splitChunks: {
            chunks: 'all', //提取 chunks 的时候从哪里提取
            name: true,  // chunk 的名称，如果设置为固定的字符串那么所有的 chunk 都会被合并成一个，这就是为什么 umi 默认只有一个 vendors.async.js。
            minSize: 30000, // byte, == 30 kb，越大那么单个文件越大，chunk 数就会变少（针对于提取公共 chunk 的时候，不管再大也不会把动态加载的模块合并到初始化模块中）当这个值很大的时候就不会做公共部分的抽取了
            maxSize: 0, // 文件的最大尺寸，优先级：maxInitialRequest/maxAsyncRequests < maxSize < minSize，需要注意的是这个如果配置了，umi.js 就可能被拆开，最后构建出来的 chunkMap 中可能就找不到 umi.js 了。
            minChunks: 1, // 被提取的一个模块至少需要在几个 chunk 中被引用，这个值越大，抽取出来的文件就越小
            maxAsyncRequests: 10, // 在做一次按需加载的时候最多有多少个异步请求，为 1 的时候就不会抽取公共 chunk 了
            maxInitialRequests: 5, // 针对一个 entry 做初始化模块分隔的时候的最大文件数，优先级高于 cacheGroup，所以为 1 的时候就不会抽取 initial common 了。
          cacheGroups: {
            vendor: {
              name: 'vendors',
              test: /^.*node_modules[\\/](?!antd|@ant-design).*$/, //除去需要拆分的node_modules包
              chunks: 'all',
              priority: 10,
            },
            antd: {
                name: 'antd',
                chunks: 'all',
                test: /[\\/]node_modules[\\/]antd[\\/]/,
                priority: 10,
            },
            antPro: {
              name: 'antPro',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]@ant-design[\\/]/,
              priority: 10,
            },
          },
      },
    });
},
externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
    lodash: 'window._',
    bizcharts: 'window.bizcharts',
    echarts: 'window.echarts',
  },
scripts: [
    'https://unpkg.com/browse/react@^17/umd/react.production.min.js',
    'https://unpkg.com/browse/react-dom@^17/umd/react-dom.production.min.js',
    'https://unpkg.com/browse/lodash@4.17.21/lodash.min.js',
    'https://unpkg.com/browse/bizcharts@4.1.10/umd/BizCharts.min.js',
    'https://unpkg.com/browse/echarts@5.1.2/dist/echarts.min.js',
  ],
```
产物如下图：
![alt 拆包后](/blog/externals.png)
由上图可以看出，antd和@ant-design组件包从vendors.js拆分出来了。这样在首屏加载时antd和、ant-design和vendors.js实现异步加载，来提升首屏加载速度。

scripts引入的react和react-dom没有指定版本的话，在浏览器渲染时会重定向到指定版本，这样的话，首屏加载速度也会受到影响。
![alt 拆包后](/blog/noVersion.png)

scripts引入的react和react-dom有指定版本的话，在浏览器渲染时会直接加载指定版本，首屏加载速度会变快。
![alt 拆包后](/blog/version.png)

