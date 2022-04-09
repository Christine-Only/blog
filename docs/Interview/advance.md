# JS进阶知识点

## call、apply 及 bind 区别

### 作用

`call`、`apply`、`bind` 作用是改变函数执行时的上下文，简而言之就是改变函数运行时的 `this` 指向。

什么情况下需要改变 `this` 指向呢？
🌰：

```js
const name = "Picker";
const obj = {
  name: "Christine",
  say: function () {
    console.log(this.name);
  }
};
obj.say(); // Christine，this 指向 obj 对象
setTimeout(obj.say,0); // Picker，this 指向 window 对象
```

我们把 `say` 放在 `setTimeout` 方法中，在延时器中是作为回调函数来执行的，因此回到主栈执行时是在全局执行上下文的环境中执行的，这时候 `this` 指向 `window`，所以输出 `Picker`。

上面的代码要想在延时器中回调函数的 `this` 指向 `obj`，这个时候就需要改变 `this` 指向了。

```js
setTimeout(obj.say.call(obj),0); // Christine，this 指向 window 对象
```

### 区别

* **call**

  `call` 方法的第一个参数是 `this` 的指向，后面传入的是一个参数列表

  ```js
  function Product(name, price) {
    this.name = name;
    this.price = price;
  }

  function Food(name, price) {
    Product.call(this, name, price);
    this.category = 'food';
  }

  console.log(new Food('cheese', 5).name); // "cheese"
  ```

  当第一个参数为`null`、`undefined`的时候，默认指向window(在浏览器中)

  ```js
  function fn(...args){
    console.log(this, args);
  }

  let obj = {
    name: "张三"
  }

  fn.call(obj, 1, 2, 3); // this会变成传入的obj；
  fn(1, 2, 3) // this指向window

  fn.call(null, 1, 2, 3); // this指向window
  fn.call(undefined, 1, 2, 3); // this指向window

  ```

* **apply**

  `apply` 方法的第一个参数是 `this` 的指向，后面传入的是一个包含多个参数的数组

  ```js
  function Product(name, price) {
    this.name = name;
    this.price = price;
  }

  function Food(name, price) {
    Product.apply(this, [name, price]);
    this.category = 'food';
  }

  console.log(new Food('cheese', 5).name); // "cheese"
  ```

  当第一个参数为`null`、`undefined`的时候，默认指向window(在浏览器中)

  ```js
  function fn(...args){
    console.log(this, args);
  }

  let obj = {
    name: "张三"
  }

  fn.apply(obj, [1, 2, 3]); // this会变成传入的obj；
  fn(1, 2, 3) // this指向window

  fn.apply(null, [1, 2, 3]); // this指向window
  fn.apply(undefined, [1, 2, 3]); // this指向window
  ```

* **bind**

  `bind` 第一参数是 `this` 的指向，后面传入的是一个参数列表(但是这个参数列表可以分多次传入)，改变`this`指向后不会立即执行，而是返回一个永久改变this指向的新函数。

  ```js
  function fn(...args){
    console.log(this, args);
  }

  let obj = {
    name:"张三"
  }

  const bindFn = fn.bind(obj); // this 也会变成传入的obj ，bind不是立即执行需要执行一次
  bindFn(1,2) // this指向obj [1,2]
  bindFn(5,6,7) // this指向obj [5, 6, 7]
  fn(1,2) // this指向window [1,2]
  ```

:::tip 总结

* 三者都可以改变函数的`this`指向
* 三者第一个参数都是 `this` 要指向的对象，如果没有传入第一个参数或第一个参数为 `undefined` 或 `null`，则默认指向全局 `window`
* 三者都可以传参，但是 `apply` 是数组，而 `call` 是参数列表，且 `apply` 和 `call` 是一次性传入参数，而 `bind` 可以分为多次传入
* `bind` 是返回绑定 `this` 之后的函数，`apply`、 `call` 则是立即执行

:::

## 手写 call、apply 及 bind 函数

首先从以下两点来考虑如何实现这几个函数

* 不传入第一个参数，那么上下文默认为 `window`
* 改变了 `this` 指向，让新的对象可以执行该函数，并能接受参数

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

### apply的实现

```js
Function.prototype.myApply = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || window
  context.fn = this
  let result
  // 处理参数和 call 有区别
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}
```

### bind的实现

实现bind的步骤，我们可以分解成为三部分：

* 修改 `this` 指向
* 动态传递参数

```js
// 方式一：只在bind中传递函数参数
fn.bind(obj,1,2)()

// 方式二：在bind中传递函数参数，也在返回函数中传递参数
fn.bind(obj,1)(2)
```

* 兼容 `new` 关键字

```js
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  const _this = this
  const args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}
```

代码详解：

* `this instanceof F`：用于检测构造函数 `F` 的 `prototype` 属性是否出现在某个实例对象的原型链上。
* `args.concat(...arguments)`：这么实现的原因是因为 `bind` 可以实现类似这样的代码`fn.bind(obj,1)(2)`，所以需要将两边的参数拼接。

## new
