# Html 知识点

## 如何实现图片的懒加载

> 当我们碰到长网页有很多图片时，我们会采用先加载出现在视口内的几张图片，当滚动条滚动到相应图片的位置时才去加载别的图片。这种延迟加载的方式我们就称之为懒加载。

故问题拆分成两个：

1. 如何判断图片出现在了当前视口 （即如何判断我们能够看到图片）
2. 如何控制图片的加载

### 方案一：位置计算 + 滚动事件 (Scroll) + DataSet API

首先要理解三个属性的含义分别是什么？

* offsetTop：返回当前元素相对于其 `offsetParent` 元素的顶部内边距的距离。
* clientHeight： `document.documentElement.clientHeight`浏览器可视窗口的高度。
* scrollTop：获取或设置一个元素的内容垂直滚动的像素数。

如何判断图片出现在了当前视口

当 `offsetTop` <= `clientHeight` + `scrollTop`时，可以判断图片出现在了当前视口。

如何控制图片的加载

可以通过将图片的地址保存在img元素的自定义属性上面，当需要加载的时候再将该自定义属性赋值给该图片的src。

```html
<img data-src="logo.jpg" />
```

```js
 // 使用data-xx的自定义属性可以通过dom元素的dataset.xx取得；
img.src = img.datset.src
```

监听滚动事件加载后面的图片

```js
window.onscroll = () => lazyLoad('需要懒加载的图片');
```

### 方案二：getBoundingClientRect API + Scroll with Throttle + DataSet API

`Element.getBoundingClientRect()` 方法返回元素的大小及其相对于视口的位置。

如何判断图片出现在了当前视口

```js
// clientHeight 代表当前视口的高度
img.getBoundingClientRect().top < document.documentElement.clientHeight;
```

监听 `window.scroll` 事件也优化一下

加个节流器，提高性能。工作中比较常用的就是`lodash.throttle`

### 方案三：IntersectionObserver API + DataSet API

如何判断图片出现在了当前视口

方案二使用的方法是: `window.scroll` 监听 `Element.getBoundingClientRect()` 并使用 `_.throttle` 节流。

[IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/IntersectionObserver)

事件回调的参数是 [IntersectionObserverEntry](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserverEntry)的集合，代表关于是否在可见视口的一系列值。

其中，`entry.isIntersecting` 代表目标元素可见。

```js
// 利用 IntersectionObserver 监听元素是否出现在视口
const observer = new IntersectionObserver((changes) => {
  // changes: 目标元素集合
  changes.forEach((change) => {
    // intersectionRatio
    if (change.isIntersecting) {
      const img = change.target;
      img.src = img.dataset.src;
      observer.unobserve(img); // 填充完 img 的 src 属性后取消监听。
    }
  });
});

observer.observe(img); //监听一个目标元素。
```

### 方案四： LazyLoading 属性

浏览器觉得懒加载这事可以交给自己做，你们开发者加个属性就好了。

```html
<img src="logo.jpg" loading="lazy" />
```

## 浏览器中如何实现剪切板复制的功能

方式一：使用第三方库 `clipboard-copy`

方式二：最为推荐的方式是使用 Clipboard API 进行实现(不兼容IE浏览器)

```js
async function writeClipBoard() {
  const res = await navigator.clipboard.writeText('Hi，Christine')
  console.log('写入', res);
}
writeClipBoard()
```

方式三：选中: Selection API （兼容IE浏览器）

```js
const selection = window.getSelection();
const range = document.createRange();
const element = document.querySelector('div');

// RangeAPI: 制造区域
range.selectNodeContents(element);

// Selection: 选中区域
selection.addRange(range);

selectedText = selection.toString();
```

## 如果把JSON数据转化为demo.json并下载

### 方式一：json 视为字符串，可以利用 DataURL 进行下载

```js
function download(url, name) {
  const a = document.createElement('a')
  a.download = name
  a.href = url
  a.click();
}

const person = {
  name: 'Christine',
  age: 18,
  gender: '女',
}

const dataUrl = `data:,${JSON.stringify(person)}`
download(dataUrl, 'demo.json')
```

### 方式二：转化为 Object URL 进行下载

```js
function download(url, name) {
  const a = document.createElement('a')
  a.download = name
  a.href = url
  a.click();
}

const person = {
  name: 'Christine',
  age: 18,
  gender: '女',
}

const url = URL.createObjectURL(new Blob([JSON.stringify(person)]))
download(url, 'demo.json')
```

## 如何找到当前页面出现次数最多的 HTML 标签

```js
function getMostFrequentTag() {
  const counter = {};

  document.querySelectorAll("*").forEach((element) => {
    counter[element.tagName] = counter[element.tagName]
      ? counter[element.tagName] + 1
      : 1;
  });

  const orderedTags = Object.entries(counter).sort((tag1, tag2) => tag2[1] - tag1[1]);

  const result = [];
  for (const tag of orderedTags) {
    if (tag[1] < orderedTags[0][1]) {
      break;
    }
    result.push(tag[0]);
  }
  return result;
}
```

优化方案

```js
function getMostFrequentTag() {
  const map = new Map();
  let maxArray = [];
  let maxCount = 0;

  document.querySelectorAll("*").forEach((element) => {
    const {tagName} = element
    let count = map.get(tagName) ?? 0;
    count++;
    if (count > maxCount) {
      maxCount = count;
      maxArray = [tagName];
    } else if (count === maxCount) {
      maxArray.push(tagName)
    }
    map.set(tagName, count)
  });

  return maxArray;
}
```

## 如何封装一个支持过期时间的 localStorage

```js
(function() {
  localStorage.setItem = function (key, value, time = Infinity) { // Infinity是一个数值，表示无穷大
    const payload = Number.isFinite(time) ? {
      __value: value,
      __expiresTime: Date.now() + time
    } : value;
    Storage.prototype.setItem.call(localStorage, key, JSON.stringify(payload))
  }
  localStorage.getItem = function (key) {
    const value = JSON.parse(Storage.prototype.getItem.call(localStorage, key) || '{}')
    if (Date.now() < value['__expiresTime']) {
      return value['__value']
    } else {
      return void 0;
    }
  }
})()
```

## Cookie 属性

* Domain
* Path
* Expire/MaxAge
* HttpOnly: 是否允许被 JavaScript 操作
* Secure: 只能在 HTTPS 连接中配置
* SameSite

### Cookie maxAge

如果没有 maxAge，则 cookie 的有效时间为会话时间。即浏览器关闭就没了。

### Cookie SameSite

SameSite中有以下三个值：

* None: 任何情况下都会向第三方网站请求发送 Cookie
* Lax: 只有导航到第三方网站的 Get 链接会发送 Cookie，跨域的图片、iframe、form表单都不会发送 Cookie
* Strict: 任何情况下都不会向第三方网站请求发送Cookie

目前，主流浏览器 `Same-Site` 的默认值为 `Lax`，而在以前是 `None`，将会预防大部分 CSRF 攻击，如果需要手动指定 `Same-Site` 为 None，需要指定 Cookie 属性 `Secure`，即在 https 下发送。

### Cookie HttpOnly

如果这个属性设置为true，就不能通过js脚本来获取cookie的值，能有效的防止xss攻击。

### 关于js操作Cookie

```js
//读取浏览器中的cookie
console.log(document.cookie);
//写入cookie
document.cookie='name=christine;path=/;domain=.baidu.com';

// cookie 的过期时间改为过去时即可删除成功
// max-age 设置为 -1 即可成功
document.cookie = 'name=christine; max-age=-1'

// 或者使用最新的Cookie操作API
cookieStore.delete('name');
```

参考文章[把cookie聊清楚](https://juejin.cn/post/6844903501869350925)[阮一峰JavaScript教程](https://javascript.ruanyifeng.com/bom/cookie.html)

## localhost:3000 与 localhost:5000 的 cookie 信息是否共享

共享。

:::tip
Cookie 只区分域，不区分端口和协议，只要域相同，即使端口号或协议不同，cookie 也能共享。
:::

参考链接[Cookie属性详解](https://juejin.cn/post/6863377752939036679)

## 什么是事件委托，e.currentTarget 与 e.target 有何区别

> 事件委托指当有大量子元素触发事件时，将事件监听器绑定在父元素进行监听，此时数百个事件监听器变为了一个监听器，提升了网页性能。

`Event` 接口的只读属性 `currentTarget` 表示的，标识是当事件沿着 DOM 触发时事件的当前目标。它总是指向事件绑定的元素，而 `Event.target` 则是事件触发的元素。

## 异步加载 JS 脚本时，async 与 defer 有何区别

如果没有 `defer` 或 `async` 属性，浏览器会立即加载并执行相应的脚本。它不会等待后续加载的文档元素，读取到就会开始加载和执行，这样就阻塞了后续文档的加载。

![alt](/deferandasync.jpg)

在正常情况下，即 `<script>` 没有任何额外属性标记的情况下，有几点共识

1. JS 的脚本分为`加载`、`解析`、`执行`几个步骤，简单对应到图中就是 fetch (加载) 和 execution (解析并执行)
2. `JS 的脚本加载(fetch)且执行(execution)会阻塞 DOM 的渲染`，因此 JS 一般放到最后头

而 `defer` 与 `async` 的区别如下:

* 相同点: `异步加载 (fetch)`
* 不同点:

  * async 加载(fetch)完成后立即执行 (execution)，因此可能会阻塞 DOM 解析；
  * defer 加载(fetch)完成后需要等到DOM 解析完成后，事件 `DomContentLoaded` 触发执行之前执行(execution)。

🌰
若以下 js 加载时，属性是 `async` 与 `defer` 时，输出有何不同？

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title></title>
  </head>
  <body>
    <script src="./defer.js" defer></script>
    <script src="./async.js" async></script>
    <script>
      console.log("Start");
      document.addEventListener("DOMContentLoaded", () => {
        console.log("DCL");
      });
    </script>
  </body>
</html>
```

defer.js

```js
console.log("Defer Script");
```

async.js

```js
console.log("Async Script");
```

应该是 `Start` => `Defer Script` => `DCL`，async script是脱离DOM的，和加载自身文件的大小有关，文件比较小的，加载快，然后执行；文件大的加载慢，然后执行。

[文章：](https://juejin.cn/post/6894629999215640583)

## React/Vue 中的 router 实现原理如何

前端路由有两种实现方式:

### history API

通过 `history.pushState()` 跳转路由
通过 `popstate/window.onpopstate event` 监听路由变化，但无法监听到 history.pushState() 时的路由变化

### hash

通过 `location.hash` 跳转路由
通过 `hashchange/window.onhashchange event` 监听路由变化
