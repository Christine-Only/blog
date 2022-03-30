# JS基础知识点

## 基本数据类型

在 JS 中，存在着 7 种原始值，分别是：

* `boolean`
* `null`
* `undefined`
* `number`
* `string`
* `symbol`
* `bigInt`

基本数据类型存储的都是值，是没有函数可以调用的，比如 `undefined.toString()` 会报错 `Uncaught TypeError: Cannot read properties of undefined (reading 'toString')`。

此时你肯定会疑惑，为什么`'1'.toString()`在浏览器能正常运行呢？因为 `'1'.toString()` 中的字符串 `'1'` 在这个时候会被封装成其对应的字符串对象，以上代码相当于 `new String('1').toString()`，因为 `new String('1')` 创建的是一个对象，而这个对象里是存在toString()方法的。

除了会在必要的情况下强转类型以外，原始类型还有一些坑。

其中 JS 的 `number` 类型是浮点类型的，在使用中会遇到某些 Bug，比如 `0.1 + 0.2 !== 0.3`，但是这一块的内容会在进阶部分讲到。`string` 类型是不可变的，无论你在 `string` 类型上调用何种方法，都不会对值有改变。

另外对于 `null` 来说，很多人会认为他是个对象类型，其实这是错误的。虽然 `typeof null` 会输出 `'object'`，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，`000` 开头代表是对象，然而 `null` 表示为全零，所以将它错误的判断为 `object` 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。

## 引用类型

> 在JS中，除了基本数据类型那么其他的都是引用类型了。基本数据类型和引用类型不同的是：基本数据类型存储的是值，引用类型存储的是地址（指针）。

```js
const a = []
const b = a
a.push('Christine')
```

对于常量 `a` 来说，假设内存地址（指针）为 `#001`，那么在地址 `#001` 的位置存放了值 []，常量 a 存放了地址（指针） `#001`，当我们将变量 `a` 赋值给变量 `b` 时，相当于将 `a` 的内存地址赋值给了 `b`，此时变量 `a` 和 `b` 指向同一个地址 `#001`，当我们进行数据修改的时候，就会修改存放在地址（指针） `#001` 上的值，也就导致了两个变量的值都发生了改变。

函数参数是对象

```js
function test(person) {
  person.age = 30
  person = {
    name: 'christine',
    age: 27
  }

  return person
}
const p1 = {
  name: 'picker',
  age: 26
}
const p2 = test(p1)
console.log(p1) // {name: 'picker', age: 30}
console.log(p2) // {name: 'christine', age: 27}
```

代码详解：

1. 函数传参传递的是 `p1` 对象指针的副本；
2. 在函数内部改变 `person` 的属性，`p1` 对象的值也同步修改了；
3. 函数返回了新的对象 `person`，这个新对象拥有了一个新的地址（指针），也就和 `p1` 对象没有任何关系了，最终导致两个变量的值是不相同的。

typeof VS instanceof

`typeof` 能精准判断除了null以外的所有基本数据类型的值。

```js
typeof 1         // 'number'
typeof '1'       // 'string'
typeof false     // 'boolean'
typeof undefined // 'undefined'
typeof null      // 'object'
typeof Symbol(1) // 'symbol'
typeof BigInt(1) //'bigint'
```

`typeof` 对于引用类型来说，除了函数会判断成 `'function'` ，其他引用类型一律返回 `'object'`。

```js
typeof []           // 'object'
typeof {}           // 'object'
typeof console.log  // 'function'
typeof new RegExp() // 'object'
```

如果我们想判断一个对象的正确类型，这时候可以考虑使用 `instanceof`，因为内部机制是通过原型链来判断的，在后面的章节中我们也会自己去实现一个 `instanceof`。

```js
const Person = function() {}
const p1 = new Person()
p1 instanceof Person // true

const str = 'hello world'
str instanceof String // false

const str1 = new String('hello world')
str1 instanceof String // true
```

对于基本数据类型来说，你想直接通过 `instanceof` 来判断类型是不行的，当然我们还是有办法让 `instanceof` 判断基本数据类型的。

```js
class PrimitiveString {
  static [Symbol.hasInstance](x) {
    return typeof x === 'string'
  }
}
console.log('hello world' instanceof PrimitiveString) // true
```

代码详解：

* `Symbol.hasInstance` 用于判断某对象是否为某构造器的实例。

通过上面的例子侧边反映了一个问题， `instanceof` 也不是百分之百可信的。

## 类型转换

在 `JS` 中类型转换只有三种情况，分别是：

* 转换为布尔值
* 转换为数字
* 转换为字符串

| 原始值 | 转换目标 | 结果 |
| ----  | ----     | ----  |
| number | 布尔值 | 除了0、-0、NaN其它都为true |
| string | 布尔值 | 除了空字符串其它都为true |
| undefined、null | 布尔值 | 都为false |
| 引用类型 | 布尔值 | 都为true |
| symbol | 布尔值 | true |
| number | 字符串 | 6 => '6'|
| 布尔值 | 字符串 | true => 'true' |
| undefined | 字符串 | 'undefined'|
| null | 字符串 | 'null'|
| symbol | 字符串 | Symbol(2) => 'Symbol(2)'|
| 函数| 字符串 | function(){} => "function(){}"|
| 数组 | 字符串 | [1,2] => '1,2'、[] => ''|
| 对象 | 字符串 | {age: 18} => '[object Object]'|
| 字符串 | 数字 | '1' => 1、'a' => NaN、'0' => 0、'' => 0|
| 数组 | 数字 | [] => 0、 存在一个元素且为数字的数组 => 数字，其它情况都为NaN |
| null | 数字 |  0 |
| undefined | 数字 | NaN|
| 对象 | 数字 | NaN|
| 函数 | 数字 | function(){} => NaN|
| symbol | 数字 | Uncaught TypeError: Cannot convert a Symbol value to a number |

## 转boolean

在条件判断时，除了`undefined`、`null`、`false`、`''`、`0`、`-0`、`NaN`转布尔为 `false` 外，其它所有值转布尔都为 `true` 。包括所有对象。

## 对象转基本数据类型

对象转基本数据类型时，会调用内置的 `[[ToPrimitive]]` 函数，对于该函数来说，其逻辑一般来说如下：

* 如果已经为原始值，则不需要转换；
* 调用 `x.valueOf()`, 如果转换为基本数据类型，则返回转换的值；
* 调用 `x.toString()`，如果转换为基本数据类型，则返回转换的值；
* 如果都没有转为基本类型，则报错；

当然你也可以重写 Symbol.toPrimitive ，该方法在转原始类型时调用优先级最高。

```js
const a = {
  valueOf() {
    return 0
  },
  toString() {
    return '1'
  },
  [Symbol.toPrimitive]() {
    return 2
  }
}

1 + a // => 3
```

## 对象转原始类型应用

如何使if(a==1&&a==2&&a==3) {console.log('true')}; 正确打印'true'

```js
const a = {
  value: 0,
  valueOf() {
    this.value++;
    return this.value;
  }
}
if(a==1 && a==2 && a==3) {
  console.log('true'); // 输出true
}
```

代码详解：

* 重写对象 `a` 的 `valueOf()` 方法，使 `value` 属性每次调用时自增;
* 当判断 `a==1` 时，第一次调用 `valueOf()` 方法，此时 `value` 等于1，判断1==1，继续向下走；
* 判断 `a==2` 时，第二次调用 `valueOf()` 方法，此时 `value` 等于2，判断2==2，继续向下走；
* 判断 `a==3` 时，第三次调用 `valueOf()` 方法，此时 `value` 等于3，判断3==3，if判断结束；
* if条件判断为 `true && true && true` ，执行 `console.log('true')` ，打印true。

## new关键字的作用

1. 创建一个对象，让对象有了类型；
2. 让构造函数的this指向新创建的对象；
3. 执行构造函数；
4. 返回这个新创建的对象。

## this

在JS中 `this` 指向，写个栗子简单诠释下：

```js
var a = 1

function foo() {
  console.log(this.a)
}

const obj1 = {
  a: 2,
  foo: foo
}

const obj2 = {
  a: 3
}

foo() // 1
obj1.foo() // 2
obj1.foo.apply(obj2) // 3
const c = new foo() // undefined
```

代码详解：

* `foo()`：对于直接调用foo来说，不管foo函数放在了什么地方，this一定是window；
* `obj1.foo()`：对于 `obj1.foo()` 来说，我们只需要记住，谁调用了函数，`this` 就指向谁，所以在这个场景下 `foo` 函数中的 `this` 就是 `obj1` 对象；

* `obj1.foo.apply(obj2)`：`call()`、`apply()` 和 `bind()` 改变上下文的方法，`this` 指向取决于这些方法的第一个参数，当第一个参数为 `null` 或者为 `空` 时，`this` 指向全局对象 `window`；

* `new foo()`：`new` 构造函数调用，`this` 永远指向新创建的对象上，优先级最高。

下面我们来看看箭头函数的 `this`

```js
function abc() {
  return () => {
    return () => {
      console.log(this)
    }
  }
}
console.log(abc()()())
```

首先箭头函数其实是没有 `this` 的，箭头函数中的 `this` 只取决包裹箭头函数的第一个普通函数的 `this`。在这个例子中，因为包裹箭头函数的第一个普通函数是 `abc`，所以此时的 `this` 是 `window`。另外对箭头函数使用 `bind` 这类函数是无效的。

那么说到 bind，不知道大家是否考虑过，如果对一个函数进行多次 bind，那么上下文会是什么呢？

```js
let a = {}
let fn = function () { console.log(this) }
fn.bind().bind(a)() // => window
```

如果你认为输出结果是 a，那么你就错了，其实我们可以把上述代码转换成另一种形式

```js
// fn.bind().bind(a) 等于
let fn2 = function fn1() {
  return function() {
    return fn.apply()
  }.apply(a)
}
fn2()
```

可以从上述代码中发现，不管我们给函数 `bind` 几次，`fn` 中的 `this` 永远由第一次 `bind` 决定，所以结果永远是 `window`。

```js
const a = { name: 'christine' }
function foo() {
  console.log(this.name)
}
foo.bind(a)() // => 'christine'
```

以上就是 `this` 的规则了，但是可能会发生多个规则同时出现的情况，这时候不同的规则之间会根据优先级最高的来决定 `this` 最终指向哪里。

::: warning
`new` 的方式优先级最高，接下来是 `bind` 这些函数，然后是 `obj1.foo()` 这种调用方式，最后是 `foo` 这种调用方式，同时，箭头函数的 `this` 一旦被绑定，就不会再被任何方式所改变。
:::

== VS ===

假如我们需要对比 x 和 y 是否相同，就会进行如下判断流程：

1.首先会判断两者类型是否相同，相同的话就比数值大小了；

2.若类型不相同的话，那么就会进行类型转换；

3.会先判断是否在对比 `null` 和 `undefined`，是的话就会返回 `true`；

4.判断两者类型是否为 `string` 和 `number`，是的话就会将 `string` 转换为 `number`；

```js
1 == '1'
      ↓
1 ==  1
```

5.判断其中一方是否为 boolean，是的话就会把 boolean 转为 number 再进行判断；

```js
'1' == true
        ↓
'1' ==  1
 ↓
 1  ==  1
```

6.判断其中一方是否为 `object` 且另一方为 `string`、`number` 或者 `symbol`，是的话就会把 `object` 转为基本数据类型再进行判断；

```js
'1' == { name: 'christine' }
                  ↓
'1' == '[object Object]'
```

看完了上面的步骤，对于 `[] == ![]` 你是否能正确写出答案呢？

```js
[] == ![] // true
```

代码详解：

1. 左侧是一个 `[]`；

2. 右侧是一个布尔值，`[]` 转换成布尔值 `true`，因为除了 `null` 之外的所有对象转换成布尔都是 `true`，所以 `![]` 结果为 `false`；

3. 此时相当于 `[] == false`，依据类型转换规则，会把布尔转换成 `number` 再进行比较；`false` 转 `number` 结果为 `0`；

4. 此时相当于 `[] == 0`，依据类型转换规则，会把 `[]` 转为基本数据类型，调用 `[].toString()`，将 [] 转换成了字符串，所以 `[]` 结果为 `''`；

5. 此时相当于 `'' == 0`，依据类型转换规则，会把 `''` 转换为 `number`，结果为 `0`， 所以 `0 == 0`，结果为 `true`。

## 闭包

> 一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包（closure）。也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。

```js
function init() {
  const name = "Mozilla"; // name 是一个被 init 创建的局部变量
  function displayName() { // displayName() 是内部函数，一个闭包
      alert(name); // 使用了父函数中声明的变量
  }
  displayName();
}
init();
```

在 JS 中，闭包存在的意义就是让我们可以间接访问函数内部的变量。

```!
经典面试题，循环中使用闭包解决 `var` 定义函数的问题
```

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```

首先因为 `setTimeout` 是个异步函数，所以会先把循环全部执行完毕，这时候 `i` 就是 `6` 了，所以会输出一堆 `6`。

解决办法有三种:

1.使用闭包的方式

```js
for (var i = 1; i <= 5; i++) {
  ;(function(j) {
    setTimeout(function timer() {
      console.log(j)
    }, j * 1000)
  })(i)
}
```

在上述代码中，我们首先使用了立即执行函数将 `i` 传入函数内部，这个时候值就被固定在了参数 `j` 上面不会改变，当下次执行 `timer` 这个闭包的时候，就可以使用外部函数的变量 `j`，从而达到目的。

2.使用 `setTimeout` 的第三个参数，这个参数会被当成 `timer` 函数的参数传入。

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(
    function timer(j) {
      console.log(j)
    },
    i * 1000,
    i
  )
}
```

[setTimeout用法](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout)

3.使用 `let` 定义 `i`，这个也是最为推荐的方式。

```js
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```

## 深浅拷贝

### 浅拷贝

:::tip
浅拷贝只会拷贝所有的属性值到新的对象中，如果属性值是对象的话，拷贝的是地址。
:::

浅拷贝的几种方式

1.Object.assign

```js
const a = {
  age: 18
}
const b = Object.assign({}, a)
a.age = 20
console.log(b.age) // 18
```

:::tip
使用 `Object.assign` 方法有几点需要注意:

* 它不会拷贝对象的继承属性；
* 它不会拷贝对象的不可枚举属性；
* 可以拷贝Symbol类型的属性。
:::

2.扩展运算符`...`

```js
const a = {
  age: 18
}
const b = {...a}
a.age = 20
console.log(b.age) // 18
```

通常浅拷贝就能解决大部分问题了，但是当我们遇到如下情况时，可能需要使用深拷贝来解决。

```js
const a = {
  age: 1,
  jobs: {
    first: 'FE'
  }
}
const b = { ...a }
a.jobs.first = 'native'
console.log(b.jobs.first) // 'native'
```

### 深拷贝

上面的问题，可以通过`JSON.parse(JSON.stringify(object))`来解决。

```js
const a = {
  age: 1,
  jobs: {
    first: 'FE'
  }
}
const b = JSON.parse(JSON.stringify(a))
a.jobs.first = 'native'
console.log(b.jobs.first) // 'FE'
```

## 防抖（debounce）

>触发高频事件后 n 秒内函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间。

应用场景：

1. 登录、发短信等按钮避免用户点击太快，以致于发送多次请求。
2. 调整浏览器窗口大小时，resize次数过于频繁，造成计算过多，此时需要一次到位，就用到了防抖。
3. 文本编辑器实时保存，当无任何更改操作一秒后进行保存。

```js
function debounce(fn, wait) {
  let timerId;

  return function() {
    const _this = this
    const args = arguments

    if(timerId) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => {
      fn.apply(_this, args)
    }, wait)
  }
}

window.onresize = debounce(function() {
  console.log('onresize')
}, 500)
```

## 节流（throttle）

> 高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率。

应用场景：

1. `scroll` 事件，每隔 `wait` 秒计算一次位置信息等
2. 浏览器播放事件，每隔 `wait` 秒计算一次进度信息等
3. input框实时搜索并发送请求展示下拉列表，每隔 `wait` 秒发送一次请求（也可做防抖）

```js
// 延时器
function throttle(fn, wait) {
  let timerId
  return function() {
    const _this = this
    const args = arguments

    if(!timerId) {
      timerId = setTimeout(() => {
        timerId = null
        clearTimeout(timerId)
        fn.apply(_this, args)
      }, wait)
    }
  }
}
```

### 总结

* 防抖：防止抖动，单位时间内事件触发会被重置，避免事件被误伤触发多次。**代码实现重在清零** `clearTimeout`。防抖可以比作等电梯，只要有一个人进来，就需要再等一会儿。业务场景有避免登录按钮多次点击的重复提交。
* 节流：控制流量，单位时间内事件只能触发一次，与服务器端的限流 (Rate Limit) 类似。**代码实现重在开锁关锁** `timer=timeout; timer=null`。节流可以比作过红绿灯，每等一个红灯时间就可以过一批。
