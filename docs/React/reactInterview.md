# React 面试题

## useEffect 对应在 class 中都生命周期怎么写？

在 React 类组件中，`useEffect` 的功能可以通过不同的生命周期方法来实现。下面是一些常见的 `useEffect` 使用场景以及它们在类组件中的对应生命周期方法：

1. `useEffect(() => {}, [])`（仅在组件挂载时执行一次）：

```javascript
// useEffect 的对应生命周期方法：componentDidMount
componentDidMount() {
  // 副作用逻辑...
}
```

2. `useEffect(() => {})`（在每次组件渲染后执行）：

```javascript
// useEffect 的对应生命周期方法：componentDidUpdate
componentDidUpdate(prevProps, prevState) {
  // 副作用逻辑...
}
```

3. `useEffect(() => { return () => {} })`（在组件卸载时执行）：

```javascript
// useEffect 的对应生命周期方法：componentWillUnmount
componentWillUnmount() {
  // 清理副作用...
}
```

需要注意的是，`useEffect` 的回调函数可能会有多个副作用，而类组件的生命周期方法一般只对应一个特定的生命周期。如果需要在不同的生命周期阶段执行不同的副作用逻辑，可以将相关逻辑分散到不同的生命周期方法中。
此外，还有其他一些生命周期方法可以用于处理特定的副作用：

- `componentDidCatch(error, info)`：用于处理组件内部发生的错误。
- `getDerivedStateFromProps(nextProps, prevState)`：用于根据新的属性计算并更新组件的状态。
- `shouldComponentUpdate(nextProps, nextState)`：用于控制组件是否需要重新渲染。

请注意，以上是一些常见的对应关系，但并不是所有情况都有直接的一对一映射。在使用类组件时，根据具体的需求和组件的生命周期，选择合适的生命周期方法来处理副作用逻辑。

## React 类组件新的生命周期都有哪些？

在 React 类组件中，除了传统的生命周期方法（如 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount`）之外，React 还引入了一些新的生命周期方法。这些新的生命周期方法是在 React 16.3 版本中引入的，并提供了更细粒度的控制和更清晰的生命周期阶段。
以下是 React 类组件中的新生命周期方法：

1. `static getDerivedStateFromProps(props, state)`：

- 该方法在组件实例化、接收新的属性或调用 `setState` 之前被调用。
- 它用于根据新的属性计算并返回新的状态值。
- 该方法应该是一个静态方法，并返回一个对象来更新状态，或者返回 `null` 表示不需要更新状态。

2. `getSnapshotBeforeUpdate(prevProps, prevState)`：

- 该方法在最近一次渲染输出（提交到 DOM 之前）之前被调用。
- 它可以返回一个值，作为后续 `componentDidUpdate` 方法的第三个参数。
- 通常用于在更新之前捕获某些 DOM 信息（例如滚动位置），然后在更新后恢复这些信息。

3. `componentDidCatch(error, info)`：

- 该方法在组件内部的子组件抛出错误时被调用。
- 它可以用于捕获并处理组件内部发生的错误。
- 在错误处理期间，可以使用 `setState` 更新状态以渲染一个错误信息。

4. `componentDidUpdate(prevProps, prevState, snapshot)`：

- 该方法在组件更新（重新渲染）之后被调用。
- 它接收前一个属性和状态作为参数，并可选地接收 `getSnapshotBeforeUpdate` 返回的快照值。
- 可以在此方法中执行与更新相关的副作用操作，但需要注意避免无限循环更新。

需要注意的是，React 还推荐使用函数组件和 Hook 来编写组件，因为它们提供了更简洁和易于理解的方式来处理副作用和状态管理。但如果你仍然在使用类组件，上述的生命周期方法仍然可用于特定的场景和需求。

## 在 if 条件语句中，能使用 Hook 吗？

在条件语句中使用 Hook 是不被推荐的，因为 React 的 Hooks 规则要求 Hook 必须在**组件的顶层作用域中调用，而不能在条件语句、循环或嵌套函数中使用**。
这是因为 React 需要按照 Hooks 的调用顺序来跟踪状态和副作用的关联。如果在条件语句中使用 Hook，会导致 React 无法保证 Hooks 的调用顺序一致，从而可能引发错误或导致意外的行为。
如果你的组件需要在特定条件下使用不同的 Hook，你可以考虑使用条件渲染来渲染不同的组件，而不是在条件语句中使用 Hook。
以下是一个示例，演示了如何使用条件渲染来在不同的条件下使用不同的 Hook：

```jsx
function MyComponent() {
  if (condition) {
    return <ComponentWithHook1 />;
  } else {
    return <ComponentWithHook2 />;
  }
}

function ComponentWithHook1() {
  useEffect(() => {
    // 使用 Hook1
    // ...
  }, []);

  // 渲染逻辑...
}

function ComponentWithHook2() {
  useEffect(() => {
    // 使用 Hook2
    // ...
  }, []);

  // 渲染逻辑...
}
```

在上面的示例中，根据条件 `condition` 的不同，`MyComponent` 会渲染不同的组件，每个组件都可以独立地使用自己的 Hook。

:::tip 总结
不推荐在条件语句中使用 Hook。应该将 Hook 的调用放在组件的顶层作用域中，或者使用条件渲染来渲染不同的组件并在各自的组件中使用不同的 Hook。
:::

## 在 if 语句里面写 Hook 会报错，你可以用 Fiber 架构来解释一下吗？

当在条件语句（如 if 语句）中使用 Hook 时，由于 React Fiber 的工作机制，会导致报错或意外的行为。
React Fiber 使用一种称为协调（reconciliation）的机制来处理组件的更新和渲染。在每次渲染时，React Fiber 会构建一个更新任务的工作单元（work unit），并按照优先级进行调度和执行。
在条件语句中使用 Hook 时，React Fiber 可能会在某些情况下跳过或中断条件分支的渲染。这是因为 React Fiber 采用了异步渲染和增量更新的策略，它会根据任务的优先级和时间片来动态地分配和调度渲染工作。
当在条件语句中使用 Hook 时，React Fiber 可能会在某些情况下跳过条件分支的渲染，导致 Hook 的调用被忽略或跳过。这会导致 Hook 的调用顺序不一致，违反了 React Hooks 的规则，从而引发错误或导致意外的行为。
为了避免这种问题，React 的 Hooks 规则要求 Hook 必须在组件的顶层作用域中调用，而不能在条件语句、循环或嵌套函数中使用。这样可以确保 Hook 的调用顺序始终保持一致，React Fiber 可以正确地跟踪和处理组件的状态和副作用。
因此，建议将 Hook 的调用放在组件的顶层作用域中，或者使用条件渲染来渲染不同的组件并在各自的组件中使用不同的 Hook。这样可以避免在条件语句中使用 Hook 引发的问题，并保持 React Fiber 的工作机制的一致性。

## 说一下 React 的 **Fiber** 架构是什么？

这里说了一下 Fiber 本质上就是一个对象，是 React 16.8 引入的一种新的协调机制和渲染架构，主要有三层含义：

1. **作为架构来说**，在旧的架构中，Reconciler（协调器）采用递归的方式执行，无法中断，节点数据保存在递归的调用栈中，被称为 Stack Reconciler；在新的架构中，Reconciler（协调器）是基于 fiber 实现的，节点数据保存在 fiber 中，所以被称为 fiber Reconciler。
2. **作为静态数据结构来说**，每个Fiber节点对应一个React element，保存了该组件的类型（函数组件/类组件/原生组件...）、对应的DOM节点等信息。
3. **作为动态工作单元来说**，每个Fiber节点保存了本次更新中该组件改变的状态、要执行的工作（需要被删除/被插入页面中/被更新...）。

## 能简单的介绍一下  React Hooks 吗？

React Hooks 是 React 16.8 版本引入的一项重要特性，它可以让你在**函数组件中使用状态和其他 React 特性**，而不需要编写类组件。
使用 React Hooks，你可以通过使用一些预定义的 Hook 函数，如 `useState`、`useEffect`、`useContext` 等，来管理组件的状态、副作用和上下文等。
以下是一些常用的 React Hooks：

1. `useState`：用于在函数组件中添加状态。它返回一个状态值和一个更新该状态值的函数。你可以使用解构赋值来获取这两个值，并在组件中进行状态管理。
2. `useEffect`：用于处理副作用操作，比如订阅事件、请求数据、更新 DOM 等。它接收一个回调函数和一个依赖数组作为参数。当依赖数组中的值发生变化时，`useEffect` 会执行回调函数。
3. `useContext`：用于在组件中获取上下文（Context）的值。它接收一个上下文对象作为参数，并返回该上下文的当前值。
4. `useReducer`：用于管理复杂的状态逻辑。它类似于 Redux 中的 reducer，接收一个状态和一个操作函数，并返回新的状态和一个派发操作的函数。
5. `useCallback`：用于缓存函数引用，避免不必要的函数创建。它接收一个回调函数和一个依赖数组，并返回一个缓存的回调函数。
6. `useMemo`：用于缓存计算结果，避免不必要的重复计算。它接收一个计算函数和一个依赖数组，并返回计算结果的缓存。

通过使用这些 Hooks，你可以更方便地编写可复用、可测试和易于维护的函数组件，而不需要编写类组件或使用类组件中的生命周期方法。Hooks 提供了一种更简洁、直观和灵活的方式来处理组件的状态和副作用。

## useEffect 的执行时机，以及 deps 的作用

`useEffect` 是 React Hooks 中用于处理副作用操作的函数。它在组件渲染后执行，并且可以在组件的每次渲染过程中多次执行。

`useEffect` 接收两个参数：一个回调函数和一个依赖数组（可选）。回调函数定义了需要执行的副作用操作，而依赖数组用于指定触发执行副作用的依赖项。
当组件渲染后，React 会记住这个回调函数，并在每次渲染后调用它。如果提供了依赖数组，React 将会比较前一次渲染和当前渲染的依赖项是否发生了变化。如果有任何一个依赖项发生了变化，React 将会执行回调函数。如果没有提供依赖数组，那么每次渲染都会执行回调函数。
依赖数组的作用是告诉 React 哪些状态或属性的变化会触发副作用的重新执行。只有在依赖项发生变化时，才会执行回调函数。这样可以避免不必要的副作用执行，提高性能和效率。

**依赖数组可以有不同的取值**：

- **如果传递一个空数组**`[]`，则表示回调函数只会在组件挂载和卸载时执行，类似于 `componentDidMount` 和 `componentWillUnmount`。
- **如果没有传递依赖数组**，即不提供第二个参数，那么回调函数在每次组件渲染后都会执行。
- **如果传递一个包含状态或属性的数组**，那么只有在数组中的状态或属性发生变化时，才会执行回调函数。

使用依赖数组可以精确地控制副作用的执行时机，避免不必要的重复执行。在实际使用中，需要根据具体的场景和需求来决定是否提供依赖数组，以及依赖数组中的依赖项。
:::tip 总结
`useEffect` 的执行时机是在组件渲染后，可以在每次渲染过程中多次执行。依赖数组用于指定触发副作用执行的依赖项，只有在依赖项发生变化时才会执行回调函数。
:::

## React17 和 React18 的区别

[一文解读 React 17 与 React 18 的更新变化 - 掘金](https://juejin.cn/post/7157888552229928996)

## React18新特性

### useTransition

React 的状态更新可以分为两类：

- 紧急更新（Urgent updates）：比如打字、点击、拖动等，需要立即响应的行为，如果不立即响应会给人很卡，或者出问题了的感觉
- 过渡更新（Transition updates）：将 UI 从一个视图过渡到另一个视图。不需要即时响应，有些延迟是可以接受的。

CM 模式**只是提供了可中断可恢复的能力，默认情况下，所有的更新都是紧急更新。**

```javascript
const [inputValue, setInputValue] = useState();

const onChange = (e)=>{
  setInputValue(e.target.value);
  // 更新搜索列表
  setSearchQuery(e.target.value);
}

return (
  <input value={inputValue} onChange={onChange} />
)
```

比如以上示例，用户的键盘输入操作后，setInputValue 会立即更新用户的输入到界面上，是紧急更新。而setSearchQuery 是根据用户输入，查询相应的内容，是非紧急的。
但是 React 确实没有能力自动识别。所以它提供了 startTransition 让我们手动指定哪些更新是紧急的，哪些是非紧急的。

```javascript
// 紧急的
setInputValue(e.target.value);
startTransition(() => {
  setSearchQuery(input); // 非紧急的
});
```

如上代码，我们通过 startTransition 来标记一个非紧急更新，让该状态触发的变更变成低优先级的。

### useDeferredValue

- **useDeferredValue** 是一个钩子（hook），它接受一个值，并返回一个可能会“滞后”一段时间的版本。这意味着如果有高优先级的更新发生，useDeferredValue 返回的值可能会保持不变，直到浏览器有足够的时间来处理低优先级的工作。

```tsx
import { useDeferredValue } from 'react';

// ...

const deferredValue = useDeferredValue(value);

// 使用deferredValue而不是直接使用value
// deferredValue可能会“延迟”更新，避免阻塞重要的渲染
```

适用于那些你希望在不影响主要渲染的情况下，能够“平滑”更新的值。例如，你可能希望在用户输入时立即更新输入框，但是推迟更新基于输入值的渲染结果。

### 流式 SSR

在 React 18 中，我们通过 Suspense包裹，可以告诉 React，我们不需要等这个组件，可以先返回其它内容，等这个组件准备好之后，单独返回。

```jsx
<Layout>
  <NavBar />
  <Sidebar />
  <RightPane>
    <Post />
    <Suspense fallback={<Spinner />}>
      <Comments />
    </Suspense>
  </RightPane>
</Layout>
```

如上，我们通过 `Suspense` 包裹了 `Comments` 组件，那服务器首次返回的 HTML 是下面这样的，`<Comments />`组件处通过 `loading` 进行了占位。

```html
<main>
  <nav>
    <!--NavBar -->
    <a href="/">Home</a>
   </nav>
  <aside>
    <!-- Sidebar -->
    <a href="/profile">Profile</a>
  </aside>
  <article>
    <!-- Post -->
    <p>Hello world</p>
  </article>
  <section id="comments-spinner">
    <!-- Spinner -->
    <img width=400 src="spinner.gif" alt="Loading..." />
  </section>
</main>
```

当 `<Comments />` 组件准备好之后，React 会通过同一个流（stream）发送给浏览器（res.send 替换成 res.socket），并替换到相应位置。
[React 18 总览 - 掘金](https://juejin.cn/post/7087486984146878494)

## React 底层是怎么利用浏览器的空闲时间来做组件渲染的？

React 16开始引入了一种新的更新机制，叫作Fiber。Fiber是一种基于浏览器的requestIdleCallback API的协调引擎，它充分利用浏览器的空闲时间来进行组件的渲染。

React的更新机制是分阶段的，分为两大阶段，分别是Reconciliation阶段和Commit阶段。

在Reconciliation阶段，React会将新旧Virtual DOM进行对比，生成更新内容，这个阶段的任务是可以被打断的。React会利用requestIdleCallback API，
在浏览器空闲的时候进行这个阶段的更新工作。

而在Commit阶段，React会将Reconciliation阶段生成的更新内容应用到实际的DOM上，这个阶段的任务是不能被打断的，需要一次性完成。

这样，React就能够在不阻塞用户的正常操作下，尽可能地利用浏览器的空闲时间，进行组件的渲染更新。

## React18 流式 SSR 和 传统 SSR 的区别

React 18 引入了新的流式 SSR（Server-Side Rendering）特性，与传统的 SSR 有一些显著区别。以下是它们之间的一些主要差异：

1. **流式渲染：**

- **React 18 流式 SSR：** React 18 允许应用程序以流的形式发送 HTML。这意味着一旦生成了组件树的一部分，它就可以立即被发送到客户端，而不需要等待整个组件树渲染完成。这可以提高首屏加载性能，因为浏览器可以更快地开始解析和渲染内容。
- **传统 SSR：** 在传统 SSR 中，服务器必须渲染完整个应用程序的 HTML 内容后，才能作为一个完整的响应发送给客户端。这会导致客户端需要等待更长时间才能接收到第一个字节，并开始渲染页面。

2. **并发特性：**

- **React 18 流式 SSR：** React 18 的 SSR 现在可以利用 React 的并发特性，比如 Suspense 和 Concurrent Mode。这意味着服务器端渲染可以更智能地处理数据加载，暂停渲染不够重要的组件，而优先发送更重要的内容。
- **传统 SSR：** 传统 SSR 没有这些并发特性，因此无法优化数据依赖的加载和组件的渲染优先级。

3. **组件挂起（Suspense）：**

- **React 18 流式 SSR：** React 18 支持在服务器端使用 Suspense 来声明数据依赖，这样可以更好地控制渲染时机和数据获取。
- **传统 SSR：** 在早期的 React 版本中，Suspense 仅限于客户端渲染，服务器端渲染不支持 Suspense。

4. **性能优化：**

- **React 18 流式 SSR：** 由于流式 SSR 的并发特性和更早地发送内容的能力，它可以显著提升性能，尤其是在大型应用程序和慢网络连接的情况下。
- **传统 SSR：** 传统 SSR 的性能受限于必须等待整个应用渲染完成，可能导致较慢的首屏渲染时间。

5. **开发模式的一致性：**

- **React 18 流式 SSR：** React 18 的 SSR 更接近客户端渲染的行为，这意味着开发者可以期待在服务器端和客户端之间有更一致的开发体验。
- **传统 SSR：** 早期的 React SSR 可能需要开发者在服务器端和客户端代码之间做更多的区分处理。

总的来说，React 18 的流式 SSR 提供了更高效的渲染策略和更好的开发者体验，特别是在处理大型应用程序和优化性能方面。尽管如此，流式 SSR 也可能带来新的挑战，比如需要更细致地处理数据加载和组件渲染的顺序。
[如何升级到 React 18](https://mp.weixin.qq.com/s/2QYEmFlIIMQkXR-Q9DVG2Q)

## useState使用时用数组解构，为何不使用对象

在JavaScript中，数组解构和对象解构都是非常常见的用法，它们各有各的优点。在React的`useState`中，我们通常使用数组解构是因为以下几个原因：

1. 简洁性：数组解构通常比对象解构更简洁。例如，`const [count, setCount] = useState(0)`比`const {0: count, 1: setCount} = useState(0)`要简洁得多。
2. 顺序：数组解构保证了元素的顺序，这对于`useState`来说非常重要，因为它总是返回一个有两个元素的数组，第一个元素是当前的状态值，第二个元素是更新状态值的函数。
3. 灵活性：使用数组解构，我们可以自由地给这两个元素命名，而不是被迫使用对象的属性名。这在代码的可读性和可维护性方面是非常重要的。
4. 一致性：React团队在设计API时选择了数组解构，这样做可以保持API的一致性。如果我们在使用`useState`时选择了对象解构，那么在阅读或者维护代码时可能会造成混淆。

总的来说，虽然对象解构在某些情况下可能会更有用，但在`useState`这种情况下，数组解构通常是更好的选择。

## React18 并发更新特性实现搜索功能

```jsx
import {useState, useTransition, startTransition} from 'react';

function SearchResults() {
  let [query, _setQuery] = useState('');
  let [data, setData] = useState(null);
  
  // 搜索的状态，isLoading可以被用来显示一个加载状态
  let [startTransition, isPending] = useTransition();

  let onChange = (e) => {
    let nextQuery = e.target.value;
    _setQuery(nextQuery);

    // 把数据获取的函数包装到 startTransition 中，这样 React 就能知道这是一个可能会花费一些时间的更新
    startTransition(() => {
        fetch(`/api/search?query=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((results) => {
        setData(results);
      });
    });
  };

  return (
    <div>
      <input 
      onChange={onChange}
      value={query}
      placeholder="Search..."
      />
      {isPending ? "Loading..." :
        (data && data.map((item) => (
          <div key={item.id}>{item.name}</div>
        )))
      }
    </div>
  );
}
```

## ReactDOM.render 的流程？

ReactDOM.render 的流程大致可以分为以下几个步骤：

1. **JSX 解析**：React 会将 JSX 解析成 ReactElement。ReactElement 实际上就是一个 JavaScript 对象，它描述了 UI 组件的类型、属性等信息。
2. **创建 Fiber 对象**：React 会为每个 ReactElement 创建一个对应的 Fiber 对象，Fiber 是 React 16 引入的一个新的数据结构，它描述了组件的类型、状态、属性以及组件之间的关系等。创建 Fiber 的过程，其实就是创建一棵以 ReactElement 为节点的 Fiber 树。
3. **Fiber 树的协调**：React 会遍历 Fiber 树，比较新旧 Fiber 树的差异，这个过程被称为 Reconciliation。
   - 在初始化渲染时，因为没有旧的 Fiber 树，所以会直接进行到下一步。
   - 在更新渲染时，React 会找出需要更新的 Fiber 节点，标记为更新。
4. **Fiber 树的提交**：在 Reconciliation 结束后，React 会提交更新，将所有标记为更新的 Fiber 对象的视图更新到屏幕上，这个过程被称为 Commit。

简要概括，ReactDOM.render 的过程就是创建 Fiber 树 -> 协调 Fiber 树 -> 提交 Fiber 树的过程，而在这其中，React 利用了 Fiber 数据结构，实现了组件的异步渲染，优化了渲染性能。

## Scheduler 是如何根据任务的优先级和剩余时间进行调度的？

React中的Scheduler是一个用于任务调度的库，它有两个主要的功能: 处理任务的优先级与根据剩余时间来处理任务。

1. **任务优先级**
任务优先级是根据它们的紧急性划分的。React中常见的任务优先级包括：
   - Immediate：必须在当前同步进行的任务，如处理用户输入。
   - UserBlocking：非常紧急的任务，对于用户体验影响很大，应该在之后的几个任务中执行，例如对用户的点击事件的响应。
   - Normal：常规任务，例如数据的获取、页面的渲染等。
   - Low：可以被延迟，不急的任务，例如代码预加载等。
   - Idle：空闲时个别任务，如向后台发送日志等。

当任务被添加到Scheduler任务队列中时，会根据任务类型来设置它们的优先级。

2. **时间切片**
时间切片是指操作系统对处理器运行时间的分割。在React中的时间切片机制在于，将长时间任务分解为能在一帧内完成的小块任务，这样在运行一个任务的空挡时，就能插入其他的任务来运行。
Scheduler有一个runNextUnitOfWork方法，这个方法会计算当前帧剩余的时间，如果这个时间足够大且队列中还有任务，Scheduler则会执行这个任务；如果时间不足，那么这个任务会被挂起，然后等待下一个刷新周期。

:::tip Scheduler的核心就是在通过合理利用浏览器主线程的空闲周期，在不阻塞用户交互、保证流畅性的同时，尽可能快的完成任务。
:::

## 在 `useState` 中如何实现类似于 `setState` 的回调功能？

```jsx
import React, { useState, useEffect, useRef } from 'react';

function useStateWithCallback(initialValue) {
  const [state, setState] = useState(initialValue);
  const callbackRef = useRef(null);

  const setStateWithCallback = (value, callback) => {
    callbackRef.current = callback;
    setState(value);
  };

  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(state);
      callbackRef.current = null;
    }
  }, [state]);

  return [state, setStateWithCallback];
}

function MyComponent() {
  const [count, setCount] = useStateWithCallback(0);

  const incrementCount = () => {
    setCount(count + 1, () => {
      console.log(`Count value updated to: ${count + 1}`);
    });
  };

  return (
    <button onClick={incrementCount}>
      Increment Count
    </button>
  );
}
```
