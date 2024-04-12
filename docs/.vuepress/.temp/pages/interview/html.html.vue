<template><div><h1 id="html-知识点" tabindex="-1"><a class="header-anchor" href="#html-知识点"><span>Html 知识点</span></a></h1>
<h2 id="如何实现图片的懒加载" tabindex="-1"><a class="header-anchor" href="#如何实现图片的懒加载"><span>如何实现图片的懒加载</span></a></h2>
<blockquote>
<p>当我们碰到长网页有很多图片时，我们会采用先加载出现在视口内的几张图片，当滚动条滚动到相应图片的位置时才去加载别的图片。这种延迟加载的方式我们就称之为懒加载。</p>
</blockquote>
<p>故问题拆分成两个：</p>
<ol>
<li>如何判断图片出现在了当前视口 （即如何判断我们能够看到图片）</li>
<li>如何控制图片的加载</li>
</ol>
<h3 id="方案一-位置计算-滚动事件-scroll-dataset-api" tabindex="-1"><a class="header-anchor" href="#方案一-位置计算-滚动事件-scroll-dataset-api"><span>方案一：位置计算 + 滚动事件 (Scroll) + DataSet API</span></a></h3>
<p>首先要理解三个属性的含义分别是什么？</p>
<ul>
<li>offsetTop：返回当前元素相对于其 <code v-pre>offsetParent</code> 元素的顶部内边距的距离。</li>
<li>clientHeight： <code v-pre>document.documentElement.clientHeight</code>浏览器可视窗口的高度。</li>
<li>scrollTop：获取或设置一个元素的内容垂直滚动的像素数。</li>
</ul>
<p>如何判断图片出现在了当前视口</p>
<p>当 <code v-pre>offsetTop</code> &lt;= <code v-pre>clientHeight</code> + <code v-pre>scrollTop</code>时，可以判断图片出现在了当前视口。</p>
<p>如何控制图片的加载</p>
<p>可以通过将图片的地址保存在img元素的自定义属性上面，当需要加载的时候再将该自定义属性赋值给该图片的src。</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">data-src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>logo.jpg<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code> <span class="token comment">// 使用data-xx的自定义属性可以通过dom元素的dataset.xx取得；</span>
img<span class="token punctuation">.</span>src <span class="token operator">=</span> img<span class="token punctuation">.</span>datset<span class="token punctuation">.</span>src
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>监听滚动事件加载后面的图片</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function-variable function">onscroll</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">lazyLoad</span><span class="token punctuation">(</span><span class="token string">'需要懒加载的图片'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="方案二-getboundingclientrect-api-scroll-with-throttle-dataset-api" tabindex="-1"><a class="header-anchor" href="#方案二-getboundingclientrect-api-scroll-with-throttle-dataset-api"><span>方案二：getBoundingClientRect API + Scroll with Throttle + DataSet API</span></a></h3>
<p><code v-pre>Element.getBoundingClientRect()</code> 方法返回元素的大小及其相对于视口的位置。</p>
<p>如何判断图片出现在了当前视口</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// clientHeight 代表当前视口的高度</span>
img<span class="token punctuation">.</span><span class="token function">getBoundingClientRect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>top <span class="token operator">&lt;</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>clientHeight<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>监听 <code v-pre>window.scroll</code> 事件也优化一下</p>
<p>加个节流器，提高性能。工作中比较常用的就是<code v-pre>lodash.throttle</code></p>
<h3 id="方案三-intersectionobserver-api-dataset-api" tabindex="-1"><a class="header-anchor" href="#方案三-intersectionobserver-api-dataset-api"><span>方案三：IntersectionObserver API + DataSet API</span></a></h3>
<p>如何判断图片出现在了当前视口</p>
<p>方案二使用的方法是: <code v-pre>window.scroll</code> 监听 <code v-pre>Element.getBoundingClientRect()</code> 并使用 <code v-pre>_.throttle</code> 节流。</p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/IntersectionObserver" target="_blank" rel="noopener noreferrer">IntersectionObserver<ExternalLinkIcon/></a></p>
<p>事件回调的参数是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserverEntry" target="_blank" rel="noopener noreferrer">IntersectionObserverEntry<ExternalLinkIcon/></a>的集合，代表关于是否在可见视口的一系列值。</p>
<p>其中，<code v-pre>entry.isIntersecting</code> 代表目标元素可见。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 利用 IntersectionObserver 监听元素是否出现在视口</span>
<span class="token keyword">const</span> observer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IntersectionObserver</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">changes</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// changes: 目标元素集合</span>
  changes<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">change</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// intersectionRatio</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>change<span class="token punctuation">.</span>isIntersecting<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> img <span class="token operator">=</span> change<span class="token punctuation">.</span>target<span class="token punctuation">;</span>
      img<span class="token punctuation">.</span>src <span class="token operator">=</span> img<span class="token punctuation">.</span>dataset<span class="token punctuation">.</span>src<span class="token punctuation">;</span>
      observer<span class="token punctuation">.</span><span class="token function">unobserve</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 填充完 img 的 src 属性后取消监听。</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

observer<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//监听一个目标元素。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方案四-lazyloading-属性" tabindex="-1"><a class="header-anchor" href="#方案四-lazyloading-属性"><span>方案四： LazyLoading 属性</span></a></h3>
<p>浏览器觉得懒加载这事可以交给自己做，你们开发者加个属性就好了。</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>logo.jpg<span class="token punctuation">"</span></span> <span class="token attr-name">loading</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>lazy<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="浏览器中如何实现剪切板复制的功能" tabindex="-1"><a class="header-anchor" href="#浏览器中如何实现剪切板复制的功能"><span>浏览器中如何实现剪切板复制的功能</span></a></h2>
<p>方式一：使用第三方库 <code v-pre>clipboard-copy</code></p>
<p>方式二：最为推荐的方式是使用 Clipboard API 进行实现(不兼容IE浏览器)</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">writeClipBoard</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token keyword">await</span> navigator<span class="token punctuation">.</span>clipboard<span class="token punctuation">.</span><span class="token function">writeText</span><span class="token punctuation">(</span><span class="token string">'Hi，Christine'</span><span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'写入'</span><span class="token punctuation">,</span> res<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">writeClipBoard</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方式三：选中: Selection API （兼容IE浏览器）</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> selection <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">getSelection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> range <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createRange</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> element <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// RangeAPI: 制造区域</span>
range<span class="token punctuation">.</span><span class="token function">selectNodeContents</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Selection: 选中区域</span>
selection<span class="token punctuation">.</span><span class="token function">addRange</span><span class="token punctuation">(</span>range<span class="token punctuation">)</span><span class="token punctuation">;</span>

selectedText <span class="token operator">=</span> selection<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="如果把json数据转化为demo-json并下载" tabindex="-1"><a class="header-anchor" href="#如果把json数据转化为demo-json并下载"><span>如果把JSON数据转化为demo.json并下载</span></a></h2>
<h3 id="方式一-json-视为字符串-可以利用-dataurl-进行下载" tabindex="-1"><a class="header-anchor" href="#方式一-json-视为字符串-可以利用-dataurl-进行下载"><span>方式一：json 视为字符串，可以利用 DataURL 进行下载</span></a></h3>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">download</span><span class="token punctuation">(</span><span class="token parameter">url<span class="token punctuation">,</span> name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> a <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'a'</span><span class="token punctuation">)</span>
  a<span class="token punctuation">.</span>download <span class="token operator">=</span> name
  a<span class="token punctuation">.</span>href <span class="token operator">=</span> url
  a<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> person <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Christine'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
  <span class="token literal-property property">gender</span><span class="token operator">:</span> <span class="token string">'女'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> dataUrl <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">data:,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
<span class="token function">download</span><span class="token punctuation">(</span>dataUrl<span class="token punctuation">,</span> <span class="token string">'demo.json'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方式二-转化为-object-url-进行下载" tabindex="-1"><a class="header-anchor" href="#方式二-转化为-object-url-进行下载"><span>方式二：转化为 Object URL 进行下载</span></a></h3>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">download</span><span class="token punctuation">(</span><span class="token parameter">url<span class="token punctuation">,</span> name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> a <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'a'</span><span class="token punctuation">)</span>
  a<span class="token punctuation">.</span>download <span class="token operator">=</span> name
  a<span class="token punctuation">.</span>href <span class="token operator">=</span> url
  a<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> person <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Christine'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
  <span class="token literal-property property">gender</span><span class="token operator">:</span> <span class="token string">'女'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> url <span class="token operator">=</span> <span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">createObjectURL</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Blob</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token function">download</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token string">'demo.json'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="如何找到当前页面出现次数最多的-html-标签" tabindex="-1"><a class="header-anchor" href="#如何找到当前页面出现次数最多的-html-标签"><span>如何找到当前页面出现次数最多的 HTML 标签</span></a></h2>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getMostFrequentTag</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> counter <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

  document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">"*"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">element</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    counter<span class="token punctuation">[</span>element<span class="token punctuation">.</span>tagName<span class="token punctuation">]</span> <span class="token operator">=</span> counter<span class="token punctuation">[</span>element<span class="token punctuation">.</span>tagName<span class="token punctuation">]</span>
      <span class="token operator">?</span> counter<span class="token punctuation">[</span>element<span class="token punctuation">.</span>tagName<span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token number">1</span>
      <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> orderedTags <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span>counter<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">tag1<span class="token punctuation">,</span> tag2</span><span class="token punctuation">)</span> <span class="token operator">=></span> tag2<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">-</span> tag1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> tag <span class="token keyword">of</span> orderedTags<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>tag<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">&lt;</span> orderedTags<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>tag<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>优化方案</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getMostFrequentTag</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> maxArray <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> maxCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

  document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">"*"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">element</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span>tagName<span class="token punctuation">}</span> <span class="token operator">=</span> element
    <span class="token keyword">let</span> count <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>tagName<span class="token punctuation">)</span> <span class="token operator">??</span> <span class="token number">0</span><span class="token punctuation">;</span>
    count<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">></span> maxCount<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      maxCount <span class="token operator">=</span> count<span class="token punctuation">;</span>
      maxArray <span class="token operator">=</span> <span class="token punctuation">[</span>tagName<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">===</span> maxCount<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      maxArray<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>tagName<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>tagName<span class="token punctuation">,</span> count<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> maxArray<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="如何封装一个支持过期时间的-localstorage" tabindex="-1"><a class="header-anchor" href="#如何封装一个支持过期时间的-localstorage"><span>如何封装一个支持过期时间的 localStorage</span></a></h2>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  localStorage<span class="token punctuation">.</span><span class="token function-variable function">setItem</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> time <span class="token operator">=</span> <span class="token number">Infinity</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// Infinity是一个数值，表示无穷大</span>
    <span class="token keyword">const</span> payload <span class="token operator">=</span> Number<span class="token punctuation">.</span><span class="token function">isFinite</span><span class="token punctuation">(</span>time<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">__value</span><span class="token operator">:</span> value<span class="token punctuation">,</span>
      <span class="token literal-property property">__expiresTime</span><span class="token operator">:</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> time
    <span class="token punctuation">}</span> <span class="token operator">:</span> value<span class="token punctuation">;</span>
    <span class="token class-name">Storage</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>localStorage<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>payload<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  localStorage<span class="token punctuation">.</span><span class="token function-variable function">getItem</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token class-name">Storage</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>localStorage<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token string">'{}'</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> value<span class="token punctuation">[</span><span class="token string">'__expiresTime'</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> value<span class="token punctuation">[</span><span class="token string">'__value'</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">void</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="cookie-属性" tabindex="-1"><a class="header-anchor" href="#cookie-属性"><span>Cookie 属性</span></a></h2>
<ul>
<li>Domain</li>
<li>Path</li>
<li>Expire/MaxAge</li>
<li>HttpOnly: 是否允许被 JavaScript 操作</li>
<li>Secure: 只能在 HTTPS 连接中配置</li>
<li>SameSite</li>
</ul>
<h3 id="cookie-maxage" tabindex="-1"><a class="header-anchor" href="#cookie-maxage"><span>Cookie maxAge</span></a></h3>
<p>如果没有 maxAge，则 cookie 的有效时间为会话时间。即浏览器关闭就没了。</p>
<h3 id="cookie-samesite" tabindex="-1"><a class="header-anchor" href="#cookie-samesite"><span>Cookie SameSite</span></a></h3>
<p>SameSite中有以下三个值：</p>
<ul>
<li>None: 任何情况下都会向第三方网站请求发送 Cookie</li>
<li>Lax: 只有导航到第三方网站的 Get 链接会发送 Cookie，跨域的图片、iframe、form表单都不会发送 Cookie</li>
<li>Strict: 任何情况下都不会向第三方网站请求发送Cookie</li>
</ul>
<p>目前，主流浏览器 <code v-pre>Same-Site</code> 的默认值为 <code v-pre>Lax</code>，而在以前是 <code v-pre>None</code>，将会预防大部分 CSRF 攻击，如果需要手动指定 <code v-pre>Same-Site</code> 为 None，需要指定 Cookie 属性 <code v-pre>Secure</code>，即在 https 下发送。</p>
<h3 id="cookie-httponly" tabindex="-1"><a class="header-anchor" href="#cookie-httponly"><span>Cookie HttpOnly</span></a></h3>
<p>如果这个属性设置为true，就不能通过js脚本来获取cookie的值，能有效的防止xss攻击。</p>
<h3 id="关于js操作cookie" tabindex="-1"><a class="header-anchor" href="#关于js操作cookie"><span>关于js操作Cookie</span></a></h3>
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
<h2 id="localhost-3000-与-localhost-5000-的-cookie-信息是否共享" tabindex="-1"><a class="header-anchor" href="#localhost-3000-与-localhost-5000-的-cookie-信息是否共享"><span>localhost:3000 与 localhost:5000 的 cookie 信息是否共享</span></a></h2>
<p>共享。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Cookie 只区分域，不区分端口和协议，只要域相同，即使端口号或协议不同，cookie 也能共享。</p>
</div>
<p>参考链接<a href="https://juejin.cn/post/6863377752939036679" target="_blank" rel="noopener noreferrer">Cookie属性详解<ExternalLinkIcon/></a></p>
<h2 id="什么是事件委托-e-currenttarget-与-e-target-有何区别" tabindex="-1"><a class="header-anchor" href="#什么是事件委托-e-currenttarget-与-e-target-有何区别"><span>什么是事件委托，e.currentTarget 与 e.target 有何区别</span></a></h2>
<blockquote>
<p>事件委托指当有大量子元素触发事件时，将事件监听器绑定在父元素进行监听，此时数百个事件监听器变为了一个监听器，提升了网页性能。</p>
</blockquote>
<p><code v-pre>Event</code> 接口的只读属性 <code v-pre>currentTarget</code> 表示的，标识是当事件沿着 DOM 触发时事件的当前目标。它总是指向事件绑定的元素，而 <code v-pre>Event.target</code> 则是事件触发的元素。</p>
<h2 id="异步加载-js-脚本时-async-与-defer-有何区别" tabindex="-1"><a class="header-anchor" href="#异步加载-js-脚本时-async-与-defer-有何区别"><span>异步加载 JS 脚本时，async 与 defer 有何区别</span></a></h2>
<p>如果没有 <code v-pre>defer</code> 或 <code v-pre>async</code> 属性，浏览器会立即加载并执行相应的脚本。它不会等待后续加载的文档元素，读取到就会开始加载和执行，这样就阻塞了后续文档的加载。</p>
<p><img src="/blog/deferandasync.jpg" alt="alt"></p>
<p>在正常情况下，即 <code v-pre>&lt;script&gt;</code> 没有任何额外属性标记的情况下，有几点共识</p>
<ol>
<li>JS 的脚本分为<code v-pre>加载</code>、<code v-pre>解析</code>、<code v-pre>执行</code>几个步骤，简单对应到图中就是 fetch (加载) 和 execution (解析并执行)</li>
<li><code v-pre>JS 的脚本加载(fetch)且执行(execution)会阻塞 DOM 的渲染</code>，因此 JS 一般放到最后头</li>
</ol>
<p>而 <code v-pre>defer</code> 与 <code v-pre>async</code> 的区别如下:</p>
<ul>
<li>
<p>相同点: <code v-pre>异步加载 (fetch)</code></p>
</li>
<li>
<p>不同点:</p>
<ul>
<li>async 加载(fetch)完成后立即执行 (execution)，因此可能会阻塞 DOM 解析；</li>
<li>defer 加载(fetch)完成后需要等到DOM 解析完成后，事件 <code v-pre>DomContentLoaded</code> 触发执行之前执行(execution)。</li>
</ul>
</li>
</ul>
<p>🌰
若以下 js 加载时，属性是 <code v-pre>async</code> 与 <code v-pre>defer</code> 时，输出有何不同？</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>./defer.js<span class="token punctuation">"</span></span> <span class="token attr-name">defer</span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>./async.js<span class="token punctuation">"</span></span> <span class="token attr-name">async</span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Start"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"DOMContentLoaded"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"DCL"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>defer.js</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Defer Script"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>async.js</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Async Script"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>应该是 <code v-pre>Start</code> =&gt; <code v-pre>Defer Script</code> =&gt; <code v-pre>DCL</code>，async script是脱离DOM的，和加载自身文件的大小有关，文件比较小的，加载快，然后执行；文件大的加载慢，然后执行。</p>
<p><a href="https://juejin.cn/post/6894629999215640583" target="_blank" rel="noopener noreferrer">文章：<ExternalLinkIcon/></a></p>
<h2 id="react-vue-中的-router-实现原理如何" tabindex="-1"><a class="header-anchor" href="#react-vue-中的-router-实现原理如何"><span>React/Vue 中的 router 实现原理如何</span></a></h2>
<p>前端路由有两种实现方式:</p>
<h3 id="history-api" tabindex="-1"><a class="header-anchor" href="#history-api"><span>history API</span></a></h3>
<p>通过 <code v-pre>history.pushState()</code> 跳转路由
通过 <code v-pre>popstate/window.onpopstate event</code> 监听路由变化，但无法监听到 history.pushState() 时的路由变化</p>
<h3 id="hash" tabindex="-1"><a class="header-anchor" href="#hash"><span>hash</span></a></h3>
<p>通过 <code v-pre>location.hash</code> 跳转路由
通过 <code v-pre>hashchange/window.onhashchange event</code> 监听路由变化</p>
</div></template>


