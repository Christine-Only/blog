<template><div><h1 id="nginx部署" tabindex="-1"><a class="header-anchor" href="#nginx部署"><span>Nginx部署</span></a></h1>
<h2 id="nginx基础配置" tabindex="-1"><a class="header-anchor" href="#nginx基础配置"><span>Nginx基础配置</span></a></h2>
<h3 id="安装编译工具及库文件" tabindex="-1"><a class="header-anchor" href="#安装编译工具及库文件"><span>安装编译工具及库文件</span></a></h3>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> <span class="token function">make</span> zlib zlib-devel gcc-c++ libtool  openssl openssl-devel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="首先要安装-pcre" tabindex="-1"><a class="header-anchor" href="#首先要安装-pcre"><span>首先要安装 PCRE</span></a></h3>
<blockquote>
<p>PCRE 作用是让 Nginx 支持 Rewrite 功能。</p>
</blockquote>
<h4 id="下载-pcre-安装包-下载地址-http-downloads-sourceforge-net-project-pcre-pcre-8-35-pcre-8-35-tar-gz" tabindex="-1"><a class="header-anchor" href="#下载-pcre-安装包-下载地址-http-downloads-sourceforge-net-project-pcre-pcre-8-35-pcre-8-35-tar-gz"><span>下载 PCRE 安装包，下载地址： http://downloads.sourceforge.net/project/pcre/pcre/8.35/pcre-8.35.tar.gz</span></a></h4>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /usr/local/
<span class="token function">wget</span> http://downloads.sourceforge.net/project/pcre/pcre/8.35/pcre-8.35.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="解压安装包" tabindex="-1"><a class="header-anchor" href="#解压安装包"><span>解压安装包:</span></a></h4>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">tar</span> zxvf pcre-8.35.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="进入安装包目录" tabindex="-1"><a class="header-anchor" href="#进入安装包目录"><span>进入安装包目录</span></a></h4>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> pcre-8.35
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="编译安装" tabindex="-1"><a class="header-anchor" href="#编译安装"><span>编译安装</span></a></h4>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>./configure
<span class="token function">make</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查看pcre版本" tabindex="-1"><a class="header-anchor" href="#查看pcre版本"><span>查看pcre版本</span></a></h4>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>pcre-config <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="连接远程服务器" tabindex="-1"><a class="header-anchor" href="#连接远程服务器"><span>连接远程服务器</span></a></h3>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token number">1</span>.  <span class="token function">ssh</span> 用户名@xx.xx.xx.xx 
<span class="token number">2</span>.  输入密码 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>登陆成功进入服务器根目录</p>
<h3 id="下载nginx及安装" tabindex="-1"><a class="header-anchor" href="#下载nginx及安装"><span>下载Nginx及安装</span></a></h3>
<ul>
<li>去nginx download官网下载稳定版的nginx，上传到服务器的某个位置（这里的位置是 /usr/local ）解压。</li>
<li>在服务器上用命令下载
进入服务器<code v-pre> /usr/local</code>文件夹，打开命令行输入如下命令：</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">wget</span> http://nginx.org/download/nginx-1.18.0.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看当前目录就会看到 <strong>nginx-1.18.0.tar.gz</strong></p>
<h3 id="编译" tabindex="-1"><a class="header-anchor" href="#编译"><span>编译</span></a></h3>
<p>输入命令<code v-pre>tar -zxvf nginx-1.18.0.tar.gz</code>进行解压, 解压完成之后查看这个目录就会出现一个 <strong>nginx-1.18.0</strong> 文件夹, 进入<code v-pre>cd nginx-1.18.0</code>。</p>
<blockquote>
<p>./configure的作用是检测系统配置，生成makefile文件，以便你可以用 make 和 make install 来编译和安装程序。</p>
</blockquote>
<ol>
<li>执行<code v-pre>./configure --prefix=/usr/local/webserver/nginx --with-http_stub_status_module --with-http_ssl_module --with-pcre=/usr/local/src/pcre-8.35</code></li>
<li><code v-pre>make</code> 编译 （make的过程是把各种语言写的源码文件，变成可执行文件和各种库文件）</li>
<li><code v-pre>make install </code>安装 （<code v-pre>make install</code>是把这些编译出来的可执行文件和库文件复制到合适的地方）</li>
<li>查看nginx版本</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>/usr/local/nginx/sbin/nginx <span class="token parameter variable">-v</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="nginx-配置" tabindex="-1"><a class="header-anchor" href="#nginx-配置"><span>Nginx 配置</span></a></h3>
<ul>
<li>http请求 listen端口以80开头</li>
<li>检查配置文件nginx.conf的正确性命令：</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>/usr/local/nginx/sbin/nginx <span class="token parameter variable">-t</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="启动-nginx" tabindex="-1"><a class="header-anchor" href="#启动-nginx"><span>启动 Nginx</span></a></h3>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>/usr/local/nginx/sbin/nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="重新加载-nginx" tabindex="-1"><a class="header-anchor" href="#重新加载-nginx"><span>重新加载 Nginx</span></a></h3>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>/usr/local/nginx/sbin/nginx <span class="token parameter variable">-s</span> reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="修改dist文件权限" tabindex="-1"><a class="header-anchor" href="#修改dist文件权限"><span>修改dist文件权限</span></a></h3>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">chmod</span> <span class="token parameter variable">-R</span> <span class="token number">777</span> dist
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="通过命令找到master对应的进程号" tabindex="-1"><a class="header-anchor" href="#通过命令找到master对应的进程号"><span>通过命令找到master对应的进程号</span></a></h3>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">ps</span> -ef<span class="token operator">|</span><span class="token function">grep</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="nginx-压缩" tabindex="-1"><a class="header-anchor" href="#nginx-压缩"><span>nginx 压缩</span></a></h3>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 开启gzip</span>
<span class="token function">gzip</span> on<span class="token punctuation">;</span>

<span class="token comment"># 启用gzip压缩的最小文件，小于设置值的文件将不会压缩</span>
gzip_min_length 1k<span class="token punctuation">;</span>

<span class="token comment"># gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间，后面会有详细说明</span>
gzip_comp_level <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token comment"># 进行压缩的文件类型。javascript有多种形式。其中的值可以在 mime.types 文件中找到。</span>
gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png application/vnd.ms-fontobject font/ttf font/opentype font/x-woff image/svg+xml<span class="token punctuation">;</span>

<span class="token comment"># 是否在http header中添加Vary: Accept-Encoding，建议开启</span>
gzip_vary on<span class="token punctuation">;</span>

<span class="token comment"># 禁用IE 6 gzip</span>
gzip_disable <span class="token string">"MSIE [1-6]\."</span><span class="token punctuation">;</span>

<span class="token comment"># 设置压缩所需要的缓冲区大小     </span>
gzip_buffers <span class="token number">32</span> 4k<span class="token punctuation">;</span>

<span class="token comment"># 设置gzip压缩针对的HTTP协议版本，没做负载的可以不用</span>
<span class="token comment"># gzip_http_version 1.0;</span>

<span class="token comment"># 开启缓存</span>
location ~* ^.+<span class="token punctuation">\</span>.<span class="token punctuation">(</span>ico<span class="token operator">|</span>gif<span class="token operator">|</span>jpg<span class="token operator">|</span>jpeg<span class="token operator">|</span>png<span class="token punctuation">)</span>$ <span class="token punctuation">{</span> 
    access_log   off<span class="token punctuation">;</span> 
    expires      2d<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

location ~* ^.+<span class="token punctuation">\</span>.<span class="token punctuation">(</span>css<span class="token operator">|</span>js<span class="token operator">|</span>txt<span class="token operator">|</span>xml<span class="token operator">|</span>swf<span class="token operator">|</span>wav<span class="token punctuation">)</span>$ <span class="token punctuation">{</span>
    access_log   off<span class="token punctuation">;</span>
    expires      24h<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

location ~* ^.+<span class="token punctuation">\</span>.<span class="token punctuation">(</span>html<span class="token operator">|</span>htm<span class="token punctuation">)</span>$ <span class="token punctuation">{</span>
    expires      1h<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

location ~* ^.+<span class="token punctuation">\</span>.<span class="token punctuation">(</span>eot<span class="token operator">|</span>ttf<span class="token operator">|</span>otf<span class="token operator">|</span>woff<span class="token operator">|</span>svg<span class="token punctuation">)</span>$ <span class="token punctuation">{</span>
    access_log   off<span class="token punctuation">;</span>
    expires max<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx的ssl模块安装" tabindex="-1"><a class="header-anchor" href="#nginx的ssl模块安装"><span>Nginx的SSL模块安装</span></a></h2>
<ol>
<li>查看 nginx 是否安装 http_ssl_module 模块。</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>/usr/local/nginx/sbin/nginx <span class="token parameter variable">-V</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果出现 <code v-pre>configure arguments: –with-http_ssl_module</code>, 则已安装（下面的步骤可以跳过，进入 nginx.conf 配置）。</p>
<ol start="2">
<li>配置SSl模块</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> nginx-xxx
./configure <span class="token parameter variable">--prefix</span><span class="token operator">=</span>/usr/local/nginx --with-http_ssl_module
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>使用 make 命令编译（使用make install会重新安装nginx，不建议使用make install），此时当前目录会出现 objs 文件夹。</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">make</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4">
<li>关闭Nginx进程</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>nginx <span class="token parameter variable">-s</span> stop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="5">
<li>用新的 nginx 文件覆盖当前的 nginx 文件</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">cp</span> ./objs/nginx /usr/local/nginx/sbin/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="6">
<li>再次查看安装的模块（configure arguments: –with-http_ssl_module说明ssl模块已安装）。</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ /usr/local/nginx/sbin/nginx <span class="token parameter variable">-V</span>

nginx version: nginx/1.15.9
<span class="token punctuation">..</span>.
configure arguments: --with-http_ssl_module
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sll证书部署" tabindex="-1"><a class="header-anchor" href="#sll证书部署"><span>SLL证书部署</span></a></h3>
<ol>
<li>下载申请好的 ssl 证书文件压缩包到本地并解压（这里是用的 pem 与 key 文件，文件名可以更改）</li>
<li>在 nginx 目录新建 cert 文件夹存放证书文件。</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token builtin class-name">cd</span> /usr/local/nginx
$ <span class="token function">mkdir</span> cert
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>将这两个文件上传至服务器的 cert 目录里。
这里使用 mac 终端上传至服务器的 scp 命令（这里需要新开一个终端，不要使用连接服务器的窗口）:</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">scp</span> /Users/yourname/Downloads/ssl.pem root@xxx.xx.xxx.xx:/usr/local/nginx/cert/
$ <span class="token function">scp</span> /Users/yourname/Downloads/ssl.key root@xxx.xx.xxx.xx:/usr/local/nginx/cert/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>scp [本地文件路径，可以直接拖文件至终端里面] [&lt;服务器登录名&gt;@&lt;服务器IP地址&gt;:&lt;服务器上的路径&gt;]</p>
</div>
<h3 id="nginx-conf-配置" tabindex="-1"><a class="header-anchor" href="#nginx-conf-配置"><span>nginx.conf 配置</span></a></h3>
<ol>
<li>编辑 <code v-pre>/usr/local/nginx/conf/nginx.conf</code> 配置文件</li>
<li>配置 https server。注释掉之前的 http server 配置，新增 https server:</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>server <span class="token punctuation">{</span>
    <span class="token comment"># 服务器端口使用443，开启ssl, 这里ssl就是上面安装的ssl模块</span>
    listen       <span class="token number">443</span> ssl<span class="token punctuation">;</span>
    <span class="token comment"># 域名，多个以空格分开</span>
    server_name  hack520.com www.hack520.com<span class="token punctuation">;</span>
    
    <span class="token comment"># ssl证书地址</span>
    ssl_certificate     /usr/local/nginx/cert/ssl.pem<span class="token punctuation">;</span>  <span class="token comment"># pem文件的路径</span>
    ssl_certificate_key  /usr/local/nginx/cert/ssl.key<span class="token punctuation">;</span> <span class="token comment"># key文件的路径</span>
    
    <span class="token comment"># ssl验证相关配置</span>
    ssl_session_timeout  5m<span class="token punctuation">;</span>    <span class="token comment">#缓存有效期</span>
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:<span class="token operator">!</span>NULL:<span class="token operator">!</span>aNULL:<span class="token operator">!</span>MD5:<span class="token operator">!</span>ADH:<span class="token operator">!</span>RC4<span class="token punctuation">;</span>    <span class="token comment">#加密算法</span>
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2<span class="token punctuation">;</span>    <span class="token comment">#安全链接可选的加密协议</span>
    ssl_prefer_server_ciphers on<span class="token punctuation">;</span>   <span class="token comment">#使用服务器端的首选算法</span>

    location / <span class="token punctuation">{</span>
        root   html<span class="token punctuation">;</span>
        index  index.html index.htm<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token number">3</span>. 将 http 重定向 https。

server <span class="token punctuation">{</span>
    listen       <span class="token number">80</span><span class="token punctuation">;</span>
    server_name  hack520.com www.hack520.com<span class="token punctuation">;</span>
    <span class="token builtin class-name">return</span> <span class="token number">301</span> https://<span class="token variable">$server_name</span><span class="token variable">$request_uri</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="重启-nginx" tabindex="-1"><a class="header-anchor" href="#重启-nginx"><span>重启 nginx</span></a></h3>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ /usr/local/nginx/sbin/nginx <span class="token parameter variable">-c</span> /usr/local/nginx/conf/nginx.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol>
<li>如果 80 端口被占用，用<code v-pre>kill [id]</code>来结束进程：</li>
</ol>
<h3 id="查看端口使用" tabindex="-1"><a class="header-anchor" href="#查看端口使用"><span>查看端口使用</span></a></h3>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">netstat</span> <span class="token parameter variable">-lntp</span>


Active Internet connections <span class="token punctuation">(</span>only servers<span class="token punctuation">)</span>
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        <span class="token number">0</span>      <span class="token number">0</span> <span class="token number">0.0</span>.0.0:80              <span class="token number">0.0</span>.0.0:*               LISTEN      <span class="token number">21307</span>/nginx: master 
tcp        <span class="token number">0</span>      <span class="token number">0</span> <span class="token number">0.0</span>.0.0:22              <span class="token number">0.0</span>.0.0:*               LISTEN      <span class="token number">3072</span>/sshd           
tcp        <span class="token number">0</span>      <span class="token number">0</span> <span class="token number">0.0</span>.0.0:443             <span class="token number">0.0</span>.0.0:*               LISTEN      <span class="token number">21307</span>/nginx: master 

<span class="token comment"># 结束 80 端口进程</span>
$ <span class="token function">kill</span> <span class="token number">21307</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>再次重启 nginx：</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ /usr/local/nginx/sbin/nginx <span class="token parameter variable">-c</span> /usr/local/nginx/conf/nginx.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


