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
