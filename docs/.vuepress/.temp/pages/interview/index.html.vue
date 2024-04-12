<template><div><h1 id="js基础知识点" tabindex="-1"><a class="header-anchor" href="#js基础知识点"><span>JS基础知识点</span></a></h1>
<h2 id="基本数据类型" tabindex="-1"><a class="header-anchor" href="#基本数据类型"><span>基本数据类型</span></a></h2>
<p>在 JS 中，存在着 7 种原始值，分别是：</p>
<ul>
<li><code v-pre>boolean</code></li>
<li><code v-pre>null</code></li>
<li><code v-pre>undefined</code></li>
<li><code v-pre>number</code></li>
<li><code v-pre>string</code></li>
<li><code v-pre>symbol</code></li>
<li><code v-pre>bigInt</code></li>
</ul>
<p>基本数据类型存储的都是值，是没有函数可以调用的，比如 <code v-pre>undefined.toString()</code> 会报错 <code v-pre>Uncaught TypeError: Cannot read properties of undefined (reading 'toString')</code>。</p>
<p>此时你肯定会疑惑，为什么<code v-pre>'1'.toString()</code>在浏览器能正常运行呢？因为 <code v-pre>'1'.toString()</code> 中的字符串 <code v-pre>'1'</code> 在这个时候会被封装成其对应的字符串对象，以上代码相当于 <code v-pre>new String('1').toString()</code>，因为 <code v-pre>new String('1')</code> 创建的是一个对象，而这个对象里是存在toString()方法的。</p>
<p>除了会在必要的情况下强转类型以外，原始类型还有一些坑。</p>
<p>其中 JS 的 <code v-pre>number</code> 类型是浮点类型的，在使用中会遇到某些 Bug，比如 <code v-pre>0.1 + 0.2 !== 0.3</code>，但是这一块的内容会在进阶部分讲到。<code v-pre>string</code> 类型是不可变的，无论你在 <code v-pre>string</code> 类型上调用何种方法，都不会对值有改变。</p>
<p>另外对于 <code v-pre>null</code> 来说，很多人会认为他是个对象类型，其实这是错误的。虽然 <code v-pre>typeof null</code> 会输出 <code v-pre>'object'</code>，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，<code v-pre>000</code> 开头代表是对象，然而 <code v-pre>null</code> 表示为全零，所以将它错误的判断为 <code v-pre>object</code> 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。</p>
<h2 id="引用类型" tabindex="-1"><a class="header-anchor" href="#引用类型"><span>引用类型</span></a></h2>
<blockquote>
<p>在JS中，除了基本数据类型那么其他的都是引用类型了。基本数据类型和引用类型不同的是：基本数据类型存储的是值，引用类型存储的是地址（指针）。</p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> a
a<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'Christine'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于常量 <code v-pre>a</code> 来说，假设内存地址（指针）为 <code v-pre>#001</code>，那么在地址 <code v-pre>#001</code> 的位置存放了值 []，常量 a 存放了地址（指针） <code v-pre>#001</code>，当我们将变量 <code v-pre>a</code> 赋值给变量 <code v-pre>b</code> 时，相当于将 <code v-pre>a</code> 的内存地址赋值给了 <code v-pre>b</code>，此时变量 <code v-pre>a</code> 和 <code v-pre>b</code> 指向同一个地址 <code v-pre>#001</code>，当我们进行数据修改的时候，就会修改存放在地址（指针） <code v-pre>#001</code> 上的值，也就导致了两个变量的值都发生了改变。</p>
<p>函数参数是对象</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token parameter">person</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  person<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">30</span>
  person <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'christine'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">27</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> person
<span class="token punctuation">}</span>
<span class="token keyword">const</span> p1 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'picker'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">26</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> p2 <span class="token operator">=</span> <span class="token function">test</span><span class="token punctuation">(</span>p1<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p1<span class="token punctuation">)</span> <span class="token comment">// {name: 'picker', age: 30}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p2<span class="token punctuation">)</span> <span class="token comment">// {name: 'christine', age: 27}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码详解：</p>
<ol>
<li>函数传参传递的是 <code v-pre>p1</code> 对象指针的副本；</li>
<li>在函数内部改变 <code v-pre>person</code> 的属性，<code v-pre>p1</code> 对象的值也同步修改了；</li>
<li>函数返回了新的对象 <code v-pre>person</code>，这个新对象拥有了一个新的地址（指针），也就和 <code v-pre>p1</code> 对象没有任何关系了，最终导致两个变量的值是不相同的。</li>
</ol>
<p>typeof VS instanceof</p>
<p><code v-pre>typeof</code> 能精准判断除了null以外的所有基本数据类型的值。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">typeof</span> <span class="token number">1</span>         <span class="token comment">// 'number'</span>
<span class="token keyword">typeof</span> <span class="token string">'1'</span>       <span class="token comment">// 'string'</span>
<span class="token keyword">typeof</span> <span class="token boolean">false</span>     <span class="token comment">// 'boolean'</span>
<span class="token keyword">typeof</span> <span class="token keyword">undefined</span> <span class="token comment">// 'undefined'</span>
<span class="token keyword">typeof</span> <span class="token keyword">null</span>      <span class="token comment">// 'object'</span>
<span class="token keyword">typeof</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// 'symbol'</span>
<span class="token keyword">typeof</span> <span class="token function">BigInt</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">//'bigint'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>typeof</code> 对于引用类型来说，除了函数会判断成 <code v-pre>'function'</code> ，其他引用类型一律返回 <code v-pre>'object'</code>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">typeof</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>           <span class="token comment">// 'object'</span>
<span class="token keyword">typeof</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>           <span class="token comment">// 'object'</span>
<span class="token keyword">typeof</span> console<span class="token punctuation">.</span>log  <span class="token comment">// 'function'</span>
<span class="token keyword">typeof</span> <span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 'object'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们想判断一个对象的正确类型，这时候可以考虑使用 <code v-pre>instanceof</code>，因为内部机制是通过原型链来判断的，在后面的章节中我们也会自己去实现一个 <code v-pre>instanceof</code>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">Person</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">const</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
p1 <span class="token keyword">instanceof</span> <span class="token class-name">Person</span> <span class="token comment">// true</span>

<span class="token keyword">const</span> str <span class="token operator">=</span> <span class="token string">'hello world'</span>
str <span class="token keyword">instanceof</span> <span class="token class-name">String</span> <span class="token comment">// false</span>

<span class="token keyword">const</span> str1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">'hello world'</span><span class="token punctuation">)</span>
str1 <span class="token keyword">instanceof</span> <span class="token class-name">String</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于基本数据类型来说，你想直接通过 <code v-pre>instanceof</code> 来判断类型是不行的，当然我们还是有办法让 <code v-pre>instanceof</code> 判断基本数据类型的。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">PrimitiveString</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>hasInstance<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">typeof</span> x <span class="token operator">===</span> <span class="token string">'string'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hello world'</span> <span class="token keyword">instanceof</span> <span class="token class-name">PrimitiveString</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码详解：</p>
<ul>
<li><code v-pre>Symbol.hasInstance</code> 用于判断某对象是否为某构造器的实例。</li>
</ul>
<p>通过上面的例子侧边反映了一个问题， <code v-pre>instanceof</code> 也不是百分之百可信的。</p>
<h2 id="类型转换" tabindex="-1"><a class="header-anchor" href="#类型转换"><span>类型转换</span></a></h2>
<p>在 <code v-pre>JS</code> 中类型转换只有三种情况，分别是：</p>
<ul>
<li>转换为布尔值</li>
<li>转换为数字</li>
<li>转换为字符串</li>
</ul>
<table>
<thead>
<tr>
<th>原始值</th>
<th>转换目标</th>
<th>结果</th>
</tr>
</thead>
<tbody>
<tr>
<td>number</td>
<td>布尔值</td>
<td>除了0、-0、NaN其它都为true</td>
</tr>
<tr>
<td>string</td>
<td>布尔值</td>
<td>除了空字符串其它都为true</td>
</tr>
<tr>
<td>undefined、null</td>
<td>布尔值</td>
<td>都为false</td>
</tr>
<tr>
<td>引用类型</td>
<td>布尔值</td>
<td>都为true</td>
</tr>
<tr>
<td>symbol</td>
<td>布尔值</td>
<td>true</td>
</tr>
<tr>
<td>number</td>
<td>字符串</td>
<td>6 =&gt; '6'</td>
</tr>
<tr>
<td>布尔值</td>
<td>字符串</td>
<td>true =&gt; 'true'</td>
</tr>
<tr>
<td>undefined</td>
<td>字符串</td>
<td>'undefined'</td>
</tr>
<tr>
<td>null</td>
<td>字符串</td>
<td>'null'</td>
</tr>
<tr>
<td>symbol</td>
<td>字符串</td>
<td>Symbol(2) =&gt; 'Symbol(2)'</td>
</tr>
<tr>
<td>函数</td>
<td>字符串</td>
<td>function(){} =&gt; &quot;function(){}&quot;</td>
</tr>
<tr>
<td>数组</td>
<td>字符串</td>
<td>[1,2] =&gt; '1,2'、[] =&gt; ''</td>
</tr>
<tr>
<td>对象</td>
<td>字符串</td>
<td>{age: 18} =&gt; '[object Object]'</td>
</tr>
<tr>
<td>字符串</td>
<td>数字</td>
<td>'1' =&gt; 1、'a' =&gt; NaN、'0' =&gt; 0、'' =&gt; 0</td>
</tr>
<tr>
<td>数组</td>
<td>数字</td>
<td>[] =&gt; 0、 存在一个元素且为数字的数组 =&gt; 数字，其它情况都为NaN</td>
</tr>
<tr>
<td>null</td>
<td>数字</td>
<td>0</td>
</tr>
<tr>
<td>undefined</td>
<td>数字</td>
<td>NaN</td>
</tr>
<tr>
<td>对象</td>
<td>数字</td>
<td>NaN</td>
</tr>
<tr>
<td>函数</td>
<td>数字</td>
<td>function(){} =&gt; NaN</td>
</tr>
<tr>
<td>symbol</td>
<td>数字</td>
<td>Uncaught TypeError: Cannot convert a Symbol value to a number</td>
</tr>
</tbody>
</table>
<h2 id="转boolean" tabindex="-1"><a class="header-anchor" href="#转boolean"><span>转boolean</span></a></h2>
<p>在条件判断时，除了<code v-pre>undefined</code>、<code v-pre>null</code>、<code v-pre>false</code>、<code v-pre>''</code>、<code v-pre>0</code>、<code v-pre>-0</code>、<code v-pre>NaN</code>转布尔为 <code v-pre>false</code> 外，其它所有值转布尔都为 <code v-pre>true</code> 。包括所有对象。</p>
<h2 id="对象转基本数据类型" tabindex="-1"><a class="header-anchor" href="#对象转基本数据类型"><span>对象转基本数据类型</span></a></h2>
<p>对象转基本数据类型时，会调用内置的 <code v-pre>[[ToPrimitive]]</code> 函数，对于该函数来说，其逻辑一般来说如下：</p>
<ul>
<li>如果已经为原始值，则不需要转换；</li>
<li>调用 <code v-pre>x.valueOf()</code>, 如果转换为基本数据类型，则返回转换的值；</li>
<li>调用 <code v-pre>x.toString()</code>，如果转换为基本数据类型，则返回转换的值；</li>
<li>如果都没有转为基本类型，则报错；</li>
</ul>
<p>当然你也可以重写 Symbol.toPrimitive ，该方法在转原始类型时调用优先级最高。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">'1'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>toPrimitive<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">2</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token number">1</span> <span class="token operator">+</span> a <span class="token comment">// => 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="对象转原始类型应用" tabindex="-1"><a class="header-anchor" href="#对象转原始类型应用"><span>对象转原始类型应用</span></a></h2>
<p>如何使<code v-pre>if ( a==1 &amp;&amp; a==2 &amp;&amp; a==3 ) {console.log('true')};</code> 正确打印'true'</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span> a<span class="token operator">==</span><span class="token number">1</span> <span class="token operator">&amp;&amp;</span> a<span class="token operator">==</span><span class="token number">2</span> <span class="token operator">&amp;&amp;</span> a<span class="token operator">==</span><span class="token number">3</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'true'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码详解：</p>
<ul>
<li>重写对象 <code v-pre>a</code> 的 <code v-pre>valueOf()</code> 方法，使 <code v-pre>value</code> 属性每次调用时自增;</li>
<li>当判断 <code v-pre>a==1</code> 时，第一次调用 <code v-pre>valueOf()</code> 方法，此时 <code v-pre>value</code> 等于1，判断1==1，继续向下走；</li>
<li>判断 <code v-pre>a==2</code> 时，第二次调用 <code v-pre>valueOf()</code> 方法，此时 <code v-pre>value</code> 等于2，判断2==2，继续向下走；</li>
<li>判断 <code v-pre>a==3</code> 时，第三次调用 <code v-pre>valueOf()</code> 方法，此时 <code v-pre>value</code> 等于3，判断3==3，if判断结束；</li>
<li>if条件判断为 <code v-pre>true &amp;&amp; true &amp;&amp; true</code> ，执行 <code v-pre>console.log('true')</code> ，打印true。</li>
</ul>
<h2 id="this" tabindex="-1"><a class="header-anchor" href="#this"><span>this</span></a></h2>
<p>在JS中 <code v-pre>this</code> 指向，写个栗子简单诠释下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span>

<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token literal-property property">foo</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span>

<span class="token keyword">const</span> obj2 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">3</span>
<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 1</span>
obj1<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 2</span>
obj1<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>obj2<span class="token punctuation">)</span> <span class="token comment">// 3</span>
<span class="token keyword">const</span> c <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码详解：</p>
<ul>
<li>
<p><code v-pre>foo()</code>：对于直接调用foo来说，不管foo函数放在了什么地方，this一定是window；</p>
</li>
<li>
<p><code v-pre>obj1.foo()</code>：对于 <code v-pre>obj1.foo()</code> 来说，我们只需要记住，谁调用了函数，<code v-pre>this</code> 就指向谁，所以在这个场景下 <code v-pre>foo</code> 函数中的 <code v-pre>this</code> 就是 <code v-pre>obj1</code> 对象；</p>
</li>
<li>
<p><code v-pre>obj1.foo.apply(obj2)</code>：<code v-pre>call()</code>、<code v-pre>apply()</code> 和 <code v-pre>bind()</code> 是改变上下文的方法，<code v-pre>this</code> 指向取决于这些方法的第一个参数，当第一个参数为 <code v-pre>null</code> 或者为 <code v-pre>空</code> 时，<code v-pre>this</code> 指向全局对象 <code v-pre>window</code>；</p>
</li>
<li>
<p><code v-pre>new foo()</code>：<code v-pre>new</code> 构造函数调用，<code v-pre>this</code> 永远指向新创建的对象上，优先级最高。</p>
</li>
</ul>
<p>下面我们来看看箭头函数的 <code v-pre>this</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">abc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">abc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先箭头函数其实是没有 <code v-pre>this</code> 的，箭头函数中的 <code v-pre>this</code> 只取决包裹箭头函数的第一个普通函数的 <code v-pre>this</code>。在这个例子中，因为包裹箭头函数的第一个普通函数是 <code v-pre>abc</code>，所以此时的 <code v-pre>this</code> 是 <code v-pre>window</code>。另外对箭头函数使用 <code v-pre>bind</code> 这类函数是无效的。</p>
<p>那么说到 bind，不知道大家是否考虑过，如果对一个函数进行多次 bind，那么上下文会是什么呢？</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">let</span> <span class="token function-variable function">fn</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// => window</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你认为输出结果是 a，那么你就错了，其实我们可以把上述代码转换成另一种形式</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// fn.bind().bind(a) 等于</span>
<span class="token keyword">let</span> <span class="token function-variable function">fn2</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">fn1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">fn2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以从上述代码中发现，不管我们给函数 <code v-pre>bind</code> 几次，<code v-pre>fn</code> 中的 <code v-pre>this</code> 永远由第一次 <code v-pre>bind</code> 决定，所以结果永远是 <code v-pre>window</code>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'christine'</span> <span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// => 'christine'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上就是 <code v-pre>this</code> 的规则了，但是可能会发生多个规则同时出现的情况，这时候不同的规则之间会根据优先级最高的来决定 <code v-pre>this</code> 最终指向哪里。</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p><code v-pre>new</code> 的方式优先级最高，接下来是 <code v-pre>bind</code> 这些函数，然后是 <code v-pre>obj1.foo()</code> 这种调用方式，最后是 <code v-pre>foo</code> 这种调用方式，同时，箭头函数的 <code v-pre>this</code> 一旦被绑定，就不会再被任何方式所改变。</p>
</div>
<h2 id="vs" tabindex="-1"><a class="header-anchor" href="#vs"><span>== VS ===</span></a></h2>
<p>假如我们需要对比 x 和 y 是否相同，就会进行如下判断流程：</p>
<p>1.首先会判断两者类型是否相同，相同的话就比数值大小了；</p>
<p>2.若类型不相同的话，那么就会进行类型转换；</p>
<p>3.会先判断是否在对比 <code v-pre>null</code> 和 <code v-pre>undefined</code>，是的话就会返回 <code v-pre>true</code>；</p>
<p>4.判断两者类型是否为 <code v-pre>string</code> 和 <code v-pre>number</code>，是的话就会将 <code v-pre>string</code> 转换为 <code v-pre>number</code>；</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token number">1</span> <span class="token operator">==</span> <span class="token string">'1'</span>
      ↓
<span class="token number">1</span> <span class="token operator">==</span>  <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5.判断其中一方是否为 <code v-pre>boolean</code>，是的话就会把 <code v-pre>boolean</code> 转为 <code v-pre>number</code> 再进行判断；</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token string">'1'</span> <span class="token operator">==</span> <span class="token boolean">true</span>
        ↓
<span class="token string">'1'</span> <span class="token operator">==</span>  <span class="token number">1</span>
 ↓
 <span class="token number">1</span>  <span class="token operator">==</span>  <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>6.判断其中一方是否为 <code v-pre>object</code> 且另一方为 <code v-pre>string</code>、<code v-pre>number</code> 或者 <code v-pre>symbol</code>，是的话就会把 <code v-pre>object</code> 转为基本数据类型再进行判断；</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token string">'1'</span> <span class="token operator">==</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'christine'</span> <span class="token punctuation">}</span>
                  ↓
<span class="token string">'1'</span> <span class="token operator">==</span> <span class="token string">'[object Object]'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看完了上面的步骤，对于 <code v-pre>[] == ![]</code> 你是否能正确写出答案呢？</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>代码详解：</p>
<ol>
<li>
<p>左侧是一个 <code v-pre>[]</code>；</p>
</li>
<li>
<p>右侧是一个布尔值，<code v-pre>[]</code> 转换成布尔值 <code v-pre>true</code>，因为除了 <code v-pre>null</code> 之外的所有对象转换成布尔都是 <code v-pre>true</code>，所以 <code v-pre>![]</code> 结果为 <code v-pre>false</code>；</p>
</li>
<li>
<p>此时相当于 <code v-pre>[] == false</code>，依据类型转换规则，会把布尔转换成 <code v-pre>number</code> 再进行比较；<code v-pre>false</code> 转 <code v-pre>number</code> 结果为 <code v-pre>0</code>；</p>
</li>
<li>
<p>此时相当于 <code v-pre>[] == 0</code>，依据类型转换规则，会把 <code v-pre>[]</code> 转为基本数据类型，调用 <code v-pre>[].toString()</code>，将 [] 转换成了字符串，所以 <code v-pre>[]</code> 结果为 <code v-pre>''</code>；</p>
</li>
<li>
<p>此时相当于 <code v-pre>'' == 0</code>，依据类型转换规则，会把 <code v-pre>''</code> 转换为 <code v-pre>number</code>，结果为 <code v-pre>0</code>， 所以 <code v-pre>0 == 0</code>，结果为 <code v-pre>true</code>。</p>
</li>
</ol>
<h2 id="闭包" tabindex="-1"><a class="header-anchor" href="#闭包"><span>闭包</span></a></h2>
<blockquote>
<p>在JavaScript中，根据词法作⽤域的规则，内部函数总是可以访问其外部函数中声明的变量，当通过调⽤⼀个外部函数返回⼀个内部函数后，即使该外部函数已经执⾏结束了，但是内部函数引⽤外部函数的变量依然保存在内存中，我们就把这些变量的集合称为闭包。⽐如外部函数是foo，那么这些变量的集合就称为foo函数的闭包。</p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token string">"Mozilla"</span><span class="token punctuation">;</span> <span class="token comment">// name 是一个被 init 创建的局部变量</span>
  <span class="token keyword">function</span> <span class="token function">displayName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// displayName() 是内部函数，一个闭包</span>
      <span class="token function">alert</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 使用了父函数中声明的变量</span>
  <span class="token punctuation">}</span>
  <span class="token function">displayName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 JS 中，闭包存在的意义就是让我们可以间接访问函数内部的变量。</p>
<h3 id="闭包优缺点" tabindex="-1"><a class="header-anchor" href="#闭包优缺点"><span>闭包优缺点</span></a></h3>
<p>闭包的主要优点如下：</p>
<ul>
<li>可以实现数据的持久化：闭包可以存储在函数中的本地变量，即使函数执行完毕，这些本地变量也会一直存在，从而实现了数据的持久化。</li>
<li>避免全局污染：通过闭包，我们可以把变量封装在函数内部，避免顶层作用域，特别是全局作用域的污染。</li>
<li>隐藏实现：闭包帮助我们实现了 public/private 特性，使得我们可以隐藏部分实现，仅暴露出需要公开的接口。</li>
</ul>
<p>闭包的主要缺点如下：</p>
<ul>
<li>内存管理：由于闭包会保存在函数中的本地变量，如果使用不当，可能会导致内存泄漏。所以在使用完闭包后，通常需要解除引用来释放内存。</li>
<li>性能考虑：由于闭包的特性，涉及到作用域链的查找，性能相对于其他函数来说会慢一些。</li>
</ul>
<h3 id="闭包经典面试题" tabindex="-1"><a class="header-anchor" href="#闭包经典面试题"><span>闭包经典面试题</span></a></h3>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> i <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先因为 <code v-pre>setTimeout</code> 是个异步函数，所以会先把循环全部执行完毕，这时候 <code v-pre>i</code> 就是 <code v-pre>6</code> 了，所以会输出一堆 <code v-pre>6</code>。</p>
<p>解决办法有三种:</p>
<p>1.使用闭包的方式</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token punctuation">;</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">j</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> j <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们首先使用了立即执行函数将 <code v-pre>i</code> 传入函数内部，这个时候值就被固定在了参数 <code v-pre>j</code> 上面不会改变，当下次执行 <code v-pre>timer</code> 这个闭包的时候，就可以使用外部函数的变量 <code v-pre>j</code>，从而达到目的。</p>
<p>2.使用 <code v-pre>setTimeout</code> 的第三个参数，这个参数会被当成 <code v-pre>timer</code> 函数的参数传入。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span>
    <span class="token keyword">function</span> <span class="token function">timer</span><span class="token punctuation">(</span><span class="token parameter">j</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    i <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">,</span>
    i
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout" target="_blank" rel="noopener noreferrer">setTimeout用法<ExternalLinkIcon/></a></p>
<p>3.使用 <code v-pre>let</code> 定义 <code v-pre>i</code>，这个也是最为推荐的方式。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> i <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我想通过updateInfo来更新userInfo⾥⾯的数据信息，但是这段代码存在⼀些问题，你能修复这段代码吗？</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> userInfo <span class="token operator">=</span> <span class="token punctuation">{</span>
<span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">"jack.ma"</span><span class="token punctuation">,</span>
<span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">13</span><span class="token punctuation">,</span>
<span class="token literal-property property">sex</span><span class="token operator">:</span><span class="token string">'male'</span><span class="token punctuation">,</span>
<span class="token function-variable function">updateInfo</span><span class="token operator">:</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">"pony.ma"</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">39</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>sex <span class="token operator">=</span> <span class="token string">'female'</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
userInfo<span class="token punctuation">.</span><span class="token function">updateInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修复结果如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> userInfo <span class="token operator">=</span> <span class="token punctuation">{</span>
<span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">"jack.ma"</span><span class="token punctuation">,</span>
<span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">13</span><span class="token punctuation">,</span>
<span class="token literal-property property">sex</span><span class="token operator">:</span><span class="token string">'male'</span><span class="token punctuation">,</span>
<span class="token function-variable function">updateInfo</span><span class="token operator">:</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">"pony.ma"</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">39</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>sex <span class="token operator">=</span> <span class="token string">'female'</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
userInfo<span class="token punctuation">.</span><span class="token function">updateInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="深浅拷贝" tabindex="-1"><a class="header-anchor" href="#深浅拷贝"><span>深浅拷贝</span></a></h2>
<h3 id="浅拷贝" tabindex="-1"><a class="header-anchor" href="#浅拷贝"><span>浅拷贝</span></a></h3>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>浅拷贝只会拷贝所有的属性值到新的对象中，如果属性值是对象的话，拷贝的是地址。</p>
</div>
<p>浅拷贝的几种方式</p>
<p>1.Object.assign</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span>
a<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">20</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>age<span class="token punctuation">)</span> <span class="token comment">// 18</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>使用 <code v-pre>Object.assign</code> 方法有几点需要注意:</p>
<ul>
<li>它不会拷贝对象的继承属性；</li>
<li>它不会拷贝对象的不可枚举属性；</li>
<li>可以拷贝Symbol类型的属性。</li>
</ul>
</div>
<p>2.扩展运算符<code v-pre>...</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token operator">...</span>a<span class="token punctuation">}</span>
a<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">20</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>age<span class="token punctuation">)</span> <span class="token comment">// 18</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通常浅拷贝就能解决大部分问题了，但是当我们遇到如下情况时，可能需要使用深拷贝来解决。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">jobs</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">first</span><span class="token operator">:</span> <span class="token string">'FE'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token operator">...</span>a <span class="token punctuation">}</span>
a<span class="token punctuation">.</span>jobs<span class="token punctuation">.</span>first <span class="token operator">=</span> <span class="token string">'native'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>jobs<span class="token punctuation">.</span>first<span class="token punctuation">)</span> <span class="token comment">// 'native'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="深拷贝" tabindex="-1"><a class="header-anchor" href="#深拷贝"><span>深拷贝</span></a></h3>
<p>上面的问题，可以通过<code v-pre>JSON.parse(JSON.stringify(object))</code>来解决。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">jobs</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">first</span><span class="token operator">:</span> <span class="token string">'FE'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">)</span>
a<span class="token punctuation">.</span>jobs<span class="token punctuation">.</span>first <span class="token operator">=</span> <span class="token string">'native'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>jobs<span class="token punctuation">.</span>first<span class="token punctuation">)</span> <span class="token comment">// 'FE'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是该方法也是有局限性的：</p>
<ul>
<li>会忽略 <code v-pre>undefined</code></li>
<li>会忽略 <code v-pre>symbol</code></li>
<li>不能序列化函数</li>
<li>不能解决循环引用的对象</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
  <span class="token literal-property property">sex</span><span class="token operator">:</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'male'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function-variable function">jobs</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Christine'</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span> <span class="token comment">// {name: "Christine"}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="手写深拷贝" tabindex="-1"><a class="header-anchor" href="#手写深拷贝"><span>手写深拷贝</span></a></h3>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">deepClone</span><span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// WeakMap作为记录对象Hash表（用于防止循环引用）</span>
    <span class="token keyword">const</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// 判断是否为object类型的辅助函数，减少重复代码</span>
    <span class="token keyword">function</span> <span class="token function">isObject</span><span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>target <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> target <span class="token operator">===</span> <span class="token string">'object'</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token keyword">typeof</span> target <span class="token operator">===</span> <span class="token string">'function'</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function">clone</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token comment">// 基础类型直接返回值</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isObject</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> data
        <span class="token punctuation">}</span>

        <span class="token comment">// 日期或者正则对象则直接构造一个新的对象返回</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">[</span>Date<span class="token punctuation">,</span> RegExp<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">data<span class="token punctuation">.</span>constructor</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 处理函数对象</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> data <span class="token operator">===</span> <span class="token string">'function'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Function</span><span class="token punctuation">(</span><span class="token string">'return '</span> <span class="token operator">+</span> data<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 如果该对象已存在，则直接返回该对象</span>
        <span class="token keyword">const</span> exist <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>exist<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> exist
        <span class="token punctuation">}</span>

        <span class="token comment">// 处理Map对象</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>data <span class="token keyword">instanceof</span> <span class="token class-name">Map</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> result<span class="token punctuation">)</span>
            data<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">val<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token comment">// 注意：map中的值为object的话也得深拷贝</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isObject</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    result<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token function">clone</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    result<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> val<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> result
        <span class="token punctuation">}</span>

        <span class="token comment">// 处理Set对象</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>data <span class="token keyword">instanceof</span> <span class="token class-name">Set</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> result<span class="token punctuation">)</span>
            data<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">val</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token comment">// 注意：set中的值为object的话也得深拷贝</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isObject</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token function">clone</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> result
        <span class="token punctuation">}</span>

        <span class="token comment">// 利用 Object 的 getOwnPropertyDescriptors 方法可以获得对象的所有属性以及对应的属性描述</span>
        <span class="token keyword">const</span> allDesc <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptors</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
        <span class="token comment">// 结合 Object 的 create 方法创建一个新对象，并继承传入原对象的原型链， 这里得到的result是对data的浅拷贝</span>
        <span class="token keyword">const</span> result <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">,</span> allDesc<span class="token punctuation">)</span>

        <span class="token comment">// 新对象加入到map中，进行记录</span>
        map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> result<span class="token punctuation">)</span>
        
        <span class="token comment">// Object.create()是浅拷贝，所以要判断并递归执行深拷贝</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> val <span class="token operator">=</span> data<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isObject</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 属性值为 对象类型 或 函数对象 的话也需要进行深拷贝</span>
                result<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">clone</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                result<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> val
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> result
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token function">clone</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 测试的obj对象</span>
<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// =========== 1.基础数据类型 ===========</span>
    <span class="token literal-property property">num</span><span class="token operator">:</span> <span class="token number">666</span><span class="token punctuation">,</span> <span class="token comment">// number</span>
    <span class="token literal-property property">str</span><span class="token operator">:</span> <span class="token string">'Christine'</span><span class="token punctuation">,</span> <span class="token comment">// string</span>
    <span class="token literal-property property">bool</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// boolean</span>
    <span class="token literal-property property">unf</span><span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token comment">// undefined</span>
    <span class="token literal-property property">nul</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// null</span>
    <span class="token literal-property property">sym</span><span class="token operator">:</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'sym'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// symbol</span>
    <span class="token literal-property property">bign</span><span class="token operator">:</span> <span class="token function">BigInt</span><span class="token punctuation">(</span><span class="token number">1n</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// bigint</span>

    <span class="token comment">// =========== 2.Object类型 ===========</span>
    <span class="token comment">// 普通对象</span>
    <span class="token literal-property property">obj</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'我是一个对象'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 数组</span>
    <span class="token literal-property property">arr</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 函数</span>
    <span class="token function-variable function">func</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'我是一个函数'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 日期</span>
    <span class="token literal-property property">date</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">// 正则</span>
    <span class="token literal-property property">reg</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span><span class="token string">'/我是一个正则/ig'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">// Map</span>
    <span class="token literal-property property">map</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'mapKey'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">// Set</span>
    <span class="token literal-property property">set</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">'set'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">// =========== 3.其他 ===========</span>
    <span class="token punctuation">[</span><span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'1'</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token number">1</span>  <span class="token comment">// Symbol作为key</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 4.添加不可枚举属性</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">'innumerable'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">'不可枚举属性'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 5.设置原型对象</span>
Object<span class="token punctuation">.</span><span class="token function">setPrototypeOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">proto</span><span class="token operator">:</span> <span class="token string">'proto'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 6.设置loop成循环引用的属性</span>
obj<span class="token punctuation">.</span>loop <span class="token operator">=</span> obj

<span class="token comment">// 测试</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'obj==========>'</span><span class="token punctuation">,</span> obj<span class="token punctuation">)</span>
<span class="token keyword">const</span> clonedObj <span class="token operator">=</span> <span class="token function">deepClone</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'clonedObj==========>'</span><span class="token punctuation">,</span> clonedObj<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>clonedObj <span class="token operator">===</span> obj<span class="token punctuation">)</span>  <span class="token comment">// false，返回的是一个新对象</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>clonedObj<span class="token punctuation">.</span>arr <span class="token operator">===</span> obj<span class="token punctuation">.</span>arr<span class="token punctuation">)</span>  <span class="token comment">// false，说明拷贝的不是引用</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>clonedObj<span class="token punctuation">.</span>func <span class="token operator">===</span> obj<span class="token punctuation">.</span>func<span class="token punctuation">)</span> <span class="token comment">// false，说明function也复制了一份</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>clonedObj<span class="token punctuation">.</span>proto<span class="token punctuation">)</span>  <span class="token comment">// proto，可以取到原型的属性</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://blog.csdn.net/qq_25257229/article/details/117969685" target="_blank" rel="noopener noreferrer">参考文章：<ExternalLinkIcon/></a>
<a href="https://codepen.io/tangshiya/pen/BavbNXG?editors=0010" target="_blank" rel="noopener noreferrer">传送门：<ExternalLinkIcon/></a></p>
<h2 id="防抖-debounce" tabindex="-1"><a class="header-anchor" href="#防抖-debounce"><span>防抖（debounce）</span></a></h2>
<blockquote>
<p>触发高频事件后 n 秒内函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间。</p>
</blockquote>
<p>应用场景：</p>
<ol>
<li>登录、发短信等按钮避免用户点击太快，以致于发送多次请求。</li>
<li>调整浏览器窗口大小时，resize次数过于频繁，造成计算过多，此时需要一次到位，就用到了防抖。</li>
<li>文本编辑器实时保存，当无任何更改操作一秒后进行保存。</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * fn: 需要进行防抖处理的函数
 * wait: 参数是延迟时间，默认为3000ms
 */</span>
<span class="token keyword">function</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> wait <span class="token operator">=</span> <span class="token number">3000</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> timerId<span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>timerId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timerId<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    timerId <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">fn</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> wait<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

window<span class="token punctuation">.</span>onresize <span class="token operator">=</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'onresize'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="节流-throttle" tabindex="-1"><a class="header-anchor" href="#节流-throttle"><span>节流（throttle）</span></a></h2>
<blockquote>
<p>高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率。</p>
</blockquote>
<p>应用场景：</p>
<ol>
<li><code v-pre>scroll</code> 事件，每隔 <code v-pre>wait</code> 秒计算一次位置信息等</li>
<li>浏览器播放事件，每隔 <code v-pre>wait</code> 秒计算一次进度信息等</li>
<li>input框实时搜索并发送请求展示下拉列表，每隔 <code v-pre>wait</code> 秒发送一次请求（也可做防抖）</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 延时器</span>
<span class="token keyword">function</span> <span class="token function">throttle</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> wait <span class="token operator">=</span> <span class="token number">3000</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> timerId
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>timerId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      timerId <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        timerId <span class="token operator">=</span> <span class="token keyword">null</span>
        <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timerId<span class="token punctuation">)</span>
        <span class="token function">fn</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> wait<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3>
<ul>
<li>防抖：防止抖动，单位时间内事件触发会被重置，避免事件被误伤触发多次。<strong>代码实现重在清零</strong> <code v-pre>clearTimeout</code>。防抖可以比作等电梯，只要有一个人进来，就需要再等一会儿。业务场景有避免登录按钮多次点击的重复提交。</li>
<li>节流：控制流量，单位时间内事件只能触发一次，与服务器端的限流 (Rate Limit) 类似。<strong>代码实现重在开锁关锁</strong> <code v-pre>timer=timeout; timer=null</code>。节流可以比作过红绿灯，每等一个红灯时间就可以过一批。</li>
</ul>
<p><a href="https://juejin.cn/post/7032905194736189477" target="_blank" rel="noopener noreferrer">JS手写题-防抖-节流<ExternalLinkIcon/></a></p>
<h2 id="原型和原型链" tabindex="-1"><a class="header-anchor" href="#原型和原型链"><span>原型和原型链</span></a></h2>
<h3 id="原型基本概念" tabindex="-1"><a class="header-anchor" href="#原型基本概念"><span>原型基本概念</span></a></h3>
<p>Javascript 规定，每一个构造函数都有一个 <code v-pre>prototype</code> 属性，指向原型对象。 这个对象的所有属性和方法，都会被构造函数的实例继承。</p>
<p>这也就意味着，我们可以把所有对象实例需要共享的属性和方法直接定义在 <code v-pre>prototype</code> 对象上。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span> <span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
  <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age
<span class="token punctuation">}</span>

<span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token string">'human'</span>

<span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">sayName</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">'Christine'</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> p2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">'Picker'</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p1<span class="token punctuation">.</span>sayName <span class="token operator">===</span> p2<span class="token punctuation">.</span>sayName<span class="token punctuation">)</span> <span class="token comment">// => true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时所有实例的 <code v-pre>type</code> 属性和 <code v-pre>sayName()</code> 方法， 其实都是同一个内存地址，指向 <code v-pre>prototype</code> 对象，因此就提高了运行效率。</p>
<p>我们注意到，上面例子中每添加一个属性和方法就要敲一遍 <code v-pre>Person.prototype</code>。 为减少不必要的输入，更常见的做法是用一个包含所有属性和方法的对象字面量来重写整个原型对象：</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span> <span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
  <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age
<span class="token punctuation">}</span>

<span class="token class-name">Person</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'human'</span><span class="token punctuation">,</span>
  <span class="token function-variable function">sayHello</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'我叫'</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">'，我今年'</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">+</span> <span class="token string">'岁了'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在该示例中，我们将一个新的对象赋值给了 <code v-pre>Person.prototype</code> 。 这样做的好处就是为 <code v-pre>Person.prototype</code> 添加成员简单了，但是也会带来一个问题，那就是原型对象丢失了 <code v-pre>constructor</code> 成员。
所以，我们为了保持 <code v-pre>constructor</code> 的指向正确，建议的写法是：</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span> <span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
  <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age
<span class="token punctuation">}</span>

<span class="token class-name">Person</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">constructor</span><span class="token operator">:</span> Person<span class="token punctuation">,</span> <span class="token comment">// => 手动将 constructor 指向正确的构造函数</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'human'</span><span class="token punctuation">,</span>
  <span class="token function-variable function">sayHello</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'我叫'</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">'，我今年'</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">+</span> <span class="token string">'岁了'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="构造函数、实例、原型三者之间的关系" tabindex="-1"><a class="header-anchor" href="#构造函数、实例、原型三者之间的关系"><span>构造函数、实例、原型三者之间的关系</span></a></h3>
<p>构造函数：构造函数就是一个函数，配合new可以新建对象。</p>
<p>实例：通过构造函数实例化出来的对象我们把它叫做构造函数的实例。一个构造函数可以有很多实例。</p>
<p>原型：每一个构造函数都有一个属性prototype，这个属性就叫做原型属性。通过构造函数创建出来的实例能够直接使用原型上的属性和方法。</p>
<h3 id="proto" tabindex="-1"><a class="header-anchor" href="#proto"><span><code v-pre>__proto__</code></span></a></h3>
<p>通过构造函数创建的对象，自带一个<code v-pre>__proto__</code>属性，这个属性指向了构造函数的 <code v-pre>prototype</code> 属性，也就是原型对象。</p>
<p>获取原型对象：</p>
<ul>
<li>通过 <code v-pre>构造函数.prototype</code> 可以获取</li>
<li>通过 <code v-pre>实例.__proto__</code> 可以获取（隐式原型）</li>
<li>它们指向了同一个对象 <code v-pre>构造函数.prototype</code> === <code v-pre>实例.__proto__</code></li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p><code v-pre>__proto__</code> 是浏览器的一个隐藏（私有）属性，早期的IE浏览器不支持，不要去修改它，如果要修改原型中的内容，使用 <code v-pre>构造函数.prototype</code> 去修改。</p>
</div>
<p>总结：</p>
<ul>
<li>任何函数都具有一个 <code v-pre>prototype</code> 属性，该属性是一个对象；</li>
<li>构造函数的 <code v-pre>prototype</code> 对象默认都有一个 <code v-pre>constructor</code> 属性，指向 <code v-pre>prototype</code> 对象所在函数；</li>
<li>通过构造函数得到的实例对象内部会包含一个指向构造函数的 <code v-pre>prototype</code> 对象的指针 <code v-pre>__proto__</code>；</li>
<li>所有实例都直接或间接继承了原型对象的成员。</li>
</ul>
<div class="custom-container warning"><p class="custom-container-title">警告</p>
<p>如果重置了 <code v-pre>prototype</code> 记得修正 <code v-pre>constructor</code> 的指向。</p>
</div>
<h3 id="原型链概念" tabindex="-1"><a class="header-anchor" href="#原型链概念"><span>原型链概念</span></a></h3>
<p>任何一个对象，都有原型对象，原型对象本身又是一个对象，所以原型对象也有自己的原型对象，这样一环扣一环就形成了一个链式结构，我们把这个链式结构称为：原型链。</p>
<p>原型链可以实现一些属性和方法的公有化，通过原型链，自身没有的属性和方法可以在原型链中查找。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Object.prototype是原型链的尽头，Object.prototype的原型是null。</p>
</div>
<h3 id="object-prototype成员介绍" tabindex="-1"><a class="header-anchor" href="#object-prototype成员介绍"><span>Object.prototype成员介绍</span></a></h3>
<ul>
<li>hasOwnProperty
<code v-pre>hasOwnProperty()</code> 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">"zs"</span>
<span class="token punctuation">}</span>
<span class="token comment">//判断name属性是不是obj自己提供（非继承）的</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">"toString"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="思考-hasownproperty与in的区别" tabindex="-1"><a class="header-anchor" href="#思考-hasownproperty与in的区别"><span>思考：hasOwnProperty与in的区别？</span></a></h4>
<p>in操作符：如果属性不是自己提供的，是从原型上继承来的，也会返回true</p>
<p>hasOwnProperty: 该属性必须是自己提供，才返回true，否则返回false。</p>
<h2 id="继承" tabindex="-1"><a class="header-anchor" href="#继承"><span>继承</span></a></h2>
<h3 id="原型继承" tabindex="-1"><a class="header-anchor" href="#原型继承"><span>原型继承</span></a></h3>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Parent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'Christine'</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>colors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'red'</span><span class="token punctuation">,</span> <span class="token string">'blue'</span><span class="token punctuation">,</span> <span class="token string">'green'</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token class-name">Parent</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">sayHi</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">Son</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">0.8</span>
<span class="token punctuation">}</span>

<span class="token class-name">Son</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Parent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token class-name">Son</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">getAge</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>age
<span class="token punctuation">}</span>

<span class="token keyword">const</span> son <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Son</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> son2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Son</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>son<span class="token punctuation">)</span> <span class="token comment">// Son {age: 0.8}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>son<span class="token punctuation">.</span><span class="token function">sayHi</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
son<span class="token punctuation">.</span>colors<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'pink'</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>son<span class="token punctuation">.</span>colors<span class="token punctuation">)</span> <span class="token comment">// ["red","blue","green","pink"]</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>son2<span class="token punctuation">.</span>colors<span class="token punctuation">)</span> <span class="token comment">// ["red","blue","green","pink"]</span>

<span class="token comment">// 直接修改对象上的属性，相当于直接给本对象新增属性</span>
son<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">"berry"</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>son<span class="token punctuation">)</span> <span class="token comment">// Son {age: 0.8, name: "berry"}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>son2<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// "Christine"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>缺点：</p>
<ul>
<li>继承的属性看不到</li>
<li>获取引用，修改引用中的值，会互相影响</li>
</ul>
<h3 id="借用构造函数继承" tabindex="-1"><a class="header-anchor" href="#借用构造函数继承"><span>借用构造函数继承</span></a></h3>
<p>使用父类的构造函数来增强子类实例，等同于复制父类的实例给子类（不使用原型）</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Parent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'Christine'</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>colors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'red'</span><span class="token punctuation">,</span> <span class="token string">'blue'</span><span class="token punctuation">,</span> <span class="token string">'green'</span><span class="token punctuation">]</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">swim</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> likes swim.</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token class-name">Parent</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">sayHi</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name
<span class="token punctuation">}</span>

<span class="token class-name">Parent</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>lover <span class="token operator">=</span> <span class="token string">'Picker'</span>

<span class="token keyword">function</span> <span class="token function">Son</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">0.8</span>
  <span class="token function">Parent</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> son <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Son</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
son<span class="token punctuation">.</span>colors<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'pink'</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>son<span class="token punctuation">.</span>colors<span class="token punctuation">)</span> <span class="token comment">// ["red","blue","green","pink"]</span>

<span class="token keyword">const</span> son2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Son</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>son2<span class="token punctuation">.</span>colors<span class="token punctuation">)</span> <span class="token comment">// ["red","blue","green"]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>核心代码是 <code v-pre>Parent.call(this)</code>，创建子类实例时调用 <code v-pre>Parent</code> 构造函数，于是 <code v-pre>Son</code> 的每个实例都会将 <code v-pre>Parent</code> 中的属性复制一份。</p>
<p><strong>缺点：</strong></p>
<ul>
<li>只能继承父类的实例属性和方法，不能继承原型属性/方法</li>
<li>无法实现复用，每个子类都有父类实例函数的副本，影响性能</li>
</ul>
<p><img src="/extends2.jpg" alt="alt"></p>
<h3 id="组合继承" tabindex="-1"><a class="header-anchor" href="#组合继承"><span>组合继承</span></a></h3>
<p>组合上述两种方法就是组合继承。用原型链实现对原型属性和方法的继承，用借用构造函数技术来实现实例成员的继承。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Car</span><span class="token punctuation">(</span><span class="token parameter">color<span class="token punctuation">,</span> money</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>color <span class="token operator">=</span> color
  <span class="token keyword">this</span><span class="token punctuation">.</span>money <span class="token operator">=</span> money
<span class="token punctuation">}</span>

<span class="token class-name">Car</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">speed</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'180km/h'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token constant">BWM</span><span class="token punctuation">(</span><span class="token parameter">seat<span class="token punctuation">,</span> color<span class="token punctuation">,</span> money</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>seat <span class="token operator">=</span> seat
  <span class="token function">Car</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> color<span class="token punctuation">,</span> money<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token class-name">BWM</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Car</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 重写BWM.prototype的constructor属性，指向自己的构造函数BWM</span>
<span class="token class-name">BWM</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">=</span> <span class="token constant">BWM</span>
<span class="token class-name">BWM</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">run</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'run fast'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> bwm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BWM</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token string">'blue'</span><span class="token punctuation">,</span> <span class="token string">'100万'</span><span class="token punctuation">)</span>
bwm<span class="token punctuation">.</span><span class="token function">speed</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bwm <span class="token keyword">instanceof</span> <span class="token class-name">Car</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bwm <span class="token keyword">instanceof</span> <span class="token class-name">BWM</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上继承的方式核心是在子类的构造函数中通过 <code v-pre>Car.call(this, color, money)</code> 继承父类的实例属性和方法，然后改变子类的原型为 <code v-pre>new Car()</code> 来继承父类的原型属性和方法。</p>
<p>这种继承方式优点在于构造函数可以传参，不会与父类引用属性共享，可以复用父类的函数，但是也存在一个缺点就是在继承父类原型属性和方法时调用了父类构造函数，导致子类的原型上多了不需要的父类属性，存在内存上的浪费。
<img src="/extends3.jpg" alt="alt"></p>
<h3 id="寄生组合继承" tabindex="-1"><a class="header-anchor" href="#寄生组合继承"><span>寄生组合继承</span></a></h3>
<p>这种继承方式对组合继承进行了优化，组合继承缺点在于继承父类原型属性和方法时调用了父类构造函数，我们只需要优化掉这点就行了。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Car</span><span class="token punctuation">(</span><span class="token parameter">color<span class="token punctuation">,</span> money</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>color <span class="token operator">=</span> color
  <span class="token keyword">this</span><span class="token punctuation">.</span>money <span class="token operator">=</span> money
<span class="token punctuation">}</span>

<span class="token class-name">Car</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">speed</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>color<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> 150km/h</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token constant">BWM</span><span class="token punctuation">(</span><span class="token parameter">seat<span class="token punctuation">,</span> color<span class="token punctuation">,</span> money</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>seat <span class="token operator">=</span> seat
  <span class="token function">Car</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> color<span class="token punctuation">,</span> money<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token class-name">BWM</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Car</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span>
<span class="token class-name">BWM</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">=</span> <span class="token constant">BWM</span>

<span class="token keyword">const</span> bwm1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BWM</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token string">'blue'</span><span class="token punctuation">,</span> <span class="token string">'100万'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> bwm2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BWM</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token string">'black'</span><span class="token punctuation">,</span> <span class="token string">'50万'</span><span class="token punctuation">)</span>
bwm1<span class="token punctuation">.</span><span class="token function">speed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// "blue 150km/h"</span>
bwm2<span class="token punctuation">.</span><span class="token function">speed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// "black 150km/h"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上继承实现的核心就是将父类的原型赋值给了子类，并且将构造函数设置为子类，这样既解决了无用的父类属性问题，还能正确的找到子类的构造函数。
<img src="/extends4.jpg" alt="alt"></p>
<h3 id="class-继承" tabindex="-1"><a class="header-anchor" href="#class-继承"><span>Class 继承</span></a></h3>
<p>以上两种继承方式都是通过原型去解决的，在 ES6 中，我们可以使用 <code v-pre>class</code> 去实现继承，并且实现起来很简单。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Car</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">color<span class="token punctuation">,</span> money</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>color <span class="token operator">=</span> color
    <span class="token keyword">this</span><span class="token punctuation">.</span>money <span class="token operator">=</span> money
  <span class="token punctuation">}</span>
  <span class="token function">speed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>color<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> 150km/h</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">BWM</span> <span class="token keyword">extends</span> <span class="token class-name">Car</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">seat<span class="token punctuation">,</span> color<span class="token punctuation">,</span> money</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>color<span class="token punctuation">,</span> money<span class="token punctuation">)</span> <span class="token comment">// 需要写在构造函数的最顶部</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>seat <span class="token operator">=</span> seat
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> bwm1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BWM</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token string">'blue'</span><span class="token punctuation">,</span> <span class="token string">'100万'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> bwm2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BWM</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token string">'black'</span><span class="token punctuation">,</span> <span class="token string">'50万'</span><span class="token punctuation">)</span>
bwm1<span class="token punctuation">.</span><span class="token function">speed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// "blue 150km/h"</span>
bwm2<span class="token punctuation">.</span><span class="token function">speed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// "black 150km/h"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>class</code> 实现继承的核心在于使用 <code v-pre>extends</code> 表明继承自哪个父类，并且在子类构造函数中必须调用 <code v-pre>super</code>，因为这段代码可以看成 <code v-pre>Car.call(this, color, money)</code>。</p>
<h4 id="类的静态属性-方法" tabindex="-1"><a class="header-anchor" href="#类的静态属性-方法"><span>类的静态属性/方法</span></a></h4>
<blockquote>
<p>通过关键字 <code v-pre>static</code> 可以声明一个静态属性/方法。和其他语言一样，静态属性/方法只会挂载到类中，而不会通过类创建的实例调用。</p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> type <span class="token operator">=</span> <span class="token string">"女孩"</span><span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"show: "</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">static</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"static print by: "</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 静态方法里的 this 指向类本身</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">"Christine"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 实例调用类方法</span>
user<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 报错。找不到对象方法</span>

<span class="token comment">// 使用类方法</span>
User<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// static print by: 女孩</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="super关键字" tabindex="-1"><a class="header-anchor" href="#super关键字"><span>super关键字</span></a></h4>
<p>在继承的过程中，经常会看到 <code v-pre>super</code> 关键字，它有两个作用：</p>
<ol>
<li>子类调用构造函数 <code v-pre>constructor</code> 时，必须在构造函数先调用 <code v-pre>super</code> 关键字，然后才能使用<code v-pre>this</code>对象。</li>
<li>子类同名方法会覆盖父类方法，这是使用 <code v-pre>super</code> 关键字可以调用父类方法。</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Child</span> <span class="token keyword">extends</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 当子类调用了构造函数，却没有在内部使用super，新建实例会报错</span>
<span class="token keyword">const</span> child <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Child</span><span class="token punctuation">(</span><span class="token string">'Christine'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="/class.jpg" alt="alt">
所以需要在使用 <code v-pre>this</code> 之前，调用一下 <code v-pre>super</code>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Child</span> <span class="token keyword">extends</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="super-指向" tabindex="-1"><a class="header-anchor" href="#super-指向"><span>super 指向</span></a></h4>
<p>ES6 给我们提供的 <code v-pre>super</code> 会指向父类的原型。所以我们可以通过 <code v-pre>super</code> 找到其原型链中的所有属性/方法，但是无法找到 <code v-pre>static</code> 方法/属性。</p>
<div class="custom-container tip"><p class="custom-container-title">总结</p>
<ol>
<li><code v-pre>constructor</code> 是一个构造函数，创建对象时会自动调用。即使不写，它也会默认存在。</li>
<li>所有写在 <code v-pre>constructor</code> 内的属性都是实例属性，是定义在实例中的。在<code v-pre>constructor</code>之外的属性，都是定义在类中的，也就是原型属性。</li>
<li><code v-pre>constructor</code> 中的 <code v-pre>this</code> 指向的是调用的实例对象，静态方法中的this指向类本身。</li>
<li>子类使用构造器时，必须使用 <code v-pre>super</code> 关键字来扩展构造器，并且需要先调用 <code v-pre>super</code>。</li>
<li>使用 <code v-pre>static</code> 关键字标明类属性/方法，他们无法通过类创建的实例调用，只能通过类直接调用。</li>
<li>静态属性/方法是会被继承的。</li>
</ol>
</div>
<p><a href="https://juejin.cn/post/6844903696111763470#heading-0" target="_blank" rel="noopener noreferrer">参考连接：<ExternalLinkIcon/></a></p>
<h2 id="element-getboundingclientrect" tabindex="-1"><a class="header-anchor" href="#element-getboundingclientrect"><span>Element.getBoundingClientRect()</span></a></h2>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
  <span class="token selector">*</span> <span class="token punctuation">{</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.box</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 100px auto<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #ccc<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.child</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #ccc<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>child<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      child
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">const</span> childDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.child'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>childDom<span class="token punctuation">.</span><span class="token function">getBoundingClientRect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// --- 相对于视口左上角的位置，均是 number ---</span>
  <span class="token comment">// top: 100     --- 盒子上边框距离视口顶部的距离</span>
  <span class="token comment">// bottom: 302  --- 盒子底边框距离视口顶部的距离 = top + height</span>
  <span class="token comment">// left: 394    --- 盒子左边框距离视口左侧的距离</span>
  <span class="token comment">// right: 796   --- 盒子右边框距离视口左侧的距离 = left + width</span>
  <span class="token comment">// x: 394       --- 盒子左上角相对于视口左侧的距离</span>
  <span class="token comment">// y: 100       --- 盒子左上角相对于视口顶部的距离</span>

  <span class="token comment">// 盒子的宽高</span>
  <span class="token comment">// width: 402</span>
  <span class="token comment">// height: 202</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="for-in和for-of的区别" tabindex="-1"><a class="header-anchor" href="#for-in和for-of的区别"><span>for...in和for...of的区别</span></a></h2>
<p><code v-pre>for...of</code> 是ES6新增的遍历方式，允许遍历一个含有<code v-pre>iterator</code>接口的数据结构（数组、对象等）并且返回各项的值，和ES3中的<code v-pre>for...in</code>的区别如下</p>
<ul>
<li><code v-pre>for...of</code> 遍历获取的是对象的键值，<code v-pre>for...in</code> 获取的是对象的键名；</li>
<li><code v-pre>for...in</code> 会遍历对象的整个原型链，性能非常差不推荐使用，而 <code v-pre>for...of</code> 只遍历当前对象不会遍历原型链；</li>
<li>对于数组的遍历，<code v-pre>for...in</code> 会返回数组的下标，<code v-pre>for...of</code> 只返回数组的下标对应的属性值；</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">总结</p>
<p>for...in 循环主要是为了遍历对象而生，不适用于遍历数组；for...of 循环可以用来遍历数组、类数组对象，字符串、Set、Map 以及 Generator 对象。</p>
</div>
<h2 id="如何判断某一个值是数组" tabindex="-1"><a class="header-anchor" href="#如何判断某一个值是数组"><span>如何判断某一个值是数组</span></a></h2>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">isArray</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'[object Array]'</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">isArray</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr <span class="token keyword">instanceof</span> <span class="token class-name">Array</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


