# 常见面试题

## 使用 TypeScript 编写的代替 Object.keys 的方法

```ts
function getObjectKeys<T extends Object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

const exampleObject = { a: 1, b: "hello", c: true };


const keys = getObjectKeys(exampleObject);
// keys 的类型为 ("a" | "b" | "c")[]
console.log(keys); // [ 'a', 'b', 'c' ]
```
