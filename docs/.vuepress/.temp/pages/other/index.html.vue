<template><div><h1 id="umi-常见问题" tabindex="-1"><a class="header-anchor" href="#umi-常见问题"><span>Umi 常见问题</span></a></h1>
<h2 id="前端项目引入自定义字体包" tabindex="-1"><a class="header-anchor" href="#前端项目引入自定义字体包"><span>前端项目引入自定义字体包</span></a></h2>
<ol>
<li>在public文件放入第三方字体文件</li>
<li>在样式文件中引入自定义字体</li>
</ol>
<div class="language-css line-numbers-mode" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token atrule"><span class="token rule">@font-face</span></span> <span class="token punctuation">{</span>
  <span class="token property">font-family</span><span class="token punctuation">:</span> <span class="token string">"PingFangSC Light"</span><span class="token punctuation">;</span>
  <span class="token property">src</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">'@/assets/css/fonts/PingFang/PingFang-Light.ttf'</span><span class="token punctuation">)</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 引入多个自定义字体 */</span>
<span class="token atrule"><span class="token rule">@font-face</span></span> <span class="token punctuation">{</span>
  <span class="token property">font-family</span><span class="token punctuation">:</span> <span class="token string">"PingFangSC Dark"</span><span class="token punctuation">;</span>
  <span class="token property">src</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">'@/assets/css/fonts/PingFang/PingFang-Dark.ttf'</span><span class="token punctuation">)</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>使用方式</li>
</ol>
<div class="language-css line-numbers-mode" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">a</span> <span class="token punctuation">{</span> <span class="token property">font-family</span><span class="token punctuation">:</span> <span class="token string">"PingFangSC Light"</span><span class="token punctuation">,</span> sans-serif<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="ant-design-pro中打包与加载otf自定义字体" tabindex="-1"><a class="header-anchor" href="#ant-design-pro中打包与加载otf自定义字体"><span>Ant Design Pro中打包与加载otf自定义字体</span></a></h2>
<div class="custom-container tip"><p class="custom-container-title">注意</p>
<p>使用 Webpack 打包字体文件的时候需要使用 file-loader 来处理打包文件，在ant design pro中可通过配置文件中的 chainWebpack 函数来自定义 Webpack 的配置。</p>
</div>
<ol>
<li>安装 file-loader</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> --save-dev file-loader
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>编辑ant design pro的配置文件 <code v-pre>config/config.ts</code> 中的 <code v-pre>chainWebpack</code></li>
</ol>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token function">chainWebpack</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">{</span>
    config<span class="token punctuation">.</span><span class="token keyword">module</span> <span class="token comment">// 配置 file-loader</span>
      <span class="token punctuation">.</span><span class="token function">rule</span><span class="token punctuation">(</span><span class="token string">'otf'</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">.otf$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">'file-loader'</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">loader</span><span class="token punctuation">(</span><span class="token string">'file-loader'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="umi中的request二次封装" tabindex="-1"><a class="header-anchor" href="#umi中的request二次封装"><span>umi中的request二次封装</span></a></h2>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Method</span> <span class="token operator">=</span> <span class="token string">'GET'</span> <span class="token operator">|</span> <span class="token string">'POST'</span> <span class="token operator">|</span> <span class="token string">'DELETE'</span> <span class="token operator">|</span> <span class="token string">'PUT'</span> <span class="token operator">|</span> <span class="token string">'PATCH'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">Request</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> Res<span class="token operator">></span></span></span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> method<span class="token operator">:</span> Method <span class="token operator">=</span> <span class="token string">'GET'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>params<span class="token operator">?</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span> options<span class="token operator">?</span><span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">unknown</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> key <span class="token operator">=</span> method <span class="token operator">===</span> <span class="token string">'GET'</span> <span class="token operator">?</span> <span class="token string">'params'</span> <span class="token operator">:</span> <span class="token string">'data'</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token generic-function"><span class="token function">request</span><span class="token generic class-name"><span class="token operator">&lt;</span>
      <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token punctuation">{</span>
        code<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
        ext<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
        msg<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
        result<span class="token operator">:</span> Res<span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token operator">></span>
    <span class="token operator">></span></span></span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      method<span class="token punctuation">,</span>
      <span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token operator">:</span> params<span class="token punctuation">,</span>
      <span class="token operator">...</span>options<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="云效node-js构建报错" tabindex="-1"><a class="header-anchor" href="#云效node-js构建报错"><span>云效Node.js构建报错</span></a></h2>
<blockquote>
<p>'&quot;umi&quot;' has no exported member named 'history'. Did you mean 'History'?</p>
</blockquote>
<p>解决步骤：</p>
<ol>
<li>确保 tsconfig.json 中有配置 @@ 的路径，比如 <code v-pre>&quot;@@/*&quot;: [&quot;src/.umi/*&quot;]</code>。</li>
<li>执行 <code v-pre>umi generate tmp</code>命令
在跑 <code v-pre>npm run build</code> 之前，先执行一次 <code v-pre>npm run postinstall</code>。对应的命令如下：</li>
<li>CI/CD执行命令顺序</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token string">"scripts"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">"build"</span><span class="token builtin class-name">:</span> <span class="token string">"cross-env UMI_ENV=prod umi build"</span>,
    <span class="token string">"postinstall"</span><span class="token builtin class-name">:</span> <span class="token string">"umi generate tmp"</span>,
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


