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
使浏览器在**有空**的时候，执行我们的回调，这个回调会传入一个参数，表示浏览器有多少时间供我们执行任务

* 浏览器在一帧内有做什么事情
处理用户输入时间
js执行
requestAnimation调用
布局 layout
绘制 paint
上述一共用了10ms，那么还剩6ms可以用于requestIdleCallback

什么时候浏览器才算是有空。
浏览器在一帧内应该做上述哪些事情，在做完自己的本职工作之后，如果在该帧内还有剩余时间，这就是浏览器有空的时候

如果上述所有的用了16ms怎么办？看下面

* 浏览器一直没空怎么办
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
简称：HOC， High Order Components
HOC是
1. 是一个函数
2. 入参是一个原来的组件，
3. 返回值是一个新的组件
4. 是一个纯函数，不应该有任何的副作用(每次输入的相同，得到的结果也是相同的)

###  怎么写一个高阶组件
1. 普通方式
```js
function sayHello(name) {
    console.log(`say hello world, my name is ${name}`)
}
function sayBye (name) {
    console.log(`say bye world, my name is ${name}`);
}

function func(fn) {
    const sayFunc = () => {
        const myName = sessionStorage.getItem('name');
        fn(myName)
    }
    return sayFunc;
}

let fn1 = func(sayHello);
let fn2 = func(sayBye)
```
2. 装饰器的形式


3. 多个高阶组件的组合


### 高阶组件能用来做什么？从技术层面上？
1. 属性代理
    1.1 操作props
    1.2 操作组件实例
2. 继承/劫持
    
### 什么是React Hooks，有什么优势？
可以不写class组件的情况下，使用state和其他react特性
useState
useEffect
useMeno

为什么不写class 而转向了hook的写法
#### class的缺点
1. 组件间的状态逻辑很难复用
组件间如果有state逻辑是相似的，class模式下基本上是用高阶组件完成的

虽然能够解决问题，但是我们还需要在组件外部再包一层元素，会导致层级非常冗余

2. 复杂的有状态组件组合会越来越复杂

3. 监听和定时器的操作，会被分散在各个区域

## 手写代码实现useState

const [count, setCount] = useState(0);

```js
```

