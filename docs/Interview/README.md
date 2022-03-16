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

此时你肯定会疑惑，为什么`'1'.toString()`在浏览器能正常运行呢？因为 ·`1'.toString()` 中的字符串 `'1'` 在这个时候会被封装成其对应的字符串对象，以上代码相当于new String('1').toString()，因为new String('1')创建的是一个对象，而这个对象里是存在toString()方法的。

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