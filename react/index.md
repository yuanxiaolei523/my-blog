# React源码解析
### React的瓶颈
#### CPU的瓶颈
当项目变得庞大、组件数量繁多时，就会有CPU的瓶颈

我们知道主流浏览器刷新频率为60Hz，即每（1000ms / 60Hz）16.6ms浏览器刷新一次。
同时js可以操作DOM，GUI渲染线程与js线程是互斥的，所以JS脚本执行和浏览器布局、绘制不能同时执行

在每16.6ms时间内，需要完成如下工作：
`JS脚本执行 -----  样式布局 ----- 样式绘制`
当JS执行时间过长，超出了16.6ms，这次刷新就没有时间执行样式布局和样式绘制了。
`

React是如何解决这个问题的呢
在浏览器每一帧的时间中，预留一些时间给JS线程，React利用这部分时间更新组件（可以看到，在源码 (opens new window)中，预留的初始时间是5ms）。
当预留的时间不够用时，React将线程控制权交还给浏览器使其有时间渲染UI，React则等待下一帧时间到来继续被中断的工作。

所以，解决CPU瓶颈的关键是实现时间切片，而时间切片的关键是：`将同步的更新变为可中断的异步更新`。

### IO的瓶颈
前端无法处理


## React16 的架构分为三层
1. scheduler(调度器) —— 调度任务的优先级，高优任务优先进入Reconciler
2. Reconciler（协调器）—— 负责找出变化的组件
3. Renderer（渲染器）—— 负责将变化的组件渲染到页面上

### scheduler调度器
既然我们以浏览器是否有剩余时间作为任务中断的标准，那么我们需要一种机制，当浏览器有剩余时间时通知我们。

其实部分浏览器已经实现了这个API，这就是requestIdleCallback 
但是由于以下因素，React放弃使用：

* 浏览器兼容性
* 触发频率不稳定，受很多因素影响。比如当我们的浏览器切换tab后，之前tab注册的requestIdleCallback触发的频率会变得很低

基于以上原因，`React`实现了功能更完备的`requestIdleCallback`polyfill，这就是**Scheduler**。除了在空闲时触发回调的功能外，**Scheduler**还提供了多种调度优先级供任务设置。

在Scheduler中的每的每个任务的优先级使用过期时间表示的，如果一个任务的过期时间离现在很近，说明它马上就要过期了，优先级很高，如果过期时间很长，那它的优先级就低，没有过期的任务存放在timerQueue中，过期的任务存放在taskQueue中，timerQueue和taskQueue都是小顶堆，所以peek取出来的都是离现在时间最近也就是优先级最高的那个任务，然后优先执行它。

### Reconciler(协调器)

它的主要目标是：

- 能够把可中断的任务切片处理。
- 能够调整优先级，重置并复用任务。
- 能够在父元素与子元素之间交错处理，以支持 React 中的布局。
- 能够在 `render()` 中返回多个元素。
- 更好地支持错误边界。

在React15中，我们知道，在`React`中可以通过`this.setState`、`this.forceUpdate`、`ReactDOM.render`等API触发更新。

- 调用函数组件、或class组件的`render`方法，将返回的JSX转化为虚拟DOM
- 将虚拟DOM和上次更新时的虚拟DOM对比
- 通过对比找出本次更新中变化的虚拟DOM
- 通知**Renderer**将变化的虚拟DOM渲染到页面上

我们知道，在React15中**Reconciler**是递归处理虚拟DOM的，在V16中，更新工作从递归变成了可以中断的循环过程。每次循环都会调用`shouldYield`判断当前是否有剩余时间。(MessageChannel)

```js
function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    workInProgress = performUnitOfWork(workInProgress);
  }
}
```

那么React16是如何解决中断更新时DOM渲染不完全的问题呢？

Reconciler发生在render阶段，render阶段会分别为节点执行beginWork和completeWork（后面会讲），或者计算state，对比节点的差异，为节点赋值相应的effectFlags（对应dom节点的增删改）

协调器是在render阶段工作的，简单一句话概括就是Reconciler会创建或者更新Fiber节点。在mount的时候会根据jsx生成Fiber对象，在update的时候会根据最新的state形成的jsx对象和current Fiber树对比构建workInProgress Fiber树，这个对比的过程就是diff算法。

diff算法发生在render阶段的reconcileChildFibers函数中，diff算法分为单节点的diff和多节点的diff（例如一个节点中包含多个子节点就属于多节点的diff），单节点会根据节点的key和type，props等来判断节点是复用还是直接新创建节点，多节点diff会涉及节点的增删和节点位置的变化，详细见第9章。

reconcile时会在这些Fiber上打上Flags标签，在commit阶段把这些标签应用到真实dom上，这些标签代表节点的增删改，如

```js
export const Placement = /*             */ 0b0000000000010;
export const Update = /*                */ 0b0000000000100;
export const PlacementAndUpdate = /*    */ 0b0000000000110;
export const Deletion = /*              */ 0b0000000001000;
```

整个**Scheduler**与**Reconciler**的工作都在内存中进行。只有当所有组件都完成**Reconciler**的工作，才会统一交给**Renderer**。

render阶段遍历Fiber树类似dfs的过程，‘捕获’阶段发生在beginWork函数中，该函数做的主要工作是创建Fiber节点，计算state和diff算法，‘冒泡’阶段发生在completeWork中，该函数主要是做一些收尾工作，例如处理节点的props、和形成一条effectList的链表，该链表是被标记了更新的节点形成的链表

```js
顺便说下fiberRoot是整个项目的根节点，只存在一个，rootFiber是应用的根节点，可能存在多个，例如多个ReactDOM.render(<App />, document.getElementById("root"));
```



### Renderer（渲染器）

Renderer发生在commit阶段，commit阶段遍历effectList执行对应的dom操作或部分生命周期。

Renderer是在commit阶段工作的，commit阶段会遍历render阶段形成的effectList，并执行真实dom节点的操作和一些生命周期，不同平台对应的Renderer不同，例如浏览器对应的就是react-dom。

commit阶段发生在commitRoot函数中，该函数主要遍历effectList，分别用三个函数来处理effectList上的节点，这三个函数是commitBeforeMutationEffects、commitMutationEffects、commitLayoutEffects，他们主要做的事情如下，后面会详细讲解，现在在大脑里有一个结构就行

**Renderer**根据**Reconciler**为虚拟DOM打的标记，同步执行对应的DOM操作。

在React16架构中整个更新流程为：

![更新流程](./react-img/process.png)

其中红框中的步骤随时可能由于以下原因被中断：

- 有其他更高优任务需要先更新
- 当前帧没有剩余时间

由于红框中的工作都在内存中进行，不会更新页面上的DOM，所以即使反复中断，用户也不会看见更新不完全的DOM（即上一节演示的情况）。



### Fiber

本质上就是虚拟DOM

在`React15`及以前，`Reconciler`采用递归的方式创建虚拟DOM，递归过程是不能中断的。如果组件树的层级很深，递归会占用线程很多时间，造成卡顿。

为了解决这个问题，`React16`将**递归的无法中断的更新**重构为**异步的可中断更新**，由于曾经用于递归的**虚拟DOM**数据结构已经无法满足需要。于是，全新的`Fiber`架构应运而生。

#### Fiber的含义

1. 作为架构来说，之前`React15`的`Reconciler`采用递归的方式执行，数据保存在递归调用栈中，所以被称为`stack Reconciler`。`React16`的`Reconciler`基于`Fiber节点`实现，被称为`Fiber Reconciler`。
2. 作为静态的数据结构来说，每个`Fiber节点`对应一个`React element`，保存了该组件的类型（函数组件/类组件/原生组件...）、对应的DOM节点等信息。
3. 作为动态的工作单元来说，每个`Fiber节点`保存了本次更新中该组件改变的状态、要执行的工作（需要被删除/被插入页面中/被更新...）。

#### Fiber的结构

```js
function FiberNode(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
) {
  // 作为静态数据结构的属性
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // 用于连接其他Fiber节点形成Fiber树
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  // 作为动态的工作单元的属性
  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  this.effectTag = NoEffect;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  // 调度优先级相关
  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  // 指向该fiber在另一次更新时对应的fiber
  this.alternate = null;
}
```

#### 作为架构来说

每个Fiber节点有个对应的`React element`，多个`Fiber节点`是如何连接形成树呢？靠如下三个属性：

```js
// 指向父级Fiber节点
this.return = null;
// 指向子Fiber节点
this.child = null;
// 指向右边第一个兄弟Fiber节点
this.sibling = null;
```



### Lane模型

react之前的版本用`expirationTime`属性代表优先级，该优先级和IO不能很好的搭配工作（io的优先级高于cpu的优先级），现在有了更加细粒度的优先级表示方法Lane，Lane用二进制位表示优先级，二进制中的1表示位置，同一个二进制数可以有多个相同优先级的位，这就可以表示‘批’的概念，而且二进制方便计算。

```js
//ReactFiberLane.js
export const NoLanes: Lanes = /* */ 0b0000000000000000000000000000000;
export const NoLane: Lane = /*   */ 0b0000000000000000000000000000000;

export const SyncLane: Lane = /* */ 0b0000000000000000000000000000001;
export const SyncBatchedLane: Lane = /**/ 0b0000000000000000000000000000010;

export const InputDiscreteHydrationLane: Lane = /**/ 0b0000000000000000000000000000100;
const InputDiscreteLanes: Lanes = /**/ 0b0000000000000000000000000011000;

const InputContinuousHydrationLane: Lane = /**/ 0b0000000000000000000000000100000;
const InputContinuousLanes: Lanes = /* d*/ 0b0000000000000000000000011000000;

export const DefaultHydrationLane: Lane = /**/ 0b0000000000000000000000100000000;
export const DefaultLanes: Lanes = /**/ 0b0000000000000000000111000000000;

const TransitionHydrationLane: Lane = /**/ 0b0000000000000000001000000000000;
const TransitionLanes: Lanes = /**/ 0b0000000001111111110000000000000;

const RetryLanes: Lanes = /**/ 0b0000011110000000000000000000000;

export const SomeRetryLane: Lanes = /**/ 0b0000010000000000000000000000000;

export const SelectiveHydrationLane: Lane = /* */ 0b0000100000000000000000000000000;

const NonIdleLanes = /*    */ 0b0000111111111111111111111111111;

export const IdleHydrationLane: Lane = /**/ 0b0001000000000000000000000000000;
const IdleLanes: Lanes = /*  */ 0b0110000000000000000000000000000;

export const OffscreenLane: Lane = /* d */ 0b1000000000000000000000000000000;
```


### setState
主要流程
setState --> enqueueSetState --> enqueueUpState --> isBatchingUpdates

​		 --> true(组件入队dirtyComponents)
​         --> false(循环更新dirtyComponents里的所有组件)

```js
const classComponentUpdater = {
  // isMounted
  enqueueSetState(inst, payload, callback) {
    const fiber = ReactInstanceMap.get(inst)
    const currentTime = requestCurrentTime()
    const expirationTime = computeExpirationForFiber(currentTime, fiber)

    const update = createUpdate(expirationTime)
    update.payload = payload
    if (callback !== undefined && callback !== null) {
      update.callback = callback
    }

    enqueueUpdate(fiber, update)
    scheduleWork(fiber, expirationTime)
  },
  // replaceState
  enqueueForceUpdate(inst, callback) {
    const fiber = ReactInstanceMap.get(inst)
    const currentTime = requestCurrentTime()
    const expirationTime = computeExpirationForFiber(currentTime, fiber)

    const update = createUpdate(expirationTime)
    update.tag = ForceUpdate

    if (callback !== undefined && callback !== null) {
      update.callback = callback
    }

    enqueueUpdate(fiber, update)
    scheduleWork(fiber, expirationTime)
  },
}
```

`setState`调用`updater.enqueueSetState`，我们先不管这个对象什么时候设置进来的，先来看一下代码

setState`和`forceUpdate`的代码我们可以看到，几乎是一模一样的。唯一的区别是`Update.tag

关于`Update`和`UpdateQueue`的数据结构可以看[这里](https://react.jokcy.me/book/api/react-structure.html)

在当前节点对应的`Fiber`对象上创建了`Update`之后，进就如`scheduleWork`调度阶段。

#### enqueueSetState
enqueueSetState 主要做了两件事

* 将新的state塞进组件的状态队列里
* 调用enqueueUpdate处理将要更新的实例对象



#### enqueueUpdate

- `batchingStrategy` 是`React`内部专门用于管控批量更新的对象，其`isBatchingUpdates`属性决定了当下是走更新流程还是排队等待，`batchedUpdates` 方法可以直接发起更新流程
- 将`batchingStrategy` 类比“锁管理器”，则`isBatchingUpdates`是`React`全局唯一的任务“锁”，它初始值为`false` 意味着当前并未进行任何批量更新操作
- 当`React`调用`batchedUpdates` 执行更新动作时，会先把“锁”给关上（置为`true`）表明现在正处于批量更新过程中
- 关上“锁”后，任何需要更新的组件依次入队等候下一次的批量更新

## jsx和核心api

### virtual Dom是什么

一句话概括就是，用js对象表示dom信息和结构，更新时重新渲染更新后的对象对应的dom，这个对象就是React.createElement()的返回结果



