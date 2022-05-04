# React 基础

## 生命周期

Fiber 本质上是一个虚拟的堆栈帧，新的调度器会按照优先级自由调度这些帧，从而将之前的同步渲染改成了异步渲染，在不影响体验的情况下去分段计算更新。

对于异步渲染，现在渲染有两个阶段：`reconciliation` 和 `commit` 。前者过程是可以打断的，后者不能暂停，会一直更新界面直到完成。

**Reconciliation** 阶段

* `componentWillMount`
* `componentWillReceiveProps`
* `shouldComponentUpdate`
* `componentWillUpdate`

**Commit** 阶段

* `componentDidMount`
* `componentDidUpdate`
* `componentWillUnmount`

因为 `Reconciliation` 阶段是可以被打断的，所以 `Reconciliation` 阶段会执行的生命周期函数就可能会出现调用多次的情况，从而引起 Bug。由此对于 `Reconciliation` 阶段调用的几个函数，除了 `shouldComponentUpdate` 以外，其他都应该避免去使用，并且 V16 中也引入了新的 API 来解决这个问题。

`getDerivedStateFromProps` 用于替换 `componentWillReceiveProps` ，该函数会在初始化和 `update` 时被调用

`getSnapshotBeforeUpdate` 用于替换 `componentWillUpdate` ，该函数会在 `update` 后 DOM 更新前被调用，用于读取最新的 DOM 数据。

## setState
