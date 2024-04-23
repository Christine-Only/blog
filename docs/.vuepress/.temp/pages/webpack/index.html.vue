<template><div><h1 id="webpack" tabindex="-1"><a class="header-anchor" href="#webpack"><span>webpack</span></a></h1>
<h2 id="基本配置" tabindex="-1"><a class="header-anchor" href="#基本配置"><span>基本配置</span></a></h2>
<h3 id="拆分配置和-merge" tabindex="-1"><a class="header-anchor" href="#拆分配置和-merge"><span>拆分配置和 merge</span></a></h3>
<h4 id="公共配置webpack-common-js" tabindex="-1"><a class="header-anchor" href="#公共配置webpack-common-js"><span>公共配置<code v-pre>webpack.common.js</code></span></a></h4>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> CleanWebpackPlugin <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'clean-webpack-plugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> HtmlWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'html-webpack-plugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">app</span><span class="token operator">:</span> <span class="token string">'./src/index.js'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">print</span><span class="token operator">:</span> <span class="token string">'./src/print.js'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">CleanWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 每次构建项目之前清理/dist文件夹</span>
    <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">'Output Management'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">'./src/index.html'</span><span class="token punctuation">,</span>  <span class="token comment">// 使用自定义模板</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">'[name].bundle.js'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'dist'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">'style-loader'</span><span class="token punctuation">,</span>
          <span class="token string">'css-loader'</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="开发环境的配置webpack-dev-js" tabindex="-1"><a class="header-anchor" href="#开发环境的配置webpack-dev-js"><span>开发环境的配置<code v-pre>webpack.dev.js</code></span></a></h4>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> merge <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'webpack-merge'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> common <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./webpack.common.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token function">merge</span><span class="token punctuation">(</span>common<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">'development'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">devtool</span><span class="token operator">:</span> <span class="token string">'inline-source-map'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">9000</span><span class="token punctuation">,</span>
    <span class="token literal-property property">progress</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 显示打包进度条</span>
    <span class="token literal-property property">contentBase</span><span class="token operator">:</span> <span class="token string">'./dist'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">open</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 自动打开浏览器</span>
    <span class="token literal-property property">hot</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    compress： <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 开启 gzip 压缩</span>

    <span class="token literal-property property">proxy</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// 将本地 /api/xx 代理到 http://localhost:3000/api/xx</span>
      <span class="token string-property property">'/api'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">'http://localhost:3000'</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>

      <span class="token comment">// 将本地 /api2/xx 代理到 http://localhost:3000/xx</span>
      <span class="token string-property property">'/api2'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">'http://localhost:3000'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">pathRewrite</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token string-property property">'^/api2'</span> <span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>merge() 是 webpack-merge 插件提供的一个函数，用于合并 webpack 配置文件。在这里，它给我们提供了一种方式去工整 的合并公共配置和开发环境的特殊配置。</li>
<li>mode: 'development' 用于设置 webpack 的模式为开发模式。设置为开发模式会启用 DevTool 和热更新等实用特性。</li>
<li>devtool: 'inline-source-map' 可以在出现错误的时候，通过 source map 更好地追踪错误和警告。</li>
<li>devServer 是 webpack-dev-server 插件的配置选项，提供了一个简单的 web 服务器，并且实时重新加载页面。contentBase: './dist' 用于设置从何处提供内容，hot: true 用于启用 HMR（Hot Module Replacement）。</li>
</ul>
<h4 id="生产环境的配置webpack-prod-js" tabindex="-1"><a class="header-anchor" href="#生产环境的配置webpack-prod-js"><span>生产环境的配置<code v-pre>webpack.prod.js</code></span></a></h4>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> merge <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'webpack-merge'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> common <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./webpack.common.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> TerserJSPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'terser-webpack-plugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> MiniCssExtractPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'mini-css-extract-plugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> OptimizeCSSAssetsPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'optimize-css-assets-webpack-plugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token function">merge</span><span class="token punctuation">(</span>common<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">'production'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">devtool</span><span class="token operator">:</span> <span class="token string">'source-map'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">minimizer</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">TerserJSPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">OptimizeCSSAssetsPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">MiniCssExtractPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">'[name].[contenthash].css'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>MiniCssExtractPlugin<span class="token punctuation">.</span>loader<span class="token punctuation">,</span> <span class="token string">'css-loader'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>TerserJSPlugin 和 OptimizeCSSAssetsPlugin 用来分别压缩 JS 和 CSS 文件。</li>
<li><code v-pre>MiniCssExtractPlugin</code> 插件会将 CSS 单独抽取到一个文件中，而在开发环境配置中，我们通常会使用 style-loader 将 CSS 作为 style 标签直接插入到 HTML 中</li>
</ul>
<h3 id="处理样式" tabindex="-1"><a class="header-anchor" href="#处理样式"><span>处理样式</span></a></h3>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.less$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"style-loader"</span><span class="token punctuation">,</span> <span class="token string">"css-loader"</span><span class="token punctuation">,</span> <span class="token string">"postcss-loader"</span><span class="token punctuation">,</span> <span class="token string">"less-loader"</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>less loader 将 Less 转换为 CSS；</li>
<li>postcss loader 处理一些兼容性，为样式添加 -webkit- 的前缀等；</li>
<li>css-loader 会处理 CSS 中的 @import 和 url()；</li>
<li>style loader 会生成一个内容为最终解析完的 CSS 的 style 标签，添加到 head 标签里。</li>
</ul>
<h2 id="高级配置" tabindex="-1"><a class="header-anchor" href="#高级配置"><span>高级配置</span></a></h2>
<h3 id="配置多入口" tabindex="-1"><a class="header-anchor" href="#配置多入口"><span>配置多入口</span></a></h3>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">app</span><span class="token operator">:</span> <span class="token string">'./src/app.js'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">admin</span><span class="token operator">:</span> <span class="token string">'./src/admin.js'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> __dirname <span class="token operator">+</span> <span class="token string">'/dist'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">'[name].[contenthash:8].bundle.js'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">publicPath</span><span class="token operator">:</span> <span class="token string">'https://cdn.abc.com'</span> <span class="token comment">// 修改所有静态文件 url 的前缀（如 cdn 域名）</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// 多入口 - 生成index.html</span>
    <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">"html-webpack-plugin 自动生成 html 模板"</span><span class="token punctuation">,</span>
      <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">"index.html"</span><span class="token punctuation">,</span> <span class="token comment">// 指定生成的 HTML 文件路径和名称</span>
      <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">"./public/index.html"</span><span class="token punctuation">,</span> <span class="token comment">// 指定模板文件路径</span>
      <span class="token literal-property property">chunks</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'app'</span><span class="token punctuation">]</span> <span class="token comment">// 只引用 app.js</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token comment">// 多入口 - 生成index.html</span>
    <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">"html-webpack-plugin 自动生成 html 模板"</span><span class="token punctuation">,</span>
      <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">"admin.html"</span><span class="token punctuation">,</span> <span class="token comment">// 指定生成的 HTML 文件路径和名称</span>
      <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">"./public/admin.html"</span><span class="token punctuation">,</span> <span class="token comment">// 指定模板文件路径</span>
      <span class="token literal-property property">chunks</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'admin'</span><span class="token punctuation">]</span> <span class="token comment">// 只引用 admin.js</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>contenthash</code>: <code v-pre>[name].[contenthash:8].bundle.js</code>: 输出 bundle.js 时，加上 hash 戳，当文件变化时，hash 值才会变化，这时浏览器才会请求新的 bundle.js 文件，若无变化则会命中缓存。</li>
<li><code v-pre>[name].bundle.js</code>：这里的 [name] 是占位符，webpack 会把它替换为入口名称，在上面的例子中就是 &quot;app&quot; 和 &quot;admin&quot;。</li>
</ul>
<h3 id="抽离和压缩-css-文件-minicssextractplugin" tabindex="-1"><a class="header-anchor" href="#抽离和压缩-css-文件-minicssextractplugin"><span>抽离和压缩 CSS 文件（MiniCssExtractPlugin）</span></a></h3>
<div class="custom-container warning"><p class="custom-container-title">⚠️</p>
<p>如果不抽离，那么会将 css 的代码也全都打包到 bundle.js 中，然后再加到 html 的 style 标签上</p>
</div>
<h4 id="如何抽离" tabindex="-1"><a class="header-anchor" href="#如何抽离"><span>如何抽离</span></a></h4>
<p>在生产环境中，我们通常会使用 <code v-pre>MiniCssExtractPlugin.loader</code> 来代替 <code v-pre>style-loader</code>。MiniCssExtractPlugin 的作用是将 CSS 从 JavaScript 文件中提取出来，并生成单独的 CSS 文件。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// 抽离 css</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
      <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>MiniCssExtractPlugin<span class="token punctuation">.</span>loader<span class="token punctuation">,</span> <span class="token string">'css-loader'</span><span class="token punctuation">,</span> <span class="token string">'postcss-loader'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 抽离 less --> css</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
      <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>MiniCssExtractPlugin<span class="token punctuation">.</span>loader<span class="token punctuation">,</span> <span class="token string">'css-loader'</span><span class="token punctuation">,</span> <span class="token string">'postcss-loader'</span><span class="token punctuation">,</span> <span class="token string">'less-loader'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上一步中，我们将 css 样式单独拎出来，那么该放到哪里去呢？我们需要在 plugins 下的 MiniCssExtractPlugin 插件中定义 filename，也就是输出的 css 路径和文件名，此处也需要定义 hash 戳，如果 css 样式不变则不会重新请求该文件</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
  <span class="token keyword">new</span> <span class="token class-name">MiniCssExtractPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">'css/main.[contenthash:8].css'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在 html 中会通过 link 的方式引入该路径下的 css 文件</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>utf-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>X-UA-Compatible<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>IE=edge<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width,initial-scale=1<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>html-webpack-plugin 自动生成 html 模板<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">defer</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>defer<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>js/runtime~index.fdf0e8d9.build.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">defer</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>defer<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>js/index.e86170aa.build.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>css/main.6e0fd768.css<span class="token punctuation">"</span></span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>noscript</span>
      <span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>strong</span>
        <span class="token punctuation">></span></span>We're sorry but html-webpack-plugin 自动生成 html 模板 doesn't work
        properly without JavaScript enabled. Please enable it to
        continue.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>strong</span>
      <span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>noscript</span>
    <span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>为什么需要这么做呢？以下是主要的几个原因：</strong></p>
<ul>
<li>性能优化：将 CSS 作为独立的文件加载，可以更好地利用浏览器的并行加载机制，页面可以在加载 JS 的同时加载 CSS，提升页面的加载速度。</li>
<li>缓存优化：当我们的 CSS 和 JS 分离时，即使我们的 JavaScript 文件发生变动，CSS 文件可以保持缓存，从而减少了不必要的下载。</li>
<li>代码组织：提取 CSS 到单独的文件中，也更便于我们对 CSS 代码的管理和维护。</li>
<li>适应生产环境：在生产环境中，我们一般不需要CSS hot-reload这样的功能，把 CSS 提取出来，单独作为一个文件，有助于提高网页性能。</li>
</ul>
<h4 id="如何压缩" tabindex="-1"><a class="header-anchor" href="#如何压缩"><span>如何压缩</span></a></h4>
<p>抽离出 css 文件之后，需要对其进行压缩，通常在 optimization 中使用 CssMinimizerPlugin 插件来对其进行压缩</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> CssMinimizerPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"css-minimizer-webpack-plugin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">minimizer</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">CssMinimizerPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="抽离公共代码和第三方代码-splitchunks-htmlwebpackplugin" tabindex="-1"><a class="header-anchor" href="#抽离公共代码和第三方代码-splitchunks-htmlwebpackplugin"><span>抽离公共代码和第三方代码（splitChunks + HtmlWebpackPlugin）</span></a></h3>
<h4 id="为什么要抽离" tabindex="-1"><a class="header-anchor" href="#为什么要抽离"><span>为什么要抽离</span></a></h4>
<ul>
<li>公共代码：如果 a 文件引入了 c.js，b 文件也引入了 c.js，那么这两个部分的重复代码都会被打包，这样就造成了空间浪费</li>
<li>第三方代码：第三方代码，如 lodash，往往会文件内容很大，如果在 a 文件中引入 lodash，之后每次更改 a 文件就需要又重新打包该文件，所以造成每次 lodash 也会被重新打包，这样会造成性能浪费，我们应该将第三方代码单独打包出来</li>
<li>在生产环境才需要抽离。在开发环境中我们往往希望打包构建的速度快一点，所以压缩，拆分，合并等工作是不需要的</li>
</ul>
<h4 id="具体配置" tabindex="-1"><a class="header-anchor" href="#具体配置"><span>具体配置</span></a></h4>
<p>在 optimization 中配置 splitChunks 插件</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">minimizer</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">TerserPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">extractComments</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 关闭build.js.LICENSE.txt</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">CssMinimizerPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">splitChunks</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">chunks</span><span class="token operator">:</span> <span class="token string">"all"</span><span class="token punctuation">,</span>
    <span class="token comment">// chunks: "initial",</span>
    <span class="token comment">// chunks: "async",</span>
    <span class="token literal-property property">cacheGroups</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">vendor</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"vendor"</span><span class="token punctuation">,</span>
        <span class="token literal-property property">minSize</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[\\/]node_modules[\\/]</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token comment">// 第三方依赖包拆分</span>
        <span class="token literal-property property">priority</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">common</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"common"</span><span class="token punctuation">,</span>
        <span class="token literal-property property">minSize</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token literal-property property">minChunks</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">// 拆分前必须共享模块的最小 chunks 数。</span>
        <span class="token literal-property property">priority</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="/splitChunks.jpg" alt="alt splitChunks"></p>
<p>在 plugins 中的 HtmlWebpackPlugin 插件</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
  <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">"Webpack 多入口文件 -- index"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">"public/index.html"</span><span class="token punctuation">,</span> <span class="token comment">// 指定模板文件路径</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">"index.html"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">chunks</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"index"</span><span class="token punctuation">,</span> <span class="token string">"vendor"</span><span class="token punctuation">,</span> <span class="token string">"common"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">"Webpack 多入口文件 -- main"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">"public/main.html"</span><span class="token punctuation">,</span> <span class="token comment">// 指定模板文件路径</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">"main.html"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">chunks</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"main"</span><span class="token punctuation">,</span> <span class="token string">"common"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>chunks 里面会声明我们的该入口 html 文件需要哪些 chunks 文件，所以我们需要按需写， 如果不指定，默认会全部引用。</p>
<div class="custom-container warning"><p class="custom-container-title">⚠️</p>
<p>如果没引入第三方文件但是却写了 vendor 的话，那就也会引入 vendor.js，这样不可取</p>
</div>
<p>抽离后，dist 中的 html 结果会分别引入公共模块和第三方模块</p>
<p><img src="/splitChunks_entry.jpg" alt="alt splitChunks"></p>
<div class="custom-container warning"><p class="custom-container-title">⚠️</p>
<ul>
<li>chunks 选项值应匹配之前在 entry 中定义的入口点名称。</li>
<li>HtmlWebpackPlugin 对 chunks 的使用</li>
<li>splitChunks 中对 chunks 的抽离</li>
</ul>
</div>
<h3 id="实现异步加载-js" tabindex="-1"><a class="header-anchor" href="#实现异步加载-js"><span>实现异步加载 Js</span></a></h3>
<p>Webpack 允许你进行代码拆分（Code Splitting）以及懒加载（Lazy Loading）JavaScript 文件。实现异步加载js主要使用的技术就是动态引入（Dynamic Imports）。我们可以使用特定的语法来实现这个功能，即 import()。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// title.js</span>
<span class="token keyword">const</span> OEle <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"div"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
OEle<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">"Hi Christine"</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> OEle<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> OBtn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"button"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
OBtn<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">"点击加载元素"</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>OBtn<span class="token punctuation">)</span><span class="token punctuation">;</span>

OBtn<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token comment">/*webpackChunkName: 'title'*/</span> <span class="token string">"./title"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
    <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> <span class="token keyword">default</span><span class="token operator">:</span> element <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"element: "</span><span class="token punctuation">,</span> element<span class="token punctuation">)</span><span class="token punctuation">;</span>
      document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，title.js 只有在用户点击 button 时才会被加载并执行。</p>
<div class="custom-container tip"><p class="custom-container-title">注意</p>
<p>使用 <code v-pre>import()</code> 语法返回的是一个 <code v-pre>Promise</code>，因此你可以使用 <code v-pre>.then()</code> 或 <code v-pre>async/await</code> 语法来处理它。
同时，webpack 在打包时会自动对 import() 进行代码拆分，生成新的chunk，并在运行时异步加载这个chunk。</p>
</div>
<p>在React中，还可以使用 <code v-pre>React.lazy</code> 和 <code v-pre>Suspense</code> 组件来实现对 React 组件的懒加载。</p>
<h3 id="处理jsx-vue" tabindex="-1"><a class="header-anchor" href="#处理jsx-vue"><span>处理JSX/Vue</span></a></h3>
<h4 id="处理-jsx" tabindex="-1"><a class="header-anchor" href="#处理-jsx"><span>处理 JSX</span></a></h4>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// babel.config.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">presets</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">"@babel/preset-react"</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="处理-vue" tabindex="-1"><a class="header-anchor" href="#处理-vue"><span>处理 Vue</span></a></h4>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.vue$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
      <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">'vue-loader'</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="优化打包构建速度" tabindex="-1"><a class="header-anchor" href="#优化打包构建速度"><span>优化打包构建速度</span></a></h2>
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
<p>当然这样做还不够，我们还可以添加<code v-pre>cacheDirectory=true</code>，它可以帮助我们将已经转译过的结果缓存下来，以便下次可以直接读取。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
      <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">'babel-loader?cacheDirectory=true'</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="happypack" tabindex="-1"><a class="header-anchor" href="#happypack"><span>HappyPack</span></a></h3>
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
<div class="custom-container tip"><p class="custom-container-title">注意</p>
<ul>
<li>
<p>在webpack 4中，开启多进程代码压缩需要使用<code v-pre>webpack-parallel-uglify-plugin</code>插件。webpack 有内置的 UglifyJS 工具压缩 JS，但这个工具默认是没有多进程压缩的。</p>
</li>
<li>
<p>在webpack 5中，使用的是<code v-pre>terser-webpack-plugin</code>插件， 默认开启多进程代码压缩</p>
</li>
</ul>
</div>
<h2 id="减小-webpack-打包后的文件体积" tabindex="-1"><a class="header-anchor" href="#减小-webpack-打包后的文件体积"><span>减小 Webpack 打包后的文件体积</span></a></h2>
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


