# CSS 知识点

## @规则

### link 和 @import 的区别和使用

#### link标签

- 使用方式：link 是 HTML 标签，放在 head 标签里面，除了能导入 CSS 外，还能导入别的资源，比如图片、脚本和字体等。例如：

```html
  <link rel="stylesheet" type="text/css" href="style.css">
```

- 加载方式：当浏览器解析到 link 标签的时候，会同时去加载资源，支持并行下载。

- 支持程度：浏览器对 link 的支持较好。

#### @import导入

- 使用方式：@import 是 CSS 的语法，只能用来导入 CSS。

```css
  @import url(style.css);
```

- 加载方式：@import 导入的样式需等页面加载完成后再加载，即异步加载外部 CSS。

- 支持程度：老版本的浏览器（如 IE 5）不支持 @import，而且 @import 只能导入 CSS。

:::tip 注意
link 标签由于是 DOM 元素，因此我们可以用 JavaScript 动态地创建和修改这个元素，以实现动态地引入和改变样式。

```html
<html>
<head>
    <title>Test Page</title>
</head>
<body>
    <h1 id="myHeading">Hello World!</h1>
    <button>Change Style</button>

    <script>
        const button = document.querySelector('button');

        button.onclick = function() {
            const linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.type = 'text/css';
            linkElement.href = 'newStyles.css'; // 假设这个文件存在并且定义了一些样式

            document.head.appendChild(linkElement);
        };
    </script>
</body>
</html>
```

:::

### @media

创建的媒体查询，适配不同尺寸的设备。

```css
/* 导入一个 CSS 文件，并在屏幕宽度大于 600px 时应用这个 CSS 文件中的样式 */
@media screen and (min-width: 600px) {
  @import url('style.css');
}
```

### @namespace

在 CSS 中包含一个 XML 命名空间。

例如，如果你在 HTML 中使用 SVG，并且你想在 CSS 中针对 SVG 元素进行样式设置，那么你可能需要在 CSS 中声明 SVG 的命名空间。

HTML 中的 SVG 元素：

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
</svg>
```

CSS 中使用 @namespace 声明 SVG 的命名空间：

```css
@namespace svg "http://www.w3.org/2000/svg";

svg|circle {
  stroke-width: 5;
}
```

在样式规则中，你可以使用格式 `namespace|element` 来选择命名空间中的特定元素。在这种情况下，svg|circle 选择了 SVG 命名空间中的所有 `<circle>` 元素。

### @keyframes

```css
@keyframes slidein {
  from {margin-left: 100%;}
  to {margin-left: 0%;}
}
```

创建 CSS 动画。

### @font-face

描述将下载的外部的字体。

```css
@font-face {
  font-family: myFirstFont;
  src: url(sansation_light.woff);
}
```

### @viewport

设置视口的宽度和初始缩放级别

```css
@viewport {
  width: device-width;
  zoom: 1;
}
```

## 选择器

### 基础选择器

- 标签选择器：`h1`
- 类选择器：`.checked`
- ID 选择器：`#picker`
- 通配选择器：`*`

### 属性选择器

- `[attr]`：指定属性的元素；
- `[attr=val]`：属性等于指定值的元素；

### 组合选择器

- 相邻兄弟选择器：`A + B`
- 普通兄弟选择器：`A ~ B`
- 子选择器：`A > B`
- 后代选择器：`A B`

### 伪类

- :active：鼠标激活的元素；
- :hover： 鼠标悬浮的元素；
- :root：文档的根元素；

### 伪元素

- `::before`：在元素前插入内容；
- `::after`：在元素后插入内容；

### 优先级

- 10000：!important；
- 01000：内联样式；
- 00100：ID 选择器；
- 00010：类选择器、伪类选择器、属性选择器；
- 00001：标签选择器、伪元素选择器；
- 00000：通配符选择器、后代选择器、兄弟选择器；

:::tip 注意

- !important 声明的样式优先级最高
- 如果优先级相同，则后面出现的样式生效
- 继承得到的样式优先级最低
- 样式表的来源不同时，优先级顺序为：内联样式 > 内部样式 > 外部样式 > 浏览器用户自定义样式 > 浏览器默认样式
:::

## 盒模型

在 CSS 中任何元素都可以看成是一个盒子，而一个盒子是由 4 部分组成的：内容（content）、内边距（padding）、边框（border）和外边距（margin）。

盒模型有 2 种：标准盒模型和 IE 盒模型，本别是由 W3C 和 IExplore 制定的标准。

### 标准盒模型：`box-sizing: content-box`

![alt 标准盒模型](/ie.jpg)

- width 和 height 属性的范围只包含了 `content`

### IE 盒模型: `box-sizing: border-box`

![alt IE 盒模型](/w3c.jpg)

- width 和 height 属性的范围包含了 `border`、`padding` 和 `content`

:::tip 注意
若在页面最顶部声明了 DOCTYPE 类型：`<!DOCTYPE html>`，所有的浏览器都会把盒模型默认解释为标准盒模型。
不然的话，IE 浏览器会将盒子模型解释为 IE 盒模型，FireFox 等会将其解释为标准盒模型。
:::

## BFC (Block Formatting Context) 块级格式化上下文

### 如何创建 BFC

- 根元素：html
- 非溢出的可见元素：overflow 不为 visible
- 设置浮动：float 属性不为 none
- 设置定位：position 为 absolute 或 fixed
- 定义成块级的非块级元素：display: inline-block/table-cell/table-caption/flex/inline-flex/grid/inline-grid

### 应用场景

1. **自适应两栏布局**：BFC 的区域不会和浮动区域重叠，所以就可以把侧边栏固定宽度且左浮动，而对右侧内容触发 BFC，使得它的宽度自适应该行剩余宽度。
2. **清除内部浮动**：浮动造成的问题就是父元素高度坍塌，所以清除浮动需要解决的问题就是让父元素的高度恢复正常。而用 BFC 清除浮动的原理就是：计算 BFC 的高度时，浮动元素也参与计算。只要触发父元素的 BFC 即可。
3. **防止垂直 margin 合并**：BFC 渲染原理之一：同一个 BFC 下的垂直 margin 会发生合并。所以如果让 2 个元素不在同一个 BFC 中即可阻止垂直 margin 合并。那如何让 2 个相邻的兄弟元素不在同一个 BFC 中呢？可以给其中一个元素外面包裹一层，然后触发其包裹层的 BFC，这样一来 2 个元素就不会在同一个 BFC 中了。

针对以上 3 种场景，可以参考这个[BFC 应用示例](https://codepen.io/tangshiya/pen/ZEZNXzo)

## 值和单位

### px

屏幕分辨率是指在屏幕的横纵方向上的像素点数量，比如分辨率 `1920×1080` 意味着水平方向含有 `1920` 个像素数，垂直方向含有 `1080` 个像素数。

px 表示的是 CSS 中的像素，在 CSS 中它是绝对的长度单位，也是最基础的单位。

#### 设备像素（Device pixels）

设备屏幕的物理像素，表示的是屏幕的横纵有多少像素点；和屏幕分辨率是差不多的意思。

#### 设备像素比（DPR）

设备像素比表示 1 个 CSS 像素等于几个物理像素。

计算公式：DPR = 物理像素数 / 逻辑像素数；

在浏览器中可以通过 `window.devicePixelRatio` 来获取当前屏幕的 DPR。

### em

em 是 CSS 中的相对长度单位，相对的是**父元素** font-size 大小

### rem

rem 是 CSS 中的相对长度单位，相对的是 HTML 的**根元素 html** font-size 大小。

#### 使用场景

需要适配各种移动设备时，例如需要适配 iPhone 和 iPad 等分辨率差别比较挺大的设备。

### vw/vh

`vw` 和 `vh` 分别是相对于屏幕视口宽度和高度而言的长度单位：

- 1vw = 视口宽度的 `1 / 100` ===> `100vw = window.innerWidth`
- 1vh = 视口高度的 `1 / 100` ===> `100vh = window.innerHeight`

相对视口的单位，除了 vw/vh 外，还有 `vmin` 和 `vmax`：

- vmin：取 vw 和 vh 中值较小的；
- vmax：取 vw 和 vh 中值较大的；

## 颜色关键字

### transparent

`transparent` 关键字表示一个完全透明的颜色，即该颜色看上去将是背景色。从技术上说，它是带有 alpha 通道为最小值的黑色，是 rgba(0,0,0,0) 的简写。

#### 应用场景

- [画三角形](https://codepen.io/tangshiya/pen/KKYLvOy?editors=1100)

- **增大点击区域**: 通过透明的边框来增大按钮的点击区域

```css
.btn {
  border: 5px solid transparent;
}
```

### currentColor 关键字

>currentColor 是 CSS 的一个关键字，表示使用当前元素 color 属性的值作为引用 currentColor 的属性值。

```html
<!DOCTYPE html>
<html>
  <body>
    <div style="color: blue; border: 1px solid currentColor; background-color: currentColor;">
      This div has blue text, blue border and blue background.
    </div>
  </body>
</html>
```

## 自定义属性（变量）

在 CSS 中，你可以创建自定义的属性，这些被称为 CSS 变量或自定义属性。它的格式为：`--x`

```css
<!-- 定义自定义属性 -->
:root {
  --theme-color: red;
}

<!-- 使用变量 -->
h1 {
  color: var(--theme-color);
}

```

:::tip 注意

- `:root` 下声明的时候，在全局都能访问，如果是在某个元素下声明自定义属性，则只能在它所在的元素以及它的子元素中使用。
- 自定义属性名是大小写敏感的，--my-color 和 --My-color 会被认为是两个不同的自定义属性。

:::

### CSS 中定义的变量和在 CSS 预处理器（如 Sass 或 Less）中定义的变量的区别

**1. 作用范围**

- CSS 变量: CSS 变量作用范围是它所在的元素以及它的子元素。也就是说，你可以在一个元素里定义一个 CSS 变量，并且在它的所有子元素中使用这个变量。
- 预处理器变量: 在预处理器中，变量的作用范围通常被限定在定义它们的块级作用域内。也就是说，如果你在一个块（由 {} 定义）中定义了一个变量，那么这个变量只能在这个块或这个块的嵌套内部块中使用。

**2. 修改和更新**

- CSS 变量: 你可以使用 JavaScript 在运行时来修改 CSS 变量的值，并且任何使用这个变量的元素都会立即更新，这就赋予了 CSS 变量动态模式修改样式的能力。
- 预处理器变量: 一旦 CSS 预处理器生成了 CSS 代码，变量就不能再被修改了。因为预处理器的变量在编译阶段就已经被替换为实值，所以你不能用 JavaScript 在运行时动态的改变预处理器变量的值。

**3. 兼容性**

- CSS 变量: CSS 变量是一个原生的浏览器功能，目前已经被所有现代浏览器支持。
- 预处理器变量: 预处理器变量并不依赖于浏览器的支持，因为它在浏览器加载 CSS 之前就已经被预处理器编译为 CSS 代码了。

## Flex布局

### flex

> 设置了弹性项目如何增大或缩小以适应其弹性容器中可用的空间。

**属性值**：

- flex-grow：定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
- flex-shrink：定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
- flex-basis：给上面两个属性分配多余空间之前, 计算项目是否有多余空间, 默认值为 auto, 即项目本身的大小

**语法**：

```css
/* 关键字值 */
flex: auto;
flex: initial;
flex: none;

/* 一个值, 无单位数字: flex-grow */
flex: 2;

/* 一个值, width: flex-basis */
flex: 30px;

/* 两个值: flex-grow | flex-basis */
flex: 1 30px;

/* 两个值: flex-grow | flex-shrink */
flex: 2 2;

/* 三个值: flex-grow | flex-shrink | flex-basis */
flex: 2 2 10%;

/*全局属性值 */
flex: inherit;
flex: initial;
flex: unset;
```

- **单值语法**：值必须为以下其中之一:
  - 一个无单位数(`<number>`): 它会被当作flex:`<number> 1 0`; `<flex-shrink>`的值被假定为1，然后`<flex-basis>` 的值被假定为0。
  - 一个有效的宽度(width)值: 它会被当作 `<flex-basis>` 的值。
  - 关键字**none**：元素会根据自身宽高来设置尺寸。它是完全非弹性的：既不会缩短，也不会伸长来适应 flex 容器。相当于将属性设置为"`flex: 0 0 auto`"。
  - 关键字**auto**：元素会根据自身的宽度与高度来确定尺寸，但是会伸长并吸收 flex 容器中额外的自由空间，也会缩短自身来适应 flex 容器。这相当于将属性设置为 "`flex: 1 1 auto`"。
  - 关键字**initial**：元素会根据自身宽高设置尺寸。它会缩短自身以适应 flex 容器，但不会伸长并吸收 flex 容器中的额外自由空间来适应 flex 容器 。相当于将属性设置为"`flex: 0 1 auto`"。

- **双值语法**：第一个值必须为一个无单位数，并且它会被当作 `<flex-grow>` 的值。第二个值必须为以下之一：
  - 一个无单位数：它会被当作 `<flex-shrink>` 的值。
  - 一个有效的宽度值: 它会被当作 `<flex-basis>` 的值。

- **三值语法**：
  - 第一个值必须为一个无单位数，并且它会被当作 `<flex-grow>` 的值。
  - 第二个值必须为一个无单位数，并且它会被当作 `<flex-shrink>` 的值。
  - 第三个值必须为一个有效的宽度值， 并且它会被当作 `<flex-basis>` 的值。

栗子：

```html
<style>
  .container {
    display: flex;
    height: 300px;
    width: 400px;
  }

  .left {
    flex: 1 2 300px;
    background: red;
  }

  .right {
    flex: 2 1 200px;
    background: yellow;
  }
</style>

<div class="container">
  <div class="left"></div>
  <div class="right"></div>
</div>
```

详解：

- 因为父容器的宽度小于子容器总和的宽度，所以 left 和 right 容器将缩小以适应其弹性容器中可用的空间，left 收缩的比例为`flex-shrink的比例 * flex-basis的比例 = 2/3 * 3/5`，right 收缩的比例为`flex-shrink的比例 * flex-basis的比例 = 1/3 * 2/5`，即 left 收缩(父容器宽度 - 子容器总宽度差值的)3/4，right 收缩(父容器宽度 - 子容器总宽度差值的)1/4

![alt](/flex1.jpg)
![alt](/flex2.jpg)

栗子：

```html
<style>
  .container {
    display: flex;
    height: 300px;
    width: 600px;
  }

  .left {
    flex: 1 2 300px;
    background: red;
  }

  .right {
    flex: 2 1 200px;
    background: yellow;
  }
</style>

<div class="container">
  <div class="left"></div>
  <div class="right"></div>
</div>
```

![alt](/flex3.jpg)
![alt](/flex4.jpg)
