<template><div><h1 id="js异步编程" tabindex="-1"><a class="header-anchor" href="#js异步编程"><span>JS异步编程</span></a></h1>
<h2 id="并发和并行区别" tabindex="-1"><a class="header-anchor" href="#并发和并行区别"><span>并发和并行区别</span></a></h2>
<p>并发是宏观概念，现在分别有任务 A 和任务 B，在一段时间内通过任务间的切换完成了这两个任务，这种情况就可以称之为并发。</p>
<p>并行是微观概念，假设 CPU 中存在两个核心，那么我就可以同时完成任务 A、B。同时完成多个任务的情况就可以称之为并行。</p>
<h2 id="回调函数-callback" tabindex="-1"><a class="header-anchor" href="#回调函数-callback"><span>回调函数（Callback）</span></a></h2>
<h3 id="什么是回调函数-callback" tabindex="-1"><a class="header-anchor" href="#什么是回调函数-callback"><span>什么是回调函数(Callback)</span></a></h3>
<p>其实回调函数并不复杂，明白两个重点即可：</p>
<ol>
<li>函数可以作为一个参数传递到另一个函数中。</li>
<li>JS是异步编程语言。</li>
</ol>
<h3 id="为什么需要回调函数" tabindex="-1"><a class="header-anchor" href="#为什么需要回调函数"><span>为什么需要回调函数？</span></a></h3>
<p>JavaScript 按从上到下的顺序运行代码。但是，在有些情况下，必须在某些情况发生之后，代码才能运行（或者说必须运行），这就不是按顺序运行了。这是异步编程。</p>
<p>回调函数确保：函数在某个任务完成之前不运行，在任务完成之后立即运行。它帮助我们编写异步 JavaScript 代码，避免问题和错误。</p>
<p>在 JavaScript 里创建回调函数的方法是将它作为参数传递给另一个函数，然后当某个任务完成之后，立即调用它。</p>
<p>回调函数有个致命的弱点，就是容易写出回调地狱。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">ajax</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// 处理逻辑</span>
  <span class="token function">ajax</span><span class="token punctuation">(</span>url1<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 处理逻辑</span>
    <span class="token function">ajax</span><span class="token punctuation">(</span>url2<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// 处理逻辑</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>回调地狱的根本问题就是：</p>
<ul>
<li>嵌套函数存在耦合性，一旦有所改动，就会牵一发而动全身</li>
<li>嵌套函数一多，就很难处理错误</li>
<li>不能使用 try catch 捕获错误</li>
<li>不能直接 return</li>
</ul>
<h2 id="generator" tabindex="-1"><a class="header-anchor" href="#generator"><span>Generator</span></a></h2>
<p>执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。</p>
<p>形式上，Generator 函数是一个普通函数，但是有两个特征。</p>
<ol>
<li><code v-pre>function</code> 关键字与函数名之间有一个 <code v-pre>*</code>；</li>
<li>函数体内部使用 <code v-pre>yield</code> 表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。</li>
</ol>
<h3 id="yield" tabindex="-1"><a class="header-anchor" href="#yield"><span>yield</span></a></h3>
<p>由于 Generator 函数返回的遍历器对象，只有调用 <code v-pre>next</code> 方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。<code v-pre>yield</code> 表达式就是暂停标志。</p>
<p>遍历器对象的 <code v-pre>next</code> 方法的运行逻辑如下：</p>
<ol>
<li>遇到 <code v-pre>yield</code> 表达式，就暂停执行后面的操作，并将紧跟在 <code v-pre>yield</code> 后面的那个表达式的值，作为返回的对象的 <code v-pre>value</code> 属性值。</li>
<li>下一次调用 <code v-pre>next</code> 方法时，再继续往下执行，直到遇到下一个<code v-pre>yield</code> 表达式。</li>
<li>如果没有再遇到新的 <code v-pre>yield</code> 表达式，就一直运行到函数结束，直到 <code v-pre>return</code> 语句为止，并将 <code v-pre>return</code> 语句后面的表达式的值，作为返回的对象的 <code v-pre>value</code> 属性值。</li>
<li>如果该函数没有 <code v-pre>return</code> 语句，则返回的对象的 <code v-pre>value</code> 属性值为 <code v-pre>undefined</code> 。</li>
</ol>
<h3 id="next" tabindex="-1"><a class="header-anchor" href="#next"><span>next</span></a></h3>
<p><code v-pre>next</code> 方法可以带一个参数，该参数就会被当作上一个 <code v-pre>yield</code> 表达式的返回值。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> y <span class="token operator">=</span> <span class="token number">2</span> <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token keyword">yield</span> <span class="token punctuation">(</span>x <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> z <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token punctuation">(</span>y <span class="token operator">/</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>x <span class="token operator">+</span> y <span class="token operator">+</span> z<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// Object{value:6, done:false}</span>
a<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// Object{value:NaN, done:false}</span>
a<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// Object{value:NaN, done:true}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>代码详解：</strong></p>
<ul>
<li>第二次运行 <code v-pre>next</code> 方法的时候不带参数，导致 <code v-pre>y</code> 的值等于<code v-pre>2 * undefined</code>（即 <code v-pre>NaN</code> ），除以 3 以后还是 <code v-pre>NaN</code> ，因此返回对象的 <code v-pre>value</code> 值也等于 <code v-pre>NaN</code>。</li>
<li>第三次运行 <code v-pre>next</code> 方法的时候不带参数，所以 <code v-pre>z</code> 等于<code v-pre>undefined</code>，返回对象的 <code v-pre>value</code> 值等于 <code v-pre>5 + NaN + undefined</code>，即 <code v-pre>NaN</code>。</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> y <span class="token operator">=</span> <span class="token number">2</span> <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token keyword">yield</span> <span class="token punctuation">(</span>x <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> z <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token punctuation">(</span>y <span class="token operator">/</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>x <span class="token operator">+</span> y <span class="token operator">+</span> z<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
b<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>   <span class="token comment">//  { value:6, done:false }</span>
b<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">)</span> <span class="token comment">// { value:8, done:false }</span>
b<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">13</span><span class="token punctuation">)</span> <span class="token comment">// { value:42, done:true }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>代码详解：</strong></p>
<ul>
<li>当执行第一次 <code v-pre>next</code> 时，函数暂停在 <code v-pre>yield (x + 1)</code> 处，所以返回 <code v-pre>5 + 1 = 6</code>；</li>
<li>当执行第二次 <code v-pre>next</code> 时，将上一次 <code v-pre>yield</code> 表达式的值设为 <code v-pre>12</code> ，此时 <code v-pre>const y = 2 * 12</code>，所以第二个 <code v-pre>yield</code> 等于 <code v-pre>2 * 12 / 3 = 8</code>；</li>
<li>当执行第三次 next 时，将上一次 <code v-pre>yield</code> 表达式的值设为 <code v-pre>13</code> ，所以 <code v-pre>z = 13</code>, <code v-pre>x = 5</code>, <code v-pre>y = 24</code>，相加等于 <code v-pre>42</code>。</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>由于 <code v-pre>next</code> 方法的参数表示上一个 <code v-pre>yield</code> 表达式的返回值，所以在第一次使用 <code v-pre>next</code> 方法时，传递参数是无效的。V8 引擎直接忽略第一次使用 <code v-pre>next</code> 方法时的参数，只有从第二次使用 <code v-pre>next</code> 方法开始，参数才是有效的。从语义上讲，第一个 <code v-pre>next</code> 方法用来启动遍历器对象，所以不用带有参数。</p>
</div>
<p>用 <code v-pre>Generator</code> 解决回调地狱如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token operator">*</span><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">yield</span> <span class="token function">ajax</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'这里是首次回调函数'</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">yield</span> <span class="token function">ajax</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'这里是第二次回调函数'</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">yield</span> <span class="token function">ajax</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'这里是第三次回调函数'</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> it <span class="token operator">=</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> result1 <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> result2 <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> result3 <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="promise" tabindex="-1"><a class="header-anchor" href="#promise"><span>Promise</span></a></h2>
<blockquote>
<p>Promise 是异步编程的一种解决方案。</p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Promise对象代表一个异步操作，有三种状态：</p>
<ol>
<li>pending（进行中）</li>
<li>fulfilled（已成功）</li>
<li>rejected（已失败）</li>
</ol>
<p>特点：</p>
<ul>
<li>对象的状态不受外界影响</li>
<li>一旦状态改变就不会再变，任何时候都可得到这个结果</li>
</ul>
<p>方法：</p>
<ul>
<li>
<p>then()：分别指定 <code v-pre>resolved</code> 状态和 <code v-pre>rejected</code> 状态的回调函数</p>
<ul>
<li>第一参数：状态变为 <code v-pre>resolved</code> 时调用</li>
<li>第二参数：状态变为 <code v-pre>rejected</code> 时调用(可选)</li>
</ul>
</li>
<li>
<p>catch()：指定发生错误时的回调函数</p>
</li>
<li>
<p>finally()：用于指定不管 <code v-pre>Promise</code> 对象最后状态如何，都会执行的操作。</p>
</li>
<li>
<p>Promise.all()：将多个实例包装成一个新实例，返回全部实例状态变更后的结果数组(齐变更再返回)</p>
<ul>
<li>
<p>入参：具有 <code v-pre>Iterator</code> 接口的数据结构</p>
</li>
<li>
<p>成功：只有全部实例状态变成 <code v-pre>fulfilled</code> ，最终状态才会变成<code v-pre>fulfilled</code></p>
</li>
<li>
<p>失败：其中一个实例状态变成 <code v-pre>rejected</code> ，最终状态就会变成<code v-pre>rejected</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> p1 <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> p2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> p3 <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span>p1<span class="token punctuation">,</span>p2<span class="token punctuation">,</span>p3<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出[1,2,3]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>Promise.race()：将多个实例包装成一个新实例，返回全部实例状态优先变更后的结果(先变更先返回)</p>
<ul>
<li>入参：具有 <code v-pre>Iterator</code> 接口的数据结构</li>
<li>成功失败：哪个实例率先改变状态就返回哪个实例的状态</li>
</ul>
</li>
<li>
<p>Promise.resolve()：将对象转为Promise对象(等价于 <code v-pre>new Promise(resolve =&gt; resolve()))</code></p>
</li>
<li>
<p>Promise.reject()：将对象转为状态为 <code v-pre>rejected</code> 的Promise对象(等价于 <code v-pre>new Promise((resolve, reject) =&gt; reject()))</code></p>
</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span>
<span class="token comment">// 等价于</span>
<span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter">resolve</span> <span class="token operator">=></span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们在构造 <code v-pre>Promise</code> 的时候，构造函数内部的代码是立即执行的</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'new Promise'</span><span class="token punctuation">)</span>
  <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">'success'</span><span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'end'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'finish'</span><span class="token punctuation">)</span>

<span class="token comment">// 打印顺序</span>
<span class="token comment">// new Promise => end => finish</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Promise</code> 实现了链式调用，也就是说每次调用 <code v-pre>then</code> 之后返回的都是一个 <code v-pre>Promise</code>，并且是一个全新的 <code v-pre>Promise</code>，原因也是因为状态不可变。如果你在 <code v-pre>then</code> 中 使用了 <code v-pre>return</code>，那么 <code v-pre>return</code> 的值会被 <code v-pre>Promise.resolve()</code> 包装</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token comment">// => 1</span>
    <span class="token keyword">return</span> <span class="token number">2</span> <span class="token comment">// 包装成 Promise.resolve(2)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token comment">// => 2</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Promise</code> 解决了回调地狱的问题，可以把之前的回调地狱例子改写为如下代码：</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">ajax</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
      <span class="token keyword">return</span> <span class="token function">ajax</span><span class="token punctuation">(</span>url1<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
      <span class="token keyword">return</span> <span class="token function">ajax</span><span class="token punctuation">(</span>url2<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">总结</p>
<ul>
<li>只有异步操作的结果可决定当前状态是哪一种，其他操作都无法改变这个状态???</li>
<li>状态改变只有两种可能：从<code v-pre>pending</code>变为<code v-pre>resolved</code>、从<code v-pre>pending</code>变为<code v-pre>rejected</code></li>
<li>一旦新建<code v-pre>Promise</code>对象就会立即执行，无法中途取消</li>
<li>建议使用<code v-pre>catch()</code>捕获错误，不要使用<code v-pre>then()</code>第二个参数捕获</li>
<li><code v-pre>then()</code>返回新实例，其后可再调用另一个<code v-pre>then()</code></li>
<li><code v-pre>then()</code>运行中抛出错误会被<code v-pre>catch()</code>捕获</li>
<li><code v-pre>resolve()</code>和<code v-pre>reject()</code>的执行总是晚于本轮循环的同步任务</li>
<li>实例状态的错误具有<code v-pre>冒泡</code>性质，会一直向后传递直到被捕获为止，错误总是会被下一个<code v-pre>catch()</code>捕获</li>
<li><code v-pre>Promise</code> 中的错误是不会影响外层的运行，<code v-pre>window.onerror</code> 也是无法检测到的</li>
</ul>
</div>
<h2 id="async及await" tabindex="-1"><a class="header-anchor" href="#async及await"><span>async及await</span></a></h2>
<p>一个函数如果加上 <code v-pre>async</code> ，那么该函数就会返回一个 <code v-pre>Promise</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token string">'1'</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打印结果如下：
<img src="/promise.jpg" alt="alt"></p>
<p><code v-pre>async</code>就是将函数的返回值使用 <code v-pre>Promise.resolve()</code> 包裹了一下，和 <code v-pre>then</code> 中处理返回值一样，并且 <code v-pre>await</code> 只能配套 <code v-pre>async</code>使用</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token number">3</span> <span class="token comment">// await 后面跟的不是 Promise 的话，就会包装成 Promise.resolve(返回值)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>async</code> 和 <code v-pre>await</code> 可以说是异步终极解决方案了，相比直接使用 <code v-pre>Promise</code> 来说，优势在于处理 <code v-pre>then</code> 的调用链，能够更清晰准确的写出代码，毕竟写一大堆 <code v-pre>then</code> 也很恶心，并且也能优雅地解决回调地狱问题。当然也存在一些缺点，因为 <code v-pre>await</code> 将异步代码改造成了同步代码，如果多个异步代码没有依赖性却使用了 <code v-pre>await</code> 会导致性能上的降低。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 以下代码没有依赖性的话，完全可以使用 Promise.all 的方式</span>
  <span class="token comment">// 如果有依赖性的话，其实就是解决回调地狱的例子了</span>
  <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>
  <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span>url1<span class="token punctuation">)</span>
  <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span>url2<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="常用定时器函数" tabindex="-1"><a class="header-anchor" href="#常用定时器函数"><span>常用定时器函数</span></a></h2>
<p>常见的定时器函数有 setTimeout、setInterval、requestAnimationFrame。</p>
<h3 id="settimeout" tabindex="-1"><a class="header-anchor" href="#settimeout"><span>setTimeout</span></a></h3>
<p><code v-pre>setTimeout</code>延时执行某一段代码，但<code v-pre>setTimeout</code>由于EventLoop的存在，并不百分百是准时的，一个<code v-pre>setTimeout</code>可能会表示如下的形式：</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 延时1s之后，打印hello,world</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hello,world'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="setinterval" tabindex="-1"><a class="header-anchor" href="#setinterval"><span>setInterval</span></a></h3>
<p><code v-pre>setInterval</code>在指定的时间内，重复执行一段代码，与<code v-pre>setTimeout</code>类似，它也不是准时的，并且有时候及其不推荐使用<code v-pre>setInterval</code>定时器，因为它与某些耗时的代码配合使用的话，会存在执行积累的问题，它会等耗时操作结束后，一起一个或者多个执行定时器，存在性能问题。一个<code v-pre>setInterval</code>可能会表示如下的形式：</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hello,world'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="requestanimationframe" tabindex="-1"><a class="header-anchor" href="#requestanimationframe"><span>requestAnimationFrame</span></a></h3>
<p>翻译过来就是请求动画帧，它是html5专门用来设计请求动画的API，它与<code v-pre>setTimeout</code>相比有如下优势：</p>
<ul>
<li>根据不同屏幕的刷新频率，自动调整执行回调函数的时机。</li>
<li>当窗口处于未激活状态时，<code v-pre>requestAnimationFrame</code>会停止执行，而<code v-pre>setTimeout</code>不会</li>
<li>自带函数节流功能</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> progress <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  progress <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>progress <span class="token operator">&lt;=</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>progress<span class="token punctuation">)</span><span class="token punctuation">;</span>
    timer <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>render<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">cancelAnimationFrame</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//第一帧渲染</span>
window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>render<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


