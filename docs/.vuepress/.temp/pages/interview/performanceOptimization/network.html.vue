<template><div><!-- ---
sidebarDepth: 6
--- -->
<h1 id="网络层面的性能优化" tabindex="-1"><a class="header-anchor" href="#网络层面的性能优化"><span>网络层面的性能优化</span></a></h1>
<h2 id="减少每次网络请求所花费的时间" tabindex="-1"><a class="header-anchor" href="#减少每次网络请求所花费的时间"><span>减少每次网络请求所花费的时间</span></a></h2>
<h3 id="图片优化" tabindex="-1"><a class="header-anchor" href="#图片优化"><span>图片优化</span></a></h3>
<h4 id="jpg-jpeg" tabindex="-1"><a class="header-anchor" href="#jpg-jpeg"><span>JPG/JPEG</span></a></h4>
<ul>
<li>
<p>特点</p>
<ul>
<li>有损压缩，体积小</li>
<li>当我们把图片体积压缩至原有体积的 50% 以下时，JPG 仍然可以保持住 60% 的品质。</li>
</ul>
</li>
<li>
<p>使用场景</p>
<ul>
<li>JPG 适用于呈现色彩丰富的图片，在我们日常开发中，JPG 图片经常作为大的背景图、轮播图或 Banner 图出现。</li>
</ul>
</li>
<li>
<p>缺点</p>
<ul>
<li>不支持透明度处理</li>
</ul>
</li>
</ul>
<h4 id="png-png-8-与-png-24" tabindex="-1"><a class="header-anchor" href="#png-png-8-与-png-24"><span>PNG (PNG-8 与 PNG-24)</span></a></h4>
<blockquote>
<p>8 和 24，这里都是二进制数的位数。8 位的 PNG 最多支持 256 种颜色，而 24 位的可以呈现约 1600 万种颜色。</p>
</blockquote>
<ul>
<li>
<p>特点</p>
<ul>
<li>无损压缩，质量高，体积大</li>
<li>支持透明度处理</li>
</ul>
</li>
<li>
<p>使用场景</p>
<ul>
<li>小的 Logo、颜色简单且对比强烈的图片或背景等。</li>
</ul>
</li>
<li>
<p>缺点</p>
<ul>
<li>体积太大</li>
</ul>
</li>
</ul>
<h4 id="svg" tabindex="-1"><a class="header-anchor" href="#svg"><span>SVG</span></a></h4>
<ul>
<li>
<p>特点</p>
<ul>
<li>是 XML 文本文件，SVG 对图像的处理不是基于像素点，而是基于对图像的形状描述。</li>
<li>体积更小，可压缩性更强</li>
<li>可无限放大不失真</li>
<li>兼容性好</li>
</ul>
</li>
<li>
<p>使用场景</p>
<ul>
<li>小的 Icon</li>
</ul>
</li>
<li>
<p>缺点</p>
<ul>
<li>渲染成本较高，这点对性能不利</li>
<li>存在着学习成本，是可编程的</li>
</ul>
</li>
</ul>
<h4 id="base64" tabindex="-1"><a class="header-anchor" href="#base64"><span>base64</span></a></h4>
<ul>
<li>
<p>特点</p>
<ul>
<li>是一种图片的编码方式</li>
</ul>
</li>
<li>
<p>使用场景</p>
<ul>
<li>小的图片使用 base64 编码方式，直接将编码结果写入 HTML 或者写入 CSS，以减少网络请求</li>
<li>图片的更新频率非常低时</li>
</ul>
</li>
<li>
<p>使用方式</p>
<ul>
<li>webpack的 url-loader</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// webpack.config.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//...</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(png|jpg|gif)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">'url-loader'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span>
              小于 5kb 的图片转换成 base64 编码
              否则，依然延用 file<span class="token operator">-</span>loader的格式，产出 url
               <span class="token operator">--</span><span class="token operator">></span>
              <span class="token literal-property property">limit</span><span class="token operator">:</span> <span class="token number">5</span> <span class="token operator">*</span> <span class="token number">1024</span> <span class="token comment">// 小于此值的图片都会被转换为base64编码</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>vite的配置中</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// vite.config.js</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">build</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">assetsInlineLimit</span><span class="token operator">:</span> <span class="token number">7000</span> <span class="token comment">// 设置转为base64的文件大小阈值7kb，默认 4kb</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>缺点</p>
<ul>
<li>编码后，图片大小会膨胀为原文件的 4/3，所以大图片进行编码后会过大</li>
</ul>
</li>
</ul>
<h4 id="webp" tabindex="-1"><a class="header-anchor" href="#webp"><span>WebP</span></a></h4>
<blockquote>
<p>SSIM（结构相似性指标）是一种衡量两张数字图片相似程度的指标。这个指标的值介于 0 和 1 之间，如果两张图片完全一样，那么 SSIM 值就是 1。SSIM 总体来说是一个衡量图像质量的理想指标，因为它关注的是人眼感知的图像质量。</p>
</blockquote>
<ul>
<li>
<p>特点</p>
<ul>
<li>与 PNG 相比，WebP 无损图像的尺寸缩小了 26％。</li>
<li>在等效的 SSIM 质量指数下，WebP 有损图像比同类 JPEG 图像小25-34％。</li>
<li>无损 WebP 支持透明度（也称为 alpha 通道），仅需 22％ 的额外字节。</li>
<li>对于有损 RGB 压缩可接受的情况，有损 WebP 也支持透明度，与 PNG 相比，通常提供 3 倍的文件大小。</li>
</ul>
</li>
<li>
<p>使用方式</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>picture</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span> <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sample_image.webp<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>image/webp<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span> <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sample_image.jpg<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>image/jpg<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sample_image.jpg<span class="token punctuation">"</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>picture</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>使用此标记，理解 image/webp 媒体类型的浏览器将下载 Webp 图片并显示它，而其他浏览器将下载 JPEG 图片。
任何不支持 picture 的浏览器都将跳过所有 source 标签，并加载底部 img 标签。因此，我们通过提供对所有浏览器类的支持，逐步增强了我们的页面。</p>
</li>
<li>
<p>还有另一个维护性更强、更加灵活的方案——把判断工作交给后端，由服务器根据 HTTP 请求头部的 Accept 字段来决定返回什么格式的图片。当 Accept 字段包含 image/webp 时，就返回 WebP 格式的图片，否则返回原图。</p>
</li>
<li>
<p>缺点</p>
<ul>
<li>不支持 IE 浏览器</li>
<li>以动画图像为例，WebP 图像相比于 GIF 图像，可能会消耗更多的 CPU 资源。</li>
</ul>
</li>
</ul>
<p><img src="/webCompatibility.jpg" alt="alt WebP兼容性"></p>
<h3 id="cdn-的缓存与回源" tabindex="-1"><a class="header-anchor" href="#cdn-的缓存与回源"><span>CDN 的缓存与回源</span></a></h3>
<h4 id="核心" tabindex="-1"><a class="header-anchor" href="#核心"><span>核心</span></a></h4>
<p>一个是缓存，一个是回源。</p>
<p>“缓存”就是说我们把资源 copy 一份到 CDN 服务器上这个过程，“回源”就是说 CDN 发现自己没有这个资源（一般是缓存的数据过期了），转头向根服务器（或者它的上层服务器）去要这个资源的过程。</p>
<h4 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景"><span>使用场景</span></a></h4>
<p>CDN 往往被用来存放静态资源。上文中我们举例所提到的“根服务器”本质上是业务服务器，它的核心任务在于生成动态页面或返回非纯静态页面。</p>
<p>静态资源本身具有访问频率高、承接流量大的特点，因此静态资源加载速度始终是前端性能的一个非常关键的指标。</p>
<h4 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h4>
<p><img src="/cdn.png" alt="alt cdn"></p>
<h4 id="优化" tabindex="-1"><a class="header-anchor" href="#优化"><span>优化</span></a></h4>
<p><strong>CDN 服务器的域名与根服务器的域名不一样</strong>，原因如下：</p>
<p>同一个域名下的请求会不分青红皂白地携带 Cookie，而静态资源往往并不需要 Cookie 携带什么认证信息。把静态资源和主页面置于不同的域名下，完美地避免了不必要的 Cookie 的出现！</p>
<h5 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章"><span>参考文章</span></a></h5>
<ul>
<li><a href="https://zhuanlan.zhihu.com/p/421053018%3E" target="_blank" rel="noopener noreferrer">前端性能优化详细讲解之图片优化<ExternalLinkIcon/></a></li>
<li><a href="https://zhuanlan.zhihu.com/p/423276736" target="_blank" rel="noopener noreferrer">前端性能优化之CDN 的缓存与回源机制解析<ExternalLinkIcon/></a></li>
</ul>
<h2 id="减少网络请求的次数" tabindex="-1"><a class="header-anchor" href="#减少网络请求的次数"><span>减少网络请求的次数</span></a></h2>
<h3 id="浏览器缓存机制" tabindex="-1"><a class="header-anchor" href="#浏览器缓存机制"><span>浏览器缓存机制</span></a></h3>
<p>通过网络获取内容既速度缓慢又开销巨大。较大的响应需要在客户端与服务器之间进行多次往返通信，这会延迟浏览器获得和处理内容的时间，还会增加访问者的流量费用。因此，<strong>缓存并重复利用之前获取的资源</strong>的能力成为性能优化的一个关键方面。</p>
<h4 id="缓存位置" tabindex="-1"><a class="header-anchor" href="#缓存位置"><span>缓存位置</span></a></h4>
<p>从缓存位置上来说分为四种，当依次查找缓存且都没有命中的时候，才会去请求网络，它们按照获取资源时请求的优先级依次排列如下，</p>
<ol>
<li>Memory Cache</li>
<li>Service Worker Cache</li>
<li>HTTP Cache</li>
<li>Push Cache</li>
<li>网络请求</li>
</ol>
<h4 id="memory-cache" tabindex="-1"><a class="header-anchor" href="#memory-cache"><span>Memory Cache</span></a></h4>
<h5 id="概念" tabindex="-1"><a class="header-anchor" href="#概念"><span>概念</span></a></h5>
<ul>
<li><code v-pre>Memory Cache</code> 是指存在内存中的缓存。</li>
<li>从优先级上来说，它是浏览器最先尝试去命中的一种缓存。</li>
<li>从效率上来说，它是响应速度最快的一种缓存。</li>
<li>它和渲染进程“生死相依”，当进程结束后，也就是 tab 关闭以后，内存里的数据也将不复存在。</li>
</ul>
<p>当我们访问过页面以后，再次刷新页面，可以发现很多数据都来自于内存缓存
<img src="/memoryCache.jpg" alt="alt"></p>
<h5 id="使用规律" tabindex="-1"><a class="header-anchor" href="#使用规律"><span>使用规律</span></a></h5>
<ul>
<li>资源存不存内存，浏览器秉承的是“节约原则”。</li>
<li>Base64 格式的图片，几乎永远可以被塞进 memory cache，这可以视作浏览器为节省渲染开销的“自保行为”</li>
<li>体积不大的 JS、CSS 文件，也有较大地被写入内存的几率——相比之下，较大的 JS、CSS 文件就没有这个待遇了，内存资源是有限的，它们往往被直接甩进磁盘。</li>
</ul>
<h4 id="service-worker-cache" tabindex="-1"><a class="header-anchor" href="#service-worker-cache"><span>Service Worker Cache</span></a></h4>
<h5 id="概念-1" tabindex="-1"><a class="header-anchor" href="#概念-1"><span>概念</span></a></h5>
<ul>
<li>Service Worker 是一种独立于主线程之外的 Javascript 线程。它脱离于浏览器窗体，因此无法直接访问 DOM。</li>
<li>可以帮我们实现离线缓存、消息推送和网络代理等功能。我们借助 Service worker 实现的离线缓存就称为 Service Worker Cache。</li>
</ul>
<p><code v-pre>Service Worker</code> 的缓存与浏览器其他内建的缓存机制不同，它可以让我们自由控制<strong>缓存哪些文件</strong>、<strong>如何匹配缓存</strong>、<strong>如何读取缓存</strong>，并且<strong>缓存是持续性的</strong>。</p>
<h5 id="生命周期" tabindex="-1"><a class="header-anchor" href="#生命周期"><span>生命周期</span></a></h5>
<p>Service Worker 的生命周期包括 install、active、working 三个阶段。一旦 Service Worker 被 install，它将始终存在，只会在 active 与 working 之间切换，除非我们主动终止它。这是它可以用来实现离线存储的重要先决条件。</p>
<h5 id="具体使用" tabindex="-1"><a class="header-anchor" href="#具体使用"><span>具体使用</span></a></h5>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span>navigator<span class="token punctuation">.</span>serviceWorker<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token string">'/test.js'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'注册成功'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">err</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"注册失败"</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 test.js 中，我们进行缓存的处理。假设我们需要缓存的文件分别是 test.html,test.css 和 test.js：</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// Service Worker会监听 install事件，我们在其对应的回调里可以实现初始化的逻辑</span>
self<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'install'</span><span class="token punctuation">,</span> <span class="token parameter">event</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  event<span class="token punctuation">.</span><span class="token function">waitUntil</span><span class="token punctuation">(</span>
    <span class="token comment">// 考虑到缓存也需要更新，open内传入的参数为缓存的版本号</span>
    caches<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">'test-v1'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">cache</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> cache<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
        <span class="token comment">// 此处传入指定的需缓存的文件名</span>
        <span class="token string">'/test.html'</span><span class="token punctuation">,</span> <span class="token string">'/test.css'</span><span class="token punctuation">,</span> <span class="token string">'/test.js'</span>
      <span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// Service Worker会监听所有的网络请求，网络请求的产生触发的是fetch事件，我们可以在其对应的监听函数中实现对请求的拦截，进而判断是否有对应到该请求的缓存，实现从Service Worker中取到缓存的目的</span>
self<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'fetch'</span><span class="token punctuation">,</span> <span class="token parameter">event</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  event<span class="token punctuation">.</span><span class="token function">respondWith</span><span class="token punctuation">(</span>
    <span class="token comment">// 尝试匹配该请求对应的缓存值</span>
    caches<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>request<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果匹配到了，调用Server Worker缓存</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> res<span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token comment">// 如果没匹配到，向服务端发起这个资源请求</span>
      <span class="token keyword">return</span> <span class="token function">fetch</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>request<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">response</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>response <span class="token operator">||</span> response<span class="token punctuation">.</span>status <span class="token operator">!==</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> response<span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token comment">// 请求成功的话，将请求缓存起来。</span>
        caches<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">'test-v1'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">cache</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> cache<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>request<span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">return</span> response<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">⚠️</p>
<p>Server Worker 对协议是有要求的，必须以 https 协议为前提。</p>
</div>
<h4 id="http-cache" tabindex="-1"><a class="header-anchor" href="#http-cache"><span>HTTP Cache</span></a></h4>
<h5 id="强缓存的特征" tabindex="-1"><a class="header-anchor" href="#强缓存的特征"><span>强缓存的特征</span></a></h5>
<p>强缓存是利用 http 头中的 <code v-pre>Expires</code> 和 <code v-pre>Cache-Control</code> 两个字段来控制的 。强缓存中，当请求再次发出时，浏览器会根据其中的 <code v-pre>expires</code> 和 <code v-pre>cache-control</code> 判断目标资源是否“命中”强缓存，若命中则直接从缓存中获取资源，不会再与服务端发生通信。
命中强缓存的情况下，返回的 HTTP 状态码为 200 （如下图）。
<img src="/cache.jpg" alt="alt 强缓存"></p>
<h5 id="强缓存的实现-从-expires-到-cache-control" tabindex="-1"><a class="header-anchor" href="#强缓存的实现-从-expires-到-cache-control"><span>强缓存的实现：从 expires 到 cache-control</span></a></h5>
<ul>
<li>Expires</li>
</ul>
<div class="language-http line-numbers-mode" data-ext="http" data-title="http"><pre v-pre class="language-http"><code>当服务器返回响应时，在 Response Headers 中将过期时间写入 expires 字段
<span class="token header"><span class="token header-name keyword">expires</span><span class="token punctuation">:</span> <span class="token header-value">Wed, 22 Oct 2018 08:41:00 GMT</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Expires</code> 是 HTTP/1 的产物，表示资源会在 <code v-pre>Wed, 22 Oct 2018 08:41:00 GMT</code> 后过期，需要再次请求。并且 <code v-pre>Expires</code> <strong>受限于本地时间</strong>，如果修改了本地时间，可能会造成缓存失效。</p>
<ul>
<li><strong>Cache-control</strong></li>
</ul>
<p>考虑到 <code v-pre>expires</code> 的<strong>局限性</strong>，<code v-pre>HTTP1.1</code> 新增了 <code v-pre>Cache-Control</code> 字段来完成 <code v-pre>expires</code> 的任务，<code v-pre>Cache-Control</code> 相对于 <code v-pre>expires</code> 更加准确，它的优先级也更高。当 <code v-pre>Cache-Control</code> 与 <code v-pre>expires</code> 同时出现时，我们以 <code v-pre>Cache-Control</code> 为准。</p>
<div class="language-http line-numbers-mode" data-ext="http" data-title="http"><pre v-pre class="language-http"><code><span class="token header"><span class="token header-name keyword">cache-control</span><span class="token punctuation">:</span> <span class="token header-value">max-age=31536000</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>max-age 不是一个时间戳，而是一个时间长度。在本例中，max-age 是 31536000 秒，它意味着该资源在 31536000 秒以内都是有效的，完美地规避了时间戳带来的潜在问题。</p>
<ol>
<li>Cache-control 其他用法</li>
</ol>
<div class="language-http line-numbers-mode" data-ext="http" data-title="http"><pre v-pre class="language-http"><code><span class="token header"><span class="token header-name keyword">cache-control</span><span class="token punctuation">:</span> <span class="token header-value">max-age=3600, s-maxage=31536000</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>s-maxage 优先级高于 max-age，两者同时出现时，优先考虑 s-maxage。如果 s-maxage 未过期，则向代理服务器请求其缓存内容。</p>
<p>在依赖各种代理的大型架构中，我们不得不考虑代理服务器的缓存问题。s-maxage 就是用于表示 cache 服务器上（比如 cache CDN）的缓存的有效时间的，并只对 public 缓存有效。</p>
<div class="custom-container warning"><p class="custom-container-title">⚠️</p>
<p>s-maxage仅在代理服务器中生效，客户端中我们只考虑max-age。</p>
</div>
<p>1.1 public 与 private</p>
<p>如果我们为资源设置了 public，那么它既可以被浏览器缓存，也可以被代理服务器缓存；如果我们设置了 private，则该资源只能被浏览器缓存。private 为默认值。</p>
<p>设置了 s-maxage 时，就相当于已经设置成 public 了。</p>
<p>1.2 no-store 与 no-cache</p>
<ul>
<li>no-cache 绕开了浏览器：我们为资源设置了 no-cache 后，每一次发起请求都不会再去询问浏览器的缓存情况，而是直接向服务端去确认该资源是否过期（即走协商缓存）。</li>
<li>no-store： 顾名思义就是不使用任何缓存策略。在 no-cache 的基础上，它连服务端的缓存确认也绕开了，只允许你直接向服务端发送请求、并下载完整的响应。
<img src="/强缓存.png" alt="alt"></li>
</ul>
<h5 id="协商缓存的特征" tabindex="-1"><a class="header-anchor" href="#协商缓存的特征"><span>协商缓存的特征</span></a></h5>
<ul>
<li>协商缓存依赖于服务端与浏览器之间的通信。</li>
</ul>
<p>浏览器需要向服务器去询问缓存的相关信息，进而判断是重新发起请求、下载完整的响应，还是从本地获取缓存的资源。</p>
<p>如果服务端提示缓存资源未改动（Not Modified），资源会被<strong>重定向</strong>到浏览器缓存，这种情况下网络请求对应的状态码是 304（如下图）。
<img src="/modified.jpg" alt="alt"></p>
<h5 id="协商缓存的实现-从-last-modified-到-etag" tabindex="-1"><a class="header-anchor" href="#协商缓存的实现-从-last-modified-到-etag"><span>协商缓存的实现：从 Last-Modified 到 Etag</span></a></h5>
<ul>
<li>Last-Modified</li>
</ul>
<p>Last-Modified 是一个时间戳，如果我们启用了协商缓存，它会在首次请求时随着 Response Headers 返回：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">Last-Modified</span><span class="token punctuation">:</span> Fri<span class="token punctuation">,</span> 27 Oct 2017 06<span class="token punctuation">:</span>35<span class="token punctuation">:</span>57 GMT
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>随后我们每次请求时，会带上一个叫 If-Modified-Since 的时间戳字段，它的值正是上一次 response 返回给它的 last-modified 值：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">If-Modified-Since</span><span class="token punctuation">:</span> Fri<span class="token punctuation">,</span> 27 Oct 2017 06<span class="token punctuation">:</span>35<span class="token punctuation">:</span>57 GMT
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>服务器接收到这个时间戳后，会比对该时间戳和资源在服务器上的最后修改时间是否一致，从而判断资源是否发生了变化。如果发生了变化，就会返回一个完整的响应内容，并在 Response Headers 中添加<strong>新的 Last-Modified</strong>值；否则，返回如上图的 <code v-pre>304</code> 响应，Response Headers <strong>不会再添加 Last-Modified</strong> 字段。</p>
<p>使用 <code v-pre>Last-Modified</code> 存在一些弊端：</p>
<ol>
<li>我们编辑了文件，但文件的内容没有改变。服务端并不清楚我们是否真正改变了文件，它仍然通过最后编辑时间进行判断。因此这个资源在再次被请求时，会被当做新资源，进而引发一次完整的响应——不该重新请求的时候，也会重新请求。</li>
<li>当我们修改文件的速度过快时（比如花了 100ms 完成了改动），由于 If-Modified-Since 只能检查到以秒为最小计量单位的时间差，所以它是感知不到这个改动的——该重新请求的时候，反而没有重新请求了。</li>
</ol>
<ul>
<li>Etag</li>
</ul>
<p>Etag 和 Last-Modified 类似，当首次请求时，我们会在响应头里获取到一个最初的标识符字符串，举个🌰，它可以是这样的：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">ETag</span><span class="token punctuation">:</span> W/"2a3b<span class="token punctuation">-</span>1602480f459"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>那么下一次请求时，请求头里就会带上一个值相同的、名为 if-None-Match 的字符串供服务端比对了：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">If-None-Match</span><span class="token punctuation">:</span> W/"2a3b<span class="token punctuation">-</span>1602480f459"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">⚠️</p>
<p>Etag 的生成过程需要服务器额外付出开销，会影响服务端的性能。</p>
<p>Etag 并不能替代 Last-Modified，它只能作为 Last-Modified 的补充和强化存在。 Etag 在感知文件变化上比 Last-Modified 更加准确，优先级也更高。当 Etag 和 Last-Modified 同时存在时，以 Etag 为准。</p>
</div>
<p><a href="https://github.com/Christine-Only/cache" target="_blank" rel="noopener noreferrer">传送门：<ExternalLinkIcon/></a></p>
<h5 id="缓存决策" tabindex="-1"><a class="header-anchor" href="#缓存决策"><span>缓存决策</span></a></h5>
<p>当我们的资源内容不可复用时，直接为 Cache-Control 设置 no-store，拒绝一切形式的缓存；否则考虑是否每次都需要向服务器进行缓存有效确认，如果需要，那么设 Cache-Control 的值为 no-cache；否则考虑该资源是否可以被代理服务器缓存，根据其结果决定是设置为 private 还是 public；然后考虑该资源的过期时间，设置对应的 max-age 和 s-maxage 值；最后，配置协商缓存需要用到的 Etag、Last-Modified 等参数。</p>
<p><strong>如果什么缓存策略都没设置，那么浏览器会怎么处理？</strong></p>
<p>对于这种情况，浏览器会采用一个启发式的算法。</p>
<p>第一次：协商缓存，询问服务端，资源是否改变，已改变则发起请求。没改变的话，304重定向，并根据响应头的 <code v-pre>Date</code> 和 <code v-pre>Last-Modified</code> 计算出强制缓存的时间（类似强制设置 Cache-Control: max-age=xx）</p>
<ul>
<li>xx 的值是：（<code v-pre>Date</code> 减去 <code v-pre>Last-Modified</code>）乘以 10%</li>
<li><code v-pre>Date</code> 是创建HTTP报文的日期和时间（就是当前访问这个资源的时间）</li>
</ul>
<p>第二次开始：就有强制缓存了，状态码为200</p>
<h4 id="push-cache" tabindex="-1"><a class="header-anchor" href="#push-cache"><span>Push Cache</span></a></h4>
<h5 id="概念-2" tabindex="-1"><a class="header-anchor" href="#概念-2"><span>概念</span></a></h5>
<p><code v-pre>Push Cache</code> 是 HTTP2 的新特性，是指 HTTP2 在 server push（服务端推送）阶段存在的缓存。</p>
<h5 id="特点" tabindex="-1"><a class="header-anchor" href="#特点"><span>特点</span></a></h5>
<ul>
<li>是缓存的最后一道防线。浏览器只有在 Memory Cache、HTTP Cache 和 Service Worker Cache 均未命中的情况下才会去询问 Push Cache。</li>
<li>是一种存在于会话阶段的缓存，当 session 终止时，缓存也随之释放。</li>
<li>不同的页面只要共享了同一个 HTTP2 连接，那么它们就可以共享同一个 Push Cache。</li>
</ul>
<h4 id="网络请求" tabindex="-1"><a class="header-anchor" href="#网络请求"><span>网络请求</span></a></h4>
<p>如果所有缓存都没有命中的话，那么只能发起请求来获取资源了。</p>
<p><strong>参考链接：</strong><a href="https://zhuanlan.zhihu.com/p/421246316" target="_blank" rel="noopener noreferrer">前端性能优化之存储篇<ExternalLinkIcon/></a></p>
<h3 id="本地缓存" tabindex="-1"><a class="header-anchor" href="#本地缓存"><span>本地缓存</span></a></h3>
<h4 id="cookie" tabindex="-1"><a class="header-anchor" href="#cookie"><span>cookie</span></a></h4>
<h5 id="概念-3" tabindex="-1"><a class="header-anchor" href="#概念-3"><span>概念</span></a></h5>
<ul>
<li>Cookie 的本职工作并非本地存储，而是“维持状态”。</li>
<li>因为 HTTP 协议是一个无状态协议，我们需要通过 cookie 记录下其状态。</li>
<li>Cookie 说白了就是一个存储在浏览器里的一个小小的文本文件，它附着在 HTTP 请求上，在浏览器和服务器之间“飞来飞去”。它可以携带用户信息，当服务器检查 Cookie 的时候，便可以获取到客户端的状态。</li>
</ul>
<h5 id="缺点" tabindex="-1"><a class="header-anchor" href="#缺点"><span>缺点</span></a></h5>
<ul>
<li>容量太小，只有 4KB</li>
<li>同一个域名下的所有请求，都会携带 Cookie，随着请求的叠加，带来的开销较大</li>
</ul>
<h5 id="cookie-属性" tabindex="-1"><a class="header-anchor" href="#cookie-属性"><span>Cookie 属性</span></a></h5>
<ul>
<li>Domain</li>
<li>Path</li>
<li>Expire/MaxAge</li>
<li>HttpOnly: 是否允许被 JavaScript 操作</li>
<li>Secure: 只能在 HTTPS 连接中配置</li>
<li>SameSite</li>
</ul>
<p>Cookie maxAge</p>
<p>如果没有 maxAge，则 cookie 的有效时间为会话时间。即浏览器关闭就没了。</p>
<p>Cookie SameSite</p>
<p>SameSite中有以下三个值：</p>
<ul>
<li>None: 任何情况下都会向第三方网站请求发送 Cookie</li>
<li>Lax: 只有导航到第三方网站的 Get 链接会发送 Cookie，跨域的图片、iframe、form表单都不会发送 Cookie</li>
<li>Strict: 任何情况下都不会向第三方网站请求发送Cookie</li>
</ul>
<p>目前，主流浏览器 <code v-pre>Same-Site</code> 的默认值为 <code v-pre>Lax</code>，而在以前是 <code v-pre>None</code>，将会预防大部分 CSRF 攻击，如果需要手动指定 <code v-pre>Same-Site</code> 为 None，需要指定 Cookie 属性 <code v-pre>Secure</code>，即在 https 下发送。</p>
<p>Cookie HttpOnly</p>
<p>如果这个属性设置为true，就不能通过js脚本来获取cookie的值，能有效的防止xss攻击。</p>
<p>关于js操作Cookie</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">//读取浏览器中的cookie</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span>cookie<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//写入cookie</span>
document<span class="token punctuation">.</span>cookie<span class="token operator">=</span><span class="token string">'name=christine;path=/;domain=.baidu.com'</span><span class="token punctuation">;</span>

<span class="token comment">// cookie 的过期时间改为过去时即可删除成功</span>
<span class="token comment">// max-age 设置为 -1 即可成功</span>
document<span class="token punctuation">.</span>cookie <span class="token operator">=</span> <span class="token string">'name=christine; max-age=-1'</span>

<span class="token comment">// 或者使用最新的Cookie操作API</span>
cookieStore<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">'name'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参考文章<a href="https://juejin.cn/post/6844903501869350925" target="_blank" rel="noopener noreferrer">把cookie聊清楚<ExternalLinkIcon/></a><a href="https://javascript.ruanyifeng.com/bom/cookie.html" target="_blank" rel="noopener noreferrer">阮一峰JavaScript教程<ExternalLinkIcon/></a></p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>localhost:3000 与 localhost:5000 的 cookie 信息是否共享</p>
<p>共享。</p>
<p>Cookie 只区分域，不区分端口和协议，只要域相同，即使端口号或协议不同，cookie 也能共享。</p>
</div>
<p>参考链接<a href="https://juejin.cn/post/6863377752939036679" target="_blank" rel="noopener noreferrer">Cookie属性详解<ExternalLinkIcon/></a></p>
<h4 id="web-storage" tabindex="-1"><a class="header-anchor" href="#web-storage"><span>Web Storage</span></a></h4>
<h5 id="特点-1" tabindex="-1"><a class="header-anchor" href="#特点-1"><span>特点</span></a></h5>
<ul>
<li>存储容量大： Web Storage 根据浏览器的不同，存储容量可以达到 5-10M 之间。</li>
<li>仅位于浏览器端，不与服务端发生通信。</li>
</ul>
<h5 id="组成" tabindex="-1"><a class="header-anchor" href="#组成"><span>组成</span></a></h5>
<p><strong>localStorage</strong>使用场景：</p>
<ul>
<li>存储一些内容稳定的资源。比如图片内容丰富的电商网站会用它来存储 Base64 格式的图片字符串</li>
<li>存储一些不经常更新的 CSS、JS 等静态资源。
<strong>sessionStorage</strong>使用场景：</li>
<li>存储生命周期和它同步的会话级别的信息。这些信息只适用于当前会话，当你开启新的会话时，它也需要相应的更新或释放。比如微博的 Session Storage 就主要是存储你本次会话的浏览足迹：</li>
</ul>
<h5 id="缺点-1" tabindex="-1"><a class="header-anchor" href="#缺点-1"><span>缺点</span></a></h5>
<ul>
<li>只能存储简单的字符串，无法存储大规模的、结构复杂的数据。</li>
</ul>
<h4 id="indexdb" tabindex="-1"><a class="header-anchor" href="#indexdb"><span>IndexDB</span></a></h4>
<h5 id="概念-4" tabindex="-1"><a class="header-anchor" href="#概念-4"><span>概念</span></a></h5>
<ul>
<li>是一个运行在浏览器上的非关系型数据库。</li>
<li>是没有存储上限的（一般来说不会小于 250M）</li>
<li>不仅可以存储字符串，还可以存储二进制数据。</li>
</ul>
<h5 id="使用场景-1" tabindex="-1"><a class="header-anchor" href="#使用场景-1"><span>使用场景</span></a></h5>
<p>IndexDB 可以看做是 LocalStorage 的一个升级，当数据的复杂度和规模上升到了 LocalStorage 无法解决的程度，我们毫无疑问可以请出 IndexDB 来帮忙。</p>
</div></template>


