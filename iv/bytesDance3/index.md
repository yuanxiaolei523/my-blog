## React 
### React Fiber
1. 对于react原理的了解
2. 对于新技术的敏感程度，求知欲

* 目的
为了使react渲染的过程中可以被中断，可以将控制权交还给浏览器,可以让位给高优先级的任务，浏览器空闲后再恢复渲染

对于计算量比较大的js计算或者dom计算，就不会显得特别卡顿，而是一帧一帧有规律的执行任务
```js
const tasks = [];
// 用于执行任务
function * run () {
    let task;
    while (task = task.shift()) {
        if(hasHighPriorityTask()) {
            yield;
        }
        execute(task); // 每一个10s，当有10个task的时候，需要阻塞100s
    }
}

const iterator = run();
iterator.next();
```

1. generator有类似的功能，为什么不直接使用
* 要使用generator，每一个函数都要加*，每一步中断都需要加yield，开发量会很大。
* generator内部是有状态的，很难在恢复执行的时候

2. 如何判断当前是否有高优先级的任务
目前js并没有什么方法去判断某个任务的优先级

只能约定一个合理的执行时间，当超过了这个执行时间，如果任务仍然没有执行完成，中断当前任务，将控制权交还给浏览器

每秒60帧，1000ms/60f = 16ms/f;(所以一个函数最多执行时间为16ms)

requestIdleCallback
使浏览器在有空的时候，执行我们的回调，这个回调会传入一个参数，表示浏览器有多少时间供我们执行任务

* 浏览器在一帧内有做什么事情
处理用户输入时间
js执行
requestAnimation调用
布局 layout
绘制 paint
上述一共用了10ms，那么还剩6ms可以用于requestIdleCallback

如果上述所有的用了16ms怎么办？看下面

* 浏览器很忙怎么办
requestIdleCallback 提供了一个timeout(100ms)参数，当浏览器很忙时，如果超过timeout还没执行回调，那么会在下一帧强制执行回调

* 兼容性
很差，通过messageChannel 模拟实现的功能

* timeout超时后，就一定会执行吗

不是的，react里面预定了5个优先级的等级

1. Immediate：最高优先级，这个优先级的任务应该立即执行，不能被中断
2. UserBlocking：这些任务一般是交互的结果，需要及时得到反馈
3. Normal：不需要用户立即感受到的变化，比如网络请求(没那么急，但是必须要执行)
4. Low：这些任务可以延后，但是最终也需要执行
5. Idle: 可以被无限期的延后

## 平时用过高阶组件吗？什么是高阶组件？高阶组件能用来做什么
简称：HOC， High Order Component

1. 是一个函数
2. 入参是一个组件，
3. 返回值是一个新的组件
4. 是一个纯函数，不应该有任何的副作用


## 手写代码实现useState

const [count, setCount] = useState(0);

```js
```