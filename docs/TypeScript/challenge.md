# TypeScript内置工具类型

## Partial

## Required

## Readonly
> `Readonly<T>` 表示将某个类型中的所有属性变为只读属性，也就意味着这些属性不能被重新赋值。

用法：
```ts
interface Todo {
  title: string
  description: string
}

const todo: Readonly<Todo> = {
  title: "Hey",
  description: "foobar"
}
```

代码实现：
```ts
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar"
}

todo.title = '改名' // Cannot assign to 'title' because it is a read-only property.(2540)
todo.description = '改不了嘿嘿' // Cannot assign to 'description' because it is a read-only property.(2540)
```

## Pick
> `Pick<T, K extends keyof T>` 表示从某个类型中选取一些属性出来。

用法：
```ts
interface Todo {
    title: string
    description: string
    completed: boolean
}

type TodoPreview = Pick<Todo, 'title' | 'completed'> // { title: string, completed: boolean }
```
代码实现：
```ts
type MyPick<T, K extends keyof T> = {
    [P in K]: T[P]
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>
```

代码详解：
* `K extends keyof T`：表示 `K` 只能是 `keyof T` 的子类型，如果我们在使用 `Pick` 时，传递了一个不存在 `T` 类型的字段，会报错：
```ts
// Type '"title" | "phone"' does not satisfy the constraint 'keyof Todo'.
// Type '"phone"' is not assignable to type 'keyof Todo'.(2344)
type AAA = Pick<Todo, 'title' | 'phone'>
```
## Record

## ReturnType

## Exclude
> `Exclude<T, U>`表示从联合类型T中排除U的类型成员，可以理解为取T和U的差集。

用法：
```ts
type union = 'you' | 'and' | 'me'
// 'you' | 'and'
type result = Exclude<union, 'me'>
```

代码实现：
```ts
type MyExclude<T, U> = T extends U ? never : T
// 'you' | 'and'
type result = MyExclude<union, 'me'>
```

代码详解：
* `T extends U`：这段代码会从T的子类型开始分发
```ts
T extends U
=> 'you' | 'and' | 'me' extends 'me'
=> (
	'you' extends 'me' ? never : 'you' | 
	'and' extends 'me' ? never : 'and' | 
	'me' extends 'me' ? never : 'me'
)
=> 'you' | 'and'
```
## Extract

## Omit

## NonNullable

## TupleToObject
> `TupleToObject<T>`表示将一个元组类型转换为对象类型，这个对象类型的键/值都是从元组中遍历而出。

用法：
```ts
const AA = ['hello', 'world'] as const

// {hello: 'hello', world: 'world'}
type result = TupleToObject<typeof AA> 
```

代码实现：
```ts
type MyTupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P
}

// {hello: 'hello', world: 'world'}
type result = MyTupleToObject<typeof AA> 
```

代码详解：
* `as const`：数组使用了`as const`断言，变成了**只读元组**，对象使用`as const`断言，对象的属性变成了**只读属性**。
* `T[number]`：表示返回所有数字型索引的元素，形成一个联合类型，例如：`'hello'|'world'`。


# 自定义工具类型
## First
> `First`表示用来返回数组的第一个元素。

用法：
```ts
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type one = First<arr1> // 'a'
type two = First<arr2> // 3
```

代码实现：
```ts
索引实现
type First<T extends any[]> = T extends [] ? never : T[0]
or
占位实现
type First<T extends any[]> = T extends [infer Head, ...rest] ? Head : never
```

代码详解：
* `T extends []`：用于判断 `T` 是否是空数组
* `T[0]`：用于取数组的第一项
* `infer Head`：表示数组第一个元素的占位
* `...rest`：表示数组的剩余元素

## Mutable
> `Mutable<T>`表示将某个类型中的所有属性的readonly移除。

用法：
```ts
type UserInfo = {
  readonly name: string,
  readonly age: number
}
// {name: string, age: number}
type D = Mutable<UserInfo>
```

代码实现：
```ts
type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}
```

代码详解：
* `-readonly`：表示把`readonly`关键字去掉

## Length
> `Length<T>`表示用来获取一个数组或者类数组的长度。

用法：
```ts
type tesla = { 3: '3', length: 4 }
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type length1 = Length<tesla> // 4
type length2 = Length<spaceX> // 5
```

代码实现：
```ts
type Length<T> = T extends {length: number} ?  T['length']: never
```

代码详解：
* `T extends { length: number; }`：判断`T`是否是`{length: number}`的子类型
* `T['length']`：在TypeScript中不能使用 `.` 语法来取值，必须使用 `[]` 语法

## If
> `If<T, C, F>`表示它接收一个条件类型 `T` ，一个判断为真时的返回类型 `C` ，以及一个判断为假时的返回类型 `F`。 `T` 只能是 `true` 或者 `false`， `C` 和 `F` 可以是任意类型。

用法：
```ts
type a = If<true, 'a', 'b'> // 'a'
type b = If<false, 'a', 'b'> // 'b'
```

代码实现：
```ts
type If<T extends boolean, C, F> = T extends true ? C : F
```

代码详解：
* `T extends boolean`：表示 `T` 类型为 `boolean` 类型的子类型，即 `T` 只能接收 `true` 或者 `false`
* `T extends true`：写在三元表达式中，用于判断 `T` 是否为 `true`
  
## Concat
> `Concat<T, U>`表示这个类型接受两个参数，返回的新数组类型应该按照输入参数从左到右的顺序合并为一个新的数组。

用法：
```ts
// [1,2]
type Result = Concat<[1], [2]>
```

代码实现： 
```ts
type Concat<T extends any[], U extends any[]> = [...T, ...U]
```

代码详解：
* `T extends any[]`：用来限制T是一个数组，如果传递非数组会报错，U也是一样的道理。
* `[...T, ...U]`：可以理解成JavaScript的扩展运算符 `...` 。

## Includes
> `Includes<T， U>`表示这个类型接受两个参数，用于判断 `U` 是否在数组 `T` 中，类似实现数组的 `includes` 方法。

用法：
```ts
type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // false
```

代码实现：
```ts
type Includes<T extends readonly any[], U> = U extends T[number] ? true : false
```

## Push
> `Push<T, U>`表示将U类型添加到T类型，并作为T类型的最后一项。

用例：
```ts
// [1,2,'3']
type Result = Push<[1, 2], '3'>
```

代码实现：
```ts
// [1,2,'3']
type Push<T extends readonly any[], U> = [...T, U]
```

## Unshift
> `Unshift<T, U>`表示将U类型添加到T类型，并作为T类型的第一项。

用例：
```ts
// ['3', 1, 2]
type Result = Unshift<[1, 2], '3'>
```

代码实现：
```ts
// ['3', 1, 2]
type Unshift<T extends readonly any[], U> = [U, ...T]
```

## Parameters

## PromiseType