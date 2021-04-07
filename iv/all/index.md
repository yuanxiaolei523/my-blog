# 面试题

## 一、框架类

### 1. 写 React / Vue 项目时为什么要在列表组件中写 key， 其作用是什么?

key 是给每一个 vnode 的唯一 id,可以依靠 key,更准确,更快的拿到 oldVnode 中对 应的 vnode 节点

### 2. diff 算法

react 的 diff 算法，会首先比较两棵树的根节点，不同类型的根节点的元素会有不同的形态

#### 对比不同类型的元素

当根节点的元素不同时，React 会拆卸原有的树，然后创建一颗新树。
当卸载一棵树时，对应的 DOM 节点也会被销毁，组件将被执行 componentWillUnmount 方法，紧接着执行 componentDidMount()方法，所有与之前树相关的 state 也会被销毁

#### 对比相同类型的元素

当对比两个相同类型的 React 元素时，React 会保留 DOM 节点，仅比对及更新有改变的属性。比如：

```js
<div className="before" title="stuff" />

<div className="after" title="stuff" />
```

在处理完当前节点之后，React 继续对子节点进行递归。

#### 对比同类型的组件元素

当一个组件更新时，组件实例会保持不变，因此可以在不同的渲染时保持 state 一致。React 将更新该组件实例的 props 以保证与最新的元素保持一致，并且调用该实例的 UNSAFE_componentWillReceiveProps()、UNSAFE_componentWillUpdate() 以及 componentDidUpdate() 方法。

下一步，调用 render() 方法，diff 算法将在之前的结果以及新的结果中进行递归。

#### 对子节点进行递归

默认情况下，当递归 DOM 节点的子元素时，React 会同时遍历两个子元素的列表；当产生差异时，生成一个 mutation。

**在子元素列表的末尾新增元素，更新的开销会更小**

```js
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

上面的代码中首先会先匹配`<li>first</li>`的子树，然后匹配`<li>second</li>`对应的树，最后插入的第三个元素的树

如果是将 third 插入到子元素的头部时，更新的开销将会更大

```js
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
```

首先对比第一个元素`<li>Duke</li>`和`<li>Connecticut</li>`,react 发现两者不同，因此会删除旧节点，创建新节点，对比第二个元素也是这样，对比第三个 li 时，会创建一个 li，这种情况下会有性能问题，所以 react 中引入了 key

#### keys

为了解决上述问题，React 引入了 key 属性。当子元素拥有 key 时，React 使用 key 来匹配原有树上的子元素以及最新树上的子元素。以下示例在新增 key 之后，使得树的转换效率得以提高：

```js
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```

现在 React 会根据 key 去进行对比，发现 key 为 2014 的元素不存在，所以会创建，对比 2015 和 2016 的元素

## 二、JS 类

### 1. ['1', '2', '3'].map(parseInt) what & why ?

首先先说答案,1, NaN, NaN
解释：

#### parseInt

首先说 parseInt(str, radix)函数，parseInt 接受两个参数，第一个是字符串，第二个要转成的进制数,

-   str 如果传入的不是一个字符串，那么将会调用 toString 将其转换为字符串
-   radix 是 2-36 之间的整数，如果不传或者将传入 0，则将按照一下规则进行解析
    1.1 如果 str 以 0 开头，那么将按照 8 进制进行解析
    1.2 如果 str 以'0X'或者'0x'开头，则 str 将以 16 进制进行解析
    1.3 如果输入的 string 以任何其他值开头， radix 是 10

如果第一个字符不能转换为数字，parseInt 会返回 NaN。
如果一个字符并不是有效的数字，parseInt 会返回 NaN

```js
let a = parseInt("234", "2"); // 2进制的有效数字是0、1，故返回NaN
```

非数字开头的字符串，parseInt 会返回 NaN

```js
parseInt("123abc123"); // 123
parseInt(" "); // NaN
parseInt("abc123"); // NaN
```

如果 str 是小数，那么将会下取整
下面我们来看题目,题目是`[1, 2, 3].map(parseInt)`，首先会对数组进行 map 遍历，然后 map 函数接受一个回调函数，回调函数的参数分别为 value、index，这里用的是 parseInt 作为回调函数，

1. 第一轮循环的时候，parseInt 接收到的参数为 1、0，当 parseInt 的第二个值为 0 的时候，当做 10 进制来处理，所以第一轮返回的就是 1，
2. 当第二轮循环的时候，传入到 parseInt 的值为 2、1，因为第二个参数不是 2-36 之间的，并且，第一个参数也不是以 0 或者 0x 开头的，所以返回的是 NaN
3. 当第三轮的时候，传入到 parseInt 的值为 3、2，因为 3 在二进制中并不是一个有效的数字，所以返回 NaN

### 2. 什么是防抖节流？有什么区别、使用场景、如何实现

#### 定义

防抖是指持续触发事件时，在一段时间内，没有再次触发事件时，函数才会执行一次

节流是指持续触发事件时，在一段时间内，每隔一定的时间就会触发一次

#### 使用场景

防抖：input输入

节流：resize、scroll

#### 实现

1. 防抖

   ```js
   function debounce (fn, delay) {
     let timer;
     return function () {
       let args = [...arguments];
       let context = this;
       if (timer) {
         clearTimeout(timer);
       }
       timer = setTimeout(() => {
         fn.apply(this, args);
       }, delay)
     }
   }
   
   ```

2. 节流

节流我们准备分三版进行开发

```js
function throttle(fn, delay) {
  let startTime = Date.now();
  return function (...args) {
    let now = Date.now();
    if (now - startTime > delay) {
      fn.apply(this, args)
      startTime = now;
    }
  }
}
```

上面第一版有一个缺点，就是第一次点击会立即执行，有什么方法不让他第一次就执行呢

```js
function throttle(fn, delay) {
  let timer;
  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay)
  }
}

```

上面的方法也有缺点，就是最后一次不会立即执行，有什么方法能让最后一次立即执行呢

```js
function throttle (fn, delay) {
  let startTime = Date.now();
  let timer;
  return function (...args) {
    let now = Date.now();
    let context = this;
    let remaining = delay - (now - startTime);
    timer && clearTimeout(timer);
    if (remaining <= 0) {
      fn.apply(context, args);
      startTime = now;
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, remaining)
    }
    
  }
}
```

### 3.  介绍下Set、Map、WeakSet、WeakMap的区别
Set是一种类似于数组的结构，构造函数可以传入一个数组(或者其他具有iterator接口的数据解构)，首先其内部存储的值是唯一的。具有siz属性，可以用于遍历

WeakSet和Set大致相同，主要的区别有三点，
一是WeakSet的成员只能是非基本类型(数组、对象、函数)，不能是其他的数据结构；
二是WeakSet中的对象都是弱引用的，可以有效的避免内存泄露
三是WeakSet没有size属性，不支持遍历方法
```js
let wsArr = new WeakSet([[1, 2]])
let wsObj = new WeakSet([{name: 12}])
let a = function () {}
let wsFun = new WeakSet([a])

let ws = new WeakSet([1]) // error
```

Map是一种类似于对象的数据结构， 是一个键值对的集合，出现Map的原因就是因为传统的Object只能使用字符串作为key，而Map可以使用任意类型的结构作为key
Map是可遍历的，其构造函数可以传入一个二维数组

WeakMap和Map大致相似，其最主要的区别就是，
1. WeakMap的key只能是对象,null除外
2. WeakMap的key是弱引用的
3. 不能遍历

### 4. 如何解决for循环下setTimeout的打印问题
#### issue
```js
for (var i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i)
    }, i * 100)
}
// 会打印5个5
```
这是因为setTimeout是一个异步操作，是一个宏任务，需要等到同步代码执行完毕后再去执行
，那么如何让它正常的打印呢
#### resolve
1. 借助于let的块级作用域
```js
for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i)
    }, i * 100)
}
```
2. 借助于闭包
```js
for(var i = 0; i < 5; i++) {
    ((j) => {
        setTimeout(() => {
            console.log(j)
        }, j * 100)
    })(i)
}
```
3. 借助于setTimeout的第三个参数
这也是为什么我又写这个题的原因，以前只知道使用前两种方式去解决这个问题，
   但是自从我了解到setTimeout的第三个参数之后，我才知道原来还可以这样解决
   
首先介绍setTimeout(fn, duration, params)
参数
    - fn: 是一个回调函数
    - duration: 多长时间之后执行回调函数
    - params: 会作为fn的参数
下面我们来看下解决方法
```js
for (let i = 0; i < 5; i++) {
    setTimeout((j) => {
        console.log(j)
    }, i * 100, i)
}
```
这样也可以完美解决了
