# TypeScript自定义工具类型
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

// 使用简单版：预期是false，实际是true
type result = Includes<[{}], { a: 'A' }>
```

代码实现：
```ts
简单版
type Includes<T extends readonly any[], U> = U extends T[number] ? true : false

完整版
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

type Includes<T extends readonly any[], U> = 
T extends [infer First , ...infer Rest] 
  ? 
    Equal<First,U> extends true 
    ? 
      true 
    : Includes<Rest,U> 
  : false;
// false
type result = Includes<[{}], { a: 'A' }>
```

代码详解：
```ts
Equal<string, number>

先分析T extends string ? 1 : 2，假定T为string, string extends string 为true， 结果() => 1
<T>() => T extends string ? 1 : 2

再分析string extends number ? 1 : 2，string extends number 为false，     结果() => 2
<T>() => string extends number ? 1 : 2

() => 1 extends () => 2 // false
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

## PromiseType
> `PromiseType<T>`用来获取`Promise`包裹类型。

用法：
```ts
function getInfo (): Promise<string|number> {
  return Promise.resolve(1)
}
// 结果：(） => Promise<string|number>
type funcType = typeof getInfo
// 结果：Promise<string|number>
type returnResult = ReturnType<funcType>
// 结果：string|number
type PromiseResult = PromiseType<returnResult>
```

代码实现：
```ts
type PromiseType<T> = T extends Promise<infer R> ? R : never
```

代码详解：
* `T extends Promise<infer R>`：判断 `T` 是否是 `Promise<infer R>` 的子类型，也就是说T必须满足 `Promise<any>` 的形式。