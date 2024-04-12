<template><div><h1 id="nginx常见问题" tabindex="-1"><a class="header-anchor" href="#nginx常见问题"><span>Nginx常见问题</span></a></h1>
<h2 id="解决页面刷新-显示404" tabindex="-1"><a class="header-anchor" href="#解决页面刷新-显示404"><span>解决页面刷新，显示404</span></a></h2>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>&lt;!-- nginx.conf文件 -->
server {
  location / {
    root html;
    index index.html index.htm;
    try_files $uri $uri/ /index.html;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


