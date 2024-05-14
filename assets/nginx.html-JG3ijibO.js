import{_ as e,o as n,c as i,a as t}from"./app-C8Xn24jF.js";const a={},s=t(`<h1 id="nginx常见问题" tabindex="-1"><a class="header-anchor" href="#nginx常见问题"><span>Nginx常见问题</span></a></h1><h2 id="解决页面刷新-显示404" tabindex="-1"><a class="header-anchor" href="#解决页面刷新-显示404"><span>解决页面刷新，显示404</span></a></h2><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&lt;!-- nginx.conf文件 --&gt;
server {
  location / {
    root html;
    index index.html index.htm;
    try_files $uri $uri/ /index.html;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),l=[s];function d(r,c){return n(),i("div",null,l)}const m=e(a,[["render",d],["__file","nginx.html.vue"]]),h=JSON.parse('{"path":"/other/nginx.html","title":"Nginx常见问题","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"解决页面刷新，显示404","slug":"解决页面刷新-显示404","link":"#解决页面刷新-显示404","children":[]}],"git":{"updatedTime":1646130935000,"contributors":[{"name":"christinesy.tang","email":"christinesy.tang@ap.jll.com","commits":1}]},"filePathRelative":"other/nginx.md"}');export{m as comp,h as data};
