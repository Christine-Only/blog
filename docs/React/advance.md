# React 进阶

## JSX到底是什么

JSX代码在执行前，会被Babel转换为React.createElement方法的调用，该方法在调用后会返回Virtual DOM对象，然后React再将Virtual DOM对象转换为真实的DOM对象，再将真实DOM渲染在页面上。

## Virtual DOM 如何提升效率

精准找出发生变化的 DOM 对象，只更新发生变化的部分。

在 React 第一次创建 DOM 对象后，会为每个 DOM 对象创建其对应的 Virtual DOM 对象，在 DOM 对象发生更新之前，React 会先更新所有的 Virtual DOM 对象，然后 React 会将更新后的 Virtual DOM 和 更新前的 Virtual DOM 进行比较，从而找出发生变化的部分，React 会将发生变化的部分更新到真实的 DOM 对象中，React 仅更新必要更新的部分。

## 虚拟DOM实现原理

![alt](/blog/vdom.png)

按照图中的流程，我们依次来分析`虚拟DOM`的实现原理。

### JSX和createElement

我们在实现一个`React`组件时可以选择两种编码方式

* 第一种是使用`JSX`编写：

```jsx
class Hello extends Component {
  render() {
    return <div>Hello Christine</div>;
  }
}
```

* 第二种是直接使用`React.createElement`编写：

```js
class Hello extends Component {
  render() {
    return React.createElement('div', null, `Hello Christine`);
  }
}
```

实际上，上面两种写法是等价的，`JSX`只是为 `React.createElement(component, props, ...children)`方法提供的语法糖。也就是说所有的`JSX`代码最后都会转换成`React.createElement(...)`，`Babel`帮助我们完成了这个转换的过程。

如下面的`JSX`

```jsx
<div>
  <img src="avatar.png" className="profile" />
  <Hello />
</div>
```

将会被`Babel`转换为

```js
React.createElement("div", null, React.createElement("img", {
  src: "avatar.png",
  className: "profile"
}), React.createElement(Hello, null));
```

:::tip
`babel`在编译时会判断`JSX`中组件的首字母，当首字母为小写时，其被认定为原生`DOM`标签，`createElement`的第一个变量被编译为字符串；当首字母为大写时，其被认定为自定义组件，`createElement`的第一个变量被编译为对象；
:::

另外，由于`JSX`提前要被`Babel`编译，所以`JSX`是不能在运行时动态选择类型的，比如下面的代码：

```jsx
function Story(props) {
  // Wrong! JSX type can't be an expression.
  return <components[props.storyType] story={props.story} />;
}
```

需要变成下面的写法：

```jsx
function Story(props) {
  // Correct! JSX type can be a capitalized variable.
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```

所以，使用`JSX`你需要安装`Babel`插件`babel-plugin-transform-react-jsx`

```js
{
  "plugins": [
    ["transform-react-jsx", {
      "pragma": "React.createElement"
    }]
  ]
}
```

### 创建虚拟DOM

下面我们来看看虚拟`DOM`的真实模样，将下面的`JSX`代码在控制台打印出来：

```jsx
<div className="title">
  <span>Hello Christine</span>
  <ul>
    <li>苹果</li>
    <li>橘子</li>
  </ul>
</div>
```

![alt](/blog/vdom2.jpg)

## Fiber 节点的构建

下面的伪代码展示了 `fiber` 构建的过程：

```js
function workLoop(deadline) {
  // requestIdleCallback 给 shouldYield 赋值，告诉我们浏览器是否空闲
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  // 循环调用 workLoop
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

// 构建完当前 fiber 节点后，会返回下一个待构建的节点 如：fiber.sibling、fiber.parent...
function performUnitOfWork(nextUnitOfWork) {
  // TODO
}
```

* `deadline.timeRemaining()`的值为浮点数，用来表示当前闲置周期的预估剩余毫秒数。如果闲置期已经结束，则其值为 0。
* `requestIdleCallback`方法很简单：它需要传入一个 `callback`，浏览器会在空闲时去调用这个 `callback`，然后给这个 `callback` 传入一个 `IdleDeadline`，`IdleDeadline` 会预估一个剩余闲置时间，我们可以通过还剩多少闲置时间去判断，是否足够去执行下一个单元任务。
* `performUnitOfWork` 方法将传入的节点创建为 `Fiber` ，然后返回下一个待构建的节点并赋值给 `nextUnitOfWork`，同时还会将刚创建的 `Fiber` 与已创建的 `Fiber` 连接起来构成 Fiber 树。

### render 阶段

`render` 阶段的开始，首先从 `rootFiber` 开始向下**深度优先遍历**，也就是不断 `while` 循环执行 `performUnitOfWork`，会经历`递`和`归`两个阶段。

**“递”阶段**

* 向下遍历，每个遍历到的 `Fiber` 节点会调用 `beginWork` 方法。
* 该方法会根据传入的 `Fiber` 节点创建 `子Fiber` 节点，并将这两个 `Fiber` 节点连接起来。
* 当遍历到没有 `child` 的节点时就会进入“归”阶段。

**“归”阶段**

在“归”阶段会调用 `completeWork` 处理 `Fiber` 节点。
当某个 `Fiber` 节点执行完 `completeWork`，如果其存在兄弟`Fiber`节点，会进入其**兄弟Fiber**的“递”阶段。
如果不存在**兄弟Fiber**，会进入**父Fiber**的“归”阶段。

### render 完成

“递”和“归”阶段会交错执行直到“归”到 `rootFiber`。至此，`render` 阶段的工作就结束了。

## React Diff

`diff 算法`发生在两个阶段，分别是 `beginWork` 和 `completeWork` 阶段。

### Diff 的瓶颈以及 React 如何应对

由于 `Diff` 操作本身也会带来性能损耗，React 文档中提到，即使在最前沿的算法中，将前后两棵树完全比对的算法的复杂程度为 O(n 3 )，其中 n 是树中元素的数量。
如果在 React 中使用了该算法，那么展示 1000 个元素所需要执行的计算量将在十亿的量级范围。这个开销实在是太过高昂。
为了降低算法复杂度，React 的 diff 会预设三个限制：

1. 只进行`同层比较`。
2. 新、旧节点的 `type` 不同，直接`删除`旧节点，`创建`新节点。如：元素由 `div` 变为 `p`，React会`销毁`div`及其子孙节点`，`并新建` p `及其子孙节点`。
3. 通过 `key` 来`复用`节点。

[一文讲通React的diff过程](https://juejin.cn/post/7212918899867041849#heading-0)
