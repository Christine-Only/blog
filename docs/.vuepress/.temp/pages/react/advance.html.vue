<template><div><h1 id="react-进阶" tabindex="-1"><a class="header-anchor" href="#react-进阶"><span>React 进阶</span></a></h1>
<h2 id="jsx到底是什么" tabindex="-1"><a class="header-anchor" href="#jsx到底是什么"><span>JSX到底是什么</span></a></h2>
<p>JSX代码在执行前，会被<code v-pre>Babel</code>转换为<code v-pre>React.createElement</code>方法的调用，该方法在调用后会返回<code v-pre>Virtual DOM</code>对象，然后React再将<code v-pre>Virtual DOM</code>对象转换为真实的DOM对象，再将真实DOM渲染在页面上。</p>
<h2 id="virtual-dom-如何提升效率" tabindex="-1"><a class="header-anchor" href="#virtual-dom-如何提升效率"><span>Virtual DOM 如何提升效率</span></a></h2>
<p>精准找出发生变化的 DOM 对象，只更新发生变化的部分。</p>
<p>在 React 第一次创建 DOM 对象后，会为每个 DOM 对象创建其对应的 Virtual DOM 对象，在 DOM 对象发生更新之前，React 会先更新所有的 Virtual DOM 对象，然后 React 会将更新后的 Virtual DOM 和 更新前的 Virtual DOM 进行比较，从而找出发生变化的部分，React 会将发生变化的部分更新到真实的 DOM 对象中，React 仅更新必要更新的部分。</p>
<h2 id="虚拟dom实现原理" tabindex="-1"><a class="header-anchor" href="#虚拟dom实现原理"><span>虚拟DOM实现原理</span></a></h2>
<p><img src="/vdom.png" alt="alt"></p>
<p>按照图中的流程，我们依次来分析<code v-pre>虚拟DOM</code>的实现原理。</p>
<h3 id="jsx-和-createelement" tabindex="-1"><a class="header-anchor" href="#jsx-和-createelement"><span>JSX 和 createElement</span></a></h3>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，使用<code v-pre>JSX</code>时，需要安装<code v-pre>Babel</code>插件：</p>
<ul>
<li>@babel/core</li>
<li>@babel/preset-env</li>
<li>@babel/preset-react</li>
<li>babel-loader</li>
</ul>
<p>在 webpack 配置文件中，需要为 JavaScript 文件添加一个规则，让 babel-loader 可以运行。通常在webpack.config.js文件的module-&gt;rules数组中添加以下内容：</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
      <span class="token literal-property property">exclude</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(node_modules)</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
      <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">'babel-loader'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">presets</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'@babel/preset-env'</span><span class="token punctuation">,</span> <span class="token string">'@babel/preset-react'</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建和配置 Babel 的配置文件（<code v-pre>.babelrc</code> 或 <code v-pre>babel.config.json</code>） ，<code v-pre>@babel/preset-react</code> 是负责将 JSX 转换为 React.createElement 的 preset。</p>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"presets"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"@babel/preset-env"</span><span class="token punctuation">,</span> <span class="token string">"@babel/preset-react"</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="全新的-jsx-转换器" tabindex="-1"><a class="header-anchor" href="#全新的-jsx-转换器"><span>全新的 JSX 转换器</span></a></h3>
<p>总结下来就是两点：</p>
<ul>
<li>用 jsx() 函数替换 React.createElement()</li>
<li>运行时自动引入 jsx() 函数，无需手写引入react</li>
</ul>
<p>在<strong>v16</strong>中，我们写一个React组件，总要引入</p>
<div class="language-tsx line-numbers-mode" data-ext="tsx" data-title="tsx"><pre v-pre class="language-tsx"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'react'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这是因为在浏览器中无法直接使用 jsx，所以要借助工具如@babel/preset-react将 jsx 语法转换为 React.createElement 的 js 代码，所以需要显式引入 React，才能正常调用 createElement。
v17之后，React 与 Babel 官方进行合作，直接通过将 react/jsx-runtime 对 jsx 语法进行了新的转换而不依赖</p>
<h3 id="创建虚拟dom" tabindex="-1"><a class="header-anchor" href="#创建虚拟dom"><span>创建虚拟DOM</span></a></h3>
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
<h2 id="协调算法" tabindex="-1"><a class="header-anchor" href="#协调算法"><span>协调算法</span></a></h2>
<p>React的协调算法（也称作Reconciliation）是一种高效地比较和更新虚拟DOM树的算法，它解决的主要问题是在存在大量组件及元素时，如何有效地更新DOM，使页面渲染性能最优化。</p>
<p>具体地，协调算法解决以下几个问题：</p>
<ul>
<li><strong>确定哪些组件和DOM元素需要更新</strong>: 当状态或者属性发生变化时，React需要确定哪些组件和元素需要重新渲染。协调算法通过比较新旧虚拟DOM树，快速找出需要更新的部分，减少不必要的渲染操作。</li>
<li><strong>最小化DOM操作数量</strong>: 直接操作DOM是昂贵的，因此React尽力减少实际DOM操作的数量。协调算法通过只变更差异部分的方法，确保了只在必须的地方进行DOM操作。</li>
<li><strong>持续性能优化</strong>: 协调算法在不断优化过程中提升性能，应用的规模并不会对React应用的性能产生负面影响。</li>
<li><strong>提供稳定的组件_id_和_key_</strong>: 在应用中，通常会出现大量相似或相同类型的元素列表，如何快速准确地识别它们就变得尤为重要。通过React提供的key属性，协调算法能够更好地追踪哪些元素发生了变化，从而减少重绘和重排，提升渲染性能。</li>
</ul>
<h2 id="学习博客" tabindex="-1"><a class="header-anchor" href="#学习博客"><span>学习博客</span></a></h2>
<p><a href="https://react.iamkasong.com/process/fiber.html#fiber%E7%9A%84%E7%BB%93%E6%9E%84" target="_blank" rel="noopener noreferrer">React技术揭秘<ExternalLinkIcon/></a></p>
</div></template>


