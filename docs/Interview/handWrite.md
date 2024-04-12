# JS手写题

## 实现 new 操作符

```javascript
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

```javascript
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

<a name="m3xbk"></a>

## 实现 call

```javascript
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

```javascript
function say(value) {
  console.log(`${this.name} ${value}`);
}
const person = {
  name: "Christine",
};
say.myCall(person, "你好呀");
```

## 实现 apply

```javascript
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

```javascript
const arr = [1, 2, 3, 4];
console.log(Math.max.apply(null, arr));
console.log(Math.max.myApply(arr, arr));
```

## 实现 bind

```javascript
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

```javascript
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

```javascript
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

```javascript
const arr = [1, 2, [1, [2, 3, [4, 5, [6]]]]]
console.log(arr.flat(4));
console.log(myFlatter([1, 2, [1, [2, 3, [4, 5, [6]]]]]));
```

## 实现 Promise 及相关方法

```javascript
class Promise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.callbacks = [];

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.callbacks.forEach((callback) => callback.onFulfilled(value));
      }
    };
    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.value = reason;
        this.callbacks.forEach((callback) => callback.onRejected(reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      const fulfilledCallback = (value) => {
        try {
          if (typeof onFulfilled === "function") {
            const result = onFulfilled(value);
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      };
      const rejectedCallback = (reason) => {
        try {
          if (typeof onRejected === "function") {
            const result = onRejected(reason);
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      };
      if (this.state === "fulfilled") {
        setTimeout(() => {
          fulfilledCallback(this.value);
        }, 0);
      } else if (this.state === "rejected") {
        setTimeout(() => {
          rejectedCallback(this.value);
        }, 0);
      } else {
        this.callbacks.push({
          onFulfilled: fulfilledCallback,
          onRejected: rejectedCallback,
        });
      }
    });
  }
  static all(promises) {
    const result = [];
    let fulfilledCount = 0;
    return new Promise((resolve, reject) => {
      promises.forEach((promise, index) => {
        if (!(promise instanceof Promise)) {
          promise = Promise.resolve(promise);
        }
        promise
          .then((value) => {
            result[index] = value;
            fulfilledCount++;
            if (fulfilledCount === promises.length) {
              resolve(result);
            }
          })
          .catch(reject);
      });
    });
  }
  static race(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve).catch(reject);
      });
    });
  }
}
```

### 🌰

```javascript
// promiseA+ (resolve, reject) => {} 是executor
const p = new Promise((resolve, reject) => {
  // resolve 和 reject 是 Promise 内部实现好的函数
  // 这里的代码是立即执行的

  // reject('失败'); // 将状态从 pending 改成了 rejected （状态凝固）
  // setTimeout(() => {
  //   resolve(200); // 将状态从 pending 改成了 fulfilled
  // }, 1000);
  // reject('500')
  resolve(new Promise((resolve, reject) => {
    resolve(200)
  }))
})

p.then(res => {
  console.log('res: ', res);
})

// p.then(null, err => {
//   throw new Error(err)
// }).then(res => {
//   console.log('res: ', res);
// }, error => {
//   console.log('error: ', error);
// })

// onFulFilled => p成功后，调用的回调
// onRejected =>  p失败后，调用的回调
// .catch可以全局捕获错误
// p.then(onFulFilled, onRejected).catch()
// p.then(res => {
//   console.log('res: ', res);
//   // return '成功'
//   return new Promise((resolve, reject) => {
//     resolve(200)
//   })
// }, err => {
//   console.log('err: ', err);
//   return '失败'
//   return new Promise((resolve, reject) => {
//     reject(404)
//     // resolve(404)
//   })
// }).then(res => console.log('===', res), error => console.log(error));

// 链式调用2个核心要点
// 1. 上一个 .then 要返回一个 promise 对象
// 2. 下一个 .then 的参数要拿到上一个 .then 回调的返回值


// 循环引用
// const p2 = p.then(res => {
//   console.log('res: ', res);
//   setTimeout(() => {
//     return p2
//   }, 0);
// }, error => {
//   console.log(error)
//   return p2
// });

// Promise.resolve(4).then(res => console.log('===', res))
// Promise.reject('静态方法reject').then(res => console.log('===', res), error => console.log('error', error))

// const p3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(3000)
//   }, 3000);
// })

// const p4 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1000)
//   }, 1000);
// })

// const p5 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(2000)
//   }, 2000);
// })

// const p6 = new Promise((resolve, reject) => {
//   resolve(666)
// })

// Promise.all([p3, p4, p5, p6]).then(res => console.log('===', res))
// Promise.race([p3, p4, p5, p6]).then(res => console.log('===', res))
// Promise.race([Promise.reject('第一个被返回'), p3, p4, p5, p6]).then(res => console.log('===', res), error => console.log('error', error))
// Promise.race([Promise.resolve('第一个被返回'), p3, p4, p5, p6]).then()
```

## 实现 reduce

```javascript
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

```javascript
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

```javascript
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

  return cloneObj;
}
```

### 🌰

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
const throttledResizeHandler = throttle(function () {
  // 处理窗口大小改变的操作
  console.log("Window resized");
}, 200);

window.addEventListener("resize", throttledResizeHandler);
```

## 实现 compose

```javascript
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

```javascript
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

```javascript
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

```javascript
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

## 题目描述

```yaml
解释下完整的执行流程：一开始1、2两个任务开始执行；
500ms时，2任务执行完毕，输出2，任务3开始执行；
800ms时，3任务执行完毕，输出3，任务4开始执行；
1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行；
1200ms时，4任务执行完毕，输出4。
```

```javascript
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

<a name="edc2783b-11"></a>

### 🌰

```javascript
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

```javascript
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

```javascript
const a = simulateSetInterval(() => {
  console.log("Hi Christine");
}, 1000);

const b = simulateSetInterval(() => {
  console.log("Hi Berry");
}, 1000);
```

## 模拟实现 settimeout

```javascript
function simulateSetTimeout(callback, timeout) {
  const timer = setInterval(() => {
    clearInterval(timer);
    callback();
  }, timeout);
}
```

### 🌰

```javascript
simulateSetTimeout(() => {
  console.log("Hi Christine");
}, 1000);
```

## 实现Object.is

```javascript
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

```javascript
console.log(Object.newIs(-0, +0)); // false
console.log(Object.newIs(-0, 0)); // false
console.log(Object.newIs(+0, 0)); // true
console.log(Object.newIs(NaN, NaN)); // true
console.log(Object.newIs(5, 5)); // true
```

## 冒泡排序

```javascript
const arr = [3, 8, 2, 6, 4, 10, 1];
function bubbleSort(arr) {
  const { length } = arr;
  let flag = true;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        flag = false;
      }
    }
    if (flag) {
      break;
    }
  }
  return arr;
}

console.log(bubbleSort(arr));
```

## 选择排序

```javascript
const arr = [3, 8, 2, 6, 4, 10, 1];
function selectionSort(arr) {
  const { length } = arr;
  for (let i = 0; i < length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < length; j++) {
      if (arr[j] < arr[minIndex]) {
        // 寻找最小的数
        minIndex = j; // 将最小数的索引保存
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }

  return arr;
}

// console.log(selectionSort(arr));

// 选择排序的关键是循环遍历数组，每次找到当前范围的最小值，把它放在当前范围的头部；然后缩小排序范围，继续重复以上操作

function test(arr) {
  const { length } = arr;
  // 定义 minIndex，缓存当前区间最小值的索引，注意是索引
  let minIndex;
  // i 是当前排序区间的起点
  for (let i = 0; i < length - 1; i++) {
    // 初始化 minIndex 为当前区间第一个元素
    minIndex = i;
    // i、j分别定义当前区间的上下界，i是左边界，j是右边界
    for (let j = i; j < length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // 如果 minIndex 对应元素不是目前的头部元素，则交换两者
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return arr;
}

console.log(test(arr));
```

## 插入排序

```javascript
const arr = [3, 8, 2, 6, 4, 10, 1];

function insertionSort(arr) {
  const { length } = arr;
  for (let i = 1; i < length; i++) {
    let prevIndex = i - 1,
      currArr = arr[i];

    while (prevIndex >= 0 && arr[prevIndex] > currArr) {
      arr[prevIndex + 1] = arr[prevIndex]; // 将元素移动到下一位
      prevIndex--;
    }

    arr[prevIndex + 1] = currArr;
  }

  return arr;
}

console.log(insertionSort(arr));

function insertSort(arr) {
  const { length } = arr;

  for (let i = 1; i < length; i++) {
    let j = i;
    // 缓存当前元素
    let cur = arr[i];
    // 判断 j 前一个元素是否比当前元素大
    while (j > 0 && arr[j - 1] > cur) {
      // 如果是，则将 j 前面的一个元素后移一位，为 cur 让出位置
      arr[j] = arr[j - 1];
      j--;
    }
    // 循环让位，最后得到的 j 就是 cur 的正确索引
    arr[j] = cur;
  }
}

```

## 快速排序

```javascript
const arr = [3, 8, 2, 6, 4, 10, 1];

function quickSort(arr) {
  function sort(arr, start, end) {
    if (start >= end) {
      return;
    }
    let base = arr[start];
    let i = start,
      j = end;
    while (i < j) {
      // 从右往左挪动 j 直到找到比 base 小的值停下来
      while (i < j && arr[j] >= base) {
        j--;
      }

      // 从左往右挪动 i 直到找到比 base 大的值停下来
      while (i < j && arr[i] <= base) {
        i++;
      }

      if (i < j) {
        // 交换找到的符合条件的两个值
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    // 如果 i 和 j 值相同，将与 base 交换位置
    [arr[start], arr[i]] = [arr[i], arr[start]];
    sort(arr, start, i - 1);
    sort(arr, i + 1, end);
  }
  sort(arr, 0, arr.length - 1);
  return arr;
}

console.log(quickSort(arr));

```

## 归并排序

## 二分查找

## 列表转成树形结构

```javascript
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

```javascript
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

## 题目描述

```
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

## 代码实现

```javascript
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

```javascript
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

<a name="273a27cc-2"></a>

## 题目描述

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

<a name="83175ad0-1"></a>

## 代码实现

```javascript
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

<a name="edc2783b-17"></a>

### 🌰

```javascript
flatten(obj)
```

<a name="l8gYo"></a>

## 实现版本号排序
>
> 有一组版本号如下['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']。现在需要对其进行排序，排序的结果为 ['4.3.5','4.3.4.5','2.3.3','0.302.1','0.1.1']

```javascript
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

<a name="uwCPW"></a>

## 实现虚拟 dom 转换为真实 dom

<a name="273a27cc-3"></a>

## 题目描述

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

```javascript
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

<a name="edc2783b-18"></a>

### 🌰

```javascript
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

<a name="KOfhw"></a>

## 实现模板字符串解析功能

```javascript
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

<a name="cZhtN"></a>

#### 🌰

```javascript
const template = "我是{{name}}，年龄{{age}}，性别{{sex}}";
const data = {
  name: "Christine",
  age: 18,
};
console.log(parseTemplate(template, data)); // 我是Christine，年龄18，性别undefined
```

<a name="SfOz6"></a>

## 实现 Query 链式调用

**核心在于返回 this 才能支持链式调用**

```javascript
class Query {
  constructor(data) {
    this.data = data;
    this.collection = [];
  }

  where(callBack) {
    this.collection = this.data.filter(callBack);
    return this;
  }

  sortBy(callBack) {
    this.collection.sort(callBack);
    return this;
  }

  groupBy(key) {
    const map = {};
    for (let i = 0; i < this.collection.length; i++) {
      const item = this.collection[i];
      const value = map[item[key]] ? map[item[key]] : [];
      value.push(item);
      map[item[key]] = value;
    }
    this.collection = map;
    return this;
  }

  execute() {
    return this.collection;
  }
}
```

<a name="VoAOI"></a>

#### 🌰

```javascript
// 示例数据
const data = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 20 },
  { id: 4, name: "David", age: 25 },
  { id: 5, name: "Eve", age: 30 },
];

// 示例代码
const result = new Query(data)
  .where((item) => item.age > 20)
  .sortBy((a, b) => a.age - b.age)
  .groupBy("age")
  .execute();
```

<a name="IOgWf"></a>

## 实现数组去重（要求最佳时间复杂度）

```javascript
function test(arr) {
  const map = new Map();
  for (let i = arr.length - 1; i >= 0; i--) {
    if (map.has(arr[i])) {
      arr.splice(i, 1);
    } else {
      map.set(arr[i], true);
    }
  }
  return arr;
}

console.log(test([1, 7, 2, 5, 3, 2, 7, 5, 6, 8]));
```

<a name="McHHy"></a>

## 实现获取数组第二大的数（要求时间复杂度 O(n)）

```javascript
function getSecondValue(arr) {
  if (arr.length < 2) {
    return null;
  }
  let max = arr[0];
  let second = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      second = max;
      max = arr[i];
    } else if (arr[i] > second) {
      second = arr[i];
    }
  }
  return second;
}

console.log(getSecondValue([1, 2, 4, 6, 5, 7]));
```
