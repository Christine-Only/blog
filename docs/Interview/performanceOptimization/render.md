# 渲染层面的性能优化

## 服务端渲染

### 客户端渲染的运行机制

#### 特点

- 服务端将客户端渲染需要的静态文件发送给客户端
- 客户端加载过来之后，自己在浏览器里跑一遍 JS，根据 JS 的运行结果，生成相应的 DOM。
- 这种特性使得客户端渲染的源代码总是特别简洁，根节点下到底是什么内容呢？只有浏览器把 index.js 跑过一遍后才知道，这就是典型的客户端渲染。

```html
<!doctype html>
<html>
  <head>
    <title>我是客户端渲染的页面</title>
  </head>
  <body>
    <div id='root'></div>
    <script src='index.js'></script>
  </body>
</html>
```

### 服务端渲染的运行机制

#### 特点

- 当用户第一次请求页面时，由服务器把需要的组件或页面渲染成 HTML 字符串，然后把它返回给客户端。
- 客户端拿到手的，是可以直接渲染然后呈现给用户的 HTML 内容，不需要为了生成 DOM 内容自己再去跑一遍 JS 代码。

#### 应用场景

- 优化 SEO
- 解决首屏加载速度过慢的性能问题

#### 具体实现

- 服务端使用类似 `renderToString` 的方法将需要渲染的 DOM 结构转换成字符串
  - 在虚拟 DOM 的当下，服务端渲染不再是早年 JSP 里简单粗暴的字符串拼接过程，它还要求这一端要具备将虚拟 DOM 转化为真实 DOM 的能力。与其说是“把 JS 在服务器上先跑一遍”，不如说是“把 Vue、React 等框架代码先在 Node 上跑一遍”。
- 将转换的结果塞进模版中，返回给客户端

#### 缺点

- 增加服务器的负担

## 浏览器渲染

### 浏览器渲染过程解析

- 解析 HTML（HTML 解释器）
  - 在这一步浏览器执行了所有的加载解析逻辑，在解析 HTML 的过程中发出了页面渲染所需的各种外部资源请求，例如请求 js 脚本。最后生成 DOM 树
- 计算样式（CSS 解释器）
  - 浏览器将识别并加载所有的 CSS 样式信息，并与 DOM 树合并，最终生成页面 render 树（:after :before 这样的伪元素会在这个环节被构建到 DOM 树中）。
- 计算图层布局（图层布局计算模块）
  - 页面中所有元素的相对位置信息，大小等信息均在这一步得到计算。
- 绘制图层（视图绘制模块）
  - 在这一步中浏览器会根据我们的 DOM 代码结果，把每一个页面图层转换为像素，并对所有的媒体文件进行解码。
- 整合图层，得到页面
  - 最后一步浏览器会合并各个图层，将数据由 CPU 输出给 GPU 最终绘制在屏幕上。（复杂的视图层会给这个阶段的 GPU 计算带来一些压力，在实际应用中为了优化动画性能，我们有时会手动区分不同的图层）。

### 浏览器渲染过程优化措施

#### CSS 样式表的优化

##### 原因

- 每当一个新元素加入到 DOM 树中，浏览器便会通过 CSS 引擎查遍 CSS 样式表，找到符合该元素的样式规则应用到这个元素上，然后再重新去绘制它。
  - 查表是个花时间的活，所以我们需要优化，让浏览器的查询工作又快又好地实现。

##### 查找样式表的规则

- CSS 引擎查找样式表，对每条规则都按从右到左的顺序去匹配。

##### 方案

- 避免使用通配符，只对需要用到的元素进行选择
- 关注可以通过继承实现的属性，避免重复匹配重复定义
- 少用标签选择器。如果可以，用类选择器替代
  - 示例：#myList  li {}
  - 浏览器必须遍历页面上每个 li 元素，并且每次都要去确认这个 li 元素的父元素 id 是不是 myList
- id 和 class 选择器不应该和多余的标签选择器写在一起
  - 错误：div#title
  - 正确：#title
- 减少嵌套。后代选择器的开销是最高的，因此我们应该尽量将选择器的深度降到最低（最高不要超过三层），尽可能使用类来关联每一个标签元素
  - 后代选择器：li a

#### 优化 CSS 的阻塞

- 将 CSS 放在 head 标签里
- 启用 CDN 实现静态资源加载速度的优化
- [其他方案](https://developer.mozilla.org/zh-CN/docs/Learn/Performance/CSS#%E4%BD%BF%E7%94%A8_will-change_%E4%BC%98%E5%8C%96%E5%85%83%E7%B4%A0%E5%8F%98%E5%8C%96)
  - 将不会立即使用的样式（例如打印样式）移动到单独的文件中，使用 Link 引入
  - 添加媒体查询，告诉浏览器使用特定场景的样式表，这样它仍会下载其他样式，但不会阻塞渲染
  - 启用 GPU 加速
  - will-change 属性
  - font-display 属性
    - 可以通过依靠折中无样式文本闪现使文本可见替代白屏来提高性能。
  - contain 属性
    - 允许浏览器为 DOM 的有限区域而不是整个页面重新计算布局、样式、绘画、尺寸或它们的任何组合。

#### 优化 JS 的阻塞

向 script 标签添加 async/defer

##### JS的三种加载方式

- 正常模式：

```html
<script src="index.js"></script>
```

这种情况下 JS 会阻塞浏览器，浏览器必须等待 index.js 加载和执行完毕才能去做其它事情。

async 模式：

```html
<script async src="index.js"></script>
```

async 模式下，JS 不会阻塞浏览器做任何其它的事情。它的加载是异步的，当它加载结束，JS 脚本会立即执行。

defer 模式：

```html
<script defer src="index.js"></script>
```

defer 模式下，JS 的加载是异步的，执行是被推迟的。等整个文档解析完成、DOMContentLoaded 事件即将被触发时，被标记了 defer 的 JS 文件才会开始依次执行。

## DOM 优化

### 优化措施

#### 基于 Event Loop，进行异步更新

- 当我们需要在异步任务中实现 DOM 修改时，把它包装成 micro 任务是相对明智的选择。
  - 因为 micro 任务执行完毕后会马上进行渲染操作，而渲染完之后才会执行 script 中产生的第一个 macro，所以该 macro 任务执行完后要等到下一次事件循环才能渲染

#### 减少重绘与回流

[回流与重绘](../browser.md#回流与重绘)
