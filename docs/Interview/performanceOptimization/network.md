<!-- ---
sidebarDepth: 6
--- -->

# 网络层面的性能优化

## 减少每次网络请求所花费的时间

### 图片优化

#### JPG/JPEG

- 特点
  - 有损压缩，体积小
  - 当我们把图片体积压缩至原有体积的 50% 以下时，JPG 仍然可以保持住 60% 的品质。

- 使用场景
  - JPG 适用于呈现色彩丰富的图片，在我们日常开发中，JPG 图片经常作为大的背景图、轮播图或 Banner 图出现。

- 缺点
  - 不支持透明度处理

#### PNG (PNG-8 与 PNG-24)

>8 和 24，这里都是二进制数的位数。8 位的 PNG 最多支持 256 种颜色，而 24 位的可以呈现约 1600 万种颜色。

- 特点
  - 无损压缩，质量高，体积大
  - 支持透明度处理

- 使用场景
  - 小的 Logo、颜色简单且对比强烈的图片或背景等。

- 缺点
  - 体积太大

#### SVG

- 特点
  - 是 XML 文本文件，SVG 对图像的处理不是基于像素点，而是基于对图像的形状描述。
  - 体积更小，可压缩性更强
  - 可无限放大不失真
  - 兼容性好

- 使用场景
  - 小的 Icon

- 缺点
  - 渲染成本较高，这点对性能不利
  - 存在着学习成本，是可编程的

#### base64

- 特点
  - 是一种图片的编码方式

- 使用场景
  - 小的图片使用 base64 编码方式，直接将编码结果写入 HTML 或者写入 CSS，以减少网络请求
  - 图片的更新频率非常低时

- 使用方式
  - webpack的 url-loader

  ```js
  // webpack.config.js
  module.exports = {
    //...
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                <!--
                小于 5kb 的图片转换成 base64 编码
                否则，依然延用 file-loader的格式，产出 url
                 -->
                limit: 5 * 1024 // 小于此值的图片都会被转换为base64编码
              }
            }
          ]
        }
      ]
    }
  };
  ```

  - vite的配置中

  ```js
  // vite.config.js
  export default {
    build: {
      assetsInlineLimit: 7000 // 设置转为base64的文件大小阈值7kb，默认 4kb
    }
  }
  ```

- 缺点
  - 编码后，图片大小会膨胀为原文件的 4/3，所以大图片进行编码后会过大

#### WebP

>SSIM（结构相似性指标）是一种衡量两张数字图片相似程度的指标。这个指标的值介于 0 和 1 之间，如果两张图片完全一样，那么 SSIM 值就是 1。SSIM 总体来说是一个衡量图像质量的理想指标，因为它关注的是人眼感知的图像质量。

- 特点
  - 与 PNG 相比，WebP 无损图像的尺寸缩小了 26％。
  - 在等效的 SSIM 质量指数下，WebP 有损图像比同类 JPEG 图像小25-34％。
  - 无损 WebP 支持透明度（也称为 alpha 通道），仅需 22％ 的额外字节。
  - 对于有损 RGB 压缩可接受的情况，有损 WebP 也支持透明度，与 PNG 相比，通常提供 3 倍的文件大小。

- 使用方式

  ```html
  <picture>
    <source srcset="sample_image.webp" type="image/webp">
    <source srcset="sample_image.jpg" type="image/jpg">
    <img src="sample_image.jpg" alt="">
  </picture>
  ```

- 使用此标记，理解 image/webp 媒体类型的浏览器将下载 Webp 图片并显示它，而其他浏览器将下载 JPEG 图片。
  任何不支持 picture 的浏览器都将跳过所有 source 标签，并加载底部 img 标签。因此，我们通过提供对所有浏览器类的支持，逐步增强了我们的页面。

- 还有另一个维护性更强、更加灵活的方案——把判断工作交给后端，由服务器根据 HTTP 请求头部的 Accept 字段来决定返回什么格式的图片。当 Accept 字段包含 image/webp 时，就返回 WebP 格式的图片，否则返回原图。

- 缺点
  - 不支持 IE 浏览器
  - 以动画图像为例，WebP 图像相比于 GIF 图像，可能会消耗更多的 CPU 资源。

![alt WebP兼容性](/webCompatibility.jpg)

### CDN 的缓存与回源

#### 核心

一个是缓存，一个是回源。

“缓存”就是说我们把资源 copy 一份到 CDN 服务器上这个过程，“回源”就是说 CDN 发现自己没有这个资源（一般是缓存的数据过期了），转头向根服务器（或者它的上层服务器）去要这个资源的过程。

#### 使用场景

CDN 往往被用来存放静态资源。上文中我们举例所提到的“根服务器”本质上是业务服务器，它的核心任务在于生成动态页面或返回非纯静态页面。

静态资源本身具有访问频率高、承接流量大的特点，因此静态资源加载速度始终是前端性能的一个非常关键的指标。

#### 示例

![alt cdn](/cdn.png)

#### 优化

**CDN 服务器的域名与根服务器的域名不一样**，原因如下：

同一个域名下的请求会不分青红皂白地携带 Cookie，而静态资源往往并不需要 Cookie 携带什么认证信息。把静态资源和主页面置于不同的域名下，完美地避免了不必要的 Cookie 的出现！

##### 参考文章

- [前端性能优化详细讲解之图片优化](https://zhuanlan.zhihu.com/p/421053018>)
- [前端性能优化之CDN 的缓存与回源机制解析](https://zhuanlan.zhihu.com/p/423276736)

## 减少网络请求的次数

### 浏览器缓存机制

通过网络获取内容既速度缓慢又开销巨大。较大的响应需要在客户端与服务器之间进行多次往返通信，这会延迟浏览器获得和处理内容的时间，还会增加访问者的流量费用。因此，**缓存并重复利用之前获取的资源**的能力成为性能优化的一个关键方面。

#### 缓存位置

从缓存位置上来说分为四种，当依次查找缓存且都没有命中的时候，才会去请求网络，它们按照获取资源时请求的优先级依次排列如下，

1. Memory Cache
2. Service Worker Cache
3. HTTP Cache
4. Push Cache
5. 网络请求

#### Memory Cache

##### 概念

- `Memory Cache` 是指存在内存中的缓存。
- 从优先级上来说，它是浏览器最先尝试去命中的一种缓存。
- 从效率上来说，它是响应速度最快的一种缓存。
- 它和渲染进程“生死相依”，当进程结束后，也就是 tab 关闭以后，内存里的数据也将不复存在。

当我们访问过页面以后，再次刷新页面，可以发现很多数据都来自于内存缓存
![alt](/memoryCache.jpg)

##### 使用规律

- 资源存不存内存，浏览器秉承的是“节约原则”。
- Base64 格式的图片，几乎永远可以被塞进 memory cache，这可以视作浏览器为节省渲染开销的“自保行为”
- 体积不大的 JS、CSS 文件，也有较大地被写入内存的几率——相比之下，较大的 JS、CSS 文件就没有这个待遇了，内存资源是有限的，它们往往被直接甩进磁盘。

#### Service Worker Cache

##### 概念

- Service Worker 是一种独立于主线程之外的 Javascript 线程。它脱离于浏览器窗体，因此无法直接访问 DOM。
- 可以帮我们实现离线缓存、消息推送和网络代理等功能。我们借助 Service worker 实现的离线缓存就称为 Service Worker Cache。

`Service Worker` 的缓存与浏览器其他内建的缓存机制不同，它可以让我们自由控制**缓存哪些文件**、**如何匹配缓存**、**如何读取缓存**，并且**缓存是持续性的**。

##### 生命周期

Service Worker 的生命周期包括 install、active、working 三个阶段。一旦 Service Worker 被 install，它将始终存在，只会在 active 与 working 之间切换，除非我们主动终止它。这是它可以用来实现离线存储的重要先决条件。

##### 具体使用

```js
window.navigator.serviceWorker.register('/test.js').then(
  function () {
      console.log('注册成功')
    }).catch(err => {
      console.error("注册失败")
  }
)
```

在 test.js 中，我们进行缓存的处理。假设我们需要缓存的文件分别是 test.html,test.css 和 test.js：

```js
// Service Worker会监听 install事件，我们在其对应的回调里可以实现初始化的逻辑
self.addEventListener('install', event => {
  event.waitUntil(
    // 考虑到缓存也需要更新，open内传入的参数为缓存的版本号
    caches.open('test-v1').then(cache => {
      return cache.addAll([
        // 此处传入指定的需缓存的文件名
        '/test.html', '/test.css', '/test.js'
      ])
    }))
})
// Service Worker会监听所有的网络请求，网络请求的产生触发的是fetch事件，我们可以在其对应的监听函数中实现对请求的拦截，进而判断是否有对应到该请求的缓存，实现从Service Worker中取到缓存的目的
self.addEventListener('fetch', event => {
  event.respondWith(
    // 尝试匹配该请求对应的缓存值
    caches.match(event.request).then(res => {
      // 如果匹配到了，调用Server Worker缓存
      if (res) { return res; } // 如果没匹配到，向服务端发起这个资源请求
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200) { return response; }
        // 请求成功的话，将请求缓存起来。
        caches.open('test-v1').then(function (cache) { cache.put(event.request, response); }); return response.clone();
      });
    }));
});
```

:::warning ⚠️
Server Worker 对协议是有要求的，必须以 https 协议为前提。
:::

#### HTTP Cache

##### 强缓存的特征

强缓存是利用 http 头中的 `Expires` 和 `Cache-Control` 两个字段来控制的 。强缓存中，当请求再次发出时，浏览器会根据其中的 `expires` 和 `cache-control` 判断目标资源是否“命中”强缓存，若命中则直接从缓存中获取资源，不会再与服务端发生通信。
命中强缓存的情况下，返回的 HTTP 状态码为 200 （如下图）。
![alt 强缓存](/cache.jpg)

##### 强缓存的实现：从 expires 到 cache-control

- Expires

```http
当服务器返回响应时，在 Response Headers 中将过期时间写入 expires 字段
expires: Wed, 22 Oct 2018 08:41:00 GMT
```

`Expires` 是 HTTP/1 的产物，表示资源会在 `Wed, 22 Oct 2018 08:41:00 GMT` 后过期，需要再次请求。并且 `Expires` **受限于本地时间**，如果修改了本地时间，可能会造成缓存失效。

- **Cache-control**

考虑到 `expires` 的**局限性**，`HTTP1.1` 新增了 `Cache-Control` 字段来完成 `expires` 的任务，`Cache-Control` 相对于 `expires` 更加准确，它的优先级也更高。当 `Cache-Control` 与 `expires` 同时出现时，我们以 `Cache-Control` 为准。

```http
cache-control: max-age=31536000
```

max-age 不是一个时间戳，而是一个时间长度。在本例中，max-age 是 31536000 秒，它意味着该资源在 31536000 秒以内都是有效的，完美地规避了时间戳带来的潜在问题。

1. Cache-control 其他用法

```http
cache-control: max-age=3600, s-maxage=31536000
```

s-maxage 优先级高于 max-age，两者同时出现时，优先考虑 s-maxage。如果 s-maxage 未过期，则向代理服务器请求其缓存内容。

在依赖各种代理的大型架构中，我们不得不考虑代理服务器的缓存问题。s-maxage 就是用于表示 cache 服务器上（比如 cache CDN）的缓存的有效时间的，并只对 public 缓存有效。

:::warning ⚠️
s-maxage仅在代理服务器中生效，客户端中我们只考虑max-age。
:::

1.1 public 与 private

如果我们为资源设置了 public，那么它既可以被浏览器缓存，也可以被代理服务器缓存；如果我们设置了 private，则该资源只能被浏览器缓存。private 为默认值。

设置了 s-maxage 时，就相当于已经设置成 public 了。

1.2 no-store 与 no-cache

- no-cache 绕开了浏览器：我们为资源设置了 no-cache 后，每一次发起请求都不会再去询问浏览器的缓存情况，而是直接向服务端去确认该资源是否过期（即走协商缓存）。
- no-store： 顾名思义就是不使用任何缓存策略。在 no-cache 的基础上，它连服务端的缓存确认也绕开了，只允许你直接向服务端发送请求、并下载完整的响应。
![alt](/强缓存.png)

##### 协商缓存的特征

- 协商缓存依赖于服务端与浏览器之间的通信。

浏览器需要向服务器去询问缓存的相关信息，进而判断是重新发起请求、下载完整的响应，还是从本地获取缓存的资源。

如果服务端提示缓存资源未改动（Not Modified），资源会被**重定向**到浏览器缓存，这种情况下网络请求对应的状态码是 304（如下图）。
![alt](/modified.jpg)

##### 协商缓存的实现：从 Last-Modified 到 Etag

- Last-Modified

Last-Modified 是一个时间戳，如果我们启用了协商缓存，它会在首次请求时随着 Response Headers 返回：

```yaml
Last-Modified: Fri, 27 Oct 2017 06:35:57 GMT
```

随后我们每次请求时，会带上一个叫 If-Modified-Since 的时间戳字段，它的值正是上一次 response 返回给它的 last-modified 值：

```yaml
If-Modified-Since: Fri, 27 Oct 2017 06:35:57 GMT
```

服务器接收到这个时间戳后，会比对该时间戳和资源在服务器上的最后修改时间是否一致，从而判断资源是否发生了变化。如果发生了变化，就会返回一个完整的响应内容，并在 Response Headers 中添加**新的 Last-Modified**值；否则，返回如上图的 `304` 响应，Response Headers **不会再添加 Last-Modified** 字段。

使用 `Last-Modified` 存在一些弊端：

1. 我们编辑了文件，但文件的内容没有改变。服务端并不清楚我们是否真正改变了文件，它仍然通过最后编辑时间进行判断。因此这个资源在再次被请求时，会被当做新资源，进而引发一次完整的响应——不该重新请求的时候，也会重新请求。
2. 当我们修改文件的速度过快时（比如花了 100ms 完成了改动），由于 If-Modified-Since 只能检查到以秒为最小计量单位的时间差，所以它是感知不到这个改动的——该重新请求的时候，反而没有重新请求了。

- Etag

Etag 和 Last-Modified 类似，当首次请求时，我们会在响应头里获取到一个最初的标识符字符串，举个🌰，它可以是这样的：

```yaml
ETag: W/"2a3b-1602480f459"
```

那么下一次请求时，请求头里就会带上一个值相同的、名为 if-None-Match 的字符串供服务端比对了：

```yaml
If-None-Match: W/"2a3b-1602480f459"
```

:::warning ⚠️
Etag 的生成过程需要服务器额外付出开销，会影响服务端的性能。

Etag 并不能替代 Last-Modified，它只能作为 Last-Modified 的补充和强化存在。 Etag 在感知文件变化上比 Last-Modified 更加准确，优先级也更高。当 Etag 和 Last-Modified 同时存在时，以 Etag 为准。
:::

[传送门：](<https://github.com/Christine-Only/cache>)

##### 缓存决策

当我们的资源内容不可复用时，直接为 Cache-Control 设置 no-store，拒绝一切形式的缓存；否则考虑是否每次都需要向服务器进行缓存有效确认，如果需要，那么设 Cache-Control 的值为 no-cache；否则考虑该资源是否可以被代理服务器缓存，根据其结果决定是设置为 private 还是 public；然后考虑该资源的过期时间，设置对应的 max-age 和 s-maxage 值；最后，配置协商缓存需要用到的 Etag、Last-Modified 等参数。

**如果什么缓存策略都没设置，那么浏览器会怎么处理？**

对于这种情况，浏览器会采用一个启发式的算法。

第一次：协商缓存，询问服务端，资源是否改变，已改变则发起请求。没改变的话，304重定向，并根据响应头的 `Date` 和 `Last-Modified` 计算出强制缓存的时间（类似强制设置 Cache-Control: max-age=xx）

- xx 的值是：（`Date` 减去 `Last-Modified`）乘以 10%
- `Date` 是创建HTTP报文的日期和时间（就是当前访问这个资源的时间）

第二次开始：就有强制缓存了，状态码为200

#### Push Cache

##### 概念

`Push Cache` 是 HTTP2 的新特性，是指 HTTP2 在 server push（服务端推送）阶段存在的缓存。

##### 特点

- 是缓存的最后一道防线。浏览器只有在 Memory Cache、HTTP Cache 和 Service Worker Cache 均未命中的情况下才会去询问 Push Cache。
- 是一种存在于会话阶段的缓存，当 session 终止时，缓存也随之释放。
- 不同的页面只要共享了同一个 HTTP2 连接，那么它们就可以共享同一个 Push Cache。

#### 网络请求

如果所有缓存都没有命中的话，那么只能发起请求来获取资源了。

**参考链接：**[前端性能优化之存储篇](https://zhuanlan.zhihu.com/p/421246316)

### 本地缓存

#### cookie

##### 概念

- Cookie 的本职工作并非本地存储，而是“维持状态”。
- 因为 HTTP 协议是一个无状态协议，我们需要通过 cookie 记录下其状态。
- Cookie 说白了就是一个存储在浏览器里的一个小小的文本文件，它附着在 HTTP 请求上，在浏览器和服务器之间“飞来飞去”。它可以携带用户信息，当服务器检查 Cookie 的时候，便可以获取到客户端的状态。

##### 缺点

- 容量太小，只有 4KB
- 同一个域名下的所有请求，都会携带 Cookie，随着请求的叠加，带来的开销较大

##### Cookie 属性

- Domain
- Path
- Expire/MaxAge
- HttpOnly: 是否允许被 JavaScript 操作
- Secure: 只能在 HTTPS 连接中配置
- SameSite

Cookie maxAge

如果没有 maxAge，则 cookie 的有效时间为会话时间。即浏览器关闭就没了。

Cookie SameSite

SameSite中有以下三个值：

- None: 任何情况下都会向第三方网站请求发送 Cookie
- Lax: 只有导航到第三方网站的 Get 链接会发送 Cookie，跨域的图片、iframe、form表单都不会发送 Cookie
- Strict: 任何情况下都不会向第三方网站请求发送Cookie

目前，主流浏览器 `Same-Site` 的默认值为 `Lax`，而在以前是 `None`，将会预防大部分 CSRF 攻击，如果需要手动指定 `Same-Site` 为 None，需要指定 Cookie 属性 `Secure`，即在 https 下发送。

Cookie HttpOnly

如果这个属性设置为true，就不能通过js脚本来获取cookie的值，能有效的防止xss攻击。

关于js操作Cookie

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

:::tip
localhost:3000 与 localhost:5000 的 cookie 信息是否共享

共享。

Cookie 只区分域，不区分端口和协议，只要域相同，即使端口号或协议不同，cookie 也能共享。
:::

参考链接[Cookie属性详解](https://juejin.cn/post/6863377752939036679)

#### Web Storage

##### 特点

- 存储容量大： Web Storage 根据浏览器的不同，存储容量可以达到 5-10M 之间。
- 仅位于浏览器端，不与服务端发生通信。

##### 组成

**localStorage**使用场景：

- 存储一些内容稳定的资源。比如图片内容丰富的电商网站会用它来存储 Base64 格式的图片字符串
- 存储一些不经常更新的 CSS、JS 等静态资源。
**sessionStorage**使用场景：
- 存储生命周期和它同步的会话级别的信息。这些信息只适用于当前会话，当你开启新的会话时，它也需要相应的更新或释放。比如微博的 Session Storage 就主要是存储你本次会话的浏览足迹：

##### 缺点

- 只能存储简单的字符串，无法存储大规模的、结构复杂的数据。

#### IndexDB

##### 概念

- 是一个运行在浏览器上的非关系型数据库。
- 是没有存储上限的（一般来说不会小于 250M）
- 不仅可以存储字符串，还可以存储二进制数据。

##### 使用场景

IndexDB 可以看做是 LocalStorage 的一个升级，当数据的复杂度和规模上升到了 LocalStorage 无法解决的程度，我们毫无疑问可以请出 IndexDB 来帮忙。
