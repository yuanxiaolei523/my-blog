# 面试题

## 说一下你工作中解决过比较困难的问题，说一下项目中比较有亮点的地方

1. 首先是在于你平时的积累，我个人可能比较倾向于写 wiki 或者博客去记录的，这是一个非常良好的习惯，因为或许你今天能记得去年或者前年的解决过得问题，但是当你工作几年之后，肯定会忘记的，所以还是需要平时的积累(尽量不要记在 wiki 里，要不然等离职之后就没了哈哈哈)
2. 回答的时候，可以找一个比较有代表性的项目，该项目如何困难，你是怎么解决的，解决过程中遇到了又遇到了哪些问题，面试官主要考察的是你解决问题的能力，还有你变通的能力

## 你了解浏览器的事件循环吗

每执行一个宏任务，就去清空微任务队列
2.1 为什么浏览器内有事件循环的机制
因为 js 是单线程的，举一个场景，如果是多线程的情况下，一个线程去操作 DOM，对 DOM 做修改，然后另一个线程去删除该 DOM，那么到底是以哪个为准呢
2.2 你了解过 event loop 吗
了解过
2.3 那你知道 event loop 内的两种任务吗
宏任务: 整体的 script 代码、setTimeout、setInterval、I\O 操作
微任务: new Promise().then.catch.finally()、MutationObserver

2.4 聊聊 MutationObserver 主要是做什么的
MutationObserver 主要是用来监视对 DOM 的修改，new 的时候会创建并返回一个新的 MutationObserver，他会在指定的 DOM 发生变化时被调用
2.5 为什么要同时有宏任务和微任务，只有宏任务可以吗
不可以，因为宏任务是一个栈结构，遵循先进先出的原则，如果此时有一个优先级比较高的任务想要执行，该怎么处理呢

2.6 NodeJS 中的事件循环和浏览器的事件循环有什么不同
宏任务的执行顺序：

1. timer 定时器：执行已经安排过的 setTimeout 和 setInterval 的回调函数
2. pending callback 待定回调：执行延迟到下一个事件循环的 I\O 回调
3. idle、prepare：仅内部使用
4. poll：检索新的 I\O 事件，执行与 I\O 相关的回调
5. check：执行 setImmediate 的回调
6. close callback：关闭 socket

微任务和宏任务在 Node 中的执行顺序
node v10 及以前：

1. 执行完一个阶段内的所有任务
2. 执行 nextTick 队列中的内容
3. 清空微任务队列

Node V10 之后：
和浏览器一致

await 等同于将 await 后面的语句放入到 promise 中，然后该语句下的所有放到 then 函数内

```js
function async2() {
    console.log('async2');
}

async async1() {
    await async2();
    console.log('async1 end');

    ==> new Promise(() => {
        async2()
    }).then(() => {
        console.log('async1 end')
    })
}

```

## 时间的捕获和冒泡

1. 基本概念
   事件流：首先是捕获阶段，然后是目标阶段，最后是冒泡阶段
   捕获是自顶向下
   冒泡是自下向上
2. window.addEventListener('click', function () {})监听的是什么阶段的事件
   当第三个参数不传或者为 false 时代表冒泡阶段
   当第三个参数为 true 时代表捕获阶段
3. 平常有哪些场景用到了这个机制
   事件代理
4. 场景考察：一个历史页面，有很多的 button，每个 button 都有自己的逻辑，有自己的 click 事件
   新需求：给每个访问的用户一个 banned 属性，如果 banned 属性为 true，那么点击页面上的任何元素都不可响应原来的函数，而是直接 alert 你被封禁了

## 工作中用过防抖节流吗

1. 基本概念
   防抖：是持续触发事件的时候，在一段时间内，没有再触发事件时，事件处理函数才会再执行一次
   节流：是持续触发事件的时候，在一段时间内，每隔一定的时间会触发一次
2. 什么情况下使用
   节流：resize、scroll
   防抖：input 输入
3. 手写节流函数

## 了解 Promise 吗，平时用的多吗

如果回答多，则面试官可能会出难度较大的问题，但是如果回答少，则说明你与时代落伍了

Promise 其实在实例化的时候就已经执行了

1. Promise.all 有什么特性
   Promise.all 接受一个数组或者可以说一个具有 Iterator 接口的数据结构作为参数
   它的状态会有以下两种情形

-   只要有一个 rejected，那么 p 的状态就是 rejected
-   当三个都是 fullfilled 情况下，它的状态才是 fullfilled

2. 当一个 promise reject 之后，其他的 promise 还会执行吗
   答：会因为 promise 是在实例化的时候就已经执行了，所以不会中断

3. 手写一个 promise.all
   1.1 Promise.resolve 对参数类型的理解
   1.2 Promise.all 的输入参数和输出参数的顺序要保持一致
