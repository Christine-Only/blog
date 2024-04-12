<template><div><h1 id="vite常见问题" tabindex="-1"><a class="header-anchor" href="#vite常见问题"><span>vite常见问题</span></a></h1>
<h2 id="vite多入口配置" tabindex="-1"><a class="header-anchor" href="#vite多入口配置"><span>vite多入口配置</span></a></h2>
<blockquote>
<p>一般的React项目只有根目录一个index.html文件，这个文件就作为整个项目的入口。（因为React是单页面应用）。但是当项目需要多个入口时，可以通过配置vite.config.ts文件来实现多页面应用。</p>
</blockquote>
<h3 id="配置vite-config-ts" tabindex="-1"><a class="header-anchor" href="#配置vite-config-ts"><span>配置vite.config.ts</span></a></h3>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code>build<span class="token operator">:</span> <span class="token punctuation">{</span>
    rollupOptions<span class="token operator">:</span> <span class="token punctuation">{</span>
        input<span class="token operator">:</span> <span class="token punctuation">{</span>
            main<span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'..'</span><span class="token punctuation">,</span> <span class="token string">'index.html'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            heathCheck<span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'..'</span><span class="token punctuation">,</span> <span class="token string">'healthCheck.html'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


