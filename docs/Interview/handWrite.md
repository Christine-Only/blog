# 前端手写题

## 实现 new 操作符

```js
function myNew(fn, ...args) {
  // 创建一个新对象，该对象的原型指向构造函数的原型
  const obj = Object.create(fn.prototype);
  // 调用构造函数，将构造函数中的 this 绑定到新对象上
  const res = fn.call(obj, ...args);
  // 如果构造函数返回的是对象或者函数，则返回该对象；否则，返回新创建的对象
  return res !== null && (typeof res === "object" || typeof res === "function")
    ? res
    : obj;
}
```

### 🌰

```js
// 构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;

  // return {
  //   name: "Picker",
  // };
  return () => {};
}

Person.prototype.say = function () {
  console.log(`Hi ${this.name}`);
};

const person = myNew(Person, "Christine", 28);
console.log("person.name: ", person.name);
console.log("person.age: ", person.age);
// person.say();
const person1 = new Person("Christine", 28);
console.log("person1.name: ", person.name);
console.log("person1.age: ", person.age);
// person1.say();
```

## 实现 call

```js
Function.prototype.myCall = function (context, ...args) {
  if (!context) {
    context = window;
  }
  // 创建唯一的 key 值，作为我们构造的 context 内部的方法名
  const fn = Symbol();
  //this指向调用call的函数
  context[fn] = this;
  // 执行函数并返回结果 相当于把自身作为传入的context的方法进行调用了
  return context[fn](...args);
};
```

### 🌰

```js
function say(value) {
  console.log(`${this.name} ${value}`);
}
const person = {
  name: "Christine",
};
say.myCall(person, "你好呀");
```

## 实现 apply

```js
Function.prototype.myApply = function (context, args) {
  if (!context) {
    context = window;
  }
  const fn = Symbol();
  context[fn] = this;
  let result = null;
  if (args) {
    result = context[fn](...args);
  } else {
    result = context[fn]();
  }
  return result;
};
```

### 🌰

```js
const arr = [1, 2, 3, 4];
console.log(Math.max.apply(null, arr));
console.log(Math.max.myApply(arr, arr));
```

## 实现 bind

```js
Function.prototype.myBind = function (context, ...args) {
  if (!context) {
    context = window;
  }

  const fn = Symbol("boundFunction");

  const boundFunction = function (...innerArgs) {
    if (new.target) {
      // 使用 new 关键字调用时，将 this 指向新创建的对象
      this[fn] = boundFunction;
      this[fn](...args, ...innerArgs);
    } else {
      // 在普通函数调用时，将 this 指向指定的上下文
      context[fn](...args, ...innerArgs);
    }
  };

  // 设置原始函数的 prototype
  boundFunction.prototype = Object.create(this.prototype);

  // 将原始函数绑定到上下文的 symbol 属性上
  context[fn] = this;

  return boundFunction;
};
```

### 🌰

```js
function Person(name, age) {
  console.log(name); //'我是参数传进来的name'
  console.log(age); //'我是参数传进来的age'
  console.log(this); //构造函数this指向实例对象
}
// 构造函数原型的方法
Person.prototype.say = function () {
  console.log(123);
};
let obj = {
  objName: "我是obj传进来的name",
  objAge: "我是obj传进来的age",
};
// 普通函数
function normalFun(name, age) {
  console.log(name); //'我是参数传进来的name'
  console.log(age); //'我是参数传进来的age'
  console.log(this); //普通函数this指向绑定bind的第一个参数 也就是例子中的obj
  console.log(this.objName); //'我是obj传进来的name'
  console.log(this.objAge); //'我是obj传进来的age'
}

// 作为构造函数调用;
let BindFun = Person.myBind(obj, "我是参数传进来的name");
let a = new BindFun("我是参数传进来的age");
a.say(); //123

// 作为普通函数调用;
let bindFun1 = normalFun.myBind(obj, "我是参数传进来的name");
bindFun1("我是参数传进来的age");
```

## 实现 flat

```js
// 递归方式实现
function flatter(arr) {
  if (!arr.length) return [];
  return arr.reduce(
    (prev, cur) =>
      Array.isArray(cur) ? [...prev, ...flatter(cur)] : [...prev, cur],
    []
  );
}

// 迭代方式实现
function myFlatter(arr) {
  if (!arr.length) return;
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
```

### 🌰

```js
console.log(flatter([1, 2, [1, [2, 3, [4, 5, [6]]]]]));
console.log(myFlatter([1, 2, [1, [2, 3, [4, 5, [6]]]]]));
```

## 实现 Promise 及相关方法

## 实现 reduce

```js
Array.prototype.myReduce = function (callBack, initialValue) {
  if (!Array.isArray(this)) {
    throw new TypeError("调用者类型错误");
  }

  const { length } = this;

  // 检查是否提供了初始值
  let accumulator =
    typeof initialValue === "undefined" ? this[0] : initialValue;

  // 从索引 0 或 1 开始遍历数组
  for (let i = typeof initialValue === "undefined" ? 1 : 0; i < length; i++) {
    accumulator = callBack.call(undefined, accumulator, this[i], i, this);
  }

  return accumulator;
};
```

### 🌰

```js
// 使用 myReduce 求和
const sum = numbers.myReduce((acc, current) => acc + current);
const sum1 = numbers.myReduce((acc, current) => acc + current, 0);
console.log(sum); // 输出: 15
console.log(sum1); // 输出: 15

// 使用 myReduce 求积
const product = numbers.myReduce((acc, current) => acc * current);
const product1 = numbers.myReduce((acc, current) => acc * current, 1);
console.log(product); // 输出: 120
console.log(product1); // 输出: 120
```

## 实现深拷贝

```js
function deepClone(obj, clones = new WeakMap()) {
  // 基本数据类型或者 null 或者函数直接返回
  const type = typeof obj;
  if (obj === null || type !== "object" || type === "function") {
    return obj;
  }

  // 处理循环引用
  if (clones.has(obj)) {
    return clones.get(obj);
  }
  // 处理日期
  if (obj instanceof Date) {
    return new Date(obj);
  }
  // 处理正则
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  // 处理 Symbol
  if (typeof obj === "symbol") {
    // 将 obj 视为 Symbol 对象，并调用其 valueOf 方法获取原始的 Symbol 值。
    return Object(Symbol.prototype.valueOf.call(obj));
  }
  // 处理数组和对象
  const cloneObj = Array.isArray(obj) ? [] : {};

  // 将当前对象引用存入 WeakMap
  clones.set(obj, cloneObj);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], clones);
    }
  }

  return clones;
}
```

### 🌰

```js
const obj = {
  age: 18,
  name: "Christine",
  date: new Date(),
  hh: /hh/,
  fun: console.log,
  hobbies: ["吃饭", "睡觉", "打豆豆"],
  oo: {
    son: "berry",
  },
  [Symbol("1")]: 1,
  nul: null,
  und: undefined,
  symbol: Symbol(234),
};
obj.aa = obj; // 循环引用
const clonedObj = deepClone(obj);
console.log(clonedObj);
```

## 实现防抖

- 防抖的目标是确保在一段连续的触发事件之后，只执行一次函数。
- 当触发事件的间隔小于设定的时间间隔时，重新计时，不执行函数。
- 最终只在触发事件后的指定时间间隔内执行一次函数。

> 用途：用户输入搜索，只在用户停止输入一段时间后执行搜索请求。

```js
// 防抖
function debounce(fn, delay) {
  // 默认 300 毫秒
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

```

### 🌰

```js
// 假设有一个需要防抖的函数
function handleInput() {
  console.log("Input event handled");
}

// 使用防抖函数创建一个新的函数
const debouncedInputHandler = debounce(handleInput, 500);

// 模拟输入事件，如果在 500 毫秒内再次调用，之前的计时器会被清除，重新开始计时，确保在最后一次调用后的 500 毫秒后执行真正的处理函数。
debouncedInputHandler();
debouncedInputHandler();
debouncedInputHandler(); // 会在最后一次输入后的500毫秒执行
```

## 实现节流

- 节流的目标是控制函数在一段时间内执行的频率，确保函数每隔一定时间执行一次。
- 当触发事件时，如果距离上一次执行函数的时间间隔小于设定的时间间隔，则忽略该触发事件。
- 最终是按照设定的时间间隔执行函数。

> 用途：滚动事件，确保滚动事件不会以过快的速度触发；窗口大小改变的事件可能在短时间内频繁触发，因此通常会选择使用节流来限制触发的频率

```js
function throttle(fn, delay) {
  let flag = true;
  let timer = null;
  return () => {
    if (!flag) {
      return;
    }
    flag = false;
    timer = setTimeout(() => {
      fn();
      flag = true;
    }, delay);
  };
}
```

### 🌰

```js
const throttledResizeHandler = throttle(function () {
  // 处理窗口大小改变的操作
  console.log("Window resized");
}, 200);

window.addEventListener("resize", throttledResizeHandler);
```

## 实现 compose

```js
function compose(...fns) {
  if (fns.length === 0) {
    return (v) => v;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return fns.reduce(
    (prev, curr) =>
      (...args) =>
        prev(curr(...args))
  );
}
```

### 🌰

```js
function fn1(x) {
  return x + 1;
}

function fn2(x) {
  return x + 2;
}

function fn3(x) {
  return x + 3;
}

function fn4(x) {
  return x + 4;
}

const result = compose(fn1, fn2, fn3, fn4);
result(1);
```

## 实现发布订阅模式

```js
class EventEmitter {
  constructor() {
    this.events = {};
  }

  // 添加订阅
  on(type, handler) {
    if (!this.events[type]) {
      this.events[type] = [handler];
    } else {
      this.events[type].push(handler);
    }
  }

  // 删除订阅
  off(type, handler) {
    if (!this.events[type]) {
      return;
    }
    this.events[type] = this.events[type].filter((item) => item !== handler);
  }
  // 触发事件
  emit(type, ...args) {
    if (!this.events[type]) {
      return;
    }
    this.events[type].forEach((fn) => fn.apply(this, args));
  }
  // 只执行一次订阅事件
  once(type, handler) {
    function onceWrapper(...args) {
      // 调用原始的处理函数
      handler.apply(this, args);
      // 在触发后立即移除订阅
      this.off(type, onceWrapper);
    }
    this.on(type, onceWrapper);
  }
}
```

### 🌰

```js
const eventEmitter = new EventEmitter();
const handler = (...rest) => {
  console.log(rest);
};

const handleClick = (...args) => {
  console.log("===", args);
};

const handleScroll = (...args) => {
  console.log("++++++++++++++++", args);
};
eventEmitter.on("click", handler);
eventEmitter.on("click", handleClick);

eventEmitter.on("change", handler);

eventEmitter.emit("click", 1, 2, 3);

eventEmitter.once("click", handler);

eventEmitter.emit("click", "Hi Christine");

eventEmitter.once("scroll", handleScroll);
eventEmitter.emit("scroll", "Hi Berry");
eventEmitter.emit("scroll", "Hi Picker");
```

## 实现 Scheduler
>
> Scheduler 是一个带并发限制的异步调度器，保证同时运行的任务最多有n个，n 为可配置的
>
### 题目描述

```yaml
解释下完整的执行流程：一开始1、2两个任务开始执行；
500ms时，2任务执行完毕，输出2，任务3开始执行；
800ms时，3任务执行完毕，输出3，任务4开始执行；
1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行；
1200ms时，4任务执行完毕，输出4。
```

```js
class Scheduler {
  constructor(limit) {
    this.queue = [];
    this.maxRunCounts = limit;
    this.runCounts = 0;
  }

  // 添加任务到队列
  add(time, value) {
    const promiseCreator = () => {
      return new Promise(function (resolve, reject) {
        setTimeout(() => {
          console.log(value);
          resolve();
        }, time);
      });
    };
    this.queue.push(promiseCreator);
  }

  request() {
    if (!this.queue.length || this.runCounts > this.maxRunCounts) {
      return;
    }
    this.runCounts++;
    const shift = this.queue.shift();
    shift().then(() => {
      this.runCounts--;
      this.request();
    });
  }

  taskStart() {
    for (let i = 0; i < this.maxRunCounts; i++) {
      this.request();
    }
  }
}
```

### 🌰

```js
const scheduler = new Scheduler(2);

const addTask = (time, value) => {
  scheduler.add(time, value);
};
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
scheduler.taskStart();
```

## 模拟实现 setInterval

```js
function simulateSetInterval(callback, timeout) {
  let timer = null;
  function fn() {
    timer = setTimeout(() => {
      callback();
      fn();
    }, timeout);
  }
  fn();
  return () => clearInterval(timer);
}
```

### 🌰

```js
const a = simulateSetInterval(() => {
  console.log("Hi Christine");
}, 1000);

const b = simulateSetInterval(() => {
  console.log("Hi Berry");
}, 1000);
```

## 模拟实现 settimeout

```js
function simulateSetTimeout(callback, timeout) {
  const timer = setInterval(() => {
    clearInterval(timer);
    callback();
  }, timeout);
}
```

### 🌰

```js
simulateSetTimeout(() => {
  console.log("Hi Christine");
}, 1000);
```

## 实现Object.is

```js
Object.newIs = (x, y) => {
  // 当 x 和 y 都是 +0 和 -0 时，通过比较它们的倒数来判断它们是否相等。
  if (x === 0 && y === 0) {
    return 1 / x === 1 / y;
  }

  // 当 x 和 y 都是 NaN 时，直接返回 true。
  if (isNaN(x) && isNaN(y)) {
    return true;
  }

  // 其他情况使用严格相等运算符
  return x === y;
};
```

### 🌰

```js
console.log(Object.newIs(-0, +0)); // false
console.log(Object.newIs(-0, 0)); // false
console.log(Object.newIs(+0, 0)); // true
console.log(Object.newIs(NaN, NaN)); // true
console.log(Object.newIs(5, 5)); // true
```

## 冒泡排序

## 选择排序

## 插入排序

## 快速排序

## 归并排序

## 二分查找

## 列表转成树形结构

```js
function listToTree(list) {
  const map = {};
  const tree = [];
  // 创建节点映射
  for (const item of list) {
    map[item.id] = item;
  }

  // 构建树
  for (const item of list) {
    if (item.parent_id === null) {
      tree.push(item);
    } else {
      const parent = map[item.parent_id];
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(item);
    }
  }

  return tree;
}
```

### 🌰

```js
const list = [
  { id: 1, parent_id: null, label: "Node 1" },
  { id: 2, parent_id: 1, label: "Node 1.1" },
  { id: 3, parent_id: 1, label: "Node 1.2" },
  { id: 4, parent_id: 2, label: "Node 1.1.1" },
  { id: 5, parent_id: 2, label: "Node 1.1.2" },
  { id: 6, parent_id: null, label: "Node 2" },
  { id: 7, parent_id: 6, label: "Node 2.1" },
];

listToTree(list)
```

## 树形结构转成列表

### 题目描述

```yaml
const tree = [
  {
    id: 1,
    parent_id: null,
    label: "Node 1",
    children: [
      {
        id: 2,
        parent_id: 1,
        label: "Node 1.1",
        children: [
          { id: 4, parent_id: 2, label: "Node 1.1.1", children: [] },
          { id: 5, parent_id: 2, label: "Node 1.1.2", children: [] },
        ],
      },
      { id: 3, parent_id: 1, label: "Node 1.2", children: [] },
    ],
  },
  {
    id: 6,
    parent_id: null,
    label: "Node 2",
    children: [{ id: 7, parent_id: 6, label: "Node 2.1", children: [] }],
  },
];

转成

const list = [
  { id: 1, parent_id: null, label: "Node 1" },
  { id: 2, parent_id: 1, label: "Node 1.1" },
  { id: 3, parent_id: 1, label: "Node 1.2" },
  { id: 4, parent_id: 2, label: "Node 1.1.1" },
  { id: 5, parent_id: 2, label: "Node 1.1.2" },
  { id: 6, parent_id: null, label: "Node 2" },
  { id: 7, parent_id: 6, label: "Node 2.1" },
];
```

### 代码实现

```js
递归
function treeToList(tree) {
  const list = [];

  const dfs = (node) => {
    const { id, label, parent_id } = node;
    list.push({ id, parent_id, label });

    if (node.children && node.children.length) {
      for (const child of node.children) {
        dfs(child);
      }
    }
  };

  tree.forEach((node) => {
    dfs(node);
  });

  return list;
}

迭代
function treeToList(tree) {
  const list = [];
  // 初始状态将树的根节点放入栈中
  const stack = [...tree];
  while (stack.length) {
    const node = stack.shift();
    // 添加节点信息到列表中
    list.push({
      id: node.id,
      parent_id: node.parent_id,
      label: node.label,
    });

    if (node.children && node.children.length) {
      stack.push(...node.children);
    }
  }
  return list;
}
```

### 🌰

```js
const tree = [
  {
    id: 1,
    parent_id: null,
    label: "Node 1",
    children: [
      {
        id: 2,
        parent_id: 1,
        label: "Node 1.1",
        children: [
          { id: 4, parent_id: 2, label: "Node 1.1.1", children: [] },
          { id: 5, parent_id: 2, label: "Node 1.1.2", children: [] },
        ],
      },
      { id: 3, parent_id: 1, label: "Node 1.2", children: [] },
    ],
  },
  {
    id: 6,
    parent_id: null,
    label: "Node 2",
    children: [{ id: 7, parent_id: 6, label: "Node 2.1", children: [] }],
  },
];

console.log(treeToList(tree));
```

## 实现一个对象的 flatten 功能

### 题目描述

```yaml
const obj = {
  a: {
    b: 1,
    c: 2,
    d: { e: 5 },
  },
  b: [1, 3, { a: 2, b: 3 }],
  c: 3,
};

将上面对象处理成如下格式

// {
//  'a.b': 1,
//  'a.c': 2,
//  'a.d.e': 5,
//  'b[0]': 1,
//  'b[1]': 3,
//  'b[2].a': 2,
//  'b[2].b': 3
//   c: 3
// }
```

### 代码实现

```js
function flatten(obj) {
  const res = {};

  function isObject(val) {
    return typeof val === "object" && val !== null;
  }

  const dfs = (cur, prefix) => {
    if (!isObject(cur)) {
      res[prefix] = cur;
    } else {
      if (Array.isArray(cur)) {
        cur.forEach((item, index) => {
          dfs(item, `${prefix}[${index}]`);
        });
      } else {
        for (const [key, value] of Object.entries(cur)) {
          dfs(value, `${prefix}${prefix ? "." : ""}${key}`);
        }
      }
    }
  };

  dfs(obj, "");
  return res;
}
```

### 🌰

```js
flatten(obj)
```

## 实现版本号排序
>
> 有一组版本号如下['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']。现在需要对其进行排序，排序的结果为 ['4.3.5','4.3.4.5','2.3.3','0.302.1','0.1.1']

```js
const versions = ["0.1.1", "2.3.3", "0.302.1", "4.2", "4.3.5", "4.3.4.5"];

versions.sort((version1, version2) => {
  const arr1 = version1.split(".").map(Number);
  const arr2 = version2.split(".").map(Number);
  const len = Math.max(arr1.length, arr2.length);
  for (let i = 0; i < len; i++) {
    const num1 = arr1[i] || 0;
    const num2 = arr2[i] || 0;

    if (num1 !== num2) {
      return num2 - num1;
    }
  }
  // 如果循环结束后都没有发现不同的部分，说明两个版本号是相等的，返回 0。
  return 0;
});
```

## 实现虚拟 dom 转换为真实 dom

### 题目描述

```yaml
const virtualDom = {
  tag: "DIV",
  attrs: {
    id: "app",
    class: "container",
  },
  children: [
    "some text", // 文本节点
    {
      tag: "SPAN",
      attrs: {
        class: "span",
      },
      children: [{ tag: "A", children: [] }],
    },
    {
      tag: "SPAN",
      attrs: {
        class: "span",
      },
      children: [
        { tag: "A", children: [] },
        { tag: "A", children: [] },
      ],
    },
  ],
};
转成
<div id="app" class="container">
  some text
  <span>
    <a></a>
  </span>
  <span> 
    <a></a>
    <a></a>
  </span>
</div>
```

```js
function virtualDomTransformRealDom(virtualDom) {
  // 文本节点
  if (typeof virtualDom === "string") {
    return document.createTextNode(virtualDom);
  }

  const { tag, attrs, children } = virtualDom;
  const element = document.createElement(tag);

  // 设置属性
  if (attrs && Object.entries(attrs).length) {
    for (const [attrName, attrValue] of Object.entries(attrs)) {
      element.setAttribute(attrName, attrValue);
    }
  }

  // 递归处理子节点
  for (let child of virtualDom.children) {
      const childElement = virtualDomTransformRealDom(child);
      element.appendChild(childElement);
  }
  return element;
}
```

### 🌰

```js
const virtualDom = {
  tag: "DIV",
  attrs: {
    id: "app",
    class: "container",
  },
  children: [
    "some text", // 文本节点
    {
      tag: "SPAN",
      attrs: {
        class: "span",
      },
      children: [{ tag: "A", children: [] }],
    },
    {
      tag: "SPAN",
      attrs: {
        class: "span",
      },
      children: [
        { tag: "A", children: [] },
        { tag: "A", children: [] },
      ],
    },
  ],
};

// 转换虚拟 DOM 到真实 DOM
const realDom = virtualDomTransformRealDom(virtualDom);
console.log("realDom: ", realDom);

// 将真实 DOM 插入到页面中
document.body.appendChild(realDom);
```

## 实现模板字符串解析功能

```js
function parseTemplate(template, data) {
  // const regex = /{{(.*?)}}/g;
  const regex = /\{\{(\w+)\}\}/g;

  return template.replace(regex, (match, key) => {
    console.log("match: ", match, key); // {{name}} name
    const value = data[key.trim()];
    return value;
  });
}
```

### 🌰

```js
const template = "我是{{name}}，年龄{{age}}，性别{{sex}}";
const data = {
  name: "Christine",
  age: 18,
};
console.log(parseTemplate(template, data)); // 我是Christine，年龄18，性别undefined
```
