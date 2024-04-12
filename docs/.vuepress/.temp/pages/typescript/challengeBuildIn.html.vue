<template><div><h1 id="内置工具类型" tabindex="-1"><a class="header-anchor" href="#内置工具类型"><span>内置工具类型</span></a></h1>
<h2 id="partial" tabindex="-1"><a class="header-anchor" href="#partial"><span>Partial</span></a></h2>
<blockquote>
<p><code v-pre>Partial&lt;T&gt;</code>表示将某个类型里的属性全部变为可选项。</p>
</blockquote>
<p>用法：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Person</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  age<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// { name?: string | undefined; age?: number | undefined }</span>
<span class="token keyword">type</span> <span class="token class-name">PartialResult</span> <span class="token operator">=</span> Partial<span class="token operator">&lt;</span>Person<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码实现：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyPartial<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">?</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token comment">// { name?: string | undefined; age?: number | undefined }</span>
<span class="token keyword">type</span> <span class="token class-name">PartialResult</span> <span class="token operator">=</span> MyPartial<span class="token operator">&lt;</span>Person<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="required" tabindex="-1"><a class="header-anchor" href="#required"><span>Required</span></a></h2>
<blockquote>
<p><code v-pre>Required&lt;T&gt;</code>表示将某个类型里的属性全部变为必填项。</p>
</blockquote>
<p>用法：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Person</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  age<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// { name: string; age: number }</span>
<span class="token keyword">type</span> <span class="token class-name">PartialResult</span> <span class="token operator">=</span> Required<span class="token operator">&lt;</span>Person<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码实现：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyPartial<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">-</span><span class="token operator">?</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token comment">// { name: string; age: number }</span>
<span class="token keyword">type</span> <span class="token class-name">PartialResult</span> <span class="token operator">=</span> MyRequired<span class="token operator">&lt;</span>Person<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="readonly" tabindex="-1"><a class="header-anchor" href="#readonly"><span>Readonly</span></a></h2>
<blockquote>
<p><code v-pre>Readonly&lt;T&gt;</code> 表示将某个类型中的所有属性变为只读属性，也就意味着这些属性不能被重新赋值。</p>
</blockquote>
<p>用法：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Todo</span> <span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token builtin">string</span>
  description<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> todo<span class="token operator">:</span> Readonly<span class="token operator">&lt;</span>Todo<span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token string">"Hey"</span><span class="token punctuation">,</span>
  description<span class="token operator">:</span> <span class="token string">"foobar"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码实现：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyReadonly<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token keyword">readonly</span> <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> todo<span class="token operator">:</span> MyReadonly<span class="token operator">&lt;</span>Todo<span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token string">"Hey"</span><span class="token punctuation">,</span>
  description<span class="token operator">:</span> <span class="token string">"foobar"</span>
<span class="token punctuation">}</span>

todo<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token string">'改名'</span> <span class="token comment">// Cannot assign to 'title' because it is a read-only property.(2540)</span>
todo<span class="token punctuation">.</span>description <span class="token operator">=</span> <span class="token string">'改不了嘿嘿'</span> <span class="token comment">// Cannot assign to 'description' because it is a read-only property.(2540)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="pick" tabindex="-1"><a class="header-anchor" href="#pick"><span>Pick</span></a></h2>
<blockquote>
<p><code v-pre>Pick&lt;T, K extends keyof T&gt;</code> 表示从某个类型中选取一些属性出来。</p>
</blockquote>
<p>用法：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Todo</span> <span class="token punctuation">{</span>
    title<span class="token operator">:</span> <span class="token builtin">string</span>
    description<span class="token operator">:</span> <span class="token builtin">string</span>
    completed<span class="token operator">:</span> <span class="token builtin">boolean</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">TodoPreview</span> <span class="token operator">=</span> Pick<span class="token operator">&lt;</span>Todo<span class="token punctuation">,</span> <span class="token string">'title'</span> <span class="token operator">|</span> <span class="token string">'completed'</span><span class="token operator">></span> <span class="token comment">// { title: string, completed: boolean }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码实现：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyPick<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">K</span> <span class="token keyword">extends</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token constant">K</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">TodoPreview</span> <span class="token operator">=</span> MyPick<span class="token operator">&lt;</span>Todo<span class="token punctuation">,</span> <span class="token string">'title'</span> <span class="token operator">|</span> <span class="token string">'completed'</span><span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码详解：</p>
<ul>
<li><code v-pre>K extends keyof T</code>：表示 <code v-pre>K</code> 只能是 <code v-pre>keyof T</code> 的子类型，如果我们在使用 <code v-pre>Pick</code> 时，传递了一个不存在 <code v-pre>T</code> 类型的字段，会报错：</li>
</ul>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// Type '"title" | "phone"' does not satisfy the constraint 'keyof Todo'.</span>
<span class="token comment">// Type '"phone"' is not assignable to type 'keyof Todo'.(2344)</span>
<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">AAA</span></span> <span class="token operator">=</span> Pick<span class="token operator">&lt;</span>Todo<span class="token punctuation">,</span> <span class="token string">'title'</span> <span class="token operator">|</span> <span class="token string">'phone'</span><span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="record" tabindex="-1"><a class="header-anchor" href="#record"><span>Record</span></a></h2>
<blockquote>
<p><code v-pre>Record&lt;K, T&gt;</code>表示迭代联合类型K，将每个属性名作为key，T作为属性值组合成一个新的类型。</p>
</blockquote>
<p>用法：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Person</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name">Student</span> <span class="token operator">=</span> <span class="token string">'tom'</span> <span class="token operator">|</span> <span class="token string">'tony'</span>
<span class="token comment">// {tom: Person, tony: Person}</span>
<span class="token keyword">type</span> <span class="token class-name">result</span> <span class="token operator">=</span> Record<span class="token operator">&lt;</span>Student<span class="token punctuation">,</span> Person<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码实现：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyRecord<span class="token operator">&lt;</span><span class="token constant">K</span> <span class="token keyword">extends</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token builtin">symbol</span><span class="token punctuation">,</span> <span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token constant">K</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span>
<span class="token punctuation">}</span>
<span class="token comment">// {tom: Person, tony: Person}</span>
<span class="token keyword">type</span> <span class="token class-name">result</span> <span class="token operator">=</span> MyRecord<span class="token operator">&lt;</span>Student<span class="token punctuation">,</span> Person<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="returntype" tabindex="-1"><a class="header-anchor" href="#returntype"><span>ReturnType</span></a></h2>
<p><code v-pre>ReturnType&lt;T&gt;</code>用来获取函数返回值的类型。</p>
<p>用法：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token function-variable function">fn</span> <span class="token operator">=</span> <span class="token punctuation">(</span>v<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>v<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token number">1</span>
  <span class="token keyword">else</span>
    <span class="token keyword">return</span> <span class="token number">2</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name">a</span> <span class="token operator">=</span> ReturnType<span class="token operator">&lt;</span><span class="token keyword">typeof</span> fn<span class="token operator">></span> <span class="token comment">// 1 | 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码实现：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyReturnType<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=></span></span> <span class="token builtin">any</span><span class="token operator">></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">infer</span> <span class="token constant">R</span> <span class="token operator">?</span> <span class="token constant">R</span> <span class="token operator">:</span> <span class="token builtin">never</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="exclude" tabindex="-1"><a class="header-anchor" href="#exclude"><span>Exclude</span></a></h2>
<blockquote>
<p><code v-pre>Exclude&lt;T, U&gt;</code>表示从联合类型T中排除U的类型成员，可以理解为取T和U的差集。</p>
</blockquote>
<p>用法：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">union</span> <span class="token operator">=</span> <span class="token string">'you'</span> <span class="token operator">|</span> <span class="token string">'and'</span> <span class="token operator">|</span> <span class="token string">'me'</span>
<span class="token comment">// 'you' | 'and'</span>
<span class="token keyword">type</span> <span class="token class-name">result</span> <span class="token operator">=</span> Exclude<span class="token operator">&lt;</span>union<span class="token punctuation">,</span> <span class="token string">'me'</span><span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码实现：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyExclude<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token constant">U</span></span> <span class="token operator">?</span> <span class="token builtin">never</span> <span class="token operator">:</span> <span class="token constant">T</span>
<span class="token comment">// 'you' | 'and'</span>
<span class="token keyword">type</span> <span class="token class-name">result</span> <span class="token operator">=</span> MyExclude<span class="token operator">&lt;</span>union<span class="token punctuation">,</span> <span class="token string">'me'</span><span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码详解：</p>
<ul>
<li><code v-pre>T extends U</code>：这段代码会从T的子类型开始分发</li>
</ul>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token constant">U</span></span>
<span class="token operator">=></span> <span class="token string">'you'</span> <span class="token operator">|</span> <span class="token string">'and'</span> <span class="token operator">|</span> <span class="token string">'me'</span> <span class="token keyword">extends</span> <span class="token string">'me'</span>
<span class="token operator">=></span> <span class="token punctuation">(</span>
 <span class="token string">'you'</span> <span class="token keyword">extends</span> <span class="token string">'me'</span> <span class="token operator">?</span> <span class="token builtin">never</span> <span class="token operator">:</span> <span class="token string">'you'</span> <span class="token operator">|</span> 
 <span class="token string">'and'</span> <span class="token keyword">extends</span> <span class="token string">'me'</span> <span class="token operator">?</span> <span class="token builtin">never</span> <span class="token operator">:</span> <span class="token string">'and'</span> <span class="token operator">|</span> 
 <span class="token string">'me'</span> <span class="token keyword">extends</span> <span class="token string">'me'</span> <span class="token operator">?</span> <span class="token builtin">never</span> <span class="token operator">:</span> <span class="token string">'me'</span>
<span class="token punctuation">)</span>
<span class="token operator">=></span> <span class="token string">'you'</span> <span class="token operator">|</span> <span class="token string">'and'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="extract" tabindex="-1"><a class="header-anchor" href="#extract"><span>Extract</span></a></h2>
<blockquote>
<p><code v-pre>Extract&lt;T, U&gt;</code>表示用来取联合类型 <code v-pre>T</code> 和 <code v-pre>U</code> 的交集。</p>
</blockquote>
<p>用法：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Person</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  address<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 结果：'age'|'address'</span>
<span class="token keyword">type</span> <span class="token class-name">ExtractResult</span> <span class="token operator">=</span> Extract<span class="token operator">&lt;</span><span class="token keyword">keyof</span> Person<span class="token punctuation">,</span> <span class="token string">'age'</span><span class="token operator">|</span><span class="token string">'address'</span><span class="token operator">|</span><span class="token string">'sex'</span><span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码实现：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyExtract<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token constant">U</span></span> <span class="token operator">?</span> <span class="token constant">T</span> <span class="token operator">:</span> <span class="token builtin">never</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>代码详解：</p>
<ul>
<li><code v-pre>T extends U</code>：此代码会自动将<code v-pre>T</code>的子类型进行分发，例如：</li>
</ul>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token constant">U</span></span>
<span class="token operator">=></span> <span class="token string">'name'</span><span class="token operator">|</span><span class="token string">'age'</span><span class="token operator">|</span><span class="token string">'address'</span> <span class="token keyword">extends</span> <span class="token string">'age'</span><span class="token operator">|</span><span class="token string">'address'</span><span class="token operator">|</span><span class="token string">'sex'</span> <span class="token operator">?</span> <span class="token function-variable function">T</span> <span class="token operator">:</span> <span class="token builtin">never</span>
<span class="token operator">=></span> <span class="token punctuation">(</span>
  <span class="token string">'name'</span> <span class="token keyword">extends</span> <span class="token string">'age'</span><span class="token operator">|</span><span class="token string">'address'</span><span class="token operator">|</span><span class="token string">'sex'</span> <span class="token operator">?</span> <span class="token string">'name'</span> <span class="token operator">:</span> <span class="token builtin">never</span> <span class="token operator">|</span>
  <span class="token string">'age'</span> <span class="token keyword">extends</span> <span class="token string">'age'</span><span class="token operator">|</span><span class="token string">'address'</span><span class="token operator">|</span><span class="token string">'sex'</span> <span class="token operator">?</span> <span class="token string">'age'</span> <span class="token operator">:</span> <span class="token builtin">never</span> <span class="token operator">|</span>
  <span class="token string">'address'</span> <span class="token keyword">extends</span> <span class="token string">'age'</span><span class="token operator">|</span><span class="token string">'address'</span><span class="token operator">|</span><span class="token string">'address'</span> <span class="token operator">?</span> <span class="token string">'age'</span> <span class="token operator">:</span> <span class="token builtin">never</span>
<span class="token punctuation">)</span>
<span class="token operator">=></span> <span class="token string">'age'</span><span class="token operator">|</span><span class="token string">'address'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="omit" tabindex="-1"><a class="header-anchor" href="#omit"><span>Omit</span></a></h2>
<blockquote>
<p><code v-pre>Omit&lt;T, U&gt;</code>表示从T类型中剔除U类型包含的字段。</p>
</blockquote>
<p>用法：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Todo</span> <span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token builtin">string</span>
  description<span class="token operator">:</span> <span class="token builtin">string</span>
  completed<span class="token operator">:</span> <span class="token builtin">boolean</span>
<span class="token punctuation">}</span>
<span class="token comment">// { completed: boolean }</span>
<span class="token keyword">type</span> <span class="token class-name">TodoPreview</span> <span class="token operator">=</span> Omit<span class="token operator">&lt;</span>Todo<span class="token punctuation">,</span> <span class="token string">'description'</span> <span class="token operator">|</span> <span class="token string">'title'</span><span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码实现：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyOmit<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span><span class="token constant">K</span> <span class="token keyword">extends</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> Exclude<span class="token operator">&lt;</span><span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">K</span><span class="token operator">></span> <span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码详解：</p>
<ul>
<li><code v-pre>Exclude&lt;keyof T, K&gt;</code> 取 <code v-pre>T</code> 类型和 <code v-pre>K</code> 类型的差集。</li>
</ul>
<h2 id="nonnullable" tabindex="-1"><a class="header-anchor" href="#nonnullable"><span>NonNullable</span></a></h2>
<h2 id="tupletoobject" tabindex="-1"><a class="header-anchor" href="#tupletoobject"><span>TupleToObject</span></a></h2>
<blockquote>
<p><code v-pre>TupleToObject&lt;T&gt;</code>表示将一个元组类型转换为对象类型，这个对象类型的键/值都是从元组中遍历而出。</p>
</blockquote>
<p>用法：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token constant">AA</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'hello'</span><span class="token punctuation">,</span> <span class="token string">'world'</span><span class="token punctuation">]</span> <span class="token keyword">as</span> <span class="token keyword">const</span>

<span class="token comment">// {hello: 'hello', world: 'world'}</span>
<span class="token keyword">type</span> <span class="token class-name">result</span> <span class="token operator">=</span> TupleToObject<span class="token operator">&lt;</span><span class="token keyword">typeof</span> <span class="token constant">AA</span><span class="token operator">></span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码实现：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyTupleToObject<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token keyword">readonly</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token builtin">number</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">P</span>
<span class="token punctuation">}</span>

<span class="token comment">// {hello: 'hello', world: 'world'}</span>
<span class="token keyword">type</span> <span class="token class-name">result</span> <span class="token operator">=</span> MyTupleToObject<span class="token operator">&lt;</span><span class="token keyword">typeof</span> <span class="token constant">AA</span><span class="token operator">></span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码详解：</p>
<ul>
<li><code v-pre>as const</code>：数组使用了<code v-pre>as const</code>断言，变成了<strong>只读元组</strong>，对象使用<code v-pre>as const</code>断言，对象的属性变成了<strong>只读属性</strong>。</li>
<li><code v-pre>T[number]</code>：表示返回所有数字型索引的元素，形成一个联合类型，例如：<code v-pre>'hello'|'world'</code>。</li>
</ul>
<h2 id="parameters" tabindex="-1"><a class="header-anchor" href="#parameters"><span>Parameters</span></a></h2>
<blockquote>
<p><code v-pre>Parameters&lt;T&gt;</code>用来获取一个函数的参数类型，获取的结果是一个元组</p>
</blockquote>
<p>用法：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> add <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token comment">// [a:number, b:string]</span>
<span class="token keyword">type</span> <span class="token class-name">result</span> <span class="token operator">=</span> Parameters<span class="token operator">&lt;</span><span class="token keyword">typeof</span> add<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码实现：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyParameters<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=></span></span> <span class="token builtin">any</span><span class="token operator">></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token keyword">infer</span> <span class="token constant">R</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">any</span> <span class="token operator">?</span> <span class="token constant">R</span> <span class="token operator">:</span> <span class="token builtin">never</span>
<span class="token comment">// [a:number, b:string]</span>
<span class="token keyword">type</span> <span class="token class-name">result</span> <span class="token operator">=</span> MyParameters<span class="token operator">&lt;</span><span class="token keyword">typeof</span> add<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="capitalize-首字母大写" tabindex="-1"><a class="header-anchor" href="#capitalize-首字母大写"><span>Capitalize(首字母大写)</span></a></h2>
<blockquote>
<p><code v-pre>Capitalize&lt;T&gt;</code>是用来将一个字符串的首字母变成大写的。</p>
</blockquote>
<p>用法：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">t1</span> <span class="token operator">=</span> Capitalize<span class="token operator">&lt;</span><span class="token string">'christine'</span><span class="token operator">></span>   <span class="token comment">// 'Christine'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>代码实现：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Capatilize<span class="token operator">&lt;</span><span class="token constant">S</span> <span class="token keyword">extends</span> <span class="token builtin">string</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token constant">S</span> <span class="token keyword">extends</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">infer</span> firstLetter<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">infer</span> <span class="token constant">L</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span> <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>Uppercase<span class="token operator">&lt;</span>firstLetter<span class="token operator">></span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token constant">L</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span> <span class="token operator">:</span> <span class="token constant">S</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>代码详解：</p>
<ul>
<li><code v-pre>Uppercase&lt;firstLetter&gt;</code>: 我们只需要首字母用firstLetter占位，用工具函数 <code v-pre>Uppercase</code> 将首字母变成大写。</li>
</ul>
</div></template>


