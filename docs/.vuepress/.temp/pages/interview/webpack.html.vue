<template><div><h1 id="webpack" tabindex="-1"><a class="header-anchor" href="#webpack"><span>Webpack</span></a></h1>
<h2 id="减少-webpack-打包时间" tabindex="-1"><a class="header-anchor" href="#减少-webpack-打包时间"><span>减少 Webpack 打包时间</span></a></h2>
<h3 id="优化-loader" tabindex="-1"><a class="header-anchor" href="#优化-loader"><span>优化 Loader</span></a></h3>
<p>对于 Loader 来说，影响打包效率首当其冲必属 Babel 了。因为 Babel 会将代码转为字符串生成 AST，然后对 AST 继续进行转变最后再生成新的代码，项目越大，<strong>转换代码越多，效率就越低</strong>。当然了，我们是有办法优化的。</p>
<p>首先我们可以<strong>优化 Loader 的文件搜索范围</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token comment">// js 文件才使用 babel</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">'babel-loader'</span><span class="token punctuation">,</span>
        <span class="token comment">// 只在 src 文件夹下查找</span>
        <span class="token literal-property property">include</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">'src'</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token comment">// 不会去查找的路径</span>
        <span class="token literal-property property">exclude</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">node_modules</span><span class="token regex-delimiter">/</span></span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于 <code v-pre>Babel</code> 来说，我们肯定是希望只作用在 JS 代码上的，然后 <code v-pre>node_modules</code> 中使用的代码都是编译过的，所以我们也完全没有必要再去处理一遍。</p>
<p>当然这样做还不够，我们还可以将 <code v-pre>Babel</code> 编译过的文件<strong>缓存</strong>起来，下次只需要编译更改过的代码文件即可，这样可以大幅度加快打包时间</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">'babel-loader?cacheDirectory=true'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="happypack" tabindex="-1"><a class="header-anchor" href="#happypack"><span>HappyPack</span></a></h3>
<p>在使用 Webpack 对项目进行构建时，会对大量文件进行解析和处理。当文件数量变多之后，Webpack 构件速度就会变慢。由于运行在 Node.js 之上的 Webpack 是单线程模型，所以 Webpack 需要处理的任务要一个一个进行操作。</p>
<p>作用：</p>
<ol>
<li>开启其它 loader 的多进程打包</li>
<li>充分利用多核 CPU 并发的优势，帮我们把任务分解给多个子进程去并发执行，大大提升打包效率</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> HappyPack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'happypack'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 创建一个 HappyThreadPool，作为所有 loader 共用的进程池</span>
<span class="token keyword">const</span> happyThreadPool <span class="token operator">=</span> HappyPack<span class="token punctuation">.</span><span class="token function">ThreadPool</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">size</span><span class="token operator">:</span> <span class="token number">5</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
      <span class="token literal-property property">include</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">'src'</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">exclude</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">node_modules</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
      <span class="token comment">// 使用 id 指定创建的 HappyPack 插件</span>
      <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">'happypack/loader?id=happybabel'</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
  <span class="token keyword">new</span> <span class="token class-name">HappyPack</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// id 标识符，要和 rules 中指定的 id 对应起来</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">'happybabel'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">loaders</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'babel-loader?cacheDirectory'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 开启 4 个进程</span>
    <span class="token comment">// threads: 4,</span>
    <span class="token literal-property property">threadPool</span><span class="token operator">:</span> happyThreadPool
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>threads</strong>: <strong>Number</strong> 类型，指示对应 loader 编译源文件时同时使用的进程数，默认是 3</li>
<li><strong>threadPool</strong>: HappyThreadPool对象，代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多</li>
</ul>
<h3 id="dllplugin" tabindex="-1"><a class="header-anchor" href="#dllplugin"><span>DllPlugin</span></a></h3>
<p><strong>DllPlugin 可以将特定的类库提前打包然后引入</strong>。这种方式可以极大的减少打包类库的次数，只有当类库更新版本才有需要重新打包，并且也实现了将公共代码抽离成单独文件的优化方案。</p>
<p>接下来我们就来学习如何使用 DllPlugin</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 单独配置在一个文件中</span>
<span class="token comment">// webpack.dll.conf.js</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> webpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'webpack'</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 想统一打包的类库</span>
    <span class="token literal-property property">vendor</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'react'</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'dist'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">'[name].dll.js'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">library</span><span class="token operator">:</span> <span class="token string">'[name]-[hash]'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>DllPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token comment">// name 必须和 output.library 一致</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'[name]-[hash]'</span><span class="token punctuation">,</span>
      <span class="token comment">// 该属性需要与 DllReferencePlugin 中一致</span>
      <span class="token literal-property property">context</span><span class="token operator">:</span> __dirname<span class="token punctuation">,</span>
      <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'dist'</span><span class="token punctuation">,</span> <span class="token string">'[name]-manifest.json'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们需要执行这个配置文件生成依赖文件，接下来我们需要使用 <code v-pre>DllReferencePlugin</code> 将依赖文件引入项目中</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// webpack.conf.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...省略其他配置</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>DllReferencePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">context</span><span class="token operator">:</span> __dirname<span class="token punctuation">,</span>
      <span class="token comment">// manifest 就是之前打包出来的 json 文件</span>
      <span class="token literal-property property">manifest</span><span class="token operator">:</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./dist/vendor-manifest.json'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="一些小的优化点" tabindex="-1"><a class="header-anchor" href="#一些小的优化点"><span>一些小的优化点</span></a></h3>
<p>我们还可以通过一些小的优化点来加快打包速度</p>
<ul>
<li><code v-pre>resolve.extensions</code>：用来表明文件后缀列表，默认查找顺序是 <code v-pre>['.js', '.json']</code>，如果你的导入文件没有添加后缀就会按照这个顺序查找文件。我们应该尽可能减少后缀列表长度，然后将出现频率高的后缀排在前面</li>
<li><code v-pre>resolve.alias</code>：可以通过别名的方式来映射一个路径，能让 Webpack 更快找到路径</li>
<li><code v-pre>module.noParse</code>：如果你确定一个文件下没有其他依赖，就可以使用该属性让 Webpack 不扫描该文件，这种方式对于大型的类库很有帮助</li>
</ul>
<h2 id="减少-webpack-打包后的文件体积" tabindex="-1"><a class="header-anchor" href="#减少-webpack-打包后的文件体积"><span>减少 Webpack 打包后的文件体积</span></a></h2>
<h3 id="按需加载" tabindex="-1"><a class="header-anchor" href="#按需加载"><span>按需加载</span></a></h3>
<p>想必大家在开发 SPA 项目的时候，项目中都会存在十几甚至更多的路由页面。如果我们将这些页面全部打包进一个 JS 文件的话，虽然将多个请求合并了，但是同样也加载了很多并不需要的代码，耗费了更长的时间。那么为了首页能更快地呈现给用户，我们肯定是希望首页能加载的文件体积越小越好，<strong>这时候我们就可以使用按需加载，将每个路由页面单独打包为一个文件</strong>。当然不仅仅路由可以按需加载，对于 <code v-pre>lodash</code> 这种大型类库同样可以使用这个功能。</p>
<p>底层的机制是当使用的时候再去下载对应文件，返回一个 <code v-pre>Promise</code>，当 <code v-pre>Promise</code> 成功以后去执行回调。</p>
<h3 id="scope-hoisting" tabindex="-1"><a class="header-anchor" href="#scope-hoisting"><span>Scope Hoisting</span></a></h3>
<p>参考<a href="https://juejin.cn/post/6850418110983241741" target="_blank" rel="noopener noreferrer">Webpack Scope Hoisting 学习指南<ExternalLinkIcon/></a></p>
<h3 id="tree-shaking" tabindex="-1"><a class="header-anchor" href="#tree-shaking"><span>Tree Shaking</span></a></h3>
<p><strong>Tree Shaking 可以实现删除项目中未被引用的代码</strong>，比如</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// test.js</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token number">2</span>

<span class="token comment">// index.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> a <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./test.js'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于以上情况，<code v-pre>test</code> 文件中的变量 <code v-pre>b</code> 如果没有在项目中使用到的话，就不会被打包到文件中。</p>
<p>如果你使用 Webpack 4 的话，开启生产环境就会自动启动这个优化功能。</p>
<h3 id="代码压缩" tabindex="-1"><a class="header-anchor" href="#代码压缩"><span>代码压缩</span></a></h3>
<p>在 Webpack3 中，我们一般使用 <code v-pre>UglifyJS</code> 来压缩代码，但是这个是单线程运行的，为了加快效率，我们可以使用 <code v-pre>webpack-parallel-uglify-plugin</code> 来并行运行 <code v-pre>UglifyJS</code>，从而提高效率。</p>
<p>在 Webpack4 中，我们就不需要以上这些操作了，只需要将 <code v-pre>mode</code> 设置为 <code v-pre>production</code> 就可以默认开启以上功能。代码压缩也是我们必做的性能优化方案，当然我们不止可以压缩 JS 代码，还可以压缩 HTML、CSS 代码，并且在压缩 JS 代码的过程中，我们还可以通过配置实现比如删除 <code v-pre>console.log</code> 这类代码的功能。</p>
<p>在 Webpack5 中，我们需要打开minimize，让其对我们的代码进行压缩(默认production模式下已经打开了，如果是在development模式下进行使用的时候，需要手动进行开启)</p>
<h3 id="懒加载" tabindex="-1"><a class="header-anchor" href="#懒加载"><span>懒加载</span></a></h3>
<h2 id="hmr-实现原理" tabindex="-1"><a class="header-anchor" href="#hmr-实现原理"><span>HMR 实现原理</span></a></h2>
<p>核心流程:</p>
<ul>
<li>使用 <code v-pre>webpack-dev-server</code> (后面简称 WDS)托管静态资源，同时以 <code v-pre>Runtime</code> 方式注入 HMR 客户端代码</li>
<li>浏览器加载页面后，与 <code v-pre>WDS</code> 建立 <code v-pre>WebSocket</code> 连接</li>
<li>Webpack 监听到文件变化后，增量构建发生变更的模块，并通过 WebSocket 发送 <code v-pre>hash</code> 事件</li>
<li>浏览器接收到 <code v-pre>hash</code> 事件后，请求 <code v-pre>manifest</code> 资源文件，确认增量变更范围</li>
<li>浏览器加载发生变更的增量模块</li>
<li>Webpack 运行时触发变更模块的 <code v-pre>module.hot.accept</code> 回调，执行代码变更逻辑</li>
</ul>
<p><a href="https://juejin.cn/post/7021729340945596424" target="_blank" rel="noopener noreferrer">HMR 原理全解析<ExternalLinkIcon/></a></p>
<h2 id="vite-和-webpack对比" tabindex="-1"><a class="header-anchor" href="#vite-和-webpack对比"><span>Vite 和 Webpack对比</span></a></h2>
<h3 id="vite-优点" tabindex="-1"><a class="header-anchor" href="#vite-优点"><span>Vite 优点</span></a></h3>
<ul>
<li>启动项目快
<ul>
<li>只启动一台静态页面的服务器，对文件代码不打包；</li>
<li>Vite 的原理是借助了浏览器对 ESM 规范的支持；</li>
<li>Vite 无需进行 bundle 操作，Vite 项目，源文件之间的依赖关系通过浏览器对 ESM 规范的支持来解析；</li>
<li>所以在启动过程中，只需要进行一些初始化的操作，其余全部交由浏览器处理，所以项目启动非常之快；</li>
</ul>
</li>
<li>热更新快
<ul>
<li>本地开发环境，在监听到文件变化以后，直接通过 ws 连接，通知浏览器去重新加载变化的文件；</li>
<li>在 Vite 中，HMR 是在原生 ESM 上执行的;</li>
<li>编辑一个文件时，Vite 只需要精确地使已编辑的模块与其最近的 HMR 边界之间的链失活（大多数时候只是模块本身），使得无论应用大小如何，HMR 始终能保持快速更新；</li>
<li>源码缓存：Vite 同时利用 HTTP 头来加速整个页面的重新加载（再次让浏览器为我们做更多事情）：源码模块的请求会根据 304 Not Modified 进行协商缓存；</li>
<li>依赖模块缓存：解析后的依赖请求则会通过 Cache-Control: max-age=31536000,immutable 进行强缓存，因此一旦被缓存它们将不需要再次请求。</li>
</ul>
</li>
</ul>
<h3 id="vite-缺点" tabindex="-1"><a class="header-anchor" href="#vite-缺点"><span>Vite 缺点</span></a></h3>
<ul>
<li>
<p>首屏加载慢</p>
<ul>
<li>没有对文件进行 bundle 操作，会导致大量的 http 请求</li>
<li>dev 服务运行期间会对源文件做转换操作，需要时间</li>
<li>Vite 需要把 webpack dev 启动完成的工作，移接到了 dev 响应浏览器的过程中，时间加长</li>
</ul>
</li>
<li>
<p>懒加载慢</p>
<ul>
<li>和首屏加载一样，动态加载的文件需要对源文件进行转换操作</li>
<li>还可能会有大量的 http 请求，懒加载的性能同样会受到影响</li>
</ul>
</li>
</ul>
</div></template>


