<template><div><h1 id="webpack知识点" tabindex="-1"><a class="header-anchor" href="#webpack知识点"><span>webpack知识点</span></a></h1>
<h2 id="webpack-externals深入理解" tabindex="-1"><a class="header-anchor" href="#webpack-externals深入理解"><span>webpack externals深入理解</span></a></h2>
<p>按照官方文档的解释，如果我们想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，那就可以通过配置externals。</p>
<p>假设：我们创建一个项目，里面引用了lodash这个包，经过webpack打包的时候，发现如果把这个lodash包打入进去，打包文件就会非常大。那么我们就可以externals的方式引入。也就是说，自己的库本身不打包这个lodash，需要用户环境提供。</p>
<h3 id="引入lodash" tabindex="-1"><a class="header-anchor" href="#引入lodash"><span>引入lodash</span></a></h3>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> _ <span class="token keyword">from</span> <span class="token string">'lodash'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="配置externals" tabindex="-1"><a class="header-anchor" href="#配置externals"><span>配置externals</span></a></h3>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">externals</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token string-property property">"lodash"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">commonjs</span><span class="token operator">:</span> <span class="token string">"lodash"</span><span class="token punctuation">,</span><span class="token comment">//如果我们的库运行在Node.js环境中，import _ from 'lodash'等价于const _ = require('lodash')</span>
    <span class="token literal-property property">commonjs2</span><span class="token operator">:</span> <span class="token string">"lodash"</span><span class="token punctuation">,</span><span class="token comment">//同上</span>
    <span class="token literal-property property">amd</span><span class="token operator">:</span> <span class="token string">"lodash"</span><span class="token punctuation">,</span><span class="token comment">//如果我们的库使用require.js等加载,等价于 define(["lodash"], factory);</span>
    <span class="token literal-property property">root</span><span class="token operator">:</span> <span class="token string">"_"</span><span class="token comment">//如果我们的库在浏览器中使用，需要提供一个全局的变量‘_’，等价于 var _ = (window._) or (_);</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总之，externals配置就是为了使 <code v-pre>import _ from 'lodash'</code> 这句代码，在本身不引入lodash的情况下，能够在各个环境都能正常执行。</p>
<p><code v-pre>externals</code> 支持以下模块上下文(module context)</p>
<ul>
<li><strong>global</strong> - 外部 library 能够作为全局变量使用。用户可以通过在 script 标签中引入来实现。这是 externals 的默认设置。</li>
<li><strong>commonjs</strong> - 用户(consumer)应用程序可能使用 CommonJS 模块系统，因此外部 library 应该使用 CommonJS 模块系统，并且应该是一个 CommonJS 模块。</li>
<li><strong>commonjs2</strong> - 类似上面几行，但导出的是 module.exports.default。</li>
<li><strong>amd</strong> - 类似上面几行，但使用 AMD 模块系统。</li>
</ul>
<h3 id="不同环境设置externals方式" tabindex="-1"><a class="header-anchor" href="#不同环境设置externals方式"><span>不同环境设置externals方式</span></a></h3>
<ol>
<li>如果你的代码想运行在Node环境中，那么你需要在external中添加前缀commonjs2或者commonjs</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">externals</span><span class="token operator">:</span><span class="token punctuation">{</span>
  <span class="token literal-property property">react</span><span class="token operator">:</span><span class="token string">'commonjs2 react'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">jquery</span><span class="token operator">:</span><span class="token string">'commonjs2 jquery'</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>如果需要requirejs等符合AMD规范的环境中加载，那就要添加amd</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">externals</span><span class="token operator">:</span><span class="token punctuation">{</span>
  <span class="token literal-property property">react</span><span class="token operator">:</span><span class="token string">'amd React'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">jquery</span><span class="token operator">:</span><span class="token string">'amd jQuery'</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>如果要在浏览器中运行，那么不用添加什么前缀，默认设置就是global</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">externals</span><span class="token operator">:</span><span class="token punctuation">{</span>
  <span class="token literal-property property">react</span><span class="token operator">:</span><span class="token string">'React'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">jquery</span><span class="token operator">:</span><span class="token string">'jQuery'</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方式配置下，就是配置你所引用你的库暴露出的全局变量。如果你想运行代码在浏览器中，你所引用的包，必须暴露出一个全局变量。如果没有，这种方式不适合在浏览器下使用。</p>
<p>这里你可以看出，不同模式下，value是不一样的。2，3模式下，是要引入全局变量，1模式是要加载包名。那如果这个包的包名和在浏览器下引入的全局变量一致，上面就可以写成一样了，比如moment。</p>
<h3 id="externals和librarytarget的关系" tabindex="-1"><a class="header-anchor" href="#externals和librarytarget的关系"><span><code v-pre>externals</code>和<code v-pre>libraryTarget</code>的关系</span></a></h3>
<ul>
<li>libraryTarget配置如何暴露 library。如果不设置library,那这个library就不暴露。就相当于一个自执行函数</li>
<li>externals是决定的是以哪种模式去加载所引入的第三方的包</li>
<li>libraryTarget决定了你的library运行在哪个环境，哪个环境也就决定了你哪种模式去加载所引入的额外的包。也就是说，externals应该和libraryTarget保持一致。library运行在浏览器中的，你设置externals的模式为commonjs，那代码肯定就运行不了了。</li>
<li>如果是应用程序开发，一般是运行在浏览器环境libraryTarget可以不设置，externals默认的模式是global，也就是以全局变量的模式加载所引入外部的库。</li>
</ul>
</div></template>


