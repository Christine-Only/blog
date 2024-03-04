# webpack知识点

## webpack externals深入理解

按照官方文档的解释，如果我们想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，那就可以通过配置externals。

假设：我们创建一个项目，里面引用了lodash这个包，经过webpack打包的时候，发现如果把这个lodash包打入进去，打包文件就会非常大。那么我们就可以externals的方式引入。也就是说，自己的库本身不打包这个lodash，需要用户环境提供。

### 引入lodash

```js
import _ from 'lodash';
```

### 配置externals

```js
externals: {
  "lodash": {
    commonjs: "lodash",//如果我们的库运行在Node.js环境中，import _ from 'lodash'等价于const _ = require('lodash')
    commonjs2: "lodash",//同上
    amd: "lodash",//如果我们的库使用require.js等加载,等价于 define(["lodash"], factory);
    root: "_"//如果我们的库在浏览器中使用，需要提供一个全局的变量‘_’，等价于 var _ = (window._) or (_);
  }
}
```

总之，externals配置就是为了使 `import _ from 'lodash'` 这句代码，在本身不引入lodash的情况下，能够在各个环境都能正常执行。

`externals` 支持以下模块上下文(module context)

* **global** - 外部 library 能够作为全局变量使用。用户可以通过在 script 标签中引入来实现。这是 externals 的默认设置。
* **commonjs** - 用户(consumer)应用程序可能使用 CommonJS 模块系统，因此外部 library 应该使用 CommonJS 模块系统，并且应该是一个 CommonJS 模块。
* **commonjs2** - 类似上面几行，但导出的是 module.exports.default。
* **amd** - 类似上面几行，但使用 AMD 模块系统。

### 不同环境设置externals方式

1. 如果你的代码想运行在Node环境中，那么你需要在external中添加前缀commonjs2或者commonjs

```js
externals:{
  react:'commonjs2 react',
  jquery:'commonjs2 jquery'
}
```

2. 如果需要requirejs等符合AMD规范的环境中加载，那就要添加amd

```js
externals:{
  react:'amd React',
  jquery:'amd jQuery'
}
```

3. 如果要在浏览器中运行，那么不用添加什么前缀，默认设置就是global

```js
externals:{
  react:'React',
  jquery:'jQuery'
}
```

这种方式配置下，就是配置你所引用你的库暴露出的全局变量。如果你想运行代码在浏览器中，你所引用的包，必须暴露出一个全局变量。如果没有，这种方式不适合在浏览器下使用。

这里你可以看出，不同模式下，value是不一样的。2，3模式下，是要引入全局变量，1模式是要加载包名。那如果这个包的包名和在浏览器下引入的全局变量一致，上面就可以写成一样了，比如moment。

### `externals`和`libraryTarget`的关系

* libraryTarget配置如何暴露 library。如果不设置library,那这个library就不暴露。就相当于一个自执行函数
* externals是决定的是以哪种模式去加载所引入的第三方的包
* libraryTarget决定了你的library运行在哪个环境，哪个环境也就决定了你哪种模式去加载所引入的额外的包。也就是说，externals应该和libraryTarget保持一致。library运行在浏览器中的，你设置externals的模式为commonjs，那代码肯定就运行不了了。
* 如果是应用程序开发，一般是运行在浏览器环境libraryTarget可以不设置，externals默认的模式是global，也就是以全局变量的模式加载所引入外部的库。

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
