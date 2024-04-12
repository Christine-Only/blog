# Webpack

## 减少 Webpack 打包时间

### 优化 Loader

对于 Loader 来说，影响打包效率首当其冲必属 Babel 了。因为 Babel 会将代码转为字符串生成 AST，然后对 AST 继续进行转变最后再生成新的代码，项目越大，**转换代码越多，效率就越低**。当然了，我们是有办法优化的。

首先我们可以**优化 Loader 的文件搜索范围**

```js
module.exports = {
  module: {
    rules: [
      {
        // js 文件才使用 babel
        test: /\.js$/,
        loader: 'babel-loader',
        // 只在 src 文件夹下查找
        include: [resolve('src')],
        // 不会去查找的路径
        exclude: /node_modules/
      }
    ]
  }
}
```

对于 `Babel` 来说，我们肯定是希望只作用在 JS 代码上的，然后 `node_modules` 中使用的代码都是编译过的，所以我们也完全没有必要再去处理一遍。

当然这样做还不够，我们还可以将 `Babel` 编译过的文件**缓存**起来，下次只需要编译更改过的代码文件即可，这样可以大幅度加快打包时间

```js
loader: 'babel-loader?cacheDirectory=true'
```

### HappyPack

在使用 Webpack 对项目进行构建时，会对大量文件进行解析和处理。当文件数量变多之后，Webpack 构件速度就会变慢。由于运行在 Node.js 之上的 Webpack 是单线程模型，所以 Webpack 需要处理的任务要一个一个进行操作。

作用：

1. 开启其它 loader 的多进程打包
2. 充分利用多核 CPU 并发的优势，帮我们把任务分解给多个子进程去并发执行，大大提升打包效率

```js
const HappyPack = require('happypack');
// 创建一个 HappyThreadPool，作为所有 loader 共用的进程池
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });

module: {
  rules: [
    {
      test: /\.js$/,
      include: [resolve('src')],
      exclude: /node_modules/,
      // 使用 id 指定创建的 HappyPack 插件
      loader: 'happypack/loader?id=happybabel'
    }
  ]
},
plugins: [
  new HappyPack({
    // id 标识符，要和 rules 中指定的 id 对应起来
    id: 'happybabel',
    loaders: ['babel-loader?cacheDirectory'],
    // 开启 4 个进程
    // threads: 4,
    threadPool: happyThreadPool
  })
]
```

* **threads**: **Number** 类型，指示对应 loader 编译源文件时同时使用的进程数，默认是 3
* **threadPool**: HappyThreadPool对象，代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多

### DllPlugin

**DllPlugin 可以将特定的类库提前打包然后引入**。这种方式可以极大的减少打包类库的次数，只有当类库更新版本才有需要重新打包，并且也实现了将公共代码抽离成单独文件的优化方案。

接下来我们就来学习如何使用 DllPlugin

```js
// 单独配置在一个文件中
// webpack.dll.conf.js
const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    // 想统一打包的类库
    vendor: ['react']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].dll.js',
    library: '[name]-[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      // name 必须和 output.library 一致
      name: '[name]-[hash]',
      // 该属性需要与 DllReferencePlugin 中一致
      context: __dirname,
      path: path.join(__dirname, 'dist', '[name]-manifest.json')
    })
  ]
}
```

然后我们需要执行这个配置文件生成依赖文件，接下来我们需要使用 `DllReferencePlugin` 将依赖文件引入项目中

```js
// webpack.conf.js
module.exports = {
  // ...省略其他配置
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      // manifest 就是之前打包出来的 json 文件
      manifest: require('./dist/vendor-manifest.json'),
    })
  ]
}
```

### 一些小的优化点

我们还可以通过一些小的优化点来加快打包速度

* `resolve.extensions`：用来表明文件后缀列表，默认查找顺序是 `['.js', '.json']`，如果你的导入文件没有添加后缀就会按照这个顺序查找文件。我们应该尽可能减少后缀列表长度，然后将出现频率高的后缀排在前面
* `resolve.alias`：可以通过别名的方式来映射一个路径，能让 Webpack 更快找到路径
* `module.noParse`：如果你确定一个文件下没有其他依赖，就可以使用该属性让 Webpack 不扫描该文件，这种方式对于大型的类库很有帮助

## 减少 Webpack 打包后的文件体积

### 按需加载

想必大家在开发 SPA 项目的时候，项目中都会存在十几甚至更多的路由页面。如果我们将这些页面全部打包进一个 JS 文件的话，虽然将多个请求合并了，但是同样也加载了很多并不需要的代码，耗费了更长的时间。那么为了首页能更快地呈现给用户，我们肯定是希望首页能加载的文件体积越小越好，**这时候我们就可以使用按需加载，将每个路由页面单独打包为一个文件**。当然不仅仅路由可以按需加载，对于 `lodash` 这种大型类库同样可以使用这个功能。

底层的机制是当使用的时候再去下载对应文件，返回一个 `Promise`，当 `Promise` 成功以后去执行回调。

### Scope Hoisting

参考[Webpack Scope Hoisting 学习指南](<https://juejin.cn/post/6850418110983241741>)

### Tree Shaking

**Tree Shaking 可以实现删除项目中未被引用的代码**，比如

```js
// test.js
export const a = 1
export const b = 2

// index.js
import { a } from './test.js'
```

对于以上情况，`test` 文件中的变量 `b` 如果没有在项目中使用到的话，就不会被打包到文件中。

如果你使用 Webpack 4 的话，开启生产环境就会自动启动这个优化功能。

### 代码压缩

在 Webpack3 中，我们一般使用 `UglifyJS` 来压缩代码，但是这个是单线程运行的，为了加快效率，我们可以使用 `webpack-parallel-uglify-plugin` 来并行运行 `UglifyJS`，从而提高效率。

在 Webpack4 中，我们就不需要以上这些操作了，只需要将 `mode` 设置为 `production` 就可以默认开启以上功能。代码压缩也是我们必做的性能优化方案，当然我们不止可以压缩 JS 代码，还可以压缩 HTML、CSS 代码，并且在压缩 JS 代码的过程中，我们还可以通过配置实现比如删除 `console.log` 这类代码的功能。

在 Webpack5 中，我们需要打开minimize，让其对我们的代码进行压缩(默认production模式下已经打开了，如果是在development模式下进行使用的时候，需要手动进行开启)

### 懒加载

## HMR 实现原理

核心流程:

* 使用 `webpack-dev-server` (后面简称 WDS)托管静态资源，同时以 `Runtime` 方式注入 HMR 客户端代码
* 浏览器加载页面后，与 `WDS` 建立 `WebSocket` 连接
* Webpack 监听到文件变化后，增量构建发生变更的模块，并通过 WebSocket 发送 `hash` 事件
* 浏览器接收到 `hash` 事件后，请求 `manifest` 资源文件，确认增量变更范围
* 浏览器加载发生变更的增量模块
* Webpack 运行时触发变更模块的 `module.hot.accept` 回调，执行代码变更逻辑

[HMR 原理全解析](https://juejin.cn/post/7021729340945596424)

## Vite 和 Webpack对比

### Vite 优点

* 启动项目快
  * 只启动一台静态页面的服务器，对文件代码不打包；
  * Vite 的原理是借助了浏览器对 ESM 规范的支持；
  * Vite 无需进行 bundle 操作，Vite 项目，源文件之间的依赖关系通过浏览器对 ESM 规范的支持来解析；
  * 所以在启动过程中，只需要进行一些初始化的操作，其余全部交由浏览器处理，所以项目启动非常之快；
* 热更新快
  * 本地开发环境，在监听到文件变化以后，直接通过 ws 连接，通知浏览器去重新加载变化的文件；
  * 在 Vite 中，HMR 是在原生 ESM 上执行的;
  * 编辑一个文件时，Vite 只需要精确地使已编辑的模块与其最近的 HMR 边界之间的链失活（大多数时候只是模块本身），使得无论应用大小如何，HMR 始终能保持快速更新；
  * 源码缓存：Vite 同时利用 HTTP 头来加速整个页面的重新加载（再次让浏览器为我们做更多事情）：源码模块的请求会根据 304 Not Modified 进行协商缓存；
  * 依赖模块缓存：解析后的依赖请求则会通过 Cache-Control: max-age=31536000,immutable 进行强缓存，因此一旦被缓存它们将不需要再次请求。

### Vite 缺点

* 首屏加载慢
  * 没有对文件进行 bundle 操作，会导致大量的 http 请求
  * dev 服务运行期间会对源文件做转换操作，需要时间
  * Vite 需要把 webpack dev 启动完成的工作，移接到了 dev 响应浏览器的过程中，时间加长

* 懒加载慢
  * 和首屏加载一样，动态加载的文件需要对源文件进行转换操作
  * 还可能会有大量的 http 请求，懒加载的性能同样会受到影响
