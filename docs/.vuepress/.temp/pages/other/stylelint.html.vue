<template><div><h1 id="stylelint-常见问题" tabindex="-1"><a class="header-anchor" href="#stylelint-常见问题"><span>Stylelint 常见问题</span></a></h1>
<h2 id="stylelint警告" tabindex="-1"><a class="header-anchor" href="#stylelint警告"><span>stylelint警告</span></a></h2>
<div class="custom-container tip"><p class="custom-container-title">注意</p>
<p>sans-serif是一个通用字体关键字</p>
</div>
<div class="language-css line-numbers-mode" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">a</span> <span class="token punctuation">{</span> <span class="token property">font-family</span><span class="token punctuation">:</span> Helvetica<span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token selector">// 报错禁止在字体名称列表中缺少通用字体关键字。

a</span> <span class="token punctuation">{</span> <span class="token property">font-family</span><span class="token punctuation">:</span> Helvetica<span class="token punctuation">,</span> sans-serif<span class="token punctuation">;</span> <span class="token punctuation">}</span> // ok
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


