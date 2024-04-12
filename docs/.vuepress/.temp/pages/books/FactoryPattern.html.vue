<template><div><h1 id="工厂模式" tabindex="-1"><a class="header-anchor" href="#工厂模式"><span>工厂模式</span></a></h1>
<h2 id="工场模式介绍" tabindex="-1"><a class="header-anchor" href="#工场模式介绍"><span>工场模式介绍</span></a></h2>
<blockquote>
<p>所谓工厂模式就是像工厂一样重复的产生类似的产品，工厂模式只需要我们传入正确的参数，就能生产类似的产品；
工厂模式根据抽象程度依次分为简单工厂模式、工厂方法模式、抽象工厂模式。</p>
</blockquote>
<h2 id="简单工厂模式" tabindex="-1"><a class="header-anchor" href="#简单工厂模式"><span>简单工厂模式</span></a></h2>
<blockquote>
<p>又叫静态工厂方法，由一个工厂对象决定创建某一种产品对象类的实例。主要用来创建同一类对象。</p>
</blockquote>
<h3 id="对不同的类实例化" tabindex="-1"><a class="header-anchor" href="#对不同的类实例化"><span>对不同的类实例化</span></a></h3>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 篮球基类</span>
<span class="token keyword">function</span> <span class="token function">Basketball</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>intro <span class="token operator">=</span> <span class="token string">'篮球流行于美国'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">Basketball</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">getBallsize</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'篮球很大'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 足球基类</span>
<span class="token keyword">function</span> <span class="token function">Football</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>intro <span class="token operator">=</span> <span class="token string">'足球在世界范围内很流行'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">Football</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">getBallsize</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'足球很大'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 网球基类</span>
<span class="token keyword">function</span> <span class="token function">Tennis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>intro <span class="token operator">=</span> <span class="token string">'每年有很多网球系列赛'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">Tennis</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">getBallsize</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'网球很小'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 运动工厂</span>
<span class="token keyword">function</span> <span class="token function">sportsFactory</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">'NBA'</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Basketball</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">case</span> <span class="token string">'wordcup'</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Football</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">case</span> <span class="token string">'Frenchopen'</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Tennis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> basketball <span class="token operator">=</span> <span class="token function">sportsFactory</span><span class="token punctuation">(</span><span class="token string">'NBA'</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>basketball<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { intro: '篮球流行于美国' }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>basketball<span class="token punctuation">.</span>intro<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 篮球流行于美国</span>
basketball<span class="token punctuation">.</span><span class="token function">getBallsize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 篮球很大</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建相似对象-相似东西提取-不相似的针对性处理" tabindex="-1"><a class="header-anchor" href="#创建相似对象-相似东西提取-不相似的针对性处理"><span>创建相似对象 (相似东西提取，不相似的针对性处理)</span></a></h3>
<blockquote>
<p>你只需简单创建一个对象即可，然后通过对这个对象大量拓展方法和属性，并在最终将对象返回出来。</p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 工厂模式</span>
<span class="token keyword">function</span> <span class="token function">sportsFactory</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> intro<span class="token punctuation">,</span> detail</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> o <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 创建一个对象，并对对象拓展属性和方法</span>

  o<span class="token punctuation">.</span>intro <span class="token operator">=</span> intro<span class="token punctuation">;</span>

  o<span class="token punctuation">.</span><span class="token function-variable function">getBallsize</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>detail<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>name <span class="token operator">===</span> <span class="token string">'NBA'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    o<span class="token punctuation">.</span>nba <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>name <span class="token operator">===</span> <span class="token string">'wordcup'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    o<span class="token punctuation">.</span>wordcup <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>name <span class="token operator">===</span> <span class="token string">'Frenchopen'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    o<span class="token punctuation">.</span>frenchopen <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> o
<span class="token punctuation">}</span>

<span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'NBA'</span><span class="token punctuation">,</span> <span class="token literal-property property">intro</span><span class="token operator">:</span> <span class="token string">'篮球流行于美国'</span><span class="token punctuation">,</span> <span class="token literal-property property">detail</span><span class="token operator">:</span> <span class="token string">'篮球很大'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'wordcup'</span><span class="token punctuation">,</span> <span class="token literal-property property">intro</span><span class="token operator">:</span> <span class="token string">'足球在世界范围内很流行'</span><span class="token punctuation">,</span> <span class="token literal-property property">detail</span><span class="token operator">:</span> <span class="token string">'足球很大'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Frenchopen'</span><span class="token punctuation">,</span> <span class="token literal-property property">intro</span><span class="token operator">:</span> <span class="token string">'每年有很多网球系列赛'</span><span class="token punctuation">,</span> <span class="token literal-property property">detail</span><span class="token operator">:</span> <span class="token string">'网球很小'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
arr<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> name<span class="token punctuation">,</span> intro<span class="token punctuation">,</span> detail <span class="token punctuation">}</span> <span class="token operator">=</span> item
  <span class="token keyword">const</span> balls <span class="token operator">=</span> <span class="token function">sportsFactory</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> intro<span class="token punctuation">,</span> detail<span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>balls<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
执行结果如下：
<span class="token punctuation">{</span> <span class="token literal-property property">intro</span><span class="token operator">:</span> <span class="token string">'篮球流行于美国'</span><span class="token punctuation">,</span> <span class="token literal-property property">getBallsize</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">Function</span> <span class="token punctuation">(</span>anonymous<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token literal-property property">nba</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">{</span>
  <span class="token literal-property property">intro</span><span class="token operator">:</span> <span class="token string">'足球在世界范围内很流行'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">getBallsize</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">Function</span> <span class="token punctuation">(</span>anonymous<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">wordcup</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">{</span>
  <span class="token literal-property property">intro</span><span class="token operator">:</span> <span class="token string">'每年有很多网球系列赛'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">getBallsize</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">Function</span> <span class="token punctuation">(</span>anonymous<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">frenchopen</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>结论</strong>：
第一种是通过类实例化对象创建的，第二种是通过创建一个新对象然后包装增强其属性和功能来实现的。他们之间的差异性也造成前面通过类创建的对象，如果这些类继承同一父类，那么他们的父类原型上的方法是可以共用的。而后面寄生方式创建的对象都是一个新的个体，所以他们的方法就不能共用了。</p>
<h2 id="工厂方法模式" tabindex="-1"><a class="header-anchor" href="#工厂方法模式"><span>工厂方法模式</span></a></h2>
<blockquote>
<p>本意是说将实际创建对象工作推迟到子类当中。</p>
</blockquote>
<h3 id="安全模式类" tabindex="-1"><a class="header-anchor" href="#安全模式类"><span>安全模式类</span></a></h3>
<blockquote>
<p>可以屏蔽对类的错误使用造成的错误。</p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Demo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token class-name">Demo</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">show</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'成功获取！'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> d <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Demo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
d<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 成功获取！</span>

<span class="token keyword">const</span> d <span class="token operator">=</span> <span class="token function">Demo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
d<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// TypeError: Cannot read property 'show' of undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解决上面报错的方式很简单，就是在构造函数开始时先判断当前对象this指代是不是类（Demo），如果是则通过new关键字创建对象，如果不是说明类在全局作用域中执行（通常情况下），那么既然在全局作用域中执行当然this就会指向window了（通常情况下，如非浏览器环境可为其他全局对象），这样我们就要重新返回新创建的对象了。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Demo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">Demo</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Demo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token class-name">Demo</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">show</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'成功获取！'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> d <span class="token operator">=</span> <span class="token function">Demo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
d<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 成功获取！</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码详解：</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">Factory</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">this</span><span class="token punctuation">[</span>role<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Factory</span><span class="token punctuation">(</span>role<span class="token punctuation">)</span><span class="token punctuation">;</span>
当构造函数没有使用<span class="token keyword">new</span>关键字调用时不仅不能创建实例，还会声明全局变量
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安全的工厂方法" tabindex="-1"><a class="header-anchor" href="#安全的工厂方法"><span>安全的工厂方法</span></a></h3>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 安全模式创建的工厂类</span>
<span class="token keyword">function</span> <span class="token function">SportsFactory</span><span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> intro</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">SportsFactory</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">this</span><span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">(</span>intro<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SportsFactory</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> intro<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 工厂原型中设置创建所有类型数据对象的基类</span>
<span class="token class-name">SportsFactory</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">Basketball</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">intro</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>intro <span class="token operator">=</span> intro
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">Football</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">intro</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>intro <span class="token operator">=</span> intro
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">Tennis</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">intro</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>intro <span class="token operator">=</span> intro
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> sportsFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SportsFactory</span><span class="token punctuation">(</span><span class="token string">'Basketball'</span><span class="token punctuation">,</span> <span class="token string">'篮球流行于美国'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sportsFactory<span class="token punctuation">.</span>intro<span class="token punctuation">)</span> <span class="token comment">// 篮球流行于美国</span>

<span class="token keyword">const</span> sportsFactory1 <span class="token operator">=</span> <span class="token function">SportsFactory</span><span class="token punctuation">(</span><span class="token string">'Basketball'</span><span class="token punctuation">,</span> <span class="token string">'篮球流行于美国'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sportsFactory1<span class="token punctuation">.</span>intro<span class="token punctuation">)</span> <span class="token comment">// 篮球流行于美国</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>不是所有的函数都可以当做箭头函数
Factory.prototype = {
Basketball(intro) {
this.intro = intro;
}
}
new Basketball() // Basketball is not a constructor</p>
</div>
<h2 id="抽象工厂模式" tabindex="-1"><a class="header-anchor" href="#抽象工厂模式"><span>抽象工厂模式</span></a></h2>
<blockquote>
<p>通过对类的工厂抽象，使其业务用于对产品类簇的抽象，而不负责某一类产品的实例。</p>
</blockquote>
<h3 id="抽象工厂方法" tabindex="-1"><a class="header-anchor" href="#抽象工厂方法"><span>抽象工厂方法</span></a></h3>
<p>抽象类说白了就是类的类，定义一个抽象类其实就相当于ts中定义了一个接口，然后让子类继承抽象类相当于用这个接口去约束子类。</p>
<p>比如化妆品可以按品牌分为很多类。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// CHANEL</span>
<span class="token keyword">function</span> <span class="token constant">CHANEL</span><span class="token punctuation">(</span>price<span class="token punctuation">,</span> capacity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>price <span class="token operator">=</span> price
  <span class="token keyword">this</span><span class="token punctuation">.</span>capacity <span class="token operator">=</span> capacity
<span class="token punctuation">}</span>

<span class="token comment">// Dior</span>
<span class="token keyword">function</span> <span class="token function">Dior</span><span class="token punctuation">(</span>price<span class="token punctuation">,</span> capacity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>price <span class="token operator">=</span> price
  <span class="token keyword">this</span><span class="token punctuation">.</span>capacity <span class="token operator">=</span> capacity
<span class="token punctuation">}</span>

<span class="token comment">// and so on</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果希望给所有品牌定义一个总的Toilet类（抽象类），约束这些子类都有共同的type和两个方法。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Toilet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token string">'toilet'</span>
<span class="token punctuation">}</span>

<span class="token class-name">Toilet</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'抽象方法不能调用'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">getCapacity</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'抽象方法不能调用'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>抽象工厂方法就可以派上用场，它的作用就是使CHANEL、Dior这些子类去继承Toilet。</p>
<p>首先定义抽象工厂方法以及抽象类Toilet。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * subType 需要继承父类的子类
 * superType 父类的标识
/
function AbstructFactory(subType, superType)<span class="token punctuation">{</span>
  // 判断抽象工厂中是否有该抽象类
  if(typeof AbstructFactory[superType] === 'function') <span class="token punctuation">{</span>
    // 创建过渡类F
    function F() <span class="token punctuation">{</span><span class="token punctuation">}</span>

    // 将父类的实例挂载到过渡类的原型上
    F.prototype = new AbstructFactory[superType]()

    // 将过渡类的实例挂载到子类的原型上
    subType.prototype = new F()
  <span class="token punctuation">}</span> else <span class="token punctuation">{</span>
    return new new Error('抽象方法不能调用')
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

AbstructFactory.Toilet = function() <span class="token punctuation">{</span>
  this.type = 'toilet'
<span class="token punctuation">}</span>
AbstructFactory.Toilet.getPrice = function() <span class="token punctuation">{</span>
  return new Error('抽象方法不能调用')
<span class="token punctuation">}</span>
AbstructFactory.Toilet.getCapacity = function() <span class="token punctuation">{</span>
  return new Error('抽象方法不能调用')
<span class="token punctuation">}</span>

// 普通CHANEL子类
function CHANEL(price, capacity) <span class="token punctuation">{</span>
  this.price = price
  this.capacity = capacity
<span class="token punctuation">}</span>

AbstructFactory(CHANEL, 'Toilet')

const chanel = new CHANEL(300, '50ML')
console.log(chanel.__proto__.constructor) // F() <span class="token punctuation">{</span><span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>在最后一行console中发现一个问题，chanel实例原型对象的constructor指向的是过渡函数F，而不是其构造函数CHANEL。</p>
</div>
<p>在抽象工厂方法中添加一行代码修正指向：</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">AbstructFactory</span><span class="token punctuation">(</span><span class="token parameter">subType<span class="token punctuation">,</span> superType</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// 判断抽象工厂中是否有该抽象类</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> AbstructFactory<span class="token punctuation">[</span>superType<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">'function'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建过渡类F</span>
    <span class="token keyword">function</span> <span class="token constant">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">// 将父类的实例挂载到过渡类的原型上</span>
    <span class="token class-name">F</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AbstructFactory</span><span class="token punctuation">[</span>superType<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 修正子类原型对象constructor的指向</span>
    <span class="token class-name">F</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">=</span> subType

    <span class="token comment">// 将过渡类的实例挂载到子类的原型上</span>
    subType<span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">new</span> <span class="token function">Error</span><span class="token punctuation">(</span><span class="token string">'抽象方法不能调用'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 指向正确</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>chanel<span class="token punctuation">.</span><span class="token class-name">__proto__</span><span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// CHANEL(price, capacity) {this.price = price;this.capacity = capacity}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


