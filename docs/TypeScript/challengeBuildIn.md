# TypeScript内置工具类型

## Partial
> `Partial<T>`表示将某个类型里的属性全部变为可选项。

用法：
```ts
type Person = {
  name: string;
  age?: number;
}
// { name?: string | undefined; age?: number | undefined }
type PartialResult = Partial<Person>
```

代码实现：
```ts
type MyPartial<T> = {
  [P in keyof T]?: T[P]
}
// { name?: string | undefined; age?: number | undefined }
type PartialResult = MyPartial<Person>
```

## Required
> `Required<T>`表示将某个类型里的属性全部变为必填项。

用法：
```ts
type Person = {
  name: string;
  age?: number;
}
// { name: string; age: number }
type PartialResult = Required<Person>
```

代码实现：
```ts
type MyPartial<T> = {
  [P in keyof T]-?: T[P]
}
// { name: string; age: number }
type PartialResult = MyRequired<Person>
```

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
> `Extract<T, U>`表示用来取联合类型 `T` 和 `U` 的交集。

用法：
```ts
type Person = {
  name: string;
  age: number;
  address: string;
}
// 结果：'age'|'address'
type ExtractResult = Extract<keyof Person, 'age'|'address'|'sex'>
```

代码实现：
```ts
type MyExtract<T, U> = T extends U ? T : never
```

代码详解：
* `T extends U`：此代码会自动将`T`的子类型进行分发，例如：
```ts
T extends U
=> 'name'|'age'|'address' extends 'age'|'address'|'sex' ? T : never
=> (
  'name' extends 'age'|'address'|'sex' ? 'name' : never |
  'age' extends 'age'|'address'|'sex' ? 'age' : never |
  'address' extends 'age'|'address'|'address' ? 'age' : never
)
=> 'age'|'address'
```

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

## Parameters
> `Parameters<T>`用来获取一个函数的参数类型，获取的结果是一个元组

用法：
```ts
const add = (a: number, b: string): void => {}
// [a:number, b:string]
type result = Parameters<typeof add>
```

代码实现：
```ts
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer R) => any ? R : never
// [a:number, b:string]
type result = MyParameters<typeof add>
```