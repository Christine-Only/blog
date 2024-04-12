# React 常见问题

## useState

```tsx
interface IObject {
  num: number;
}

第一种写法
const [count, setCount] = useState<IObject | null>(null);

第二种写法
const [count, setCount] = useState<IObject>({} as IObject);

第三种写法
const [count, setCount] = useState<IObject>({num: 0});
```

:::tip
如果没有初始值,那么可以使用联合属性将初始值设置为null，例如`<number | null>`，但是在这里需要注意，后续使用state的时候需要进行空值判断,通常使用可选链来进行访问 a?.b -> a && a.b
:::

## useRef

```ts
const inputEl = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    if (inputEl.current) {
      inputEl.current.focus()  // Works!
    }
    // ref?.current?.focus()
    // inputEl.current!.focus() 或者用这种写法也可以解决编译报错的问题
  };
```

## 设置source-map后在chrome中仍无法显示webpack://的问题

需要勾选下图圈起来的选项

![alt](/sourceMap.jpg)

## 控制台警告

```
Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
```

项目中的写法类似下面这样

```jsx
useEffect(() => {
  type < 3 && getMembershipPrice();

  return () => {
    setMembershipPrice([]);
  };
}, [type]);
```

### 原因分析

报错告诉我们无法对已卸载的组件执行状态更新，它表示应用程序中存在内存泄漏。
因为在请求还没返回之前，用户进行了页面跳转，跳转之后当前组件被卸载。而在卸载之后，请求返回，执行await之后的代码，对组件执行状态更新，可是此时组件已经被卸载，所以才会导致报错。
