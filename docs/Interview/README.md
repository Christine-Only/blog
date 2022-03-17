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
| 字符串 | 数字 | '1' => 1、'a' => NaN、'0' => 0|
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

## this
