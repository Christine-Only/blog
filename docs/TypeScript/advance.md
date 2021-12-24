# 进阶

## 类型拓宽（Type Widening）
>所有通过 let 或 var 定义的变量、函数的形参、对象的非只读属性，如果满足指定了初始值且未显式添加类型注解的条件，那么它们推断出来的类型就是指定的初始值字面量类型拓宽后的类型，这就是字面量类型拓宽。

```ts
let str = 'this is string'; // 类型是 string
let strFun = (str = 'this is string') => str; // 类型是 (str?: string) => string;
const specifiedStr = 'hello world' // 'hello world'
let newStr = specifiedStr // string
```
第 1~2 行满足了 let、形参且未显式声明类型注解的条件，所以变量、形参的类型拓宽为 string（形参类型确切地讲是 string | undefined）。

第 3 行的常量不可变更，类型没有拓宽，所以 specifiedStr 的类型是 'hello world' 字面量类型。

第 4 行赋予的值 specifiedStr 的类型是字面量类型，且没有显式类型注解，所以变量、形参的类型也被拓宽了。

基于字面量类型拓宽的条件，我们可以通过如下所示代码添加显示类型注解控制类型拓宽行为。

```ts
const str = 'hello world' as const
或者
const str: 'hello world' = 'hello world'

// Type is "hello world"
let newStr = str
```
实际上，除了字面量类型拓宽之外，TypeScript 对某些特定类型值也有类似 "Type Widening" （类型拓宽）的设计，下面我们具体来了解一下。

比如对 null 和 undefined 的类型进行拓宽，通过 let、var 定义的变量如果满足未显式声明类型注解且被赋予了 null 或 undefined 值，则推断出这些变量的类型是 any：

```ts
let x = null; // 类型拓宽成 any
let y = undefined; // 类型拓宽成 any

const z = null; // 类型是 null

let anyFun = (param = null) => param; // 形参类型是 null
let z2 = z; // 类型是 null
let x2 = x; // 类型是 null
let y2 = y; // 类型是 undefined
```

```ts
interface Vectors {
  x: number;
  y: number;
  z: number
}

function getComponent(vectors: Vectors, axis: "x" | "y" | "z") {
  return vectors[axis]
}

let x = "x"
let vec = {x: 10, y: 20, z: 30}
getComponent(vec, x) //Argument of type 'string' is not assignable to parameter of type '"x" | "y" | "z"'.(2345)
```
为什么会出现上述错误呢？通过 TypeScript 的错误提示消息，我们知道是因为变量 x 的类型被推断为 string 类型，而 getComponent 函数期望它的第二个参数有一个更具体的类型。这在实际场合中被拓宽了，所以导致了一个错误。

TypeScript 提供了一些控制拓宽过程的方法。其中一种方法是使用 const。如果用 const 而不是 let 声明一个变量，那么它的类型会更窄。事实上，使用 const 可以帮助我们修复前面例子中的错误：
```ts
const x = "x"
let vec = {x: 10, y: 20, z: 30}
getComponent(vec, x)
```
因为 x 不能重新赋值，所以 TypeScript 可以推断更窄的类型，就不会在后续赋值中出现错误。因为字符串字面量型 “x” 可以赋值给  "x"|"y"|"z"，所以代码会通过类型检查器的检查。

```ts
const obj = { x: 1}
obj.x = 6 //ok

//Type 'string' is not assignable to type 'number'.(2322)
obj.x = 'hi' 

// Property 'name' does not exist on type '{ x: number; }'.(2339)
obj.name = "christine"
```

```ts
// Type is { name: string; age: number }
const obj = {name: 'christine', age: 18}

// Type is { name: 'christine'; age: number }
const obj = {name: 'christine' as const, age: 18}

// Type is { readonly name: 'christine'; readonly age: 18 }
const obj = {name: 'christine', age: 18} as const
```
当你在一个值之后使用 const 断言时，TypeScript 将为它推断出最窄的类型，没有拓宽。对于真正的常量，这通常是你想要的。当然你也可以对数组使用 const 断言：

```ts
// Type is number[]
const arr = [1, 2, 3]

// Type is readonly [1, 2, 3]
const arr1 = [1, 2, 3] as const
```

## 类型缩小 (Type Narrowing)
在 TypeScript 中，我们可以通过某些操作将变量的类型由一个较为宽泛的集合缩小到相对较小、较明确的集合，这就是 "Type Narrowing"。

比如，我们可以使用类型守卫（后面会讲到）将函数参数的类型从 any 缩小到明确的类型，具体示例如下：
```ts
let func = (anything: any) => {
  if (typeof anything === 'string') {
    return anything; // 类型是 string 
  } else if (typeof anything === 'number') {
    return anything; // 类型是 number
  }
  return null;
};
```
同样，我们可以使用类型守卫将联合类型缩小到明确的子类型，具体示例如下：

```ts
let func = (anything: string | number) => {
  if (typeof anything === 'string') {
      return anything; // 类型是 string 
  } else {
      return anything; // 类型是 number
  }
};
```
当然，我们也可以通过字面量类型等值判断（===）或其他控制流语句（包括但不限于 if、三目运算符、switch 分支）将联合类型收敛为更具体的类型，如下代码所示：

```ts
type Goods = 'pen' | 'pencil' |'ruler';
  const getPenCost = (item: 'pen') => 2;
  const getPencilCost = (item: 'pencil') => 4;
  const getRulerCost = (item: 'ruler') => 6;
  const getCost = (item: Goods) =>  {
    if (item === 'pen') {
      return getPenCost(item); // item => 'pen'
    } else if (item === 'pencil') {
      return getPencilCost(item); // item => 'pencil'
    } else {
      return getRulerCost(item); // item => 'ruler'
  }
}
```
那为什么类型由多个字面量组成的变量 item 可以传值给仅接收单一特定字面量类型的函数 `getPenCost`、`getPencilCost`、`getRulerCost `呢？这是因为在每个流程分支中，编译器知道流程分支中的 item 类型是什么。比如 item === 'pencil' 的分支，item 的类型就被收缩为“pencil”。

一般来说 `TypeScript` 非常擅长通过条件来判别类型，但在处理一些特殊值时要特别注意 —— 它可能包含你不想要的东西！例如，以下从联合类型中排除 null 的方法是错误的：

```ts
const el = document.getElementById("foo"); // Type is HTMLElement | null
if (typeof el === "object") {
  el; // Type is HTMLElement | null
}
```

因为在 JavaScript 中 typeof null 的结果是 "object" ，所以你实际上并没有通过这种检查排除 null 值。除此之外，falsy 的原始值也会产生类似的问题：
```ts
function foo(x?: number | string | null) {
  if (!x) {
    x; // Type is string | number | null | undefined\
  }
}
```
因为空字符串和 0 都属于 falsy 值，所以在分支中 x 的类型可能是 string 或 number 类型。帮助类型检查器缩小类型的另一种常见方法是在它们上放置一个明确的 “标签”：

```ts
interface UploadEvent {
  type: "upload";
  filename: string;
  contents: string;
}

interface DownloadEvent {
  type: "download";
  filename: string;
}

type AppEvent = UploadEvent | DownloadEvent;

function handleEvent(e: AppEvent) {
  switch (e.type) {
    case "download":
      e; // Type is DownloadEvent 
      break;
    case "upload":
      e; // Type is UploadEvent 
      break;
  }
}
```
这种模式也被称为 ”标签联合“ 或 ”可辨识联合“，它在 TypeScript 中的应用范围非常广。

## 联合类型 (Union Types)
联合类型表示取值可以为多种类型中的一种，使用 `|` 分隔每个类型。

```ts
let unionTypeValue: string | number;
unionTypeValue = 'Hello World';
unionTypeValue = 666;
```
联合类型通常与 `null` 和 `undefined` 一起使用：
```ts
const sayHello = (name: string | undefined) => {};
```
例如，这里 `name` 的类型是 `string | undefined` 意味着可以将 `string` 或 `undefined` 的值传递给 `sayHello` 函数。
```ts
sayHello('Christine');
sayHello(undefined);
```

::: warning 警告
当我们使用联合类型的时候，因为TypeScript不确定到底是哪一个类型，所以我们只能访问此联合类型的所有类型公用的属性和方法。
:::

```ts
// Property 'length' does not exist on type 'number'.(2339)
function getLength (value: string | number): number {
  return value.length
}

// ok
function valueToStr (value: string | number): string {
  return value.toString()
}
```

## 类型别名 (Type Aliases)
类型别名用 `type` 关键字来给一个类型起个新的名字，类型别名常用于联合类型。
```ts
type CombineType = number | string
type PeopleType = {
  age: number;
  name: string;
}
const value: CombineType = 666
const obj: PeopleType = {
  age: 18,
  name: 'Christine'
}
```

## 交叉类型（Intersection Types）
交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性，使用 `&` 定义交叉类型。

```ts
interface IPerson {
  id: string;
  age: number;
}

interface IWorker {
  companyId: string;
}

type IStaff = IPerson & IWorker;

const staff: IStaff = {
  id: '001',
  age: 18,
  companyId: '100'
}
```
在上面示例中，我们首先为 `IPerson` 和 `IWorker` 类型定义了不同的成员，然后通过 `&` 运算符定义了 `IStaff` 交叉类型，所以该类型同时拥有`IPerson` 和 `IWorker` 这两种类型的成员。那么现在问题来了，假设在合并多个类型的过程中，刚好出现某些类型存在相同的成员，但对应的类型又不一致，比如：

```ts
type IntersectionTypeConfict = { id: string, name: string } & { id: number, age: number }

const mixed: IntersectionTypeConfict = {
  id: 123,
  name: 'Christine',
  age: 18
}
```
上面的示例中，混入后的成员id的类型为`string & number`，即成员id的类型即是`string`类型又为`number`类型。很明显这种类型是不存在的，所以混入后成员id的类型为`never`。


如果同名属性（age）的类型兼容，比如一个是number类型，另一个是number类型的子类型（字面量类型），合并后age属性的类型就是两者中的子类型，即为数字字面量类型。
```ts
type IntersectionType = {id: string, age: 18} & {name: string, age: number}

let people: IntersectionType = {
  id: '001',
  name: 'Christine',
  age: 8 //Type '8' is not assignable to type '18'.(2322)
}

people = {
  id: '001',
  name: 'Christine',
  age: 18 //ok
}

```

如果同名属性是非基本数据类型的话，又会是什么情形。我们来看个具体的例子：
```ts
interface A {
  x:{d:true},
}
interface B {
  x:{e:string},
}
interface C {
  x:{f:number},
}
type ABC = A & B & C
let abc:ABC = {
  x:{
    d:true,
    e:'',
    f:666
  }
}

console.log(abc) 
// {
//   "x": {
//     "d": true,
//     "e": "",
//     "f": 666
//   }
// } 
```
在混入多个类型时，若存在相同的成员，且成员类型为非基本数据类型，那么是可以成功合并。

## 接口 (Interfaces)
在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。

接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。

::: tip
接口名一般首字母大写。
:::

🌰
```ts
interface Person {
  name: string;
  age: number
}

let personal: Person = {
  name: 'Christine',
  age: 18
}
```
在上面的栗子中，变量personal的类型是Person。那么变量的属性及属性值的类型必须和接口Person一致，变量比接口少一些属性或者多一些属性在TypeScript中都是不被允许的。
```ts
interface Person {
  name: string;
  age: number;
}

// Property 'age' is missing in type '{ name: string; }' but required in type 'Person'.(2741)
let personal: Person = {
  name: 'Christine'
};

// Type '{ name: string; age: number; favorite: string; }' is not assignable to type 'Person'.
// Object literal may only specify known properties, and 'favorite' does not exist in type 'Person'.(2322)
let personal: Person = {
  name: 'Christine',
  age: 18,
  favorite: 'apple'
}
```

### 可选 | 只读属性
```ts
interface Person {
  readonly name: string,
  age?: number
}
```
只读属性用于限制只能在对象初始化的时候赋值，不能在之后修改对象只读属性的值。

TypeScript还提供了`ReadonlyArray<T>`类型，它与`Array<T>`相似，只是去掉了所有可以改变数组的方法，因此可以确保数组创建后再也不能被修改。

```ts
let arr: ReadonlyArray<number> = [1,2,3]
arr.length = 4 //error
arr.push(4) //error
arr[0] = 5 //error
```

### 任意类型
有时候我们希望一个接口中除了包含必选和可选属性之外，还允许有其他的任意属性，这时我们可以使用 `索引签名` 的形式来满足上述要求。

```ts
interface Person {
  name: string;
  age?: number;
  [propName: string]: any;
}

let christine: Person = {
  name: 'Christine',
  age: 18,
  sex: '女'
}
```

::: tip
一旦定义了任意属性，那么必选属性和可选属性的类型都必须是它的类型的子集。
:::

```ts

// Property 'age' of type 'number | undefined' is not assignable to 'string' index type 'string'.(2411)
interface Person {
  name: string;
  age?: number;
  [propName: string]: string
}

let christine: Person = {
  name: 'Christine',
  age: 18,
  sex: '女'
}
```

上例中，任意属性的值是`string`类型，但是可选属性`age`的值是`number`类型，`number`类型不是`string`类型的子类型，所以会报错。

一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：

```ts
interface Person {
  name: string;
  age?: number; // 类型是number | undefined
  [propName: string]: string | number | undefined
}

let christine: Person = {
  name: 'Christine',
  age: 18,
  sex: '女'
}
```
### 绕开额外属性检查的方式
#### 鸭式辨型法
所谓的鸭式辨型法就是`像鸭子一样走路并且嘎嘎叫的就叫鸭子`，即具有鸭子特征的认为它就是鸭子，也就是通过制定规则来判定对象是否实现这个接口。

```ts
interface Person {
  name: string;
}

function setPersonInfo(person: Person) {
  console.log(person.age)
}

let christine = { name: 'Christine', sex: '女' }

setPersonInfo(christine) //ok

// Argument of type '{ name: string; sex: string; }' is not assignable to parameter of type 'Person'.
  Object literal may only specify known properties, and 'sex' does not exist in type 'Person'.(2345)
setPersonInfo({ name: 'Christine', sex: '女' })
```

由上例说明：在参数里写对象就相当于是直接给`person`赋值，这个对象有严格的类型定义，所以不能多参或少参。而当你在外面将该对象用另一个变量`christine`接收，`christine`不会经过额外属性检查，但会根据类型推论为`let christine: { name: number; sex: string } = { name: 'Christine', sex: '女' }`，然后将这个`christine`再赋值给`person`，此时根据类型的兼容性，两种类型对象，参照鸭式辨型法，因为都具有`name`属性，所以被认定为两个相同，故而可以用此法来绕开多余的类型检查。

#### 类型断言
类型断言的意义就等同于你在告诉程序，你很清楚自己在做什么，此时程序自然就不会再进行额外的属性检查了。

```ts
interface Person {
  name: string;
  age: number; 
  sex?: string;
}

let christine: Person = {
  name: 'Christine',
  age: 18,
  sex: '女',
  eat: 'food'
} as Person
```

#### 索引签名
```ts
interface Person {
  name: string;
  age: number; 
  sex?: string;
  [propName: string]: any;
}

let christine: Person = {
  name: 'Christine',
  age: 18,
  sex: '女',
  eat: 'food'
}
```

### 接口与类型别名的区别
类型别名会给一个类型起个新名字,起别名不会新建一个类型，只是创建了一个新名字来引用那个类型。类型别名有时和接口很像，但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型。

**Objects / Functions**
两者都可以用来描述对象或函数的类型，但是语法不同。

**Interface**
```ts
interface Point {
  x: number;
  y: number;
}

interface SetPoint {
  (x: number, y: number): void;
}
```

**Type alias**
```ts
type Point = {
  x: number;
  y: number;
};

type SetPoint = (x: number, y: number) => void;
```
**Other Types**
与接口不同，类型别名还可以用于其他类型，如基本类型（原始值）、联合类型、元组。
```ts
// primitive
type Name = string;

// object
type PartialPointX = { x: number; };
type PartialPointY = { y: number; };

// union
type PartialPoint = PartialPointX | PartialPointY;

// tuple
type Data = [number, string];

// dom
let div = document.createElement('div');
type B = typeof div;
```

**接口可以定义多次,类型别名不可以**
与类型别名不同，接口可以定义多次，会被自动合并为单个接口。
```ts
interface Point { x: number; }
interface Point { y: number; }
const point: Point = { x: 1, y: 2 };
```
**扩展**
两者的扩展方式不同，但并不互斥。接口可以扩展类型别名，同理，类型别名也可以扩展接口。

接口的扩展就是继承，通过 `extends` 来实现。类型别名的扩展就是交叉类型，通过 `&` 来实现。

* 接口扩展接口
```ts
interface Person {
  name: string;
  age: number; 
  sex?: string;
}

interface PersonA extends Person {
  money: number
}

let christine: PersonA = {
  name: 'Christine',
  age: 18,
  sex: '女',
  money: 1800
}
```
* 类型别名扩展类型别名
```ts
type Person = {
  name: string;
  age: number; 
  sex?: string;
}

type PersonA = Person & {
  money: number
}

let christine: PersonA = {
  name: 'Christine',
  age: 18,
  sex: '女',
  money: 1800
}
```
* 接口扩展类型别名
```ts
type Person = {
  name: string;
  age: number; 
  sex?: string;
}

interface PersonA extends Person{
  money: number
}

let christine: PersonA = {
  name: 'Christine',
  age: 18,
  sex: '女',
  money: 1800
}
```
* 类型别名扩展接口
```ts
interface Person {
  name: string;
  age: number; 
  sex?: string;
}

type PersonA = Person & {
  money: number
}

let christine: PersonA = {
  name: 'Christine',
  age: 18,
  sex: '女',
  money: 1800
}
```

## 泛型 (Generics)

