# webpack

## 基本配置

### 拆分配置和 merge

#### 公共配置`webpack.common.js`

```js

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  plugins: [
    new CleanWebpackPlugin(), // 每次构建项目之前清理/dist文件夹
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './src/index.html',  // 使用自定义模板
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
};
```

#### 开发环境的配置`webpack.dev.js`

```js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 9000,
    progress: true, // 显示打包进度条
    contentBase: './dist',
    open: true, // 自动打开浏览器
    hot: true,
    compress： true, // 开启 gzip 压缩

    proxy: {
      // 将本地 /api/xx 代理到 http://localhost:3000/api/xx
      '/api': {
        target: 'http://localhost:3000',
      },

      // 将本地 /api2/xx 代理到 http://localhost:3000/xx
      '/api2': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api2' : ''}
      }
    }
  },
});
```

- merge() 是 webpack-merge 插件提供的一个函数，用于合并 webpack 配置文件。在这里，它给我们提供了一种方式去工整 的合并公共配置和开发环境的特殊配置。
- mode: 'development' 用于设置 webpack 的模式为开发模式。设置为开发模式会启用 DevTool 和热更新等实用特性。
- devtool: 'inline-source-map' 可以在出现错误的时候，通过 source map 更好地追踪错误和警告。
- devServer 是 webpack-dev-server 插件的配置选项，提供了一个简单的 web 服务器，并且实时重新加载页面。contentBase: './dist' 用于设置从何处提供内容，hot: true 用于启用 HMR（Hot Module Replacement）。

#### 生产环境的配置`webpack.prod.js`

```js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
});
```

- TerserJSPlugin 和 OptimizeCSSAssetsPlugin 用来分别压缩 JS 和 CSS 文件。
- `MiniCssExtractPlugin` 插件会将 CSS 单独抽取到一个文件中，而在开发环境配置中，我们通常会使用 style-loader 将 CSS 作为 style 标签直接插入到 HTML 中

### 处理样式

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"]
      },
    ],
  },
}
```

- less loader 将 Less 转换为 CSS；
- postcss loader 处理一些兼容性，为样式添加 -webkit- 的前缀等；
- css-loader 会处理 CSS 中的 @import 和 url()；
- style loader 会生成一个内容为最终解析完的 CSS 的 style 标签，添加到 head 标签里。

## 高级配置

### 配置多入口

```js
module.exports = {
  entry: {
    app: './src/app.js',
    admin: './src/admin.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].[contenthash:8].bundle.js',
    publicPath: 'https://cdn.abc.com' // 修改所有静态文件 url 的前缀（如 cdn 域名）
  },
  plugins: [
    // 多入口 - 生成index.html
    new HtmlWebpackPlugin({
      title: "html-webpack-plugin 自动生成 html 模板",
      filename: "index.html", // 指定生成的 HTML 文件路径和名称
      template: "./public/index.html", // 指定模板文件路径
      chunks: ['app'] // 只引用 app.js
    }),

    // 多入口 - 生成index.html
    new HtmlWebpackPlugin({
      title: "html-webpack-plugin 自动生成 html 模板",
      filename: "admin.html", // 指定生成的 HTML 文件路径和名称
      template: "./public/admin.html", // 指定模板文件路径
      chunks: ['admin'] // 只引用 admin.js
    }),
  ],
};
```

- `contenthash`: `[name].[contenthash:8].bundle.js`: 输出 bundle.js 时，加上 hash 戳，当文件变化时，hash 值才会变化，这时浏览器才会请求新的 bundle.js 文件，若无变化则会命中缓存。
- `[name].bundle.js`：这里的 [name] 是占位符，webpack 会把它替换为入口名称，在上面的例子中就是 "app" 和 "admin"。

### 抽离和压缩 CSS 文件（MiniCssExtractPlugin）

:::warning ⚠️
如果不抽离，那么会将 css 的代码也全都打包到 bundle.js 中，然后再加到 html 的 style 标签上
:::

#### 如何抽离

在生产环境中，我们通常会使用 `MiniCssExtractPlugin.loader` 来代替 `style-loader`。MiniCssExtractPlugin 的作用是将 CSS 从 JavaScript 文件中提取出来，并生成单独的 CSS 文件。

```js
module: {
  rules: [
    // 抽离 css
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
    },

    // 抽离 less --> css
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
    },
  ],
},
```

上一步中，我们将 css 样式单独拎出来，那么该放到哪里去呢？我们需要在 plugins 下的 MiniCssExtractPlugin 插件中定义 filename，也就是输出的 css 路径和文件名，此处也需要定义 hash 戳，如果 css 样式不变则不会重新请求该文件

```js
plugins: [
  new MiniCssExtractPlugin({
    filename: 'css/main.[contenthash:8].css',
  }),
],
```

然后在 html 中会通过 link 的方式引入该路径下的 css 文件

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>html-webpack-plugin 自动生成 html 模板</title>
    <script defer="defer" src="js/runtime~index.fdf0e8d9.build.js"></script>
    <script defer="defer" src="js/index.e86170aa.build.js"></script>
    <link href="css/main.6e0fd768.css" rel="stylesheet" />
  </head>
  <body>
    <noscript
      ><strong
        >We're sorry but html-webpack-plugin 自动生成 html 模板 doesn't work
        properly without JavaScript enabled. Please enable it to
        continue.</strong
      ></noscript
    >
    <div id="app"></div>
  </body>
</html>
```

**为什么需要这么做呢？以下是主要的几个原因：**

- 性能优化：将 CSS 作为独立的文件加载，可以更好地利用浏览器的并行加载机制，页面可以在加载 JS 的同时加载 CSS，提升页面的加载速度。
- 缓存优化：当我们的 CSS 和 JS 分离时，即使我们的 JavaScript 文件发生变动，CSS 文件可以保持缓存，从而减少了不必要的下载。
- 代码组织：提取 CSS 到单独的文件中，也更便于我们对 CSS 代码的管理和维护。
- 适应生产环境：在生产环境中，我们一般不需要CSS hot-reload这样的功能，把 CSS 提取出来，单独作为一个文件，有助于提高网页性能。

#### 如何压缩

抽离出 css 文件之后，需要对其进行压缩，通常在 optimization 中使用 CssMinimizerPlugin 插件来对其进行压缩

```js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

optimization: {
  minimizer: [new CssMinimizerPlugin()],
},
```

### 抽离公共代码和第三方代码（splitChunks + HtmlWebpackPlugin）

#### 为什么要抽离

- 公共代码：如果 a 文件引入了 c.js，b 文件也引入了 c.js，那么这两个部分的重复代码都会被打包，这样就造成了空间浪费
- 第三方代码：第三方代码，如 lodash，往往会文件内容很大，如果在 a 文件中引入 lodash，之后每次更改 a 文件就需要又重新打包该文件，所以造成每次 lodash 也会被重新打包，这样会造成性能浪费，我们应该将第三方代码单独打包出来
- 在生产环境才需要抽离。在开发环境中我们往往希望打包构建的速度快一点，所以压缩，拆分，合并等工作是不需要的

#### 具体配置

在 optimization 中配置 splitChunks 插件

```js
optimization: {
  minimizer: [
    new TerserPlugin({
      extractComments: false, // 关闭build.js.LICENSE.txt
    }),
    new CssMinimizerPlugin()
  ],
  splitChunks: {
    chunks: "all",
    // chunks: "initial",
    // chunks: "async",
    cacheGroups: {
      vendor: {
        name: "vendor",
        minSize: 0,
        test: /[\\/]node_modules[\\/]/, // 第三方依赖包拆分
        priority: 1,
      },
      common: {
        name: "common",
        minSize: 0,
        minChunks: 1, // 拆分前必须共享模块的最小 chunks 数。
        priority: 0,
      },
    },
  },
},
```

![alt splitChunks](/splitChunks.jpg)

在 plugins 中的 HtmlWebpackPlugin 插件

```js
plugins: [
  new HtmlWebpackPlugin({
    title: "Webpack 多入口文件 -- index",
    template: "public/index.html", // 指定模板文件路径
    filename: "index.html",
    chunks: ["index", "vendor", "common"],
  }),
  new HtmlWebpackPlugin({
    title: "Webpack 多入口文件 -- main",
    template: "public/main.html", // 指定模板文件路径
    filename: "main.html",
    chunks: ["main", "common"],
  }),
],
```

chunks 里面会声明我们的该入口 html 文件需要哪些 chunks 文件，所以我们需要按需写， 如果不指定，默认会全部引用。

:::warning ⚠️
如果没引入第三方文件但是却写了 vendor 的话，那就也会引入 vendor.js，这样不可取
:::

抽离后，dist 中的 html 结果会分别引入公共模块和第三方模块

![alt splitChunks](/splitChunks_entry.jpg)

:::warning ⚠️

- chunks 选项值应匹配之前在 entry 中定义的入口点名称。
- HtmlWebpackPlugin 对 chunks 的使用
- splitChunks 中对 chunks 的抽离
:::

### 实现异步加载 Js

Webpack 允许你进行代码拆分（Code Splitting）以及懒加载（Lazy Loading）JavaScript 文件。实现异步加载js主要使用的技术就是动态引入（Dynamic Imports）。我们可以使用特定的语法来实现这个功能，即 import()。

```js
// title.js
const OEle = document.createElement("div");
OEle.innerHTML = "Hi Christine";

module.exports = OEle;
```

```js
const OBtn = document.createElement("button");
OBtn.innerHTML = "点击加载元素";
document.body.appendChild(OBtn);

OBtn.addEventListener("click", function () {
  import(/*webpackChunkName: 'title'*/ "./title").then(
    ({ default: element }) => {
      console.log("element: ", element);
      document.body.appendChild(element);
    }
  );
});
```

在这个示例中，title.js 只有在用户点击 button 时才会被加载并执行。

:::tip 注意
使用 `import()` 语法返回的是一个 `Promise`，因此你可以使用 `.then()` 或 `async/await` 语法来处理它。
同时，webpack 在打包时会自动对 import() 进行代码拆分，生成新的chunk，并在运行时异步加载这个chunk。
:::

在React中，还可以使用 `React.lazy` 和 `Suspense` 组件来实现对 React 组件的懒加载。

### 处理JSX/Vue

#### 处理 JSX

```js
// babel.config.js
module.exports = {
  presets: [["@babel/preset-react"]],
};
```

#### 处理 Vue

```js
module: {
  rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    },
  ],
},
```

## 优化打包构建速度

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

当然这样做还不够，我们还可以添加`cacheDirectory=true`，它可以帮助我们将已经转译过的结果缓存下来，以便下次可以直接读取。

```js
module.exports = {
  rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader?cacheDirectory=true'
    }
  ]
}

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

- **threads**: **Number** 类型，指示对应 loader 编译源文件时同时使用的进程数，默认是 3
- **threadPool**: HappyThreadPool对象，代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多

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

- `resolve.extensions`：用来表明文件后缀列表，默认查找顺序是 `['.js', '.json']`，如果你的导入文件没有添加后缀就会按照这个顺序查找文件。我们应该尽可能减少后缀列表长度，然后将出现频率高的后缀排在前面
- `resolve.alias`：可以通过别名的方式来映射一个路径，能让 Webpack 更快找到路径
- `module.noParse`：如果你确定一个文件下没有其他依赖，就可以使用该属性让 Webpack 不扫描该文件，这种方式对于大型的类库很有帮助
:::tip 注意
- 在webpack 4中，开启多进程代码压缩需要使用`webpack-parallel-uglify-plugin`插件。webpack 有内置的 UglifyJS 工具压缩 JS，但这个工具默认是没有多进程压缩的。

- 在webpack 5中，使用的是`terser-webpack-plugin`插件， 默认开启多进程代码压缩
:::

## 减小 Webpack 打包后的文件体积

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

- 使用 `webpack-dev-server` (后面简称 WDS)托管静态资源，同时以 `Runtime` 方式注入 HMR 客户端代码
- 浏览器加载页面后，与 `WDS` 建立 `WebSocket` 连接
- Webpack 监听到文件变化后，增量构建发生变更的模块，并通过 WebSocket 发送 `hash` 事件
- 浏览器接收到 `hash` 事件后，请求 `manifest` 资源文件，确认增量变更范围
- 浏览器加载发生变更的增量模块
- Webpack 运行时触发变更模块的 `module.hot.accept` 回调，执行代码变更逻辑

[HMR 原理全解析](https://juejin.cn/post/7021729340945596424)

## Vite 和 Webpack对比

### Vite 优点

- 启动项目快
  - 只启动一台静态页面的服务器，对文件代码不打包；
  - Vite 的原理是借助了浏览器对 ESM 规范的支持；
  - Vite 无需进行 bundle 操作，Vite 项目，源文件之间的依赖关系通过浏览器对 ESM 规范的支持来解析；
  - 所以在启动过程中，只需要进行一些初始化的操作，其余全部交由浏览器处理，所以项目启动非常之快；
- 热更新快
  - 本地开发环境，在监听到文件变化以后，直接通过 ws 连接，通知浏览器去重新加载变化的文件；
  - 在 Vite 中，HMR 是在原生 ESM 上执行的;
  - 编辑一个文件时，Vite 只需要精确地使已编辑的模块与其最近的 HMR 边界之间的链失活（大多数时候只是模块本身），使得无论应用大小如何，HMR 始终能保持快速更新；
  - 源码缓存：Vite 同时利用 HTTP 头来加速整个页面的重新加载（再次让浏览器为我们做更多事情）：源码模块的请求会根据 304 Not Modified 进行协商缓存；
  - 依赖模块缓存：解析后的依赖请求则会通过 Cache-Control: max-age=31536000,immutable 进行强缓存，因此一旦被缓存它们将不需要再次请求。

### Vite 缺点

- 首屏加载慢
  - 没有对文件进行 bundle 操作，会导致大量的 http 请求
  - dev 服务运行期间会对源文件做转换操作，需要时间
  - Vite 需要把 webpack dev 启动完成的工作，移接到了 dev 响应浏览器的过程中，时间加长

- 懒加载慢
  - 和首屏加载一样，动态加载的文件需要对源文件进行转换操作
  - 还可能会有大量的 http 请求，懒加载的性能同样会受到影响
