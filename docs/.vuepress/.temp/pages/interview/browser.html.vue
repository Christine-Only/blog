<template><div><h1 id="浏览器相关知识点" tabindex="-1"><a class="header-anchor" href="#浏览器相关知识点"><span>浏览器相关知识点</span></a></h1>
<h2 id="事件流三个阶段" tabindex="-1"><a class="header-anchor" href="#事件流三个阶段"><span>事件流三个阶段</span></a></h2>
<ul>
<li>捕获阶段</li>
<li>目标阶段</li>
<li>冒泡阶段</li>
</ul>
<h2 id="注册事件" tabindex="-1"><a class="header-anchor" href="#注册事件"><span>注册事件</span></a></h2>
<p>通常我们使用 <code v-pre>addEventListener</code> 注册事件，该函数的第三个参数可以是布尔值，也可以是对象。对于布尔值 <code v-pre>useCapture</code> 参数来说，该参数默认值为 <code v-pre>false</code> ，<code v-pre>useCapture</code> 决定了注册的事件是捕获事件还是冒泡事件。</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>parent<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  父亲
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>child<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    儿子
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sun<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>孙子<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一次执行</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"parent"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">parent 事件触发，</span><span class="token template-punctuation string">`</span></span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"child"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">child 事件触发，</span><span class="token template-punctuation string">`</span></span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"sun"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">sun 事件触发，</span><span class="token template-punctuation string">`</span></span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二次执行</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"parent"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">parent 事件触发，</span><span class="token template-punctuation string">`</span></span> <span class="token operator">+</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"child"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">child 事件触发，</span><span class="token template-punctuation string">`</span></span> <span class="token operator">+</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"sun"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">sun 事件触发，</span><span class="token template-punctuation string">`</span></span> <span class="token operator">+</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>点击 id 为 child 的 div 后，这两份 JavaScript 代码的执行结果分别是：</p>
<ul>
<li>第一次结果为：先弹出“child 事件触发，child”，再弹出“parent 事件触发，parent”。</li>
<li>第二次结果为：先弹出“parent 事件触发，child”，再弹出“child 事件触发，child”。</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>当使用 <code v-pre>addEventListener()</code> 为一个元素注册事件的时候，句柄里的 <code v-pre>this</code> 值是该元素的引用。其与传递给句柄的 <code v-pre>event</code> 参数的 <code v-pre>currentTarget</code> 属性的值一样。</p>
<p>阻止事件冒泡可以在目标元素的监听事件中添加 <code v-pre>event.stopPropagation()</code>即可。</p>
</div>
<p><strong>在线 Demo</strong>：(<a href="https://codepen.io/tangshiya/pen/poqxNLN" target="_blank" rel="noopener noreferrer">https://codepen.io/tangshiya/pen/poqxNLN<ExternalLinkIcon/></a>)</p>
<h2 id="跨域" tabindex="-1"><a class="header-anchor" href="#跨域"><span>跨域</span></a></h2>
<h3 id="什么是跨域" tabindex="-1"><a class="header-anchor" href="#什么是跨域"><span>什么是跨域？</span></a></h3>
<h4 id="什么是同源策略及其限制内容" tabindex="-1"><a class="header-anchor" href="#什么是同源策略及其限制内容"><span>什么是同源策略及其限制内容？</span></a></h4>
<p>同源策略是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSRF等攻击。所谓同源是指&quot;协议+域名+端口&quot;三者相同，即便两个不同的域名指向同一个ip地址，也非同源。</p>
<p>域名的组成部分：
<img src="/域名组成部分.jpg" alt="alt"></p>
<p>同源策略限制内容有：</p>
<ul>
<li>Cookie、LocalStorage、IndexedDB 等存储性内容</li>
<li>DOM 节点</li>
<li>AJAX 请求发送后，结果被浏览器拦截了</li>
</ul>
<p>但是有三个标签是允许跨域加载资源：</p>
<ul>
<li><code v-pre>&lt;img src=xxx&gt;</code></li>
<li><code v-pre>&lt;link href=xxx&gt;</code></li>
<li><code v-pre>&lt;script src=xxx&gt;</code></li>
</ul>
<h4 id="常见跨域场景" tabindex="-1"><a class="header-anchor" href="#常见跨域场景"><span>常见跨域场景</span></a></h4>
<p><strong>当协议、子域名、主域名、端口号中任意一个不相同时，都算作不同域</strong>。不同域之间相互请求资源，就算作“跨域”。常见跨域场景如下图所示：</p>
<p>| URL | 说明 | 是否允许通信 |
| ---- | ---- | ---- | ---- |
| <code v-pre>http://www.test.com/a.js</code> <code v-pre>http://www.test.com/b.js</code> | 同一域名 | 允许
| <code v-pre>http://www.test.com/util/a.js</code> <code v-pre>http://www.test.com/script/b.js</code> | 同一域名，不同文件夹 | 允许
| <code v-pre>http://www.test.com:8000/a.js</code> <code v-pre>http://www.test.com/a.js</code> | 同一域名，不同端口 | 不允许
| <code v-pre>http://www.test.com/a.js</code> <code v-pre>https://www.test.com/b.js</code> | 同一域名，不同协议 | 不允许
| <code v-pre>http://www.test.com/a.js</code> <code v-pre>http://43.45.233.89/a.js</code> | 域名和域名对应的ip | 不允许
| <code v-pre>http://www.test.com/a.js</code> <code v-pre>http://b.test.com/a.js</code> | 主域相同，子域不同 | 不允许
| <code v-pre>http://www.test.com/a.js</code> <code v-pre>http://b.test.com/a.js</code> | 主域相同，子域不同 | 不允许
| <code v-pre>http://www.test.com/a.js</code> <code v-pre>http://www.baidu.com/a.js</code> | 不同域名 | 不允许</p>
<div class="custom-container tip"><p class="custom-container-title">总结</p>
<ul>
<li>如果是协议和端口造成的跨域问题“前端”是无能为力的。</li>
<li>在跨域问题上，仅仅是通过“URL的首部”来识别而不会根据域名对应的IP地址是否相同来判断。“URL的首部”可以理解为“协议, 域名和端口必须匹配”。</li>
</ul>
</div>
<p>思考题： <strong>请求跨域了，那么请求到底发出去没有？</strong></p>
<p>跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了。你可能会疑问明明通过表单的方式可以发起跨域请求，为什么 Ajax 就不会？因为归根结底，跨域是为了阻止用户读取到另一个域名下的内容，Ajax 可以获取响应，浏览器认为这不安全，所以拦截了响应。但是表单并不会获取新的内容，所以可以发起跨域请求。同时也说明了跨域并不能完全阻止 CSRF，因为请求毕竟是发出去了。</p>
<h3 id="跨域解决方案" tabindex="-1"><a class="header-anchor" href="#跨域解决方案"><span>跨域解决方案</span></a></h3>
<ul>
<li>
<p>JSONP</p>
<ul>
<li>原理：利用 <code v-pre>&lt;script&gt;</code> 标签没有跨域限制的漏洞，网页可以得到从其他来源动态产生的 JSON 数据。JSONP请求一定需要对方的服务器做支持才可以。</li>
</ul>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://domain/api?param1=a&amp;param2=b&amp;callback=show<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">function</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>JSONP和AJAX对比：JSONP和AJAX相同，都是客户端向服务器端发送请求，从服务器端获取数据的方式。但AJAX属于同源策略，JSONP属于非同源策略（跨域请求）</p>
</li>
<li>
<p>优缺点：JSONP优点是简单兼容性好，可用于解决主流浏览器的跨域数据访问的问题。缺点是仅支持get方法具有局限性，不安全可能会遭受XSS攻击。</p>
</li>
<li>
<p>实现流程</p>
<ul>
<li>声明一个回调函数，其函数名(如show)当做参数值，要传递给跨域请求数据的服务器，函数形参为要获取目标数据(服务器返回的data)。</li>
<li>创建一个<code v-pre>&lt;script&gt;</code>标签，把那个跨域的API数据接口地址，赋值给script的src，还要在这个地址中向服务器传递该函数名（可以通过问号传参:?callback=show）。</li>
<li>服务器接收到请求后，需要进行特殊的处理：例如：传递进去的函数名是show，它准备好的数据是show('Hi Christine')。</li>
<li>最后服务器把准备的数据通过HTTP协议返回给客户端，客户端再调用执行之前声明的回调函数（show），对返回的数据进行操作。</li>
</ul>
<p>在开发中可能会遇到多个 JSONP 请求的回调函数名是相同的，这时候就需要自己封装一个 JSONP函数。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">jsonp</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> url<span class="token punctuation">,</span> params<span class="token punctuation">,</span> callback <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> script <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'script'</span><span class="token punctuation">)</span>
    window<span class="token punctuation">[</span>callback<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">resolve</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
      document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    params <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token operator">...</span>params<span class="token punctuation">,</span> callback <span class="token punctuation">}</span>
    <span class="token keyword">const</span> newParams <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">in</span> params<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      newParams<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>params<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    script<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>url<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">?</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>newParams<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">'&amp;'</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
    document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">jsonp</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">'http://localhost:3000/say'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">params</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Christine'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">callback</span><span class="token operator">:</span> <span class="token string">'show'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">data</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>CORS</p>
</li>
</ul>
<p>CORS 需要浏览器和后端同时支持。IE 8 和 9 需要通过 <code v-pre>XDomainRequest</code> 来实现。</p>
<p>浏览器会自动进行 CORS 通信，实现 CORS 通信的关键是后端。只要后端实现了 CORS，就实现了跨域。</p>
<p>服务端设置 <code v-pre>Access-Control-Allow-Origin</code> 就可以开启 CORS。 该属性表示哪些域名可以访问资源，如果设置通配符则表示所有网站都可以访问资源。</p>
<p>虽然设置 CORS 和前端没什么关系，但是通过这种方式解决跨域问题的话，会在发送请求时出现两种情况，分别为<code v-pre>简单请求</code>和<code v-pre>复杂请求</code>。</p>
<ul>
<li>简单请求
以 Ajax 为例，当满足以下条件时，会触发简单请求</li>
</ul>
<ol>
<li>使用下列方法之一：</li>
</ol>
<ul>
<li>GET</li>
<li>HEAD</li>
<li>POST</li>
</ul>
<ol start="2">
<li><code v-pre>Content-Type</code> 的值仅限于下列三者之一：</li>
</ol>
<ul>
<li>text/plain</li>
<li>multipart/form-data</li>
<li>application/x-www-form-urlencoded</li>
</ul>
<p>请求中的任意 <code v-pre>XMLHttpRequestUpload</code> 对象均没有注册任何事件监听器； <code v-pre>XMLHttpRequestUpload</code> 对象可以使用 <code v-pre>XMLHttpRequest.upload</code> 属性访问。</p>
<ul>
<li>复杂请求</li>
</ul>
<p>不符合以上条件的请求就肯定是复杂请求了。 复杂请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为&quot;预检&quot;请求,该请求是 <code v-pre>option</code> 方法的，通过该请求来知道服务端是否允许跨域请求。</p>
<p>接下来我们看下一个完整复杂请求的例子，并且介绍下CORS请求相关的字段</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// index.html</span>
<span class="token keyword">const</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
document<span class="token punctuation">.</span>cookie <span class="token operator">=</span> <span class="token string">'name=xiamen'</span> <span class="token comment">// cookie不能跨域</span>
xhr<span class="token punctuation">.</span>withCredentials <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token comment">// 前端设置是否带cookie</span>
xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">'PUT'</span><span class="token punctuation">,</span> <span class="token string">'http://localhost:4000/getData'</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
xhr<span class="token punctuation">.</span><span class="token function">setRequestHeader</span><span class="token punctuation">(</span><span class="token string">'name'</span><span class="token punctuation">,</span> <span class="token string">'xiamen'</span><span class="token punctuation">)</span>
xhr<span class="token punctuation">.</span><span class="token function-variable function">onreadystatechange</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>readyState <span class="token operator">===</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>status <span class="token operator">>=</span> <span class="token number">200</span> <span class="token operator">&amp;&amp;</span> xhr<span class="token punctuation">.</span>status <span class="token operator">&lt;</span> <span class="token number">300</span><span class="token punctuation">)</span> <span class="token operator">||</span> xhr<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token number">304</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>response<span class="token punctuation">)</span>
      <span class="token comment">//得到响应头，后台需设置Access-Control-Expose-Headers</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span><span class="token function">getResponseHeader</span><span class="token punctuation">(</span><span class="token string">'name'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">//server1.js</span>
<span class="token keyword">let</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'express'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>express<span class="token punctuation">.</span><span class="token function">static</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">//server2.js</span>
<span class="token keyword">let</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'express'</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> whitList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'http://localhost:3000'</span><span class="token punctuation">]</span> <span class="token comment">//设置白名单</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> origin <span class="token operator">=</span> req<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>origin
  <span class="token keyword">if</span> <span class="token punctuation">(</span>whitList<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>origin<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 设置哪个源可以访问我</span>
    res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">'Access-Control-Allow-Origin'</span><span class="token punctuation">,</span> origin<span class="token punctuation">)</span>
    <span class="token comment">// 允许携带哪个头访问我</span>
    res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">'Access-Control-Allow-Headers'</span><span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">)</span>
    <span class="token comment">// 允许哪个方法访问我</span>
    res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">'Access-Control-Allow-Methods'</span><span class="token punctuation">,</span> <span class="token string">'PUT'</span><span class="token punctuation">)</span>
    <span class="token comment">// 允许携带cookie</span>
    res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">'Access-Control-Allow-Credentials'</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token comment">// 预检的存活时间</span>
    res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">'Access-Control-Max-Age'</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span>
    <span class="token comment">// 允许返回的头</span>
    res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">'Access-Control-Expose-Headers'</span><span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>req<span class="token punctuation">.</span>method <span class="token operator">===</span> <span class="token string">'OPTIONS'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// OPTIONS请求不做任何处理</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">'/getData'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>headers<span class="token punctuation">)</span>
  res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">'name'</span><span class="token punctuation">,</span> <span class="token string">'Christine'</span><span class="token punctuation">)</span> <span class="token comment">//返回一个响应头，后台需设置</span>
  res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token string">'Hi Christine'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/getData'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>headers<span class="token punctuation">)</span>
  res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token string">'Hi Christine'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>express<span class="token punctuation">.</span><span class="token function">static</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">)</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">4000</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码由<code v-pre>http://localhost:3000/index.html</code>向<code v-pre>http://localhost:4000/</code>跨域请求，正如我们上面所说的，后端是实现 CORS 通信的关键。</p>
<ul>
<li>postMessage</li>
</ul>
<p><code v-pre>postMessage</code>是HTML5 XMLHttpRequest Level 2中的API，且是为数不多可以跨域操作的window属性之一，它可用于解决以下方面的问题：</p>
<ul>
<li>页面和其打开的新窗口的数据传递</li>
<li>多窗口之间消息传递</li>
<li>页面与嵌套的iframe消息传递</li>
<li>上面三个场景的跨域数据传递</li>
</ul>
<p><code v-pre>window.postMessage()</code>方法可以安全地实现跨源通信。通常，对于两个不同页面的脚本，只有当执行它们的页面位于具有相同的协议（通常为https），端口号（443为https的默认值），以及主机  (两个页面的模数 Document.domain设置为相同的值) 时，这两个脚本才能相互通信。<code v-pre>window.postMessage()</code> 方法提供了一种受控机制来规避此限制，只要正确的使用，这种方法就很安全。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>otherWindow<span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span>message<span class="token punctuation">,</span> targetOrigin<span class="token punctuation">,</span> <span class="token punctuation">[</span>transfer<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>message: 将要发送到其他 window的数据。</li>
<li>targetOrigin:通过窗口的origin属性来指定哪些窗口能接收到消息事件，其值可以是字符串&quot;*&quot;（表示无限制）或者一个URI。在发送消息的时候，如果目标窗口的协议、主机地址或端口这三者的任意一项不匹配targetOrigin提供的值，那么消息就不会被发送；只有三者完全匹配，消息才会被发送。</li>
<li>transfer(可选)：是一串和message 同时传递的 Transferable 对象. 这些对象的所有权将被转移给消息的接收方，而发送一方将不再保有所有权。</li>
</ul>
<p>接下来我们看个例子： <code v-pre>http://localhost:3000/a.html</code>页面向<code v-pre>http://localhost:4000/b.html</code>传递“Hi Christine”,然后后者传回&quot;Hi Picker&quot;。</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code>// a.html
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>iframe</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://localhost:4000/b.html<span class="token punctuation">"</span></span> <span class="token attr-name">frameborder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>frame<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">onload</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value javascript language-javascript"><span class="token function">load</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>iframe</span><span class="token punctuation">></span></span> //等它加载完触发一个事件
//内嵌在http://localhost:3000/a.html
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">function</span> <span class="token function">load</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> frame <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'frame'</span><span class="token punctuation">)</span>
    frame<span class="token punctuation">.</span>contentWindow<span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span><span class="token string">'Hi Christine'</span><span class="token punctuation">,</span> <span class="token string">'http://localhost:4000'</span><span class="token punctuation">)</span> <span class="token comment">//发送数据</span>
    window<span class="token punctuation">.</span><span class="token function-variable function">onmessage</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">//接受返回数据</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>data<span class="token punctuation">)</span> <span class="token comment">//Hi Picker</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code>// b.html
  window.onmessage = function(e) {
    console.log(e.data) //我爱你
    e.source.postMessage('我不爱你', e.origin)
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>websocket</li>
<li>Node中间件代理(两次跨域)</li>
<li>nginx反向代理</li>
<li>document.domain + iframe</li>
</ul>
<p>该方式只能用于主域名相同的情况下，比如 <code v-pre>a.test.com</code> 和 <code v-pre>b.test.com</code> 适用于该方式。 只需要给页面添加 <code v-pre>document.domain ='test.com'</code> 表示主域名都相同就可以实现跨域。</p>
<h2 id="浏览器渲染原理" tabindex="-1"><a class="header-anchor" href="#浏览器渲染原理"><span>浏览器渲染原理</span></a></h2>
<h3 id="浏览器的渲染过程" tabindex="-1"><a class="header-anchor" href="#浏览器的渲染过程"><span>浏览器的渲染过程</span></a></h3>
<p><img src="/render.webp" alt="alt"></p>
<p>从上面这个图上，我们可以看到，浏览器渲染过程如下：</p>
<ol>
<li>
<p>解析HTML，生成DOM树，解析CSS，生成CSSOM树</p>
</li>
<li>
<p>将DOM树和CSSOM树结合，生成渲染树(Render Tree)</p>
</li>
<li>
<p>Layout(回流)：根据生成的渲染树，进行回流(Layout)，得到节点的几何信息（位置，大小）</p>
</li>
<li>
<p>Painting(重绘)：根据渲染树以及回流得到的几何信息，得到节点的绝对像素</p>
</li>
<li>
<p>Display：将像素发送给GPU，展示在页面上。</p>
</li>
</ol>
<h3 id="生成渲染树" tabindex="-1"><a class="header-anchor" href="#生成渲染树"><span>生成渲染树</span></a></h3>
<p><img src="/renderDOM.webp" alt="alt"></p>
<p>为了构建渲染树，浏览器主要完成了以下工作：</p>
<ol>
<li>从DOM树的根节点开始，遍历每个可见节点。</li>
<li>对于每个可见的节点，找到CSSOM树中对应的规则并应用它们。</li>
<li>根据每个可见节点以及其对应的样式，组合生成渲染树。</li>
</ol>
<p>第一步中，既然说到了要遍历可见的节点，那么我们要先知道，什么节点是不可见的。不可见的节点包括：</p>
<ul>
<li>一些不会渲染输出的节点，比如<code v-pre>script</code>、<code v-pre>meta</code>、<code v-pre>link</code>等。</li>
<li>一些通过css进行隐藏的节点。比如<code v-pre>display:none</code>。注意，利用<code v-pre>visibility</code>和<code v-pre>opacity</code>隐藏的节点，还是会显示在渲染树上的。只有<code v-pre>display:none</code>的节点才不会显示在渲染树上。</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>渲染树只包含可见的节点。</p>
</div>
<div class="custom-container tip"><p class="custom-container-title">总结</p>
<p>浏览器进程中的网络线程请求获取到 HTML 数据后，通过 IPC 将数据传给渲染器进程的主线程，主线程将 HTML 解析构造成 DOM 树，然后进行样式计算，根据 DOM 树和生成好的样式生成 Layout Tree，通过遍历 Layout Tree生成绘制顺序表，接着遍历 Layout Tree 生成了 Layer Tree， 然后主线程将 Layer Tree 和 绘制顺序信息一起传给合成器线程，合成器线程按规则进行分图层，并把图层分为更小的图块（tiles）传给栅格线程进行栅格化，栅格化完成后，合成器线程会获得栅格线程传过来的“draw quads”图块信息，根据这些信息合成器线程合成了一个合成器帧，然后将该合成器帧通过 IPC 传回给浏览器进程，浏览器进程再传到 GPU 进行渲染，之后就展示到你的屏幕上了。</p>
</div>
<p><a href="https://www.bilibili.com/video/BV1x54y1B7RE/?vd_source=43bb13bad2aa1d4f33cc41601de11c25" target="_blank" rel="noopener noreferrer">参考教程：<ExternalLinkIcon/></a></p>
<h3 id="回流与重绘" tabindex="-1"><a class="header-anchor" href="#回流与重绘"><span>回流与重绘</span></a></h3>
<h4 id="什么是回流" tabindex="-1"><a class="header-anchor" href="#什么是回流"><span>什么是回流？</span></a></h4>
<p>当我们对 DOM 的修改引发了 DOM 几何尺寸的变化（比如修改元素的宽、高或隐藏元素等）时，浏览器需要重新计算元素的几何属性（其他元素的几何属性和位置也会因此受到影响），然后再将计算的结果绘制出来。这个过程就是回流（也叫重排）。</p>
<h4 id="什么是重绘" tabindex="-1"><a class="header-anchor" href="#什么是重绘"><span>什么是重绘？</span></a></h4>
<p>当我们对 DOM 的修改导致了样式的变化、却并未影响其几何属性（比如修改了颜色或背景色）时，浏览器不需重新计算元素的几何属性、直接为该元素绘制新的样式（跳过了上图所示的回流环节）。这个过程叫做重绘。</p>
<p>由此可以得出结论：<strong>回流必定会发生重绘，重绘不一定会引发回流</strong>。</p>
<h4 id="哪些实际操作会导致回流与重绘" tabindex="-1"><a class="header-anchor" href="#哪些实际操作会导致回流与重绘"><span>哪些实际操作会导致回流与重绘？</span></a></h4>
<p>触发重绘的操作：例如：修改color、background-color、visibility等。</p>
<p>触发回流的操作：</p>
<ul>
<li>页面首次渲染</li>
<li>添加或删除可见的DOM元素</li>
<li>元素的位置发生变化</li>
<li>元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）</li>
<li>元素内容变化（文字数量或图片大小等等）</li>
<li>元素字体大小变化</li>
<li>浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）</li>
</ul>
<p>一些常用且会导致回流的属性和方法：</p>
<ul>
<li>clientWidth、clientHeight、clientTop、clientLeft</li>
<li>offsetWidth、offsetHeight、offsetTop、offsetLeft</li>
<li>scrollWidth、scrollHeight、scrollTop、scrollLeft</li>
<li>scrollIntoView()、scrollIntoViewIfNeeded()</li>
<li>getComputedStyle()</li>
<li>getBoundingClientRect()</li>
<li>scrollTo()</li>
</ul>
<h4 id="性能影响" tabindex="-1"><a class="header-anchor" href="#性能影响"><span>性能影响</span></a></h4>
<p><strong>回流比重绘的代价要更高。</strong></p>
<p>有时即使仅仅回流一个单一的元素，它的父元素以及任何跟随它的元素也会产生回流。</p>
<p>现代浏览器会对频繁的回流或重绘操作进行优化：</p>
<p>浏览器会维护一个队列，把所有引起回流和重绘的操作放入队列中，如果队列中的任务数量或者时间间隔达到一个阈值的，浏览器就会将队列清空，进行一次批处理，这样可以把多次回流和重绘变成一次。</p>
<p>当你访问以下属性或方法时，浏览器会立刻清空队列：</p>
<ul>
<li>
<p>clientWidth、clientHeight、clientTop、clientLeft</p>
</li>
<li>
<p>offsetWidth、offsetHeight、offsetTop、offsetLeft</p>
</li>
<li>
<p>scrollWidth、scrollHeight、scrollTop、scrollLeft</p>
</li>
<li>
<p>width、height</p>
</li>
<li>
<p>getComputedStyle()</p>
</li>
<li>
<p>getBoundingClientRect()</p>
</li>
</ul>
<h4 id="减少重绘和回流" tabindex="-1"><a class="header-anchor" href="#减少重绘和回流"><span>减少重绘和回流</span></a></h4>
<ul>
<li>
<p>避免使用<code v-pre>table</code>布局。</p>
</li>
<li>
<p>尽可能在DOM树的最末端改变<code v-pre>class</code>。</p>
</li>
<li>
<p>将动画效果应用到<code v-pre>position</code>属性为<code v-pre>absolute</code>或<code v-pre>fixed</code>的元素上。</p>
</li>
<li>
<p>避免使用<code v-pre>CSS</code>表达式（例如：<code v-pre>calc()</code>）。</p>
</li>
<li>
<p>避免频繁操作样式，最好一次性重写<code v-pre>style</code>属性，或者将样式列表定义为<code v-pre>class</code>并一次性更改<code v-pre>class</code>属性。</p>
</li>
<li>
<p>避免频繁操作<code v-pre>DOM</code>，创建一个<code v-pre>documentFragment</code>，在它上面应用所有<code v-pre>DOM操作</code>，最后再把它添加到文档中。</p>
</li>
<li>
<p>将 DOM “离线”。</p>
<p>我们上文所说的回流和重绘，都是在“该元素位于页面上”的前提下会发生的。一旦我们给元素设置 <code v-pre>display: none</code>，将其从页面上“拿掉”，那么我们的后续操作，将无法触发回流与重绘——这个将元素“拿掉”的操作，就叫做 <code v-pre>DOM</code> 离线化。</p>
</li>
<li>
<p>避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流。</p>
</li>
</ul>
</div></template>


