<template><div><h1 id="vscode常见问题" tabindex="-1"><a class="header-anchor" href="#vscode常见问题"><span>vscode常见问题</span></a></h1>
<h2 id="vscode-代码尾部添加分号" tabindex="-1"><a class="header-anchor" href="#vscode-代码尾部添加分号"><span>vscode 代码尾部添加分号</span></a></h2>
<h3 id="设置setting-json" tabindex="-1"><a class="header-anchor" href="#设置setting-json"><span>设置setting.json</span></a></h3>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token property">"editor.codeActionsOnSave"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">"source.fixAll.eslint"</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token property">"editor.formatOnSave"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token property">"editor.formatOnSaveMode"</span><span class="token operator">:</span> <span class="token string">"modifications"</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>prettierrc.js文件 <code v-pre>semi</code> 默认值为 <code v-pre>true</code></p>
</div>
</div></template>


