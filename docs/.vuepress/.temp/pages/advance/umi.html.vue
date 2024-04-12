<template><div><h1 id="首屏加载优化" tabindex="-1"><a class="header-anchor" href="#首屏加载优化"><span>首屏加载优化</span></a></h1>
<blockquote>
<p>以 Umi项目 为例</p>
</blockquote>
<h2 id="为什么首屏加载需要优化" tabindex="-1"><a class="header-anchor" href="#为什么首屏加载需要优化"><span>为什么首屏加载需要优化</span></a></h2>
<p>因为做了很多事情：
初始化 webView -&gt; 请求页面 -&gt; 下载数据 -&gt; 解析 HTML -&gt; 请求 js/css 资源 -&gt; dom 渲染 -&gt; 解析 JS 执行 -&gt; JS 请求数据 -&gt; 解析渲染 -&gt; 下载渲染图片</p>
<p>在 <code v-pre>dom渲染</code> 之前用户看到的都是白屏，在 <code v-pre>下载渲染图片</code> 后，用户才能看到完整的页面。首屏秒开优化就是要减少这个过程的耗时。</p>
<p>对首屏启动速度影响最大的就是网络请求。由于业务需求，导致我们不得不引入很多第三方包(类如：antd，moment，echarts 等)来实现功能，这些包恰恰会容易影响到网络请求。</p>
<h2 id="分析产物" tabindex="-1"><a class="header-anchor" href="#分析产物"><span>分析产物</span></a></h2>
<p>在 <code v-pre>umi</code> 项目中，执行 <code v-pre>ANALYZE=1 umi build</code> 来查看build之后的产物包结构。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>注意环境变量的使用，mac上可以直接使用，window上需要使用set ，因此在项目中，我们一般是通过安装 <code v-pre>cross-env</code> 来抹去平台差异。</p>
</div>
<p><strong>配置脚本</strong></p>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token comment">// package.json</span>
<span class="token punctuation">{</span>
  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"analyze"</span><span class="token operator">:</span> <span class="token string">"cross-env ANALYZE=1 umi build"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行 <code v-pre>npm run analyze</code>，编译执行完成后以后，你可以查看 <a href="http://127.0.0.1:8888" target="_blank" rel="noopener noreferrer">http://127.0.0.1:8888<ExternalLinkIcon/></a> 包分析页面。可以看到大致如下图所示的页面。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>start size：原始没有经过 minify 处理的文件大小</p>
<p>parse size：比如 webpack plugin 里用了 uglify，就是 minified 以后的文件大小</p>
<p>gzip size：被压缩以后的文件大小</p>
</div>
<p><img src="/init.png" alt="alt 拆包前"></p>
<p>这个是初始打包出来的 js 大小，可以清晰的看到，vendors.js 6.1M 真的超级大。这个时候我们想拆出来怎么办呢？</p>
<p><strong>有如下几种优化的方法</strong>：</p>
<ol>
<li>启用按需加载</li>
</ol>
<p><strong>常见使用场景</strong>：组件体积太大，不适合直接计入 bundle 中，以免影响首屏加载速度。例如：某组件 HugeA 包含巨大的实现 / 依赖了巨大的三方库，且该组件 HugeA 的使用不在首屏显示范围内，可被单独拆出。这时候，<code v-pre>dynamic</code> 就该上场了。
为了简化部署成本，umi按需加载功能默认是关闭的，你需要在使用之前先通过配置开启，</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">dynamicImport</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// @ 默认指到 src 目录</span>
    <span class="token literal-property property">loading</span><span class="token operator">:</span> <span class="token string">'@/pages/Loading/index'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加完按需加载，每次在切换页面的时候，都会渲染一个 loading 页面，这个loading页面是可以自定义的。</p>
<ol start="2">
<li>图片资源压缩</li>
</ol>
<p>这是最有效减小产物包大小的一步，却是被很多人忽略的一步，很多开发者都是直接下载了 <code v-pre>UI</code> 提供的切图，并没有对图片进行处理，其实适当的对图片进行压缩其实不会影响显示效果的。压缩工具有很多比如 TinyPNG 或者 pngquant。</p>
<ol start="3">
<li>调整 splitChunks 策略</li>
</ol>
<p><code v-pre>cacheGroups</code> 中的配置，尤其是每一项里面的 test ，比如这里的 <code v-pre>/[\\/]node_modules[\\/]/</code> 表示将 <code v-pre>node_modules</code> 中的所有的库拆分到一个新的js文件中，文件名称为 <code v-pre>vendors.js</code>、<code v-pre>antd.js</code>、<code v-pre>echarts.js</code> 和 <code v-pre>bizcharts.js</code> 。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// config.ts</span>
<span class="token function-variable function">chainWebpack</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>config<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//过滤掉moment的那些不使用的国际化文件</span>
    config
      <span class="token punctuation">.</span><span class="token function">plugin</span><span class="token punctuation">(</span><span class="token string">'replace'</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">'webpack'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>ContextReplacementPlugin<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">moment[/\\]locale$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">zh-cn</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    config<span class="token punctuation">.</span><span class="token function">merge</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      optimization<span class="token operator">:</span> <span class="token punctuation">{</span>
        splitChunks<span class="token operator">:</span> <span class="token punctuation">{</span>
            chunks<span class="token operator">:</span> <span class="token string">'all'</span><span class="token punctuation">,</span> <span class="token comment">//提取 chunks 的时候从哪里提取</span>
            name<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>  <span class="token comment">// chunk 的名称，如果设置为固定的字符串那么所有的 chunk 都会被合并成一个，这就是为什么 umi 默认只有一个 vendors.async.js。</span>
            minSize<span class="token operator">:</span> <span class="token number">30000</span><span class="token punctuation">,</span> <span class="token comment">// byte, == 30 kb，越大那么单个文件越大，chunk 数就会变少（针对于提取公共 chunk 的时候，不管再大也不会把动态加载的模块合并到初始化模块中）当这个值很大的时候就不会做公共部分的抽取了</span>
            maxSize<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// 文件的最大尺寸，优先级：maxInitialRequest/maxAsyncRequests &lt; maxSize &lt; minSize，需要注意的是这个如果配置了，umi.js 就可能被拆开，最后构建出来的 chunkMap 中可能就找不到 umi.js 了。</span>
            minChunks<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">// 被提取的一个模块至少需要在几个 chunk 中被引用，这个值越大，抽取出来的文件就越小</span>
            maxAsyncRequests<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token comment">// 在做一次按需加载的时候最多有多少个异步请求，为 1 的时候就不会抽取公共 chunk 了</span>
            maxInitialRequests<span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token comment">// 针对一个 entry 做初始化模块分隔的时候的最大文件数，优先级高于 cacheGroup，所以为 1 的时候就不会抽取 initial common 了。</span>
          cacheGroups<span class="token operator">:</span> <span class="token punctuation">{</span>
            vendor<span class="token operator">:</span> <span class="token punctuation">{</span>
              name<span class="token operator">:</span> <span class="token string">'vendors'</span><span class="token punctuation">,</span>
              test<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^.*node_modules[\\/](?!echarts|bizcharts|antd|@ant-design).*$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token comment">//除去需要拆分的node_modules包</span>
              chunks<span class="token operator">:</span> <span class="token string">'all'</span><span class="token punctuation">,</span>
              priority<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            antd<span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// antdsign</span>
                name<span class="token operator">:</span> <span class="token string">'antd'</span><span class="token punctuation">,</span>
                chunks<span class="token operator">:</span> <span class="token string">'all'</span><span class="token punctuation">,</span>
                test<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[\\/]node_modules[\\/]antd|@ant-design[\\/]</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
                priority<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            echarts<span class="token operator">:</span> <span class="token punctuation">{</span>
                name<span class="token operator">:</span> <span class="token string">'echarts'</span><span class="token punctuation">,</span>
                chunks<span class="token operator">:</span> <span class="token string">'all'</span><span class="token punctuation">,</span>
                test<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[\\/]node_modules[\\/]echarts[\\/]</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
                priority<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            bizcharts<span class="token operator">:</span> <span class="token punctuation">{</span>
                name<span class="token operator">:</span> <span class="token string">'bizcharts'</span><span class="token punctuation">,</span>
                chunks<span class="token operator">:</span> <span class="token string">'all'</span><span class="token punctuation">,</span>
                test<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[\\/]node_modules[\\/]bizcharts[\\/]</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
                priority<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>增加文件加载顺序声明 chunks ，因为我们增加了一个 js 文件，这是我们就要告诉项目，应该先加载哪个文件，如果你有增加其他的拆分文件，记得也要同步添加这个配置。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code>chunks<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'vendors'</span><span class="token punctuation">,</span> <span class="token string">'echarts'</span><span class="token punctuation">,</span> <span class="token string">'antd'</span><span class="token punctuation">,</span> <span class="token string">'bizcharts'</span><span class="token punctuation">,</span> <span class="token string">'umi'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们先看下 <code v-pre>cacheGroups</code> 下的属性，其他属性在下文中会讲解，先实现需求为重。</p>
<p><code v-pre>cacheGroups</code> 下的属性为 <code v-pre>key-value</code> 的对象形式，<code v-pre>key</code> 可以自行命名，那 <code v-pre>value</code> 的值呢，我们继续往下看：</p>
<p><code v-pre>name</code>: 拆分块的名称，提供字符串或函数使您可以使用自定义名称,如果 <code v-pre>name</code> 与 <code v-pre>chunks</code> 名称匹配，则进行拆分。
<code v-pre>test</code>: 正则匹配路径，符合入口的都会被拆分，装到 name 名称下的包中。
<code v-pre>priority</code>: 拆包的优先级，越大优先级越高。顺序很重要，先把大包分出去，在将剩余的 <code v-pre>node_modules</code> 分成 <code v-pre>vendors</code> 包。
<code v-pre>enforce</code>: 不管这个包的大小，都会进行分包处理。</p>
<p><img src="/splitChunks.png" alt="alt 拆包后">
上图可以清晰地看到使用splitChunks的方法，vendors.js大小缩小到1.88M，<code v-pre>echarts</code>、<code v-pre>antd</code>和<code v-pre>bizcharts</code>已经从vendors.js中拆分出来了。</p>
<ol start="4">
<li>通过 externals 结合 scripts 的方法设置哪些模块不被打包</li>
</ol>
<blockquote>
<p>配置 externals 还能减小编译消耗，使项目的编译时间更短。</p>
</blockquote>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// config.ts</span>
chunks<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'antd'</span><span class="token punctuation">,</span> <span class="token string">'antPro'</span><span class="token punctuation">,</span> <span class="token string">'vendors'</span><span class="token punctuation">,</span> <span class="token string">'umi'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token function-variable function">chainWebpack</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>config<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//过滤掉momnet的那些不使用的国际化文件</span>
    config
      <span class="token punctuation">.</span><span class="token function">plugin</span><span class="token punctuation">(</span><span class="token string">'replace'</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">'webpack'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>ContextReplacementPlugin<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">moment[/\\]locale$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">zh-cn</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    config<span class="token punctuation">.</span><span class="token function">merge</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      module<span class="token operator">:</span> <span class="token punctuation">{</span>
        rules<span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            test<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(gif|png|jpe?g|svg)$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span>
            loader<span class="token operator">:</span> <span class="token string">'url-loader'</span><span class="token punctuation">,</span>
            options<span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token comment">// 图片大小小于8kb，就会被base64处理</span>
              <span class="token comment">// 优点：减少请求数量（减轻服务器压力）</span>
              <span class="token comment">// 缺点： 图片体积会更大（文件请求速度更慢）</span>
              limit<span class="token operator">:</span> <span class="token number">10</span> <span class="token operator">*</span> <span class="token number">1024</span><span class="token punctuation">,</span>
              <span class="token comment">// outputPath: "img/",</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      optimization<span class="token operator">:</span> <span class="token punctuation">{</span>
        splitChunks<span class="token operator">:</span> <span class="token punctuation">{</span>
            chunks<span class="token operator">:</span> <span class="token string">'all'</span><span class="token punctuation">,</span> <span class="token comment">//提取 chunks 的时候从哪里提取</span>
            name<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>  <span class="token comment">// chunk 的名称，如果设置为固定的字符串那么所有的 chunk 都会被合并成一个，这就是为什么 umi 默认只有一个 vendors.async.js。</span>
            minSize<span class="token operator">:</span> <span class="token number">30000</span><span class="token punctuation">,</span> <span class="token comment">// byte, == 30 kb，越大那么单个文件越大，chunk 数就会变少（针对于提取公共 chunk 的时候，不管再大也不会把动态加载的模块合并到初始化模块中）当这个值很大的时候就不会做公共部分的抽取了</span>
            maxSize<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// 文件的最大尺寸，优先级：maxInitialRequest/maxAsyncRequests &lt; maxSize &lt; minSize，需要注意的是这个如果配置了，umi.js 就可能被拆开，最后构建出来的 chunkMap 中可能就找不到 umi.js 了。</span>
            minChunks<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">// 被提取的一个模块至少需要在几个 chunk 中被引用，这个值越大，抽取出来的文件就越小</span>
            maxAsyncRequests<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token comment">// 在做一次按需加载的时候最多有多少个异步请求，为 1 的时候就不会抽取公共 chunk 了</span>
            maxInitialRequests<span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token comment">// 针对一个 entry 做初始化模块分隔的时候的最大文件数，优先级高于 cacheGroup，所以为 1 的时候就不会抽取 initial common 了。</span>
          cacheGroups<span class="token operator">:</span> <span class="token punctuation">{</span>
            vendor<span class="token operator">:</span> <span class="token punctuation">{</span>
              name<span class="token operator">:</span> <span class="token string">'vendors'</span><span class="token punctuation">,</span>
              test<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^.*node_modules[\\/](?!antd|@ant-design).*$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token comment">//除去需要拆分的node_modules包</span>
              chunks<span class="token operator">:</span> <span class="token string">'all'</span><span class="token punctuation">,</span>
              priority<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            antd<span class="token operator">:</span> <span class="token punctuation">{</span>
                name<span class="token operator">:</span> <span class="token string">'antd'</span><span class="token punctuation">,</span>
                chunks<span class="token operator">:</span> <span class="token string">'all'</span><span class="token punctuation">,</span>
                test<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[\\/]node_modules[\\/]antd[\\/]</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
                priority<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            antPro<span class="token operator">:</span> <span class="token punctuation">{</span>
              name<span class="token operator">:</span> <span class="token string">'antPro'</span><span class="token punctuation">,</span>
              chunks<span class="token operator">:</span> <span class="token string">'all'</span><span class="token punctuation">,</span>
              test<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[\\/]node_modules[\\/]@ant-design[\\/]</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
              priority<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
externals<span class="token operator">:</span> <span class="token punctuation">{</span>
    react<span class="token operator">:</span> <span class="token string">'window.React'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'react-dom'</span><span class="token operator">:</span> <span class="token string">'window.ReactDOM'</span><span class="token punctuation">,</span>
    lodash<span class="token operator">:</span> <span class="token string">'window._'</span><span class="token punctuation">,</span>
    bizcharts<span class="token operator">:</span> <span class="token string">'window.BizCharts'</span><span class="token punctuation">,</span>
    echarts<span class="token operator">:</span> <span class="token string">'window.echarts'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
scripts<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">'https://unpkg.com/browse/react@^17/umd/react.production.min.js'</span><span class="token punctuation">,</span>
    <span class="token string">'https://unpkg.com/browse/react-dom@^17/umd/react-dom.production.min.js'</span><span class="token punctuation">,</span>
    <span class="token string">'https://unpkg.com/browse/lodash@4.17.21/lodash.min.js'</span><span class="token punctuation">,</span>
    <span class="token string">'https://unpkg.com/browse/bizcharts@4.1.10/umd/BizCharts.min.js'</span><span class="token punctuation">,</span>
    <span class="token string">'https://unpkg.com/browse/echarts@5.1.2/dist/echarts.min.js'</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>项目中对lodash的引用使用的是<code v-pre>import _ from 'lodash'</code>，所以想要在浏览器访问时，可以通过<code v-pre>window._</code>拿到。
例如：<code v-pre>BizCharts</code>库对外暴露的全局变量是BizCharts</p>
</div>
<div class="custom-container warning"><p class="custom-container-title">警告</p>
<p>这种方式引入并不是越多越好的，浏览器对同一个 hostname 发起的请求数量是有限制的，特别在安卓的 webview 中，限制的更加明显，因此可以通过观察首次发起的请求数量，来酌情处理。当然，土豪组织也可以通过增加不同的 cdn 主机来解除限制。</p>
</div>
<h2 id="前端网站容灾-cdn主域重试方案" tabindex="-1"><a class="header-anchor" href="#前端网站容灾-cdn主域重试方案"><span>前端网站容灾 - CDN主域重试方案</span></a></h2>
<blockquote>
<p>对外网站前端静态资源一般都会部署在 <code v-pre>CDN</code> 上， <code v-pre>CDN</code> 可以减少资源请求时间，进而减少页面首屏时间。然而是否想过，有一天 <code v-pre>CDN</code> 也会被封禁而无法访问，不用怀疑，触不及防我们就会遇到。</p>
</blockquote>
<p>既然 <code v-pre>CDN</code> 无法访问，我们还有主域，当 <code v-pre>CDN</code> 域名请求失败时，尝试将资源向主域进行请求，则可保证大概率的资源请求成功，网站正常访问。</p>
<p>由于资源加载时间不定，而 JS 有执行顺序要求，前面的 JS 应当比后面的 JS 先执行，在使用 捕获错误并将资源重新请求时，此时无法保证 JS 的执行顺序。</p>
<p><strong>既然要保证 JS 的执行顺序，需要做两件事</strong>：</p>
<ol>
<li>判断资源是否加载失败，通过代码执行顺序来定</li>
<li>当代码执行判定资源请求失败，就在资源标签的位置后方插入对应的主域请求，达到保证代码按顺序执行</li>
</ol>
<p>实现：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// retryScript.js</span>
window<span class="token punctuation">.</span><span class="token function-variable function">retryScript</span> <span class="token operator">=</span> <span class="token punctuation">(</span>name<span class="token punctuation">,</span> url<span class="token punctuation">)</span><span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>window<span class="token punctuation">[</span>name<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    document<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;script src="</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>url<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">" >&lt;/script></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// config.ts</span>
scripts<span class="token operator">:</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span> src<span class="token operator">:</span> <span class="token string">'/js/retryScript.js'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token string">'https://cdn.staticfile.org/react/17.0.2/umd/react.production.min.js'</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> content<span class="token operator">:</span> <span class="token string">"window.retryScript('React','/js/react.production.min.js')"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token string">'https://cdn.staticfile.org/react-dom/17.0.2/umd/react-dom.production.min.js'</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> content<span class="token operator">:</span> <span class="token string">"window.retryScript('ReactDOM','/js/react-dom.production.min.js')"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token string">'https://cdn.staticfile.org/lodash.js/4.17.9/lodash.min.js'</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> content<span class="token operator">:</span> <span class="token string">"window.retryScript('_','/js/lodash.min.js')"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token string">'https://cdn.staticfile.org/bizcharts/4.1.15/BizCharts.min.js'</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> content<span class="token operator">:</span> <span class="token string">"window.retryScript('BizCharts', '/js/BizCharts.min.js')"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token string">'https://cdn.staticfile.org/echarts/5.1.2/echarts.min.js'</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> content<span class="token operator">:</span> <span class="token string">"(window).retryScript('echarts', '/js/echarts.min.js')"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>产物如下图：
<img src="/externals.png" alt="alt 拆包后">
由上图可以看出，antd和@ant-design组件包从vendors.js拆分出来了。这样在首屏加载时antd和、ant-design和vendors.js实现异步加载，来提升首屏加载速度。</p>
<p>scripts引入的react和react-dom没有指定版本的话，在浏览器渲染时会重定向到指定版本，这样的话，首屏加载速度也会受到影响。
<img src="/noVersion.png" alt="alt 拆包后"></p>
<p>scripts引入的react和react-dom有指定版本的话，在浏览器渲染时会直接加载指定版本，首屏加载速度会变快。
<img src="/version.png" alt="alt 拆包后"></p>
<ol>
<li>选用可替代的依赖库
<img src="/img1.png" alt="alt 拆包后">
由上图可以看出moment.js通过Gzip压缩后的包体积为94.03kb，而dayjs通过Gzip压缩后包体积为18.84kb。所以可以使用<code v-pre>dayjs</code>替换 Moment 以优化打包大小。</li>
</ol>
<ul>
<li>安装依赖包</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> dayjs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>安装antd-dayjs-webpack-plugin</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> i antd-dayjs-webpack-plugin <span class="token parameter variable">-D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>好处：无需对现有代码做任何修改直接替换成 day.js</p>
</blockquote>
<p>修改config.ts文件</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token function-variable function">chainWebpack</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>config<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  config<span class="token punctuation">.</span><span class="token function">plugin</span><span class="token punctuation">(</span><span class="token string">'moment2dayjs'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">'antd-dayjs-webpack-plugin'</span><span class="token punctuation">,</span><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      preset<span class="token operator">:</span> <span class="token string">'antdv4'</span>   <span class="token comment">//项目中使用的antd是v几版本</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>替换后的包体积如下图
<img src="/img2.png" alt="alt 拆包后">
dayjs通过Gzip压缩后包体积为18.84kb。</p>
<ol start="6">
<li><strong>减少将图片转成Base64</strong></li>
</ol>
<p>在umi项目中，可以通过inlineLimit来限制是否将图片转成base64格式。inlineLimit默认值为10000（10kb），少于默认值会被编译为 base64 编码，否则会生成单独的js文件。</p>
</div></template>


