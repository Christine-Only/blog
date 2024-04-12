<template><div><h1 id="前端自动化部署" tabindex="-1"><a class="header-anchor" href="#前端自动化部署"><span>前端自动化部署</span></a></h1>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>以云效为例</p>
</div>
<h2 id="流水线创建" tabindex="-1"><a class="header-anchor" href="#流水线创建"><span>流水线创建</span></a></h2>
<ol>
<li>新建流水线</li>
<li>前端选择Node.js流水线模版</li>
</ol>
<h2 id="自动化部署流程配置" tabindex="-1"><a class="header-anchor" href="#自动化部署流程配置"><span>自动化部署流程配置</span></a></h2>
<ol>
<li>添加流水线源
<ul>
<li>选择云效Codeup</li>
<li>选择需要自动化部署的代码仓库</li>
<li>默认分支选择 <code v-pre>master</code></li>
<li>开启代码源出发选项</li>
<li>触发事件建议选择合并请求完成后</li>
<li>过滤条件输入 <code v-pre>master</code></li>
</ul>
</li>
<li>配置测试流程(目前没用到)</li>
<li>构建</li>
</ol>
<blockquote>
<p>通过cnpm install 完成依赖包安装</p>
</blockquote>
<ul>
<li>
<p>Node.js
构建命令 <code v-pre>cnpm install &amp;&amp; npm run build</code></p>
</li>
<li>
<p>构建物上传
<img src="/blog/construct.png" alt="alt 构建物上传"></p>
</li>
</ul>
<ol>
<li>部署
<ul>
<li>选择主机部署</li>
<li>选择制品名称</li>
<li>新建主机组</li>
<li>城市选择上海</li>
<li>部署配置下载路径一定是dist包上传到nginx的根目录下</li>
<li>执行用户写 <code v-pre>root</code></li>
<li>部署脚本</li>
</ul>
</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>    <span class="token builtin class-name">cd</span> /usr/local/nginx/html/
    <span class="token function">rm</span> <span class="token parameter variable">-rf</span> dist
    <span class="token comment"># 创建dist文件夹</span>
    <span class="token function">mkdir</span> dist
    <span class="token comment"># 解压压缩包</span>
    <span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> dist.tgz <span class="token parameter variable">-C</span> dist
    <span class="token comment"># 移除tgz包</span>
    <span class="token function">rm</span> <span class="token parameter variable">-rf</span> dist.tgz
    /usr/local/nginx/sbin/nginx <span class="token parameter variable">-s</span> reload

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


