# ES6知识点

## var、let 及 const 区别

### 作用域规则

>var声明的变量的作用域是整个封闭函数。let声明的变量只在其声明的块或子块中可用。

```js
function varTest() {
  var x = 1;
  {
    var x = 2;  // 同样的变量!
    console.log(x);  // 2
  }
  console.log(x);  // 2
}

function letTest() {
  let x = 1;
  {
    let x = 2;  // 不同的变量
    console.log(x);  // 2
  }
  console.log(x);  // 1
}
```

### 挂载到全局

```js
var a = 'global'
let b = 'global'
const c = 'global'

console.log('window.a', window.a) // "global"
console.log('window.b', window.b) // undefined
console.log('window.c', window.c) // undefined
```

### 重复声明

```js
var a = 10
var a
console.log(a) // 10

if (x) {
  let foo;
  let foo; // SyntaxError thrown.
}
```

### 暂存死区

> 与通过  `var` 声明的有初始化值 `undefined` 的变量不同，通过 `let` 声明的变量直到它们的定义被执行时才初始化。在变量初始化前访问该变量会导致 `ReferenceError`。该变量处在一个自块顶部到初始化处理的“暂存死区”中。

```js
function test(){
  console.log(a)
  let a
}
test()
```

### 暂存死区与`typeof`

```js
console.log(typeof undeclaredVariable); // 'undefined'

console.log(typeof i); // ReferenceError
let i = 10;
```

总结：

* 函数提升优先于变量提升，函数提升会把整个函数挪到作用域顶部，变量提升只会把声明挪到作用域顶部；
* `var` 存在提升，我们能在声明之前使用。`let`、`const` 因为暂时性死区的原因，不能在声明前使用；
* `var` 在全局作用域下声明变量会导致变量挂载在 `window` 上，其他两者不会；
* `let` 和 `const` 作用基本一致，但是后者声明的变量不能被再次赋值。

## 预解析

函数变量及作用域

隐式全局变量：变量没有声明，直接赋值，执行到时，浏览器才会偷偷把变量提升为隐式全局变量

全局作用域：在函数声明之外的作用域

预解析:

1. 所有的变量声明，都会提升到最顶部，但不会提升赋值；
2. 所有的函数声明，都会提升到最顶部，但不会提升函数的调用；
3. 如果同时有多个 `var` 声明的相同的变量，后面的 `var` 将被忽略；
4. 如果同时有多个同名的函数，后面的函数将会覆盖前面的函数；
5. 如果声明的变量和声明的函数同名，声明的函数将会覆盖声明的变量。

词法分析3步骤:

1. 先分析函数形参（默认值为undefined），再分析形参赋值（没有形参的直接忽略此步骤）
2. 分析函数体中所有的变量声明：
   * 如果变量名与形参名相同时，直接忽略 `var`;
   * 如果变量名与形参名不同时，就相当于声明了一个变量，如var foo，值为undefined;
3. 分析函数体中所有的函数声明：
   * 如果函数名与变量名相同，函数将作为变量的值；
   * 如果函数名与变量名不相同，相当于 `var 函数名 = function 函数名 () {}`;

函数执行过程分为2步:

1. 词法分析过程;
2. 执行过程

栗子1:

```js
function a(b) {
  console.log(b);
  function b() {
    console.log(b);
  }
  b();
  b=1
}
a(1);
```

栗子2:

```js
function t3(greet) {
  console.log(greet); //?
  var greet = 'hello';
  console.log(greet); //?
  function greet() {
  };
  console.log(greet); //?
}
t3(null);
```

栗子3:

```js
function test(a, b) {
  console.log(a);
  console.log(b);
  var b = 234;
  console.log(b);
  a = 123;
  console.log(a);
  function a() {
  }
  var a;
  b = 234;
  var b = function () {
  }
  console.log(a);
  console.log(b);
}

test(1);
```

知识点补充:

arguments是一个对应于传递给函数的参数的类数组对象。(可以获取实参)

```js
function fn(a,b) {
  console.log(arguments);
  console.log(arguments[0]);
  console.log(arguments[0] = 4);
  console.log(a);
}
fn(1,2,3);
```

栗子4:

```js
a = 100;
function demo(e) {
  function e() {
  }
  arguments[0] = 2;
  console.log(e);//?
  if (a) {
      var b = 123;
  }
  a = 10;
  var a;
  console.log(b); //?
  f = 123;
  console.log(a); //?
}

var a;
demo(1);
console.log(a); //?
console.log(f); //?
```

:::warning 警告
具名函数中的变量不能用来调用函数。

```js
var a = function b() {
  console.log(123);
}
a();//123
b();报错
```

:::

## Proxy

> `Proxy` 是ES6新增的功能，它可以用来自定义对象中的操作。

```js
const p = new Proxy(target, handler);
```

代码详解：

* `target`代表需要添加代理的对象
* `handler`用来自定义对象中的操作，比如可以用来自定义 `set` 和 `get` 函数。

接下来我们通过Proxy来实现一个数据响应式

```js
const onWatch = (obj, setBind, getLogger) => {
  const handler = {
    get(target, property, receiver) {
      getLogger(target, property)
      return Reflect.get(target, property, receiver)
    },
    set(target, property, value, receiver) {
      setBind(value, property)
      return Reflect.set(target, property, value, receiver)
    }
  }

  return new Proxy(obj, handler)
}

const user = { name: 'christine' }
const p = onWatch(
  user,
  (value, property) => {
    console.log(`监听到属性${property}改变为${value}`)
  },
  (target, property) => {
    console.log(`'${property}' = ${target[property]}`)
  }
)

user.name = 'Picker' // 监听到属性name改变为Picker
user.name // 'name' = 'Picker'
```

## Set、WeakSet、Map、WeakMap

> `Set` 和 `Map` 主要的应用场景在于 `数据重组` 和 `数据存储`。
> `Set` 是一种叫做集合的数据结构，`Map` 是一种叫做字典的数据结构。

### Set（集合）

ES6 新增的一种新的数据结构，类似于数组，但成员是唯一且无序的，没有重复的值。

Set本身是一种构造函数，用来生成Set数据结构。

```js
new Set([iterable])
```

🌰：

```js
const arr = new Set()
[1,2,3,2,1].forEach(num => arr.add(num))
console.log([...arr]) //[1,2,3]
```

`Set` 对象允许你存储任何类型的唯一值，无论是原始值or对象引用。

```js
const arr = new Set([1,2,3,2,1])
const obj = {age: 18}
arr.add(obj)
arr.add(obj)
console.log(arr.size) // 4

arr.add({age: 18})
console.log(arr.size) // 5
```

![alt](/blog/set.jpg)

* Set 实例属性
  * constructor： 构造函数，返回Set
  * size：返回实例成员总数

    ```js
    const set = new Set([1, 2, 3, 2, 1])

    console.log(set.length) // undefined
    console.log(set.size) // 3
    ```

* Set 实例方法
  * 操作方法
    * add(value)：向一个 Set 对象的末尾添加一个指定的值。返回 `Set` 对象本身

    * delete(value)：从一个 Set 对象中删除指定的元素。成功删除返回 true，否则返回 false。
    * has(value)：返回一个布尔值来指示对应的值value是否存在Set对象中。
    * clear()：用来清空一个 Set 对象中的所有元素。

      ```js
      const set = new Set()

      set.add(1).add(2).add(1)

      set.has(1) // true
      set.has(3) // false
      set.delete(1)
      set.has(1) // false
      ```

      `Array.from` 和 `...`可以将Set对象转为数组

      ```js
      const set = new Set([1, 2, 3, 2, 1])
      const array = Array.from(set)
      console.log(array) // [1, 2, 3]

      or

      const arr = [...set]
      console.log(arr) // [1, 2, 3]
      ```

  * 遍历方法
    * keys()：按照元素插入顺序返回一个具有 Set 对象每个元素值的全新 Iterator 对象。
    * values()：按照元素插入顺序返回一个具有 Set 对象每个元素值的全新 Iterator 对象。
    * entries()：返回一个包含Set对象中所有元素得键值对迭代器
    * forEach(callbackFn, thisArg)：用于对集合成员执行callbackFn操作，如果提供了 thisArg 参数，它便是回调函数执行过程中的 this。

      ```js
      let set = new Set([1, 2, 3])
      console.log(set.keys()) // SetIterator {1, 2, 3}
      console.log(set.values()) // SetIterator {1, 2, 3}
      console.log(set.entries()) // SetIterator {1 => 1, 2 => 2, 3 => 3}

      for (let item of set.keys()) {
        console.log(item);
      } // 1 2  3
      for (let item of set.entries()) {
        console.log(item);
      } // [1, 1] [2, 2] [3, 3]

      set.forEach((value, key) =>  {
          console.log(key + ' : ' + value)
      }) // 1 : 1 2 : 2  3 : 3
      console.log([...set]) // [1, 2, 3]
      ```

      Set 可默认遍历，默认迭代器生成函数是 values() 方法

      ```js
      Set.prototype[Symbol.iterator] === Set.prototype.values // true
      ```

:::tip 总结

* 向 `Set` 加入多个NaN时，只会存在一个`NaN`；
* 向 `Set` 添加值时不会发生类型转换`(5 !== "5")`；
* 向 `Set` 添加不同内存地址的"相同对象"时，会同时存在Set对象中；
* `keys()` 和 `values()` 的行为完全一致，`entries()` 返回的遍历器同时包括键和值且两值相等。
:::

### WeakSet

> `WeakSet` 对象允许你将弱引用对象存储在一个集合中。

```js
new WeakSet([iterable]);
```

WeakSet 与 Set 的区别：

* WeakSet 只能储存对象引用，不能存放值，而 Set 对象都可以
* 成员都是弱引用，垃圾回收机制不考虑WeakSet结构对此成员的引用
* 其他对象不再引用成员时，垃圾回收机制会自动回收此成员所占用的内存，不考虑此成员是否还存在于WeakSet结构中

属性：

* constructor：构造函数，任何一个具有 Iterable 接口的对象，都可以作参数

  ```js
  const arr = [[1, 2], [3, 4]]

  const weakSet = new WeakSet(arr)
  console.log(weakSet)
  ```

  ![alt](/blog/weakSet.jpg)

方法：

* add(value)：在 WeakSet 对象的最后一个元素后添加新的对象。
* has(value)：根据 WeakSet 是否存在相应对象返回布尔值。
* delete(value)：从 WeakSet 对象中移除指定的元素。
* ~~clear()：清空所有元素，注意该方法已废弃。~~

  ```js
  const ws = new WeakSet()

  const obj = {}
  const foo = {}

  ws.add(window)
  ws.add(obj)

  ws.has(window) // true
  ws.has(foo) // false

  ws.delete(window) // true
  ws.has(window) // false
  ```

### Map（字典）
