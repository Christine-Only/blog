<template><div><h1 id="stylelint配置" tabindex="-1"><a class="header-anchor" href="#stylelint配置"><span>styleLint配置</span></a></h1>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>前置条件：vscode安装并开启<code v-pre>stylelint</code>插件</p>
</div>
<h2 id="安装stylelint及依赖包" tabindex="-1"><a class="header-anchor" href="#安装stylelint及依赖包"><span>安装stylelint及依赖包</span></a></h2>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token property">"devDependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"stylelint"</span><span class="token operator">:</span> <span class="token string">"^13.13.1"</span><span class="token punctuation">,</span>
    <span class="token property">"stylelint-config-css-modules"</span><span class="token operator">:</span> <span class="token string">"^2.2.0"</span><span class="token punctuation">,</span>
    <span class="token property">"stylelint-config-idiomatic-order"</span><span class="token operator">:</span> <span class="token string">"^8.1.0"</span><span class="token punctuation">,</span>
    <span class="token property">"stylelint-config-prettier"</span><span class="token operator">:</span> <span class="token string">"^8.0.1"</span><span class="token punctuation">,</span>
    <span class="token property">"stylelint-config-standard"</span><span class="token operator">:</span> <span class="token string">"^20.0.0"</span><span class="token punctuation">,</span>
    <span class="token property">"stylelint-declaration-block-no-ignored-properties"</span><span class="token operator">:</span> <span class="token string">"^2.1.0"</span><span class="token punctuation">,</span>
    <span class="token property">"stylelint-order"</span><span class="token operator">:</span> <span class="token string">"^5.0.0"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="根目录创建-stylelintrc-js-文件" tabindex="-1"><a class="header-anchor" href="#根目录创建-stylelintrc-js-文件"><span>根目录创建 <code v-pre>.stylelintrc.js</code> 文件</span></a></h2>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">'stylelint-config-standard'</span><span class="token punctuation">,</span>
    <span class="token string">'stylelint-config-css-modules'</span><span class="token punctuation">,</span>
    <span class="token string">'stylelint-config-prettier'</span><span class="token punctuation">,</span>
    <span class="token string">'stylelint-config-idiomatic-order'</span><span class="token punctuation">,</span> <span class="token comment">// 排序规则的插件</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">'stylelint-declaration-block-no-ignored-properties'</span><span class="token punctuation">,</span> <span class="token comment">// 互斥或不生效的属性校验</span>
    <span class="token string">'stylelint-order'</span><span class="token punctuation">,</span> <span class="token comment">// 属性顺序校验</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">'function-url-quotes'</span><span class="token operator">:</span> <span class="token string">'always'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'selector-attribute-quotes'</span><span class="token operator">:</span> <span class="token string">'always'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'unit-no-unknown'</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">ignoreUnits</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'rpx'</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">//大小写</span>
    <span class="token string-property property">'value-keyword-case'</span><span class="token operator">:</span> <span class="token string">'lower'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'plugin/declaration-block-no-ignored-properties'</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token string-property property">'selector-class-pattern'</span><span class="token operator">:</span> <span class="token string">'^[a-z]+(-|[a-zA-Z0-9])*[a-zA-Z0-9]+$'</span><span class="token punctuation">,</span> <span class="token comment">// 类名兼容小驼峰和短横线</span>
    <span class="token string-property property">'rule-empty-line-before'</span><span class="token operator">:</span> <span class="token string">'always-multi-line'</span><span class="token punctuation">,</span> <span class="token comment">// 在多行规则之前必须有一行空行</span>
    <span class="token string-property property">'declaration-block-trailing-semicolon'</span><span class="token operator">:</span> <span class="token string">'always'</span><span class="token punctuation">,</span> <span class="token comment">// 要求声明块后面有分号</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">ignoreFiles</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'**/*.js'</span><span class="token punctuation">,</span> <span class="token string">'**/*.jsx'</span><span class="token punctuation">,</span> <span class="token string">'**/*.tsx'</span><span class="token punctuation">,</span> <span class="token string">'**/*.ts'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 忽略检查的文件</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="添加lint脚本" tabindex="-1"><a class="header-anchor" href="#添加lint脚本"><span>添加lint脚本</span></a></h2>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"lint:style"</span><span class="token operator">:</span> <span class="token string">"stylelint \"src/**/*.less\""</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="commit检测" tabindex="-1"><a class="header-anchor" href="#commit检测"><span>commit检测</span></a></h2>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token comment">// package.json</span>

<span class="token property">"lint-staged"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"*.{ts,tsx}"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">"eslint"</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"*.less"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">"stylelint"</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>这里其实是不需要跑<code v-pre>npm run lint:style</code>的，因为如果执行了<code v-pre>npm run lint:style</code>，在commit时会全量检测所有src下的样式，然而其实我们只需要检测修改的文件即可。</p>
</div>
<h2 id="修复单个文件" tabindex="-1"><a class="header-anchor" href="#修复单个文件"><span>修复单个文件</span></a></h2>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>npx stylelint <span class="token parameter variable">--fix</span> ./src/components/xxx/index.less
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


