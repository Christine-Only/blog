<template><div><h1 id="event-loop" tabindex="-1"><a class="header-anchor" href="#event-loop"><span>Event Loop</span></a></h1>
<h2 id="进程和线程" tabindex="-1"><a class="header-anchor" href="#进程和线程"><span>进程和线程</span></a></h2>
<h3 id="进程" tabindex="-1"><a class="header-anchor" href="#进程"><span>进程</span></a></h3>
<blockquote>
<p>一个进程就是CPU执行的单个任务的过程，<strong>是程序在执行过程当中CPU资源分配的最小单位</strong>，并且进程都有自己的地址空间，包含了运行态、就绪态、阻塞态、创建态、终止态五个状态。</p>
</blockquote>
<h3 id="线程" tabindex="-1"><a class="header-anchor" href="#线程"><span>线程</span></a></h3>
<blockquote>
<p><strong>线程是CPU调度的最小单位</strong>，它可以和属于同一个进程的其他线程共享这个进程的全部资源。</p>
</blockquote>
<h3 id="两者之间的关系" tabindex="-1"><a class="header-anchor" href="#两者之间的关系"><span>两者之间的关系</span></a></h3>
<p>一个进程包含多个线程，一个线程只能在一个进程之中。每一个进程最少包含一个线程。</p>
<h3 id="两者之间的区别" tabindex="-1"><a class="header-anchor" href="#两者之间的区别"><span>两者之间的区别</span></a></h3>
<ol>
<li>进程是CPU资源分配的最小单位，线程是CPU调度的最小单位；</li>
<li>进程之间的切换开销比较大，但是线程之间的切换开销比较小。</li>
<li>CPU会把资源分配给进程，但是线程几乎不拥有任何的系统资源。因为线程之间是共享同一个进程的，所以线程之间的通信几乎不需要系统的干扰。</li>
</ol>
<p><strong>举个例子能够帮助更好的理解进程和线程：</strong></p>
<p>当你打开一个 Tab 页时，其实就是创建了一个进程，一个进程中可以有多个线程，比如渲染线程、JS 引擎线程、HTTP 请求线程等等。当你发起一个请求时，其实就是创建了一个线程，当请求结束后，该线程可能就会被销毁。</p>
<p>JS 引擎线程和渲染线程，大家应该都知道，在 JS 运行的时候可能会阻止 UI 渲染，这说明了两个线程是互斥的。这其中的原因是因为 JS 可以修改 DOM，如果在 JS 执行的时候 UI 线程还在工作，就可能导致不能安全的渲染 UI。这其实也是一个单线程的好处，得益于 JS 是单线程运行的，可以达到节省内存，节约上下文切换时间，没有锁的问题的好处。当然前面两点在服务端中更容易体现，对于锁的问题，形象的来说就是当我读取一个数字 15 的时候，同时有两个操作对数字进行了加减，这时候结果就出现了错误。解决这个问题也不难，只需要在读取的时候加锁，直到读取完毕之前都不能进行写入操作。</p>
<h2 id="执行上下文-execution-context" tabindex="-1"><a class="header-anchor" href="#执行上下文-execution-context"><span>执行上下文（Execution Context）</span></a></h2>
<h3 id="什么是执行上下文" tabindex="-1"><a class="header-anchor" href="#什么是执行上下文"><span>什么是执行上下文</span></a></h3>
<blockquote>
<p>简而言之，执行上下文就是当前 JavaScript 代码被解析和执行时所在环境的抽象概念， JavaScript 中运行任何的代码都是在执行上下文中运行</p>
</blockquote>
<h3 id="执行上下文的类型" tabindex="-1"><a class="header-anchor" href="#执行上下文的类型"><span>执行上下文的类型</span></a></h3>
<ul>
<li>全局执行上下文： 这是默认的、最基础的执行上下文。不在任何函数中的代码都位于全局执行上下文中。它做了两件事：
<ul>
<li>创建一个全局对象，在浏览器中这个全局对象就是 window 对象。</li>
<li>将 this 指针指向这个全局对象。一个程序中只能存在一个全局执行上下文。</li>
</ul>
</li>
<li>函数执行上下文： 每次调用函数时，都会为该函数创建一个新的执行上下文。每个函数都拥有自己的执行上下文，但是只有在函数被调用的时候才会被创建。一个程序中可以存在任意数量的函数执行上下文。</li>
</ul>
<h3 id="执行上下文的生命周期" tabindex="-1"><a class="header-anchor" href="#执行上下文的生命周期"><span>执行上下文的生命周期</span></a></h3>
<p>执行上下文的生命周期包括三个阶段：<strong>创建阶段→执行阶段→回收阶段</strong>。</p>
<h2 id="执行栈" tabindex="-1"><a class="header-anchor" href="#执行栈"><span>执行栈</span></a></h2>
<p>JavaScript 引擎创建了执行栈来管理执行上下文。可以把执行栈认为是一个存储函数调用的栈结构，遵循<code v-pre>先进后出</code>的原则。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'error'</span><span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">111</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码详解：</p>
<ul>
<li>调用 bar 函数时，此时 bar 函数内部代码还未执行，js执行引擎立即创建一个 bar 的执行上下文（简称EC），然后把这执行上下文压入到执行栈（简称ECStack）中。</li>
<li>执行 bar 函数过程中，调用 foo 函数，同样地，foo 函数执行之前也创建了一个 foo 的执行上下文，并压入到执行栈中。</li>
<li>foo 函数执行过程中遇到错误，把错误抛出并弹出栈。</li>
</ul>
<h2 id="event-loop-1" tabindex="-1"><a class="header-anchor" href="#event-loop-1"><span>Event Loop</span></a></h2>
<blockquote>
<p>在 <code v-pre>JavaScript</code> 中，任务被分为两种，一种宏任务（<code v-pre>MacroTask</code>）也叫 <code v-pre>Task</code>，一种叫微任务（<code v-pre>MicroTask</code>）。</p>
</blockquote>
<h3 id="macrotask-宏任务" tabindex="-1"><a class="header-anchor" href="#macrotask-宏任务"><span>MacroTask（宏任务）</span></a></h3>
<p><code v-pre>script</code>全部代码、<code v-pre>setTimeout</code>、<code v-pre>setInterval</code>、<code v-pre>setImmediate</code>（浏览器暂时不支持，只有IE10支持，具体可见MDN）、<code v-pre>I/O</code>、<code v-pre>UI Rendering</code>。</p>
<h3 id="microtask-微任务" tabindex="-1"><a class="header-anchor" href="#microtask-微任务"><span>MicroTask（微任务）</span></a></h3>
<p><code v-pre>Process.nextTick（Node独有</code>）、<code v-pre>Promise</code>、<s><code v-pre>Object.observe</code>(废弃)</s>、<code v-pre>MutationObserver</code><a href="http://javascript.ruanyifeng.com/dom/mutationobserver.html" target="_blank" rel="noopener noreferrer">具体使用方式查看<ExternalLinkIcon/></a></p>
<h3 id="浏览器中的event-loop" tabindex="-1"><a class="header-anchor" href="#浏览器中的event-loop"><span>浏览器中的Event Loop</span></a></h3>
<p><code v-pre>Javascript</code> 有一个 <code v-pre>main thread</code> 主线程和 <code v-pre>call-stack</code> 调用栈(执行栈)，所有的任务都会被放到调用栈等待主线程执行。</p>
<p><img src="/eventLoop.png" alt="alt"></p>
<div class="custom-container tip"><p class="custom-container-title">总结</p>
<ul>
<li>执行栈在执行完<code v-pre>同步任务</code>后，查看执行栈是否为空，如果执行栈为空，就会去检查<code v-pre>微任务</code>(<code v-pre>microTask</code>)队列是否为空，如果微任务队列为空的话，就执行<code v-pre>Task</code>（宏任务）；如果微任务队列不为空的话，就一次性执行完所有的微任务。</li>
<li>每次单个<code v-pre>宏任务</code>执行完毕后，会去检查<code v-pre>微任务</code>(<code v-pre>microTask</code>)队列是否为空，如果不为空的话，会按照先入先出的规则全部执行完微任务(microTask)后，设置<code v-pre>微任务</code>(<code v-pre>microTask</code>)队列为<code v-pre>null</code>，然后再执行<code v-pre>宏任务</code>，如此循环。</li>
</ul>
</div>
<p>🌰：</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'script start'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'setTimeout'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise1'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise2'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'script end'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//script start => script end => promise1 => promise2 => setTimeout</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码执行过程可以参考<a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/" target="_blank" rel="noopener noreferrer">tasks-microtasks-queues-and-schedules<ExternalLinkIcon/></a></p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'script start'</span><span class="token punctuation">)</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">async1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">await</span> <span class="token function">async2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'async1 end'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">async2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'async2 end'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">async1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'setTimeout'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>

<span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter">resolve</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Promise'</span><span class="token punctuation">)</span>
  <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise1'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise2'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'script end'</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>async/await</code> 在底层转换成了 <code v-pre>promise</code> 和 <code v-pre>then</code> 回调函数。
每次我们使用 <code v-pre>await</code>, 解释器都创建一个 <code v-pre>promise</code> 对象，然后把剩下的 <code v-pre>async</code> 函数中的操作放到 <code v-pre>then</code> 回调函数中。</p>
<p>我们可以把上面两个async函数改造成下面的代码</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'async2 end'</span><span class="token punctuation">)</span>
  <span class="token comment">// Promise.resolve() 将代码插入微任务队列尾部</span>
  <span class="token comment">// resolve 再次插入微任务队列尾部</span>
  <span class="token function">resolve</span><span class="token punctuation">(</span>Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'async1 end'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关于73以下版本和73版本的区别" tabindex="-1"><a class="header-anchor" href="#关于73以下版本和73版本的区别"><span>关于73以下版本和73版本的区别</span></a></h3>
<ul>
<li>在老版本版本以下，先执行<code v-pre>promise1</code>和<code v-pre>promise2</code>，再执行<code v-pre>async1</code>。</li>
<li>在73版本，先执行<code v-pre>async1</code>再执行<code v-pre>promise1</code>和<code v-pre>promise2</code>。</li>
</ul>
<p>代码详解：</p>
<h4 id="_73以下版本" tabindex="-1"><a class="header-anchor" href="#_73以下版本"><span>73以下版本</span></a></h4>
<ul>
<li>首先，打印<code v-pre>script start</code>，调用<code v-pre>async1()</code>时，返回一个<code v-pre>Promise</code>，所以打印出来<code v-pre>async2 end</code>。</li>
<li>每个 <code v-pre>await</code>，会新产生一个<code v-pre>promise</code>，但这个过程本身是异步的，所以该await后面不会立即调用。</li>
<li>继续执行同步代码，打印<code v-pre>Promise</code>和<code v-pre>script end</code>，将<code v-pre>then</code>函数放入微任务队列中等待执行。</li>
<li>同步执行完成之后，检查微任务队列是否为<code v-pre>null</code>，然后按照先入先出规则，依次执行。</li>
<li>然后先执行打印<code v-pre>promise1</code>，此时<code v-pre>then</code>的回调函数返回<code v-pre>undefined</code>，此时又有<code v-pre>then</code>的链式调用，又放入微任务队列中，再次打印<code v-pre>promise2</code>。</li>
<li>再回到<code v-pre>await</code>的位置执行返回的 <code v-pre>Promise</code> 的 <code v-pre>resolve</code> 函数，这又会把 <code v-pre>resolve</code> 丢到微任务队列中，打印<code v-pre>async1 end</code>。</li>
<li>当微任务队列为空时，执行宏任务，打印<code v-pre>setTimeout</code>。</li>
</ul>
<h4 id="谷歌-金丝雀73版本" tabindex="-1"><a class="header-anchor" href="#谷歌-金丝雀73版本"><span>谷歌（金丝雀73版本）</span></a></h4>
<ul>
<li>如果传递给 <code v-pre>await</code> 的值已经是一个 <code v-pre>Promise</code>，那么这种优化避免了再次创建 <code v-pre>Promise</code> 包装器，在这种情况下，我们从最少三个 <code v-pre>microtick</code> 到只有一个 <code v-pre>microtick</code>。</li>
<li>引擎不再需要为 <code v-pre>await</code> 创造 <code v-pre>throwaway Promise</code> - 在绝大部分时间。</li>
<li>现在 <code v-pre>promise</code> 指向了同一个 <code v-pre>Promise</code>，所以这个步骤什么也不需要做。然后引擎继续像以前一样，创建 <code v-pre>throwaway Promise</code>，安排 <code v-pre>PromiseReactionJob</code> 在<code v-pre>microtask</code> 队列的下一个 <code v-pre>tick</code> 上恢复异步函数，暂停执行该函数，然后返回给调用者。</li>
</ul>
<p>具体详情查看<a href="https://v8.js.cn/fast-async/" target="_blank" rel="noopener noreferrer">这里<ExternalLinkIcon/></a></p>
</div></template>


