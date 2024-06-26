<template><div><h1 id="渲染层面的性能优化" tabindex="-1"><a class="header-anchor" href="#渲染层面的性能优化"><span>渲染层面的性能优化</span></a></h1>
<h2 id="服务端渲染" tabindex="-1"><a class="header-anchor" href="#服务端渲染"><span>服务端渲染</span></a></h2>
<h3 id="客户端渲染的运行机制" tabindex="-1"><a class="header-anchor" href="#客户端渲染的运行机制"><span>客户端渲染的运行机制</span></a></h3>
<h4 id="特点" tabindex="-1"><a class="header-anchor" href="#特点"><span>特点</span></a></h4>
<ul>
<li>服务端将客户端渲染需要的静态文件发送给客户端</li>
<li>客户端加载过来之后，自己在浏览器里跑一遍 JS，根据 JS 的运行结果，生成相应的 DOM。</li>
<li>这种特性使得客户端渲染的源代码总是特别简洁，根节点下到底是什么内容呢？只有浏览器把 index.js 跑过一遍后才知道，这就是典型的客户端渲染。</li>
</ul>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>我是客户端渲染的页面<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">'</span>root<span class="token punctuation">'</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">'</span>index.js<span class="token punctuation">'</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="服务端渲染的运行机制" tabindex="-1"><a class="header-anchor" href="#服务端渲染的运行机制"><span>服务端渲染的运行机制</span></a></h3>
<h4 id="特点-1" tabindex="-1"><a class="header-anchor" href="#特点-1"><span>特点</span></a></h4>
<ul>
<li>当用户第一次请求页面时，由服务器把需要的组件或页面渲染成 HTML 字符串，然后把它返回给客户端。</li>
<li>客户端拿到手的，是可以直接渲染然后呈现给用户的 HTML 内容，不需要为了生成 DOM 内容自己再去跑一遍 JS 代码。</li>
</ul>
<h4 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景"><span>应用场景</span></a></h4>
<ul>
<li>优化 SEO</li>
<li>解决首屏加载速度过慢的性能问题</li>
</ul>
<h4 id="具体实现" tabindex="-1"><a class="header-anchor" href="#具体实现"><span>具体实现</span></a></h4>
<ul>
<li>服务端使用类似 <code v-pre>renderToString</code> 的方法将需要渲染的 DOM 结构转换成字符串
<ul>
<li>在虚拟 DOM 的当下，服务端渲染不再是早年 JSP 里简单粗暴的字符串拼接过程，它还要求这一端要具备将虚拟 DOM 转化为真实 DOM 的能力。与其说是“把 JS 在服务器上先跑一遍”，不如说是“把 Vue、React 等框架代码先在 Node 上跑一遍”。</li>
</ul>
</li>
<li>将转换的结果塞进模版中，返回给客户端</li>
</ul>
<h4 id="缺点" tabindex="-1"><a class="header-anchor" href="#缺点"><span>缺点</span></a></h4>
<ul>
<li>增加服务器的负担</li>
</ul>
<h2 id="浏览器渲染" tabindex="-1"><a class="header-anchor" href="#浏览器渲染"><span>浏览器渲染</span></a></h2>
<h3 id="浏览器渲染过程解析" tabindex="-1"><a class="header-anchor" href="#浏览器渲染过程解析"><span>浏览器渲染过程解析</span></a></h3>
<ul>
<li>解析 HTML（HTML 解释器）
<ul>
<li>在这一步浏览器执行了所有的加载解析逻辑，在解析 HTML 的过程中发出了页面渲染所需的各种外部资源请求，例如请求 js 脚本。最后生成 DOM 树</li>
</ul>
</li>
<li>计算样式（CSS 解释器）
<ul>
<li>浏览器将识别并加载所有的 CSS 样式信息，并与 DOM 树合并，最终生成页面 render 树（:after :before 这样的伪元素会在这个环节被构建到 DOM 树中）。</li>
</ul>
</li>
<li>计算图层布局（图层布局计算模块）
<ul>
<li>页面中所有元素的相对位置信息，大小等信息均在这一步得到计算。</li>
</ul>
</li>
<li>绘制图层（视图绘制模块）
<ul>
<li>在这一步中浏览器会根据我们的 DOM 代码结果，把每一个页面图层转换为像素，并对所有的媒体文件进行解码。</li>
</ul>
</li>
<li>整合图层，得到页面
<ul>
<li>最后一步浏览器会合并各个图层，将数据由 CPU 输出给 GPU 最终绘制在屏幕上。（复杂的视图层会给这个阶段的 GPU 计算带来一些压力，在实际应用中为了优化动画性能，我们有时会手动区分不同的图层）。</li>
</ul>
</li>
</ul>
<h3 id="浏览器渲染过程优化措施" tabindex="-1"><a class="header-anchor" href="#浏览器渲染过程优化措施"><span>浏览器渲染过程优化措施</span></a></h3>
<h4 id="css-样式表的优化" tabindex="-1"><a class="header-anchor" href="#css-样式表的优化"><span>CSS 样式表的优化</span></a></h4>
<h5 id="原因" tabindex="-1"><a class="header-anchor" href="#原因"><span>原因</span></a></h5>
<ul>
<li>每当一个新元素加入到 DOM 树中，浏览器便会通过 CSS 引擎查遍 CSS 样式表，找到符合该元素的样式规则应用到这个元素上，然后再重新去绘制它。
<ul>
<li>查表是个花时间的活，所以我们需要优化，让浏览器的查询工作又快又好地实现。</li>
</ul>
</li>
</ul>
<h5 id="查找样式表的规则" tabindex="-1"><a class="header-anchor" href="#查找样式表的规则"><span>查找样式表的规则</span></a></h5>
<ul>
<li>CSS 引擎查找样式表，对每条规则都按从右到左的顺序去匹配。</li>
</ul>
<h5 id="方案" tabindex="-1"><a class="header-anchor" href="#方案"><span>方案</span></a></h5>
<ul>
<li>避免使用通配符，只对需要用到的元素进行选择</li>
<li>关注可以通过继承实现的属性，避免重复匹配重复定义</li>
<li>少用标签选择器。如果可以，用类选择器替代
<ul>
<li>示例：#myList  li {}</li>
<li>浏览器必须遍历页面上每个 li 元素，并且每次都要去确认这个 li 元素的父元素 id 是不是 myList</li>
</ul>
</li>
<li>id 和 class 选择器不应该和多余的标签选择器写在一起
<ul>
<li>错误：div#title</li>
<li>正确：#title</li>
</ul>
</li>
<li>减少嵌套。后代选择器的开销是最高的，因此我们应该尽量将选择器的深度降到最低（最高不要超过三层），尽可能使用类来关联每一个标签元素
<ul>
<li>后代选择器：li a</li>
</ul>
</li>
</ul>
<h4 id="优化-css-的阻塞" tabindex="-1"><a class="header-anchor" href="#优化-css-的阻塞"><span>优化 CSS 的阻塞</span></a></h4>
<ul>
<li>将 CSS 放在 head 标签里</li>
<li>启用 CDN 实现静态资源加载速度的优化</li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Learn/Performance/CSS#%E4%BD%BF%E7%94%A8_will-change_%E4%BC%98%E5%8C%96%E5%85%83%E7%B4%A0%E5%8F%98%E5%8C%96" target="_blank" rel="noopener noreferrer">其他方案<ExternalLinkIcon/></a>
<ul>
<li>将不会立即使用的样式（例如打印样式）移动到单独的文件中，使用 Link 引入</li>
<li>添加媒体查询，告诉浏览器使用特定场景的样式表，这样它仍会下载其他样式，但不会阻塞渲染</li>
<li>启用 GPU 加速</li>
<li>will-change 属性</li>
<li>font-display 属性
<ul>
<li>可以通过依靠折中无样式文本闪现使文本可见替代白屏来提高性能。</li>
</ul>
</li>
<li>contain 属性
<ul>
<li>允许浏览器为 DOM 的有限区域而不是整个页面重新计算布局、样式、绘画、尺寸或它们的任何组合。</li>
</ul>
</li>
</ul>
</li>
</ul>
<h4 id="优化-js-的阻塞" tabindex="-1"><a class="header-anchor" href="#优化-js-的阻塞"><span>优化 JS 的阻塞</span></a></h4>
<p>向 script 标签添加 async/defer</p>
<h5 id="js的三种加载方式" tabindex="-1"><a class="header-anchor" href="#js的三种加载方式"><span>JS的三种加载方式</span></a></h5>
<ul>
<li>正常模式：</li>
</ul>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这种情况下 JS 会阻塞浏览器，浏览器必须等待 index.js 加载和执行完毕才能去做其它事情。</p>
<p>async 模式：</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">async</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>async 模式下，JS 不会阻塞浏览器做任何其它的事情。它的加载是异步的，当它加载结束，JS 脚本会立即执行。</p>
<p>defer 模式：</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">defer</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>defer 模式下，JS 的加载是异步的，执行是被推迟的。等整个文档解析完成、DOMContentLoaded 事件即将被触发时，被标记了 defer 的 JS 文件才会开始依次执行。</p>
<h2 id="dom-优化" tabindex="-1"><a class="header-anchor" href="#dom-优化"><span>DOM 优化</span></a></h2>
<h3 id="优化措施" tabindex="-1"><a class="header-anchor" href="#优化措施"><span>优化措施</span></a></h3>
<h4 id="基于-event-loop-进行异步更新" tabindex="-1"><a class="header-anchor" href="#基于-event-loop-进行异步更新"><span>基于 Event Loop，进行异步更新</span></a></h4>
<ul>
<li>当我们需要在异步任务中实现 DOM 修改时，把它包装成 micro 任务是相对明智的选择。
<ul>
<li>因为 micro 任务执行完毕后会马上进行渲染操作，而渲染完之后才会执行 script 中产生的第一个 macro，所以该 macro 任务执行完后要等到下一次事件循环才能渲染</li>
</ul>
</li>
</ul>
<h4 id="减少重绘与回流" tabindex="-1"><a class="header-anchor" href="#减少重绘与回流"><span>减少重绘与回流</span></a></h4>
<p><RouteLink to="/interview/browser.html#%E5%9B%9E%E6%B5%81%E4%B8%8E%E9%87%8D%E7%BB%98">回流与重绘</RouteLink></p>
</div></template>


