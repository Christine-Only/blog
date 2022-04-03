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
