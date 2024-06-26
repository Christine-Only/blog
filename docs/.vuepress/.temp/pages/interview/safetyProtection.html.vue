<template><div><h1 id="前端安全" tabindex="-1"><a class="header-anchor" href="#前端安全"><span>前端安全</span></a></h1>
<h2 id="xss" tabindex="-1"><a class="header-anchor" href="#xss"><span>xss</span></a></h2>
<p>XSS 简单点来说，就是攻击者想尽一切办法将可以执行的代码注入到网页中。</p>
<p>XSS 可以分为多种类型，但是总体上我认为分为两类：<strong>持久型</strong>和<strong>非持久型</strong>。</p>
<p>持久型也就是攻击的代码被服务端写入进<strong>数据库</strong>中，这种攻击危害性很大，因为如果网站访问量很大的话，就会导致大量正常访问页面的用户都受到攻击。</p>
<p>举个例子，对于评论功能来说，就得防范持久型 XSS 攻击，因为我可以在评论中输入以下内容<code v-pre>&lt;script&gt;document.cookie&lt;/script&gt;</code></p>
<p>这种情况如果前后端没有做好防御的话，这段评论就会被存储到数据库中，这样每个打开该页面的用户都会被攻击到。</p>
<p>非持久型相比于前者危害就小的多了，一般通过<strong>修改 URL 参数</strong>的方式加入攻击代码，诱导用户访问链接从而进行攻击。</p>
<p>举个例子，如果页面需要从 URL 中获取某些参数作为内容的话，不经过过滤就会导致攻击代码被执行</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token comment">&lt;!-- http://www.domain.com?name=&lt;script>alert(1)&lt;/script> --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>{{name}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>但是对于这种攻击方式来说，如果用户使用 Chrome 这类浏览器的话，浏览器就能自动帮助用户防御攻击。但是我们不能因此就不防御此类攻击了，因为我不能确保用户都使用了该类浏览器。</p>
<p>对于 XSS 攻击来说，通常有两种方式可以用来防御。</p>
<h3 id="转义字符" tabindex="-1"><a class="header-anchor" href="#转义字符"><span>转义字符</span></a></h3>
<p>首先，对于用户的输入应该是永远不信任的。最普遍的做法就是转义输入输出的内容，对于引号、尖括号、斜杠进行转义</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">escape</span><span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  str <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">&amp;</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">'&amp;amp;'</span><span class="token punctuation">)</span>
  str <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">&lt;</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">'&amp;lt;'</span><span class="token punctuation">)</span>
  str <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">></span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">'&amp;gt;'</span><span class="token punctuation">)</span>
  str <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">"</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">'&amp;quto;'</span><span class="token punctuation">)</span>
  str <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">'</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">'&amp;#39;'</span><span class="token punctuation">)</span>
  str <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">`</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">'&amp;#96;'</span><span class="token punctuation">)</span>
  str <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\/</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">'&amp;#x2F;'</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> str
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过转义可以将攻击代码 <code v-pre>&lt;script&gt;alert(1)&lt;/script&gt;</code> 变成</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// -> &amp;lt;script&amp;gt;alert(1)&amp;lt;&amp;#x2F;script&amp;gt;</span>
<span class="token function">escape</span><span class="token punctuation">(</span><span class="token string">'&lt;script>alert(1)&lt;/script>'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>但是对于显示富文本来说，显然不能通过上面的办法来转义所有字符，因为这样会把需要的格式也过滤掉。对于这种情况，通常采用白名单过滤的办法，当然也可以通过黑名单过滤，但是考虑到需要过滤的标签和标签属性实在太多，更加推荐使用白名单的方式。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> xss <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'xss'</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> html <span class="token operator">=</span> <span class="token function">xss</span><span class="token punctuation">(</span><span class="token string">'&lt;h1 id="title">XSS Demo&lt;/h1>&lt;script>alert("xss");&lt;/script>'</span><span class="token punctuation">)</span>
<span class="token comment">// -> &lt;h1>XSS Demo&lt;/h1>&amp;lt;script&amp;gt;alert("xss");&amp;lt;/script&amp;gt;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>html<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上示例使用了 <code v-pre>js-xss</code> 来实现，可以看到在输出中保留了 <code v-pre>h1</code> 标签且过滤了 <code v-pre>script</code> 标签。</p>
<h3 id="csp" tabindex="-1"><a class="header-anchor" href="#csp"><span>csp</span></a></h3>
<p>CSP 本质上就是建立白名单，开发者明确告诉浏览器哪些外部资源可以加载和执行。我们只需要配置规则，如何拦截是由浏览器自己实现的。我们可以通过这种方式来尽量减少 XSS 攻击。</p>
<p>通常可以通过两种方式来开启 CSP：</p>
<ol>
<li>设置 HTTP Header 中的 <code v-pre>Content-Security-Policy</code></li>
<li>设置 meta 标签的方式 <code v-pre>&lt;meta http-equiv=&quot;Content-Security-Policy&quot;&gt;</code></li>
</ol>
<p>这里以设置 HTTP Header 来举例</p>
<ul>
<li>
<p>只允许加载本站资源</p>
<div class="language-http line-numbers-mode" data-ext="http" data-title="http"><pre v-pre class="language-http"><code><span class="token header"><span class="token header-name keyword">Content-Security-Policy</span><span class="token punctuation">:</span> <span class="token header-value csp languages-csp">default-src ‘self’</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>只允许加载 HTTPS 协议图片</p>
<div class="language-http line-numbers-mode" data-ext="http" data-title="http"><pre v-pre class="language-http"><code><span class="token header"><span class="token header-name keyword">Content-Security-Policy</span><span class="token punctuation">:</span> <span class="token header-value csp languages-csp">img-src https://*</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>允许加载任何来源框架</p>
<div class="language-http line-numbers-mode" data-ext="http" data-title="http"><pre v-pre class="language-http"><code><span class="token header"><span class="token header-name keyword">Content-Security-Policy</span><span class="token punctuation">:</span> <span class="token header-value csp languages-csp">child-src 'none'</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<p>当然可以设置的属性远不止这些，你可以通过查阅 <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a> 的方式来学习，这里就不过多赘述其他的属性了。</p>
<p>对于这种方式来说，只要开发者配置了正确的规则，那么即使网站存在漏洞，攻击者也不能执行它的攻击代码，并且 CSP 的兼容性也不错。</p>
<h2 id="csrf" tabindex="-1"><a class="header-anchor" href="#csrf"><span>CSRF</span></a></h2>
<p>CSRF 中文名为<strong>跨站请求伪造</strong>。原理就是攻击者构造出一个后端请求地址，诱导用户点击或者通过某些途径自动发起请求。如果用户是在登录状态下的话，后端就以为是用户在操作，从而进行相应的逻辑。</p>
<p>举个例子，假设网站中有一个通过 <code v-pre>GET</code> 请求提交用户评论的接口，那么攻击者就可以在钓鱼网站中加入一个图片，图片的地址就是评论接口</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.domain.com/xxx?comment='attack'<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>那么你是否会想到使用 <code v-pre>POST</code> 方式提交请求是不是就没有这个问题了呢？其实并不是，使用这种方式也不是百分百安全的，攻击者同样可以诱导用户进入某个页面，在页面中通过表单提交 <code v-pre>POST</code> 请求。</p>
<p>CSRF防御有以下几种方式：</p>
<ol>
<li>Get 请求不对数据进行修改</li>
<li>不让第三方网站访问到用户 Cookie</li>
<li>阻止第三方网站请求接口</li>
<li>请求时附带验证信息，比如验证码或者 Token</li>
</ol>
<h3 id="samesite" tabindex="-1"><a class="header-anchor" href="#samesite"><span>SameSite</span></a></h3>
<p>可以对 <code v-pre>Cookie</code> 设置 <code v-pre>SameSite</code> 属性。该属性表示 <code v-pre>Cookie</code> 不随着跨域请求发送，可以很大程度减少 <code v-pre>CSRF</code> 的攻击，但是该属性目前并不是所有浏览器都兼容。</p>
<h3 id="验证-referer" tabindex="-1"><a class="header-anchor" href="#验证-referer"><span>验证 Referer</span></a></h3>
<p>对于需要防范 CSRF 的请求，我们可以通过验证 <code v-pre>Referer</code> 来判断该请求是否为第三方网站发起的。</p>
<h3 id="token" tabindex="-1"><a class="header-anchor" href="#token"><span>Token</span></a></h3>
<p>服务器下发一个随机 <code v-pre>Token</code>，每次发起请求时将 <code v-pre>Token</code> 携带上，服务器验证 <code v-pre>Token</code> 是否有效。</p>
<h2 id="点击劫持" tabindex="-1"><a class="header-anchor" href="#点击劫持"><span>点击劫持</span></a></h2>
<p>点击劫持是一种视觉欺骗的攻击手段。攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。</p>
<p>对于这种攻击方式，推荐防御的方法有两种。</p>
<h3 id="x-frame-options" tabindex="-1"><a class="header-anchor" href="#x-frame-options"><span>X-FRAME-OPTIONS</span></a></h3>
<p>X-FRAME-OPTIONS 是一个 HTTP 响应头，在现代浏览器有一个很好的支持。这个 HTTP 响应头 就是为了防御用 iframe 嵌套的点击劫持攻击。</p>
<p>该响应头有三个值可选，分别是</p>
<ul>
<li>DENY：表示页面不允许通过 <code v-pre>iframe</code> 的方式展示</li>
<li>SAMEORIGIN：表示页面可以在相同域名下通过 <code v-pre>iframe</code> 的方式展示</li>
<li>ALLOW-FROM：表示页面可以在指定来源的 <code v-pre>iframe</code> 中展示</li>
</ul>
<h3 id="js-防御" tabindex="-1"><a class="header-anchor" href="#js-防御"><span>JS 防御</span></a></h3>
<p>对于某些远古浏览器来说，并不能支持上面的这种方式，那我们只有通过 JS 的方式来防御点击劫持了。</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>click-jack<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
    <span class="token selector">html</span> <span class="token punctuation">{</span>
      <span class="token property">display</span><span class="token punctuation">:</span> none <span class="token important">!important</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">if</span> <span class="token punctuation">(</span>self <span class="token operator">==</span> top<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">var</span> style <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'click-jack'</span><span class="token punctuation">)</span>
      document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>style<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      top<span class="token punctuation">.</span>location <span class="token operator">=</span> self<span class="token punctuation">.</span>location
    <span class="token punctuation">}</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上代码的作用就是当通过 <code v-pre>iframe</code> 的方式加载页面时，攻击者的网页直接不显示所有内容了。</p>
<h2 id="中间人攻击" tabindex="-1"><a class="header-anchor" href="#中间人攻击"><span>中间人攻击</span></a></h2>
<p>中间人攻击是攻击方同时与服务端和客户端建立起了连接，并让对方认为连接是安全的，但是实际上整个通信过程都被攻击者控制了。攻击者不仅能获得双方的通信信息，还能修改通信信息。</p>
<p>通常来说不建议使用公共的 Wi-Fi，因为很可能就会发生中间人攻击的情况。如果你在通信的过程中涉及到了某些敏感信息，就完全暴露给攻击方了。</p>
<p>当然防御中间人攻击其实并不难，只需要增加一个安全通道来传输信息。HTTPS 就可以用来防御中间人攻击，但是并不是说使用了 HTTPS 就可以高枕无忧了，因为如果你没有完全关闭 HTTP 访问的话，攻击方可以通过某些方式将 HTTPS 降级为 HTTP 从而实现中间人攻击。</p>
</div></template>


