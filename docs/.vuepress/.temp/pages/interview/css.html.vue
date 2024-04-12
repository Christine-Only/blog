<template><div><h1 id="css-知识点" tabindex="-1"><a class="header-anchor" href="#css-知识点"><span>CSS 知识点</span></a></h1>
<h2 id="flex布局" tabindex="-1"><a class="header-anchor" href="#flex布局"><span>Flex布局</span></a></h2>
<h3 id="flex" tabindex="-1"><a class="header-anchor" href="#flex"><span>flex</span></a></h3>
<blockquote>
<p>设置了弹性项目如何增大或缩小以适应其弹性容器中可用的空间。</p>
</blockquote>
<p><strong>属性值</strong>：</p>
<ul>
<li>flex-grow：定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大</li>
<li>flex-shrink：定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小</li>
<li>flex-basis：给上面两个属性分配多余空间之前, 计算项目是否有多余空间, 默认值为 auto, 即项目本身的大小</li>
</ul>
<p><strong>语法</strong>：</p>
<div class="language-css line-numbers-mode" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token comment">/* 关键字值 */</span>
<span class="token property">flex</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
<span class="token property">flex</span><span class="token punctuation">:</span> initial<span class="token punctuation">;</span>
<span class="token property">flex</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>

<span class="token comment">/* 一个值, 无单位数字: flex-grow */</span>
<span class="token property">flex</span><span class="token punctuation">:</span> 2<span class="token punctuation">;</span>

<span class="token comment">/* 一个值, width: flex-basis */</span>
<span class="token property">flex</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>

<span class="token comment">/* 两个值: flex-grow | flex-basis */</span>
<span class="token property">flex</span><span class="token punctuation">:</span> 1 30px<span class="token punctuation">;</span>

<span class="token comment">/* 两个值: flex-grow | flex-shrink */</span>
<span class="token property">flex</span><span class="token punctuation">:</span> 2 2<span class="token punctuation">;</span>

<span class="token comment">/* 三个值: flex-grow | flex-shrink | flex-basis */</span>
<span class="token property">flex</span><span class="token punctuation">:</span> 2 2 10%<span class="token punctuation">;</span>

<span class="token comment">/*全局属性值 */</span>
<span class="token property">flex</span><span class="token punctuation">:</span> inherit<span class="token punctuation">;</span>
<span class="token property">flex</span><span class="token punctuation">:</span> initial<span class="token punctuation">;</span>
<span class="token property">flex</span><span class="token punctuation">:</span> unset<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p><strong>单值语法</strong>：值必须为以下其中之一:</p>
<ul>
<li>一个无单位数(<code v-pre>&lt;number&gt;</code>): 它会被当作flex:<code v-pre>&lt;number&gt; 1 0</code>; <code v-pre>&lt;flex-shrink&gt;</code>的值被假定为1，然后<code v-pre>&lt;flex-basis&gt;</code> 的值被假定为0。</li>
<li>一个有效的宽度(width)值: 它会被当作 <code v-pre>&lt;flex-basis&gt;</code> 的值。</li>
<li>关键字<strong>none</strong>：元素会根据自身宽高来设置尺寸。它是完全非弹性的：既不会缩短，也不会伸长来适应 flex 容器。相当于将属性设置为&quot;<code v-pre>flex: 0 0 auto</code>&quot;。</li>
<li>关键字<strong>auto</strong>：元素会根据自身的宽度与高度来确定尺寸，但是会伸长并吸收 flex 容器中额外的自由空间，也会缩短自身来适应 flex 容器。这相当于将属性设置为 &quot;<code v-pre>flex: 1 1 auto</code>&quot;。</li>
<li>关键字<strong>initial</strong>：元素会根据自身宽高设置尺寸。它会缩短自身以适应 flex 容器，但不会伸长并吸收 flex 容器中的额外自由空间来适应 flex 容器 。相当于将属性设置为&quot;<code v-pre>flex: 0 1 auto</code>&quot;。</li>
</ul>
</li>
<li>
<p><strong>双值语法</strong>：第一个值必须为一个无单位数，并且它会被当作 <code v-pre>&lt;flex-grow&gt;</code> 的值。第二个值必须为以下之一：</p>
<ul>
<li>一个无单位数：它会被当作 <code v-pre>&lt;flex-shrink&gt;</code> 的值。</li>
<li>一个有效的宽度值: 它会被当作 <code v-pre>&lt;flex-basis&gt;</code> 的值。</li>
</ul>
</li>
<li>
<p><strong>三值语法</strong>：</p>
<ul>
<li>第一个值必须为一个无单位数，并且它会被当作 <code v-pre>&lt;flex-grow&gt;</code> 的值。</li>
<li>第二个值必须为一个无单位数，并且它会被当作 <code v-pre>&lt;flex-shrink&gt;</code> 的值。</li>
<li>第三个值必须为一个有效的宽度值， 并且它会被当作 <code v-pre>&lt;flex-basis&gt;</code> 的值。</li>
</ul>
</li>
</ul>
<p>栗子：</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
  <span class="token selector">.container</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector">.left</span> <span class="token punctuation">{</span>
    <span class="token property">flex</span><span class="token punctuation">:</span> 1 2 300px<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector">.right</span> <span class="token punctuation">{</span>
    <span class="token property">flex</span><span class="token punctuation">:</span> 2 1 200px<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> yellow<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>left<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>right<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>详解：</p>
<ul>
<li>因为父容器的宽度小于子容器总和的宽度，所以 left 和 right 容器将缩小以适应其弹性容器中可用的空间，left 收缩的比例为<code v-pre>flex-shrink的比例 * flex-basis的比例 = 2/3 * 3/5</code>，right 收缩的比例为<code v-pre>flex-shrink的比例 * flex-basis的比例 = 1/3 * 2/5</code>，即 left 收缩(父容器宽度 - 子容器总宽度差值的)3/4，right 收缩(父容器宽度 - 子容器总宽度差值的)1/4</li>
</ul>
<p><img src="/flex1.jpg" alt="alt">
<img src="/flex2.jpg" alt="alt"></p>
<p>栗子：</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
  <span class="token selector">.container</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 600px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector">.left</span> <span class="token punctuation">{</span>
    <span class="token property">flex</span><span class="token punctuation">:</span> 1 2 300px<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector">.right</span> <span class="token punctuation">{</span>
    <span class="token property">flex</span><span class="token punctuation">:</span> 2 1 200px<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> yellow<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>left<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>right<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="/flex3.jpg" alt="alt">
<img src="/flex4.jpg" alt="alt"></p>
</div></template>


