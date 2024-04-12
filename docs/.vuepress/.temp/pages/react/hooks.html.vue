<template><div><h1 id="react-hooks" tabindex="-1"><a class="header-anchor" href="#react-hooks"><span>React hooks</span></a></h1>
<h2 id="usecontext" tabindex="-1"><a class="header-anchor" href="#usecontext"><span>useContext</span></a></h2>
<p>一、React.createContext</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> MyContext <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createContext</span><span class="token punctuation">(</span>defaultValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建一个 <code v-pre>Context</code> 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 <code v-pre>Provider</code> 中读取到当前的 context 值。</p>
<p>只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。此默认值有助于在不使用 Provider 包装组件的情况下对组件进行测试。注意：将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效。</p>
<p>二、使用 useContext 获取上下文</p>
<p>接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 &lt;MyContext.Provider&gt; 的 value prop 决定。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">useContext</span><span class="token punctuation">(</span>MyContext<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果父子组件不在同一个目录中，如何共享 Mycontext这个 context实例呢？</p>
<p>一般这种情况下，我会通过 Context Manager 统一管理上下文的实例，然后通过 <code v-pre>export</code> 将实例导出，在子组件中在将实例 <code v-pre>import</code> 进来。</p>
<p>三、createContext 和 useContext 结合使用实现方法共享</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// a.jsx</span>
<span class="token keyword">const</span> themes <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">light</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">foreground</span><span class="token operator">:</span> <span class="token string">"#000000"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">background</span><span class="token operator">:</span> <span class="token string">"#eeeeee"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">dark</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">foreground</span><span class="token operator">:</span> <span class="token string">"#ffffff"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">background</span><span class="token operator">:</span> <span class="token string">"#222222"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> ThemeContext <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createContext</span><span class="token punctuation">(</span>themes<span class="token punctuation">.</span>light<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">App</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>ThemeContext<span class="token punctuation">.</span>Provider value<span class="token operator">=</span><span class="token punctuation">{</span>themes<span class="token punctuation">.</span>dark<span class="token punctuation">}</span><span class="token operator">></span>
      <span class="token operator">&lt;</span>Toolbar <span class="token operator">/</span><span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>ThemeContext<span class="token punctuation">.</span>Provider<span class="token operator">></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// b.jsx</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ThemeContext <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./a.jsx'</span>
<span class="token keyword">const</span> <span class="token function-variable function">Toolbar</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> theme <span class="token operator">=</span> <span class="token function">useContext</span><span class="token punctuation">(</span>ThemeContext<span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div style<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token literal-property property">background</span><span class="token operator">:</span> theme<span class="token punctuation">.</span>background<span class="token punctuation">,</span> <span class="token literal-property property">color</span><span class="token operator">:</span> theme<span class="token punctuation">.</span>foreground <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">></span>
      <span class="token constant">I</span> am styled by theme context<span class="token operator">!</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="useref" tabindex="-1"><a class="header-anchor" href="#useref"><span>useRef</span></a></h2>
<p>首先， 我们要实现一个需求 -- 点击 button 的时候 input 设置焦点。</p>
<h3 id="createref-api" tabindex="-1"><a class="header-anchor" href="#createref-api"><span>createRef API</span></a></h3>
<div class="language-tsx line-numbers-mode" data-ext="tsx" data-title="tsx"><pre v-pre class="language-tsx"><code><span class="token keyword">const</span> <span class="token function-variable function">FocusInput</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> inputElement <span class="token operator">=</span> <span class="token function">createRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token function-variable function">handleFocusInput</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    inputElement<span class="token punctuation">.</span>current<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span></span><span class="token punctuation">></span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>inputElement<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>handleFocusInput<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">Focus Input</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span></span><span class="token punctuation">></span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样的，我们可以使用 useRef 来实现完全相同的结果。</p>
<h3 id="useref-1" tabindex="-1"><a class="header-anchor" href="#useref-1"><span>useRef</span></a></h3>
<div class="language-tsx line-numbers-mode" data-ext="tsx" data-title="tsx"><pre v-pre class="language-tsx"><code><span class="token keyword">const</span> <span class="token function-variable function">FocusInputHook</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> inputElement <span class="token operator">=</span> <span class="token function">useRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token function-variable function">handleFocusInput</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    inputElement<span class="token punctuation">.</span>current<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span></span><span class="token punctuation">></span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>inputElement<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>handleFocusInput<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">Focus Input Hook</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span></span><span class="token punctuation">></span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="createref-与-useref-的区别" tabindex="-1"><a class="header-anchor" href="#createref-与-useref-的区别"><span>createRef 与 useRef 的区别</span></a></h3>
<ul>
<li>
<p>useRef 在 React Hooks 中的作用， 正如官网说的，它像一个变量， 类似于 this，它就像一个盒子，你可以存放任何东西。</p>
</li>
<li>
<p>createRef 每次渲染都会返回一个新的引用，而 useRef 每次都会返回相同的引用。</p>
</li>
</ul>
<h2 id="error-boundaries" tabindex="-1"><a class="header-anchor" href="#error-boundaries"><span>Error boundaries</span></a></h2>
<blockquote>
<p>Error boundaries 是 React 组件，它会在其子组件树中的任何位置捕获 JavaScript 错误，并记录这些错误。</p>
</blockquote>
<p>如果 class 组件定义了生命周期方法 <code v-pre>static getDerivedStateFromError()</code> 或 <code v-pre>componentDidCatch()</code> 中的任何一个（或两者），它就成为了 <code v-pre>Error boundaries</code>。通过生命周期更新 state 可让组件捕获树中未处理的 JavaScript 错误并展示降级 UI。</p>
<div class="custom-container tip"><p class="custom-container-title">注意</p>
<p>Error boundaries 仅捕获组件树中以下组件中的错误。但它本身的错误无法捕获。</p>
</div>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">ErrorBoundary</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>
  state <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">error</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">static</span> <span class="token function">getDerivedStateFromError</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 更新 state，下次渲染可以展示错误相关的 UI</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">error</span><span class="token operator">:</span> error <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">componentDidCatch</span><span class="token punctuation">(</span><span class="token parameter">error<span class="token punctuation">,</span> info</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 错误上报</span>
    <span class="token function">logErrorToMyService</span><span class="token punctuation">(</span>error<span class="token punctuation">,</span> info<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 渲染出错时的 UI</span>
      <span class="token keyword">return</span> <span class="token operator">&lt;</span>h1<span class="token operator">></span>Something went wrong<span class="token punctuation">.</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>children<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>static getDerivedStateFromError</code>: 在出错后有机会修改 state 触发最后一次错误 fallback 的渲染。</li>
<li><code v-pre>componentDidCatch</code>: 用于出错时副作用代码，比如错误上报等。</li>
</ul>
<h2 id="react-hooks原理" tabindex="-1"><a class="header-anchor" href="#react-hooks原理"><span>React Hooks原理</span></a></h2>
<h2 id="uselayouteffect-和-useeffect-区别" tabindex="-1"><a class="header-anchor" href="#uselayouteffect-和-useeffect-区别"><span>useLayoutEffect 和 useEffect 区别</span></a></h2>
<p><code v-pre>useLayoutEffect</code> 和 <code v-pre>useEffect</code> 调用时机不同，<code v-pre>useLayoutEffect</code>当 dom 改变以后同步执行，<code v-pre>useEffect</code>当 dom 改变以后异步执行。</p>
</div></template>


