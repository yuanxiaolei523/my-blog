## react
### react fiber

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

2. 如何判断当前是否有高优任务？
目前js并没有什么方法去判断某个任务的优先级

只能约定一个合理的执行时间，当超过了这个执行时间，如果任务仍然没有执行完成，中断当前任务，将控制权交还给浏览器