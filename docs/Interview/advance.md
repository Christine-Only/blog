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

## 实现 call、apply 及 bind 函数

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

### new的作用

我们先来通过两个例子来了解 `new` 的作用

```js
function Person(name) {
  this.name = name
}
Person.prototype.sayName = function () {
  console.log(this.name)
}
const p = new Person('Christine')
console.log(p.name) // 'Christine'
p.sayName() // 'Christine'
```

从上面一个例子中我们可以得出这些结论：

* `new` 通过构造函数 `Person` 创建出来的实例可以访问到构造函数中的属性
* `new` 通过构造函数 `Person` 创建出来的实例可以访问到构造函数原型链中的属性，也就是说通过 `new` 操作符，实例与构造函数通过原型链连接了起来

从上面的例子中可以看出构造函数没有显示 `return` 任何值（默认返回`undefined`），如果让构造函数返回值会发生什么呢？

```js
function Person(name) {
  this.name = name
  return 'hello Christine'
}
Person.prototype.sayName = function () {
  console.log(this.name)
}
const p = new Person('Christine')
console.log(p.name) // 'Christine'
```

那么通过这个例子，我们又可以得出一个结论：

* 构造函数如果返回原始值，那么返回的这个值和不返回值结果是一样的

那如果构造函数返回的是对象呢？

```js
function Person(name) {
  this.name = name
  console.log(this) // Person { name: 'Christine' }
  return {age: 18}
}
Person.prototype.sayName = function () {
  console.log(this.name)
}
const p = new Person('Christine')
console.log(p) // {age: 18}
console.log(p.name) // undefined
```

通过这个例子我们可以发现，虽然构造函数内部的 `this` 还是依旧正常工作的，但是当返回值为对象时，这个返回值就会被正常的返回出去。

那么通过这个例子，我们再次得出了一个结论：

* 构造函数如果返回值为对象，那么这个返回值会被正常使用。

::: tip
构造函数尽量不要返回值。因为返回原始值不会生效，返回对象会导致 `new` 操作符没有作用。
:::

### 实现new操作符

`new` 操作符的几个作用：

* `new` 操作符会返回一个对象，我们需要在内部创建一个空对象
* 这个对象可以访问构造函数原型上的属性，所以需要将对象和构造函数连接起来
* 构造函数中的 `this` 指向这个新创建的对象，可以访问到挂载在 `this` 上的任意属性
* 执行构造函数内部的代码
* 构造函数返回原始值会被忽略，返回对象会被正常使用。

```js
function create(F, ...args) {
  // F不是函数或F是箭头函数
  if(typeof F !== 'function' || !F.prototype) {
    throw new Error('Error')
  }

  const obj = {}
  Object.setPrototypeOf(obj, F.prototype)
  const result = F.apply(obj, args)
  return result instanceof Object ? result : obj
}
```

代码解析：

1. 首先函数接收不定量的参数，第一个参数为构造函数，接下来的参数被构造函数使用
2. 然后内部创建一个空对象 `obj`
3. 因为 `obj` 对象需要访问到构造函数原型链上的属性，所以我们通过 `setPrototypeOf` 将两者联系起来。这段代码等同于 `obj.__proto__ = F.prototype`
4. 将 `obj` 绑定到构造函数上，并且传入剩余的参数后执行构造函数
5. 判断构造函数返回值是否为对象，如果为对象就使用构造函数返回的值，否则使用 `obj`，这样就实现了忽略构造函数返回的原始值

## instanceof

> 用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

* 语法：`object instanceof constructor`
  * object：某个实例对象
  * constructor：某个构造函数

:::tip
Object.create(null) 会造成创建的对象其 `__proto__` 指向为空
:::
![alt](/blog/create.jpg)

### 实现instanceof

```js
function copyInstanceof (source, target) {
  // 基本数据类型以及 null 直接返回 false
  if (!['function', 'object'].includes(typeof source) || source === null) return false
  // getPrototypeOf 是 Object 对象自带的一个方法，能够拿到参数的原型对象
  let proto = Object.getPrototypeOf(source)
  while (true) {
      // 查找到尽头，还没找到
      if (proto == null) return false
      // 找到相同的原型对象
      if (proto == target.prototype) return true
      proto = Object.getPrototypeOf(proto)
  }
}

console.log(copyInstanceof("111", String)); // false
console.log(copyInstanceof(new String("111"), String)); // true
console.log(copyInstanceof(Date, Function)); // true
console.log(copyInstanceof(null, Object)); // false
```
