<template><div><h1 id="react-进阶" tabindex="-1"><a class="header-anchor" href="#react-进阶"><span>React 进阶</span></a></h1>
<h2 id="jsx到底是什么" tabindex="-1"><a class="header-anchor" href="#jsx到底是什么"><span>JSX到底是什么</span></a></h2>
<p>JSX代码在执行前，会被Babel转换为React.createElement方法的调用，该方法在调用后会返回Virtual DOM对象，然后React再将Virtual DOM对象转换为真实的DOM对象，再将真实DOM渲染在页面上。</p>
<h2 id="virtual-dom-如何提升效率" tabindex="-1"><a class="header-anchor" href="#virtual-dom-如何提升效率"><span>Virtual DOM 如何提升效率</span></a></h2>
<p>精准找出发生变化的 DOM 对象，只更新发生变化的部分。</p>
<p>在 React 第一次创建 DOM 对象后，会为每个 DOM 对象创建其对应的 Virtual DOM 对象，在 DOM 对象发生更新之前，React 会先更新所有的 Virtual DOM 对象，然后 React 会将更新后的 Virtual DOM 和 更新前的 Virtual DOM 进行比较，从而找出发生变化的部分，React 会将发生变化的部分更新到真实的 DOM 对象中，React 仅更新必要更新的部分。</p>
<h2 id="虚拟dom实现原理" tabindex="-1"><a class="header-anchor" href="#虚拟dom实现原理"><span>虚拟DOM实现原理</span></a></h2>
<p><img src="/vdom.png" alt="alt"></p>
<p>按照图中的流程，我们依次来分析<code v-pre>虚拟DOM</code>的实现原理。</p>
<h3 id="jsx和createelement" tabindex="-1"><a class="header-anchor" href="#jsx和createelement"><span>JSX和createElement</span></a></h3>
<p>我们在实现一个<code v-pre>React</code>组件时可以选择两种编码方式</p>
<ul>
<li>第一种是使用<code v-pre>JSX</code>编写：</li>
</ul>
<div class="language-jsx line-numbers-mode" data-ext="jsx" data-title="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">class</span> <span class="token class-name">Hello</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">Hello Christine</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>第二种是直接使用<code v-pre>React.createElement</code>编写：</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Hello</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Hello Christine</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际上，上面两种写法是等价的，<code v-pre>JSX</code>只是为 <code v-pre>React.createElement(component, props, ...children)</code>方法提供的语法糖。也就是说所有的<code v-pre>JSX</code>代码最后都会转换成<code v-pre>React.createElement(...)</code>，<code v-pre>Babel</code>帮助我们完成了这个转换的过程。</p>
<p>如下面的<code v-pre>JSX</code></p>
<div class="language-jsx line-numbers-mode" data-ext="jsx" data-title="jsx"><pre v-pre class="language-jsx"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">
  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>avatar.png<span class="token punctuation">"</span></span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>profile<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">
  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Hello</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将会被<code v-pre>Babel</code>转换为</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"div"</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"img"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">src</span><span class="token operator">:</span> <span class="token string">"avatar.png"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">className</span><span class="token operator">:</span> <span class="token string">"profile"</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>Hello<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p><code v-pre>babel</code>在编译时会判断<code v-pre>JSX</code>中组件的首字母，当首字母为小写时，其被认定为原生<code v-pre>DOM</code>标签，<code v-pre>createElement</code>的第一个变量被编译为字符串；当首字母为大写时，其被认定为自定义组件，<code v-pre>createElement</code>的第一个变量被编译为对象；</p>
</div>
<p>另外，由于<code v-pre>JSX</code>提前要被<code v-pre>Babel</code>编译，所以<code v-pre>JSX</code>是不能在运行时动态选择类型的，比如下面的代码：</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx" data-title="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">function</span> <span class="token function">Story</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Wrong! JSX type can't be an expression.</span>
  <span class="token keyword">return</span> <span class="token operator">&lt;</span>components<span class="token punctuation">[</span>props<span class="token punctuation">.</span>storyType<span class="token punctuation">]</span> story<span class="token operator">=</span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>story<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要变成下面的写法：</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx" data-title="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">function</span> <span class="token function">Story</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Correct! JSX type can be a capitalized variable.</span>
  <span class="token keyword">const</span> SpecificStory <span class="token operator">=</span> components<span class="token punctuation">[</span>props<span class="token punctuation">.</span>storyType<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">SpecificStory</span></span> <span class="token attr-name">story</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>story<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，使用<code v-pre>JSX</code>你需要安装<code v-pre>Babel</code>插件<code v-pre>babel-plugin-transform-react-jsx</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token string-property property">"plugins"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token string">"transform-react-jsx"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token string-property property">"pragma"</span><span class="token operator">:</span> <span class="token string">"React.createElement"</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建虚拟dom" tabindex="-1"><a class="header-anchor" href="#创建虚拟dom"><span>创建虚拟DOM</span></a></h3>
<p>下面我们来看看虚拟<code v-pre>DOM</code>的真实模样，将下面的<code v-pre>JSX</code>代码在控制台打印出来：</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx" data-title="jsx"><pre v-pre class="language-jsx"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">
  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span><span class="token plain-text">Hello Christine</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span><span class="token plain-text">
  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">></span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span><span class="token plain-text">苹果</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span><span class="token plain-text">橘子</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span><span class="token plain-text">
  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span><span class="token plain-text">
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="/vdom2.jpg" alt="alt"></p>
<h2 id="fiber-节点的构建" tabindex="-1"><a class="header-anchor" href="#fiber-节点的构建"><span>Fiber 节点的构建</span></a></h2>
<p>下面的伪代码展示了 <code v-pre>fiber</code> 构建的过程：</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">workLoop</span><span class="token punctuation">(</span><span class="token parameter">deadline</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// requestIdleCallback 给 shouldYield 赋值，告诉我们浏览器是否空闲</span>
  <span class="token keyword">let</span> shouldYield <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>nextUnitOfWork <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>shouldYield<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    nextUnitOfWork <span class="token operator">=</span> <span class="token function">performUnitOfWork</span><span class="token punctuation">(</span>nextUnitOfWork<span class="token punctuation">)</span>
    shouldYield <span class="token operator">=</span> deadline<span class="token punctuation">.</span><span class="token function">timeRemaining</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">1</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 循环调用 workLoop</span>
  <span class="token function">requestIdleCallback</span><span class="token punctuation">(</span>workLoop<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">requestIdleCallback</span><span class="token punctuation">(</span>workLoop<span class="token punctuation">)</span>

<span class="token comment">// 构建完当前 fiber 节点后，会返回下一个待构建的节点 如：fiber.sibling、fiber.parent...</span>
<span class="token keyword">function</span> <span class="token function">performUnitOfWork</span><span class="token punctuation">(</span><span class="token parameter">nextUnitOfWork</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// TODO</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>deadline.timeRemaining()</code>的值为浮点数，用来表示当前闲置周期的预估剩余毫秒数。如果闲置期已经结束，则其值为 0。</li>
<li><code v-pre>requestIdleCallback</code>方法很简单：它需要传入一个 <code v-pre>callback</code>，浏览器会在空闲时去调用这个 <code v-pre>callback</code>，然后给这个 <code v-pre>callback</code> 传入一个 <code v-pre>IdleDeadline</code>，<code v-pre>IdleDeadline</code> 会预估一个剩余闲置时间，我们可以通过还剩多少闲置时间去判断，是否足够去执行下一个单元任务。</li>
<li><code v-pre>performUnitOfWork</code> 方法将传入的节点创建为 <code v-pre>Fiber</code> ，然后返回下一个待构建的节点并赋值给 <code v-pre>nextUnitOfWork</code>，同时还会将刚创建的 <code v-pre>Fiber</code> 与已创建的 <code v-pre>Fiber</code> 连接起来构成 Fiber 树。</li>
</ul>
<h3 id="render-阶段" tabindex="-1"><a class="header-anchor" href="#render-阶段"><span>render 阶段</span></a></h3>
<p><code v-pre>render</code> 阶段的开始，首先从 <code v-pre>rootFiber</code> 开始向下<strong>深度优先遍历</strong>，也就是不断 <code v-pre>while</code> 循环执行 <code v-pre>performUnitOfWork</code>，会经历<code v-pre>递</code>和<code v-pre>归</code>两个阶段。</p>
<p><strong>“递”阶段</strong></p>
<ul>
<li>向下遍历，每个遍历到的 <code v-pre>Fiber</code> 节点会调用 <code v-pre>beginWork</code> 方法。</li>
<li>该方法会根据传入的 <code v-pre>Fiber</code> 节点创建 <code v-pre>子Fiber</code> 节点，并将这两个 <code v-pre>Fiber</code> 节点连接起来。</li>
<li>当遍历到没有 <code v-pre>child</code> 的节点时就会进入“归”阶段。</li>
</ul>
<p><strong>“归”阶段</strong></p>
<p>在“归”阶段会调用 <code v-pre>completeWork</code> 处理 <code v-pre>Fiber</code> 节点。
当某个 <code v-pre>Fiber</code> 节点执行完 <code v-pre>completeWork</code>，如果其存在兄弟<code v-pre>Fiber</code>节点，会进入其<strong>兄弟Fiber</strong>的“递”阶段。
如果不存在<strong>兄弟Fiber</strong>，会进入<strong>父Fiber</strong>的“归”阶段。</p>
<h3 id="render-完成" tabindex="-1"><a class="header-anchor" href="#render-完成"><span>render 完成</span></a></h3>
<p>“递”和“归”阶段会交错执行直到“归”到 <code v-pre>rootFiber</code>。至此，<code v-pre>render</code> 阶段的工作就结束了。</p>
<h2 id="react-diff" tabindex="-1"><a class="header-anchor" href="#react-diff"><span>React Diff</span></a></h2>
<p><code v-pre>diff 算法</code>发生在两个阶段，分别是 <code v-pre>beginWork</code> 和 <code v-pre>completeWork</code> 阶段。</p>
<h3 id="diff-的瓶颈以及-react-如何应对" tabindex="-1"><a class="header-anchor" href="#diff-的瓶颈以及-react-如何应对"><span>Diff 的瓶颈以及 React 如何应对</span></a></h3>
<p>由于 <code v-pre>Diff</code> 操作本身也会带来性能损耗，React 文档中提到，即使在最前沿的算法中，将前后两棵树完全比对的算法的复杂程度为 O(n 3 )，其中 n 是树中元素的数量。
如果在 React 中使用了该算法，那么展示 1000 个元素所需要执行的计算量将在十亿的量级范围。这个开销实在是太过高昂。
为了降低算法复杂度，React 的 diff 会预设三个限制：</p>
<ol>
<li>只进行<code v-pre>同层比较</code>。</li>
<li>新、旧节点的 <code v-pre>type</code> 不同，直接<code v-pre>删除</code>旧节点，<code v-pre>创建</code>新节点。如：元素由 <code v-pre>div</code> 变为 <code v-pre>p</code>，React会<code v-pre>销毁</code>div<code v-pre>及其子孙节点</code>，<code v-pre>并新建</code> p <code v-pre>及其子孙节点</code>。</li>
<li>通过 <code v-pre>key</code> 来<code v-pre>复用</code>节点。</li>
</ol>
<p><a href="https://juejin.cn/post/7212918899867041849#heading-0" target="_blank" rel="noopener noreferrer">一文讲通React的diff过程<ExternalLinkIcon/></a></p>
</div></template>


