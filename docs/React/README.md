# React 基础

## 新旧生命周期对比

React从v16.3的版本开始， 对生命周期的钩子进行了渐进式的调整，分别废弃和新增了一些生命周期的钩子函数。

### 旧生命周期

![alt](/blog/oldLifeCycle.png)

挂载

* constructor：加载的时候调用一次，可以初始化state
* componentWillMount：组件加载时调用，组件更新不调用，整个生命周期只调用一次，此时可以修改state
* render：react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行
* componentDidMount：组件渲染之后调用，只调用一次

更新

* componentWillReceiveProps(nextProps)：组件加载时不调用，组件接受新的props时调用
* shouldComponentUpdate(nextProps, nextState)：组件接收到新的props或者state时调用，return true就会更新dom（使用diff算法更新），return false能阻止更新（不调用render）
* componentWillUpdate(nextProps, nextState)：组件加载时不调用，只有在组件将要更新时才调用，此时可以修改state
* render：react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行
* componentDidUpdate：组件加载时不调用，组件更新完成后调用

卸载

* componentWillUnmount：组件卸载及销毁之前直接调用，只调用一次

基本用法

```js
import React, { Component } from 'react'

export default class OldReactComponent extends Component {
  constructor(props) {
    super(props)
  }
  state = {

  }
  componentWillMount() { // 组件挂载前触发

  }
  render() {
    return (
      <h2>Old React.Component</h2>
    )
  }
  componentDidMount() { // 组件挂载后触发

  }
  componentWillReceiveProps(nextProps) { // 接收到新的props时触发

  }
  shouldComponentUpdate(nextProps, nextState) { // 组件Props或者state改变时触发，true：更新，false：不更新
    return true
  }
  componentWillUpdate(nextProps, nextState) { // 组件更新前触发

  }
  componentDidUpdate() { // 组件更新后触发

  }
  componentWillUnmount() { // 组件卸载时触发

  }
}
```

### 新生命周期

![alt](/blog/newLifeCycle.png)

挂载

* constructor：加载的时候调用一次，可以初始化state
* getDerivedStateFromProps(props, state)：组件每次被rerender的时候，包括在组件构建之后(虚拟dom之后，实际dom挂载之前)，每次获取新的`props`或`state`之后；每次接收新的props之后都会返回一个对象作为新的`state`，返回null则说明不需要更新`state`；配合componentDidUpdate，可以覆盖componentWillReceiveProps的所有用法
* render：react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行
* componentDidMount：组件渲染之后调用，只调用一次

更新

* getDerivedStateFromProps(props, state)：组件每次被rerender的时候，包括在组件构建之后(虚拟dom之后，实际dom挂载之前)，每次获取新的`props`或`state`之后；每次接收新的props之后都会返回一个对象作为新的`state`，返回null则说明不需要更新`state`；配合componentDidUpdate，可以覆盖componentWillReceiveProps的所有用法
* shouldComponentUpdate(nextProps, nextState)：组件接收到新的props或者state时调用，return true就会更新dom（使用diff算法更新），return false能阻止更新（不调用render）
* render：react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行
* getSnapshotBeforeUpdate(prevProps, prevState)：触发时间: update发生的时候，在render之后，在组件dom渲染之前；返回一个值，作为componentDidUpdate的第三个参数；配合componentDidUpdate, 可以覆盖componentWillUpdate的所有用法
* componentDidUpdate：组件加载时不调用，组件更新完成后调用

卸载

* componentWillUnmount：组件卸载及销毁之前直接调用，只调用一次

错误处理

* componentDidCatch(error，info)：

基本用法

```js
import React, { Component } from 'react'

export default class NewReactComponent extends Component {
  constructor(props) {
    super(props)
  }
  state = {

  }
  static getDerivedStateFromProps(props, state) { // 组件每次被rerender的时候，包括在组件构建之后(虚拟dom之后，实际dom挂载之前)，每次获取新的props或state之后；;每次接收新的props之后都会返回一个对象作为新的state，返回null则说明不需要更新state
    return state
  }
  componentDidCatch(error, info) { // 获取到javascript错误

  }
  render() {
    return (
        <h2>New React.Component</h2>
    )
  }
  componentDidMount() { // 挂载后

  }
  shouldComponentUpdate(nextProps, nextState) { // 组件Props或者state改变时触发，true：更新，false：不更新
    return true
  }
  getSnapshotBeforeUpdate(prevProps, prevState) { // 组件更新前触发

  }
  componentDidUpdate() { // 组件更新后触发

  }
  componentWillUnmount() { // 组件卸载时触发

  }
}
```

:::tip 总结

1. React16新的生命周期弃用了`componentWillMount`、`componentWillReceiveProps`，`componentWillUpdate`
2. 新增了`getDerivedStateFromProps`、`getSnapshotBeforeUpdate`来代替弃用的三个钩子函数（componentWillMount、componentWillReceiveProps，componentWillUpdate
3. React16并没有删除这三个钩子函数，但是不能和新增的钩子函数（getDerivedStateFromProps、getSnapshotBeforeUpdate）混用
4. 新增了对错误的处理（`componentDidCatch`）
:::

## setState
