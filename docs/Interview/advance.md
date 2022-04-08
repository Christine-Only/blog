# JS进阶知识点

## 手写 call、apply 及 bind 函数

首先从以下两点来考虑如何实现这几个函数

不传入第一个参数，那么上下文默认为 window
改变了 this 指向，让新的对象可以执行该函数，并能接受参数

### call的实现

```js
Function.prototype.call = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('Error')
  }

  context.fn = this
  const args = [...arguments].slice(1)
  const result = context.fn(...args)
  delete context.fn
  return result
}
```

代码详解：

* 首先 `context` 为可选参数，如果不传的话默认上下文为 `window`
* `context.fn = this`，此时的 `this` 是一个函数，也就是调用 `call` 方法的函数
* 因为 `call` 可以传入多个参数作为调用函数的参数，所以需要将参数剥离出来
* 调用函数并将对象上的函数删除
