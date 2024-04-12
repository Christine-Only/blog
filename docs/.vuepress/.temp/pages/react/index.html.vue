<template><div><h1 id="react-基础" tabindex="-1"><a class="header-anchor" href="#react-基础"><span>React 基础</span></a></h1>
<h2 id="新旧生命周期对比" tabindex="-1"><a class="header-anchor" href="#新旧生命周期对比"><span>新旧生命周期对比</span></a></h2>
<p>React从v16.3的版本开始， 对生命周期的钩子进行了渐进式的调整，分别废弃和新增了一些生命周期的钩子函数。</p>
<h3 id="旧生命周期" tabindex="-1"><a class="header-anchor" href="#旧生命周期"><span>旧生命周期</span></a></h3>
<p><img src="/blog/oldLifeCycle.png" alt="alt"></p>
<p>挂载</p>
<ul>
<li>constructor：组件挂载之前被调用，可以初始化state，为事件处理函数 绑定实例</li>
<li>componentWillMount：组件加载时调用，组件更新不调用，整个生命周期只调用一次，此时可以修改state</li>
<li>render：react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行</li>
<li>componentDidMount：组件渲染之后调用，只调用一次</li>
</ul>
<p>更新</p>
<ul>
<li>componentWillReceiveProps(nextProps)：组件加载时不调用，组件接受新的props时调用</li>
<li>shouldComponentUpdate(nextProps, nextState)：组件接收到新的props或者state时调用，return true就会更新dom（使用diff算法更新），return false能阻止更新（不调用render）</li>
<li>componentWillUpdate(nextProps, nextState)：组件加载时不调用，只有在组件将要更新时才调用，此时可以修改state</li>
<li>render：react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行</li>
<li>componentDidUpdate：组件加载时不调用，组件更新完成后调用</li>
</ul>
<p>卸载</p>
<ul>
<li>componentWillUnmount：组件卸载及销毁之前直接调用，只调用一次</li>
</ul>
<p>基本用法</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">OldReactComponent</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  state <span class="token operator">=</span> <span class="token punctuation">{</span>

  <span class="token punctuation">}</span>
  <span class="token function">componentWillMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 组件挂载前触发</span>

  <span class="token punctuation">}</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span>h2<span class="token operator">></span>Old React<span class="token punctuation">.</span>Component<span class="token operator">&lt;</span><span class="token operator">/</span>h2<span class="token operator">></span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 组件挂载后触发</span>

  <span class="token punctuation">}</span>
  <span class="token function">componentWillReceiveProps</span><span class="token punctuation">(</span><span class="token parameter">nextProps</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 接收到新的props时触发</span>

  <span class="token punctuation">}</span>
  <span class="token function">shouldComponentUpdate</span><span class="token punctuation">(</span><span class="token parameter">nextProps<span class="token punctuation">,</span> nextState</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 组件Props或者state改变时触发，true：更新，false：不更新</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
  <span class="token function">componentWillUpdate</span><span class="token punctuation">(</span><span class="token parameter">nextProps<span class="token punctuation">,</span> nextState</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 组件更新前触发</span>

  <span class="token punctuation">}</span>
  <span class="token function">componentDidUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 组件更新后触发</span>

  <span class="token punctuation">}</span>
  <span class="token function">componentWillUnmount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 组件卸载时触发</span>

  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="新生命周期" tabindex="-1"><a class="header-anchor" href="#新生命周期"><span>新生命周期</span></a></h3>
<p><img src="/blog/newLifeCycle.png" alt="alt"></p>
<p>挂载</p>
<ul>
<li>constructor：组件挂载之前被调用，可以初始化state，为事件处理函数 绑定实例</li>
<li>getDerivedStateFromProps(nextProps, state)：接收父组件传递过来的 <code v-pre>props</code> 和组件之前的状态，返回一个对象来更新 <code v-pre>state</code> 或者返回 <code v-pre>null</code> 来表示接收到的 <code v-pre>props</code> 没有变化，不需要更新 <code v-pre>state</code> ；配合 <code v-pre>componentDidUpdate</code> ，可以覆盖 <code v-pre>componentWillReceiveProps</code> 的所有用法</li>
<li>render：react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行</li>
<li>componentDidMount：组件渲染之后调用，只调用一次</li>
</ul>
<p>更新</p>
<ul>
<li>getDerivedStateFromProps(nextProps, state)：接收父组件传递过来的 <code v-pre>props</code> 和组件之前的状态，返回一个对象来更新 <code v-pre>state</code> 或者返回 <code v-pre>null</code> 来表示接收到的 <code v-pre>props</code> 没有变化，不需要更新 <code v-pre>state</code> ；配合 <code v-pre>componentDidUpdate</code> ，可以覆盖 <code v-pre>componentWillReceiveProps</code> 的所有用法</li>
<li>shouldComponentUpdate(nextProps, nextState)：组件接收到新的props或者state时调用，return true就会更新dom（使用diff算法更新），return false能阻止更新（不调用render）</li>
<li>render：react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行</li>
<li>getSnapshotBeforeUpdate(prevProps, prevState)：触发时间: update发生的时候，在render之后，在组件dom渲染之前；返回一个值，作为componentDidUpdate的第三个参数；配合componentDidUpdate, 可以覆盖componentWillUpdate的所有用法</li>
<li>componentDidUpdate：组件加载时不调用，组件更新完成后调用</li>
</ul>
<p>卸载</p>
<ul>
<li>componentWillUnmount：组件卸载及销毁之前直接调用，只调用一次</li>
</ul>
<p>错误处理</p>
<ul>
<li>componentDidCatch(error，info)：</li>
</ul>
<p>基本用法</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">NewReactComponent</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  state <span class="token operator">=</span> <span class="token punctuation">{</span>

  <span class="token punctuation">}</span>
  <span class="token keyword">static</span> <span class="token function">getDerivedStateFromProps</span><span class="token punctuation">(</span><span class="token parameter">props<span class="token punctuation">,</span> state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 组件每次被rerender的时候，包括在组件构建之后(虚拟dom之后，实际dom挂载之前)，每次获取新的props或state之后；;每次接收新的props之后都会返回一个对象作为新的state，返回null则说明不需要更新state</span>
    <span class="token keyword">return</span> state
  <span class="token punctuation">}</span>
  <span class="token function">componentDidCatch</span><span class="token punctuation">(</span><span class="token parameter">error<span class="token punctuation">,</span> info</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 获取到javascript错误</span>

  <span class="token punctuation">}</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token operator">&lt;</span>h2<span class="token operator">></span>New React<span class="token punctuation">.</span>Component<span class="token operator">&lt;</span><span class="token operator">/</span>h2<span class="token operator">></span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 挂载后</span>

  <span class="token punctuation">}</span>
  <span class="token function">shouldComponentUpdate</span><span class="token punctuation">(</span><span class="token parameter">nextProps<span class="token punctuation">,</span> nextState</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 组件Props或者state改变时触发，true：更新，false：不更新</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
  <span class="token function">getSnapshotBeforeUpdate</span><span class="token punctuation">(</span><span class="token parameter">prevProps<span class="token punctuation">,</span> prevState</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 组件更新前触发</span>

  <span class="token punctuation">}</span>
  <span class="token function">componentDidUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 组件更新后触发</span>

  <span class="token punctuation">}</span>
  <span class="token function">componentWillUnmount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 组件卸载时触发</span>

  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">总结</p>
<ol>
<li>React16新的生命周期弃用了<code v-pre>componentWillMount</code>、<code v-pre>componentWillReceiveProps</code>，<code v-pre>componentWillUpdate</code></li>
<li>新增了<code v-pre>getDerivedStateFromProps</code>、<code v-pre>getSnapshotBeforeUpdate</code>来代替弃用的三个钩子函数（componentWillMount、componentWillReceiveProps，componentWillUpdate</li>
<li>React16并没有删除这三个钩子函数，但是不能和新增的钩子函数（getDerivedStateFromProps、getSnapshotBeforeUpdate）混用</li>
<li>新增了对错误的处理（<code v-pre>componentDidCatch</code>）</li>
</ol>
</div>
<p>参考链接：</p>
<ul>
<li><a href="https://juejin.cn/post/6844904021233238024#comment" target="_blank" rel="noopener noreferrer">你真的了解 React 生命周期吗<ExternalLinkIcon/></a></li>
</ul>
<h2 id="setstate" tabindex="-1"><a class="header-anchor" href="#setstate"><span>setState</span></a></h2>
<ul>
<li>参考文章<a href="https://juejin.cn/post/6844903781813993486" target="_blank" rel="noopener noreferrer">【React深入】setState的执行机制<ExternalLinkIcon/></a></li>
</ul>
<h2 id="高阶组件-hoc" tabindex="-1"><a class="header-anchor" href="#高阶组件-hoc"><span>高阶组件（HOC）</span></a></h2>
<p>在 React 中，高阶组件（HOC）是一个接收组件作为参数并返回一个新组件的函数。换句话说，它是一种组件的转换器。高阶组件通常用于在组件之间复用逻辑，例如状态管理、数据获取、访问控制等。</p>
<ul>
<li>在线运行 <a href="https://codesandbox.io/s/gao-jie-zu-jian-hoc-ns7lw3" target="_blank" rel="noopener noreferrer">传送门<ExternalLinkIcon/></a></li>
<li>参考文章 <a href="https://juejin.cn/post/7220677873584734268" target="_blank" rel="noopener noreferrer">高阶组件（HOC）在 React 中的应用<ExternalLinkIcon/></a></li>
</ul>
</div></template>


