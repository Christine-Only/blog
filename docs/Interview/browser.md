# 浏览器基础知识点

## 事件流三个阶段

* 捕获阶段
* 目标阶段
* 冒泡阶段

## 注册事件

通常我们使用 `addEventListener` 注册事件，该函数的第三个参数可以是布尔值，也可以是对象。对于布尔值 `useCapture` 参数来说，该参数默认值为 `false` ，`useCapture` 决定了注册的事件是捕获事件还是冒泡事件。

```html
<div id="parent">
  父亲
  <div id="child">
    儿子
    <div id="sun">孙子</div>
  </div>
</div>
```

第一次执行

```js
document.getElementById("parent").addEventListener("click", function () {
  alert(`parent 事件触发，` + this.id);
});

document.getElementById("child").addEventListener("click", function () {
  alert(`child 事件触发，` + this.id);
});

document.getElementById("sun").addEventListener("click", function () {
  alert(`sun 事件触发，` + this.id);
});
```

第二次执行

```js
document.getElementById("parent").addEventListener("click", function (e) {
  alert(`parent 事件触发，` + e.target.id);
}, true);

document.getElementById("child").addEventListener("click", function (e) {
  alert(`child 事件触发，` + e.target.id);
}, true);

document.getElementById("sun").addEventListener("click", function (e) {
  alert(`sun 事件触发，` + e.target.id);
}, true);
```

点击 id 为 child 的 div 后，这两份 JavaScript 代码的执行结果分别是：

* 第一次结果为：先弹出“child 事件触发，child”，再弹出“parent 事件触发，parent”。
* 第二次结果为：先弹出“parent 事件触发，child”，再弹出“child 事件触发，child”。

:::tip
当使用 `addEventListener()` 为一个元素注册事件的时候，句柄里的 `this` 值是该元素的引用。其与传递给句柄的 `event` 参数的 `currentTarget` 属性的值一样。

阻止事件冒泡可以在目标元素的监听事件中添加 `event.stopPropagation()`即可。
:::

## 跨域

### 什么是跨域？

#### 什么是同源策略及其限制内容？

同源策略是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSRF等攻击。所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源。

域名的组成部分：
![alt](/blog/域名组成部分.jpg)

同源策略限制内容有：

* Cookie、LocalStorage、IndexedDB 等存储性内容
* DOM 节点
* AJAX 请求发送后，结果被浏览器拦截了

但是有三个标签是允许跨域加载资源：

* `<img src=xxx>`
* `<link href=xxx>`
* `<script src=xxx>`

#### 常见跨域场景

**当协议、子域名、主域名、端口号中任意一个不相同时，都算作不同域**。不同域之间相互请求资源，就算作“跨域”。常见跨域场景如下图所示：

| URL | 说明 | 是否允许通信 |
| ---- | ---- | ---- | ---- |
| `http://www.test.com/a.js` `http://www.test.com/b.js` | 同一域名 | 允许
| `http://www.test.com/util/a.js` `http://www.test.com/script/b.js` | 同一域名，不同文件夹 | 允许
| `http://www.test.com:8000/a.js` `http://www.test.com/a.js` | 同一域名，不同端口 | 不允许
| `http://www.test.com/a.js` `https://www.test.com/b.js` | 同一域名，不同协议 | 不允许
| `http://www.test.com/a.js` `http://43.45.233.89/a.js` | 域名和域名对应的ip | 不允许
| `http://www.test.com/a.js` `http://b.test.com/a.js` | 主域相同，子域不同 | 不允许
| `http://www.test.com/a.js` `http://b.test.com/a.js` | 主域相同，子域不同 | 不允许
| `http://www.test.com/a.js` `http://www.baidu.com/a.js` | 不同域名 | 不允许

::: tip 总结

* 如果是协议和端口造成的跨域问题“前台”是无能为力的。
* 在跨域问题上，仅仅是通过“URL的首部”来识别而不会根据域名对应的IP地址是否相同来判断。“URL的首部”可以理解为“协议, 域名和端口必须匹配”。
:::

思考题： **请求跨域了，那么请求到底发出去没有？**

跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了。你可能会疑问明明通过表单的方式可以发起跨域请求，为什么 Ajax 就不会？因为归根结底，跨域是为了阻止用户读取到另一个域名下的内容，Ajax 可以获取响应，浏览器认为这不安全，所以拦截了响应。但是表单并不会获取新的内容，所以可以发起跨域请求。同时也说明了跨域并不能完全阻止 CSRF，因为请求毕竟是发出去了。

### 跨域解决方案

* JSONP
  * 原理：利用 `<script>` 标签没有跨域限制的漏洞，网页可以得到从其他来源动态产生的 JSON 数据。JSONP请求一定需要对方的服务器做支持才可以。

  ```html
  <script src="http://domain/api?param1=a&param2=b&callback=jsonp"></script>
  <script>
      function jsonp(data) {
      console.log(data)
  }
  </script>
  ```

  * JSONP和Ajax对比：JSONP和AJAX相同，都是客户端向服务器端发送请求，从服务器端获取数据的方式。但AJAX属于同源策略，JSONP属于非同源策略（跨域请求）
  * 优缺点：JSONP优点是简单兼容性好，可用于解决主流浏览器的跨域数据访问的问题。缺点是仅支持get方法具有局限性，不安全可能会遭受XSS攻击。
  * 实现流程
    * 声明一个回调函数，其函数名(如show)当做参数值，要传递给跨域请求数据的服务器，函数形参为要获取目标数据(服务器返回的data)。
    * 创建一个`<script>`标签，把那个跨域的API数据接口地址，赋值给script的src，还要在这个地址中向服务器传递该函数名（可以通过问号传参:?callback=show）。
    * 服务器接收到请求后，需要进行特殊的处理：例如：传递进去的函数名是show，它准备好的数据是show('Hi Christine')。
    * 最后服务器把准备的数据通过HTTP协议返回给客户端，客户端再调用执行之前声明的回调函数（show），对返回的数据进行操作。

    在开发中可能会遇到多个 JSONP 请求的回调函数名是相同的，这时候就需要自己封装一个 JSONP函数。

    ```js
    function jsonp({ url, params, callback }) {
      return new Promise((resolve, reject) => {
        let script = document.createElement('script')
        window[callback] = function(data) {
          resolve(data)
          document.body.removeChild(script)
        }
        params = { ...params, callback } // name=Christine&callback=show
        let arrs = []
        for (let key in params) {
          arrs.push(`${key}=${params[key]}`)
        }
        script.src = `${url}?${arrs.join('&')}`
        document.body.appendChild(script)
      })
    }
    jsonp({
      url: 'http://localhost:3000/say',
      params: { name: 'Christine' },
      callback: 'show'
    }).then(data => {
      console.log(data)
    })

    ```

* CORS
CORS 需要浏览器和后端同时支持。IE 8 和 9 需要通过 `XDomainRequest` 来实现。

浏览器会自动进行 CORS 通信，实现 CORS 通信的关键是后端。只要后端实现了 CORS，就实现了跨域。

服务端设置 `Access-Control-Allow-Origin` 就可以开启 CORS。 该属性表示哪些域名可以访问资源，如果设置通配符则表示所有网站都可以访问资源。

虽然设置 CORS 和前端没什么关系，但是通过这种方式解决跨域问题的话，会在发送请求时出现两种情况，分别为`简单请求`和`复杂请求`。

* 简单请求
以 Ajax 为例，当满足以下条件时，会触发简单请求

1. 使用下列方法之一：

* GET
* HEAD
* POST

2. `Content-Type` 的值仅限于下列三者之一：

* text/plain
* multipart/form-data
* application/x-www-form-urlencoded

请求中的任意 `XMLHttpRequestUpload` 对象均没有注册任何事件监听器； `XMLHttpRequestUpload` 对象可以使用 `XMLHttpRequest.upload` 属性访问。

* 复杂请求

不符合以上条件的请求就肯定是复杂请求了。 复杂请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求,该请求是 `option` 方法的，通过该请求来知道服务端是否允许跨域请求。

接下来我们看下一个完整复杂请求的例子，并且介绍下CORS请求相关的字段

```js
// index.html
const xhr = new XMLHttpRequest()
document.cookie = 'name=xiamen' // cookie不能跨域
xhr.withCredentials = true // 前端设置是否带cookie
xhr.open('PUT', 'http://localhost:4000/getData', true)
xhr.setRequestHeader('name', 'xiamen')
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      console.log(xhr.response)
      //得到响应头，后台需设置Access-Control-Expose-Headers
      console.log(xhr.getResponseHeader('name'))
    }
  }
}
xhr.send()
```

```js
//server1.js
let express = require('express');
let app = express();
app.use(express.static(__dirname));
app.listen(3000);
```

```js
//server2.js
let express = require('express')
let app = express()
let whitList = ['http://localhost:3000'] //设置白名单
app.use(function(req, res, next) {
  let origin = req.headers.origin
  if (whitList.includes(origin)) {
    // 设置哪个源可以访问我
    res.setHeader('Access-Control-Allow-Origin', origin)
    // 允许携带哪个头访问我
    res.setHeader('Access-Control-Allow-Headers', 'name')
    // 允许哪个方法访问我
    res.setHeader('Access-Control-Allow-Methods', 'PUT')
    // 允许携带cookie
    res.setHeader('Access-Control-Allow-Credentials', true)
    // 预检的存活时间
    res.setHeader('Access-Control-Max-Age', 6)
    // 允许返回的头
    res.setHeader('Access-Control-Expose-Headers', 'name')
    if (req.method === 'OPTIONS') {
      res.end() // OPTIONS请求不做任何处理
    }
  }
  next()
})
app.put('/getData', function(req, res) {
  console.log(req.headers)
  res.setHeader('name', 'Christine') //返回一个响应头，后台需设置
  res.end('Hi Christine')
})
app.get('/getData', function(req, res) {
  console.log(req.headers)
  res.end('Hi Christine')
})
app.use(express.static(__dirname))
app.listen(4000)
```

上述代码由`http://localhost:3000/index.html`向`http://localhost:4000/`跨域请求，正如我们上面所说的，后端是实现 CORS 通信的关键。

* postMessage

`postMessage`是HTML5 XMLHttpRequest Level 2中的API，且是为数不多可以跨域操作的window属性之一，它可用于解决以下方面的问题：

* 页面和其打开的新窗口的数据传递
* 多窗口之间消息传递
* 页面与嵌套的iframe消息传递
* 上面三个场景的跨域数据传递

`window.postMessage()`方法可以安全地实现跨源通信。通常，对于两个不同页面的脚本，只有当执行它们的页面位于具有相同的协议（通常为https），端口号（443为https的默认值），以及主机  (两个页面的模数 Document.domain设置为相同的值) 时，这两个脚本才能相互通信。`window.postMessage()` 方法提供了一种受控机制来规避此限制，只要正确的使用，这种方法就很安全。

```js
otherWindow.postMessage(message, targetOrigin, [transfer]);
```

* message: 将要发送到其他 window的数据。
* targetOrigin:通过窗口的origin属性来指定哪些窗口能接收到消息事件，其值可以是字符串"*"（表示无限制）或者一个URI。在发送消息的时候，如果目标窗口的协议、主机地址或端口这三者的任意一项不匹配targetOrigin提供的值，那么消息就不会被发送；只有三者完全匹配，消息才会被发送。
* transfer(可选)：是一串和message 同时传递的 Transferable 对象. 这些对象的所有权将被转移给消息的接收方，而发送一方将不再保有所有权。

接下来我们看个例子： `http://localhost:3000/a.html`页面向`http://localhost:4000/b.html`传递“Hi Christine”,然后后者传回"Hi Picker"。

```html
// a.html
<iframe src="http://localhost:4000/b.html" frameborder="0" id="frame" onload="load()"></iframe> //等它加载完触发一个事件
//内嵌在http://localhost:3000/a.html
<script>
  function load() {
    let frame = document.getElementById('frame')
    frame.contentWindow.postMessage('Hi Christine', 'http://localhost:4000') //发送数据
    window.onmessage = function(e) { //接受返回数据
      console.log(e.data) //Hi Picker
    }
  }
</script>
```

```html
// b.html
  window.onmessage = function(e) {
    console.log(e.data) //我爱你
    e.source.postMessage('我不爱你', e.origin)
  }
```

* websocket
* Node中间件代理(两次跨域)
* nginx反向代理
* document.domain + iframe

该方式只能用于主域名相同的情况下，比如 `a.test.com` 和 `b.test.com` 适用于该方式。 只需要给页面添加 `document.domain ='test.com'` 表示主域名都相同就可以实现跨域。
