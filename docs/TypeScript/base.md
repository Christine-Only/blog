# 基础数据类型

## JS的八种内置类型
```ts
let str: string = "Hello, world"
let num: number = 520
let bool: boolean = true
let big: bigint = 100n;
let u: undefined = undefined
let n: null = null
let obj: object = {age: 18}
let sym: symbol = Symbol("you")
```
:::warning 注意
bigint支持的JavaScript版本不能低于ES2020
:::

### number和bigint
```ts
let big: bigint = 100n;
let num: number = 6;
big = num //Type 'number' is not assignable to type 'bigint'.(2322)
num = big //Type 'bigint' is not assignable to type 'number'.(2322)
```

### null和undefined
:::warning 前置条件
在tsconfig.json指定`"strictNullChecks": false`
:::

`strictNullChecks`为`false`的情况下，`null`和`undefined`是所有类型的子类型。也就是说你也可以把`null`和`undefined`赋值给任意类型。
```ts
// null和undefined赋值给string
let str: string = 'hi'
str = null
str = undefined

// null和undefined赋值给number
let num:number = 520;
num = null
num= undefined

// null和undefined赋值给object
let obj:object ={};
obj = null
obj= undefined

// null和undefined赋值给Symbol
let sym: symbol = Symbol("me"); 
sym = null
sym= undefined

// null和undefined赋值给boolean
let isDone: boolean = false;
isDone = null
isDone= undefined

// null和undefined赋值给bigint
let big: bigint =  100n;
big = null
big= undefined
```
:::tip
如果你在tsconfig.json指定`"strictNullChecks": true`，`null`只能赋值给`any`和`null`，`undefined`能赋值给`any`、`void`和`undefined`。
:::

栗子🌰
```ts
let val1: void;
let val2: null = null;
let val3: undefined = undefined;
let val4: void;
let val5: any = null
let val6: any = undefined

val1 = val2; //Type 'null' is not assignable to type 'void'.(2322)
val1 = val3;
val1 = val4;
```

### void
`void`表示没有任何类型，和其他类型是平等关系，不能直接赋值：

```ts
let a: void; 
let b: number = a; //Type 'void' is not assignable to type 'number'.(2322)
```

在tsconfig.json指定`"strictNullChecks": false`，只能将`null`和`undefined`赋值给`void`类型的变量。
```ts
let val1: void;
let val2: null = null;
let val3: undefined = undefined;

val1 = val2;
val1 = val3;
```

::: tip 注意
方法没有返回值将得到`undefined`， 但是我们需要定义成void类型，而不是undefined类型。
:::
```ts
function add(): undefined {
    console.log('hello')
}
```

## any
在 TypeScript 中，任何类型都可以被归为 any 类型。这让 any 类型成为了类型系统的顶级类型.

如果是一个number类型，在赋值过程中改变类型是不被允许的：

```ts
let tsNumber: number = 123
tsNumber = '123'
```
但如果是 any 类型，则允许被赋值为任意类型。

```ts
let a: any = 666;
a = "Semlinker";
a = false;
a = 66
a = undefined
a = null
a = []
a = {}
```

如果我们定义了一个变量，没有指定其类型，也没有初始化，那么它默认为any类型：

```ts
// 以下代码是正确的，编译成功
let value
value = 520
value = '520'
```

## never
`never`类型表示的是那些永不存在的值的类型。

值会永不存在的两种情况：
* 如果一个函数执行时抛出了异常，那么这个函数永远不存在返回值（因为抛出异常会直接中断程序运行，这使得程序运行不到返回值那一步，即具有不可达的终点，也就永不存在返回了）；
* 函数中执行无限循环的代码（死循环），使得程序永远无法运行到函数返回值那一步，永不存在返回。
  
```ts
function err(msg: string): never { // OK
  throw new Error(msg); 
  let run = '永远执行不到'
}

// 死循环
function loopForever(): never { // OK
  while (true) {
  };
  let run = '永远执行不到'
} 
```
`never`类型不是任何类型的子类型，也不能赋值给任何类型。

在 TypeScript 中，可以利用 never 类型的特性来实现全面性检查，具体示例如下：
```ts
type Foo = string | number;

function controlFlowAnalysisWithNever(foo: Foo) {
  if (typeof foo === "string") {
    // 这里 foo 被收窄为 string 类型
  } else if (typeof foo === "number") {
    // 这里 foo 被收窄为 number 类型
  } else {
    // foo 在这里是 never
    const check: never = foo;
  }
}
```
注意在 else 分支里面，我们把收窄为 `never` 的 foo 赋值给一个显示声明的 `never` 变量。如果一切逻辑正确，那么这里应该能够编译通过。但是假如后来有一天修改了 Foo 的类型：
```ts
type Foo = string | number | boolean;
```
然而忘记同时修改 `controlFlowAnalysisWithNever` 方法中的控制流程，这时候 else 分支的 foo 类型会被收窄为 `boolean` 类型，导致无法赋值给 `never` 类型，这时就会产生一个编译错误。通过这个方式，我们可以得出一个结论：使用 `never` 避免出现新增了联合类型没有对应的实现，目的就是写出类型绝对安全的代码。

## unknown
就像所有类型都可以被归为 `any`，所有类型也都可以被归为 `unknown`。这使得 `unknown` 成为 TypeScript 类型系统的另一种顶级类型（另一种是 `any`）。

`unknown`与`any`的最大区别是： 任何类型的值可以赋值给`any`，同时`any`类型的值也可以赋值给任何类型。任何类型的值都可以赋值给`unknown` ，但`unknown` 只能赋值给`unknown`和`any`
```ts
let notSure: unknown = 4
let unk: unknown = true
let sure: any = 'hh'
sure = notSure
notSure = sure
notSure = unk
notSure = 'heel'
notSure = Symbol()
notSure = {}
notSure = []
let num: void
num = notSure //Type 'unknown' is not assignable to type 'void'.(2322)
```
如果不缩小类型，就无法对`unknown`类型执行任何操作：
```ts
function getDog() {
 return '123'
}
 
const dog: unknown = {hello: getDog};
dog.hello(); // Object is of type 'unknown'.(2571)
```

这是 `unknown` 类型的主要价值主张：TypeScript 不允许我们对类型为 unknown 的值执行任意操作。相反，我们必须首先执行某种类型检查以缩小我们正在使用的值的类型范围。

这种机制起到了很强的预防性，更安全，这就要求我们必须缩小类型，我们可以使用`typeof`、` instanceof `、`类型断言`等方式来缩小未知范围：

```ts
function getDogName() {
 let x: unknown;
 return x;
};
const dogName = getDogName();
// 直接使用
const upName = dogName.toLowerCase(); // Error
// typeof
if (typeof dogName === 'string') {
  const upName = dogName.toLowerCase(); // OK
}
// 类型断言 
const upName = (dogName as string).toLowerCase(); // OK
```



