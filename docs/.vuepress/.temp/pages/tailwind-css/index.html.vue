<template><div><h1 id="tailwind-css" tabindex="-1"><a class="header-anchor" href="#tailwind-css"><span>Tailwind Css</span></a></h1>
<p><code v-pre>&lt;div class=&quot;flex h-screen flex-col md:flex-row md:overflow-hidden&quot; /&gt;</code></p>
<blockquote>
<p>在小屏设备上，其子元素会堆叠显示，并且 div 的高度占满整个屏幕，如果内容超过屏幕，按默认规则显示滚动条。当设备的屏幕尺寸达到 'md' 指定的尺寸时，其子元素会水平排列，并且如果内容超出 div ，将不会显示滚动条，超出的内容将被隐藏。</p>
</blockquote>
<ul>
<li><code v-pre>flex</code>: 这个类使用 CSS 的 flexbox 布局来布置其直接子元素。flex 布局可以让你不使用浮动或定位，就可以在各种显示和设备类型内创建高效的布局。</li>
<li><code v-pre>h-screen</code>: 这个类设置元素的高度与屏幕高度相等。这对于创建全屏布局（例如全屏幕滚动布局）非常实用。</li>
<li><code v-pre>flex-col</code>: 这个类更改 flex 容器的主轴方向为垂直方向，所以它的子元素会垂直堆叠。</li>
<li><code v-pre>md:flex-row</code>: 这是响应式类，在设定的中等 ('md') 或更大的视口大小下，它将 flex 容器的主轴方向更改为水平方向，此时子元素会水平排列。</li>
<li><code v-pre>md:overflow-hidden</code>: 这也是响应式类，在 'md' 或更大的视口时，设置元素的溢出内容不可见。</li>
</ul>
<p><code v-pre>&lt;div class=&quot;block md:hidden&quot; /&gt;</code></p>
<blockquote>
<p>在小于或等于 &quot;md&quot; 断点（默认为 768px）的视口上，将显示为块级元素，并在 &quot;md&quot; 断点或更大的视口屏幕上被隐藏。</p>
</blockquote>
<ul>
<li><code v-pre>block</code> 类设置一个元素的 CSS display 属性为 block，这意味着元素将独占一行，其宽度默认为 100%，高度由其内容决定。</li>
<li><code v-pre>md:hidden</code> 类是一个响应式类，在设定的中等 ('md') 或更大的视口大小下，它将元素的 display 属性设置为 none，使元素和它的所有内容在页面上完全不可见和不可交互。</li>
</ul>
<p><code v-pre>&lt;div class=&quot;hidden md:block&quot; /&gt;</code></p>
<blockquote>
<p>这个元素将在小于 &quot;md&quot; 断点的视口（默认为 768px）上隐藏，而在 &quot;md&quot; 断点或更大的视口上显示为块级元素。</p>
</blockquote>
<ul>
<li><code v-pre>hidden</code> 类设置一个元素的 CSS display 属性为 none，这会使元素及其所有内容在页面上完全不可见和不可交互。</li>
<li><code v-pre>md:block</code> 类是一个响应式类，它只在中等 (md) 或更大的视口大小下起作用。在这些视口大小下，它将元素的 display 属性设置为 block。</li>
</ul>
<p><code v-pre>&lt;div class=&quot;w-full flex-none md:w-64&quot; /&gt;</code></p>
<blockquote>
<p>这个元素将会在小于 md（默认768px）断点的视口下，宽度为父元素的100%，并且宽度不会随着父元素的宽度改变而改变。而在 md 断点或更大的视口下，元素的宽度将被固定为64px。</p>
</blockquote>
<p><code v-pre>w-full</code>：这个类将元素的宽度设置为 100% 的父元素。在基本的布局中，这常常用于使元素填充其容器。
<code v-pre>flex-none</code>：这个类设置 CSS 的 flex 属性为 none，这意味着元素既不会收缩也不会扩展以适应其容器。换句话说，元素的大小只会由它的 width 和 height 定义。
<code v-pre>md:w-64</code>：这是一个响应式类。在 'md'（中等）或更大的视口下，它会将元素的宽度设置为 16rem，因为在 Tailwind CSS 默认配置中，1rem 等于4px，所以 16rem 等于64px。</p>
<p><code v-pre>&lt;div class=&quot;flex-grow p-6 md:overflow-y-auto md:p-12&quot; /&gt;</code></p>
<blockquote>
<p>尽可能地填充其父容器的剩余空间，并且在小于 'md'断点（默认 768px）的视口下，元素的内边距为6px；而在 'md' 断点或更大的视口下，元素的内边距变为 12px，同时如果内容溢出则显示滚动条。</p>
</blockquote>
<ul>
<li>
<p><code v-pre>flex-grow</code>：这个类设置 CSS 的 flex-grow 属性为 1，这意味着元素将尽可能地填充其容器的剩余空间。如果有多个同级元素也设置了flex-grow，那么剩余空间会平均分配给这些元素。</p>
</li>
<li>
<p><code v-pre>p-6</code>：这个类设置元素的所有内边距（上、下、左、右）为 1.5rem，因为在 Tailwind CSS 默认配置中，1rem 等于 4px，所以 1.5rem 等于 6px。</p>
</li>
<li>
<p><code v-pre>md:overflow-y-auto</code>：这是一个响应式类，在设定的中等 ('md') 视口或更大的视口下，将元素上下方向（y 轴）的溢出内容设置为自动，即如果内容没有溢出则不显示滚动条，溢出则显示滚动条。</p>
</li>
<li>
<p><code v-pre>md:p-12</code>：这也是一个响应式类，在 'md' 或更大的视口下，设置元素的所有内边距为 3rem，即 12px。</p>
</li>
<li>
<p><code v-pre>h-[48px]</code>: 设置元素的高度为 48px。</p>
</li>
<li>
<p><code v-pre>md:justify-start</code>: 在 'md' 视口或更大视口下，将子元素在主轴线上左对齐。</p>
</li>
<li>
<p><code v-pre>font-medium</code>: 设置字体粗细为 medium。</p>
</li>
<li>
<p><code v-pre>rounded-md</code>: 添加适度的圆角到元素。</p>
</li>
<li>
<p><code v-pre>gap-2</code>: 设置 flex 子元素之间的间距为 0.5rem。</p>
</li>
<li>
<p><code v-pre>text-sm</code>: 设置文本大小为小号。</p>
</li>
<li>
<p><code v-pre>hover:bg-sky-100</code>: 当鼠标悬停在元素上时，将背景色变更为浅天空蓝色。</p>
</li>
<li>
<p><code v-pre>hover:text-blue-600</code>: 当鼠标悬停在元素上时，将文本颜色变更为深蓝色。</p>
</li>
</ul>
<p><code v-pre>space-y-3</code> 会在同级元素之间添加一个大小为 0.75rem（对应到 px 是 12px）的垂直间距（如果父元素是 flexbox 或者 grid 容器的话）。当你在一个容器上应用 <code v-pre>space-y-*</code> 类时，首个和末尾的子元素不会有外边距，这样容器的边界不会被扩展。</p>
</div></template>


