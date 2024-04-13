---
sidebarDepth: 2
---

# 性能指标

## 性能指标

- FCP：**First Contentful Paint**首次内容绘制
- SI（Speed Index）：速度指数
  - shows how quickly the contents of a page are visibly populated.
  - 显示页面内容（全部内容渲染完成）的速度有多快
- TBT（Total Blocking Time）：总阻塞时间
  - 在FCP和TTI之间，所有超过50ms的long task的超过时间之和
  - TBT = (T(long task 1) - 50ms) + (T(long task 2) - 50ms) + (T(long task 3) - 50ms) + .... ---「假设3个long task的执行时间都超过50ms」
  - [long task](https://link.juejin.cn?target=https%3A%2F%2Fweb.dev%2Flong-tasks-devtools%2F) 是 JavaScript 代码， 可以让主线程保持忙碌，延迟用户交互，‘冻结’UI
- LCP：最大内容绘制所需的时间
- FID：First Input Delay 首次输入延迟时间
- TTI：Time to Interactive 完全达到可交互状态的时间点是在最后一个长任务完成的时间
- CLS：累计布局配置偏移

1. 想尽快看到东西（参考FCP）
2. 想尽快看全东西（参考SI，LCP）
3. 想尽快能操作（参考TTI，TBT）
4. 页面元素布局最好不要移位（参考CLS）

### Coverage 面板

下图未使用的资源 Lodash 和 JQuery 分别是 **30%**和 **74%**
![image.png](https://cdn.nlark.com/yuque/0/2024/png/15357601/1706931433895-e66b878f-3c13-46c4-8188-66b67f941be3.png#averageHue=%23ac8e6a&clientId=u47a78b52-f283-4&from=paste&height=701&id=ud8ee69da&originHeight=701&originWidth=1955&originalType=binary&ratio=1&rotation=0&showTitle=false&size=238118&status=done&style=none&taskId=u9a402e23-bbe3-4a57-b1d1-0d4e9af818f&title=&width=1955)
此时可以通过 **Network request blocking**添加请求屏蔽标签页
![image.png](https://cdn.nlark.com/yuque/0/2024/png/15357601/1706931741568-94786ad3-ee54-4670-b6f8-ca8f1174b045.png#averageHue=%23ab8d67&clientId=u47a78b52-f283-4&from=paste&height=535&id=uea20b45b&originHeight=535&originWidth=1955&originalType=binary&ratio=1&rotation=0&showTitle=false&size=172420&status=done&style=none&taskId=u2b64342e-80b7-404c-949e-abd1bd375f1&title=&width=1955)
重新加载页面。 jQuery 和 Lodash 请求显示为红色，表示它们已被阻止。该网页仍会加载且具有互动性，因此您似乎根本不需要这些资源
![image.png](https://cdn.nlark.com/yuque/0/2024/png/15357601/1706931836583-a3b6f205-c39a-49bb-bcd9-545cd4bf2b02.png#averageHue=%23dbd0c1&clientId=u47a78b52-f283-4&from=paste&height=496&id=ucb14ea21&originHeight=496&originWidth=1947&originalType=binary&ratio=1&rotation=0&showTitle=false&size=154962&status=done&style=none&taskId=uef70c637-9448-482b-b409-4739cc49b53&title=&width=1947)

### Memory 面板

![alt image.png](https://cdn.nlark.com/yuque/0/2024/png/15357601/1706932634510-52b26300-eeb5-4bfa-a188-fd51d564fbf9.png#averageHue=%23e5e5e5&clientId=u47a78b52-f283-4&from=paste&height=679&id=u02d7af8d&originHeight=679&originWidth=1952&originalType=binary&ratio=1&rotation=0&showTitle=false&size=219192&status=done&style=none&taskId=u2f707a30-3afe-4d78-a359-d9b2b6163d9&title=&width=1952)

### Performance 面板

## 优化网站首屏加载速度

优化网站首屏加载速度是提升用户体验和搜索引擎优化（SEO）的关键因素。要衡量和优化首屏加载速度，你可以关注以下技术指标：

1. **Time to First Byte (TTFB)**: 这是指从用户或客户端发起请求到从服务器接收到第一个字节的时间。TTFB包括网络延迟和服务器处理时间，它是衡量服务器响应速度的一个重要指标。
2. **First Paint (FP)** 和 **First Contentful Paint (FCP)**: FP指的是浏览器渲染出任何视觉更改的时间点，而FCP指的是浏览器渲染出来自DOM的第一块内容的时间点，比如文本、图像等。
3. **Largest Contentful Paint (LCP)**: 这个指标衡量的是在视口中最大的页面内容元素加载和渲染完成的时间。这通常是用户认为页面"主要内容"已经加载的一个指标。
4. **Speed Index**: 一个页面展示内容填充视口的速度，通常使用工具如Lighthouse来测量。
5. **Total Blocking Time (TBT)**: 这个指标衡量的是FCP和Time to Interactive（TTI）之间的总时间，在这段时间里，页面的主线程被长任务阻塞，无法响应用户输入。
6. **Time to Interactive (TTI)**: 这是指页面变得完全可交互的时间点。TTI之前，页面可能已经可视，但是用户可能无法与页面上的元素互动。
7. **Cumulative Layout Shift (CLS)**: CLS测量视觉稳定性，即页面内容在加载期间移动的频率和程度。尽管它不直接衡量速度，但它对用户体验有很大影响。

为了提高首屏加载速度，你可以采取以下优化措施：

- **减少资源大小**：压缩图片和视频，使用WebP或AVIF等现代格式；最小化CSS和JavaScript文件。
- **提高资源加载效率**：通过浏览器缓存、CDN分发、HTTP/2等技术来减少加载时间。
- **优化渲染路径**：删除阻塞渲染的CSS和JavaScript，优化关键渲染路径，使用异步或延迟加载脚本。
- **服务器端优化**：使用更快的服务器、数据库索引、减少服务器端渲染时间。
- **代码拆分**：使用代码拆分来延迟加载非首屏关键代码。
- **懒加载**：对非关键资源如图片和视频进行懒加载，只有当它们接近进入视口时才加载。
- **预加载关键资源**：使用`<link rel="preload">`来指示浏览器优先加载关键资源。
- **优化第三方脚本**：监控和优化第三方脚本的加载，如社交分享按钮、广告等。

通过关注上述指标并实施相应的优化措施，你可以显著提高网站的首屏加载速度，从而改善用户的感知性能和整体体验。

[https://web.dev/articles/reduce-javascript-payloads-with-code-splitting?hl=zh-cn](https://web.dev/articles/reduce-javascript-payloads-with-code-splitting?hl=zh-cn)
