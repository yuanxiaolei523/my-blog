## Vue

### 一、把你了解的Vue响应式原理阐述一下
首先了解Vue中的三个核心类：
1. Observer: 给对象的属性添加getter和setter，用于**依赖收集**和**派发更新**。
2. Dep: 用于收集当前响应式对象的依赖关系，每一个响应式对象都有一个dep实例. dep.subs=watcher[]。当**数据发生变更**的时候，会通过dep.notify()通知各个watcher
3. Watcher: 观察者对象，render watcher、computed watcher、user watcher(watch)

* 依赖收集
1. initState：对computed属性初始化的时候，就会触发computed watcher依赖收集
2. 对watcher属性初始化的时候，会触发user watcher依赖收集
3. render：渲染的时候触发render watcher

* 派发更新
Object.defineProperty()
 1. 组件中对响应的数据进行了修改，会触发setter逻辑。
 2. dep.notify()
 3. 遍历所有的subs，调用每一个watcher的update方法

总结：
当创建vue实例时，vue会编译data里面的属性，通过Object.defineProperty为属性添加getter和setter对数据的读取进行劫持

getter: 用于依赖收集
setter：用于派发更新
每个组件的实例都会有相应的watcher实例

### 二、计算属性的实现原理
computed watcher: 计算属性的监听器

computed watcher持有一个dep实例，通过dirty属性标记计算属性是否需要重新求值。

当computed的依赖值改变后，就会通知订阅的watcher进行更新，对于computed watcher会将dirty属性设置为true，并且进行计算属性方法的调用

1. computed所谓的缓存是什么？
计算属性是基于它的响应式依赖进行缓存的，只有依赖发生改变的时候，才会重新求值。

2. 那computed缓存存在的意义是什么？或者说你经常在什么时候使用？
比如计算属性方法内部操作非常的耗时，遍历一个极大的数组，计算一次可能要耗时1s.
```js

let largeArray = [
    {...},
    {...},
    {...},
    {...},
]

data: {
    id: 1
}

computed: {
    currentItem: function () {
        return largeArray.find(item => item.id === this.id)
    },
    stringId: function () {
        return String(this.id);
    }
}
```
当你需要获取到id为1的数据的时候，computed会有缓存，如果你一直想要访问id为1的数据的时候，只要largeArray没有发生改变，那么我们可以秒获取到，因为已经存到缓存里了。不需要再去遍历了。

3. 以下情况，computed可以监听到数据的变化吗？
只有经过Observer将data变为响应式数据之后，才能被计算属性监听到
```js
template
    {{ storageMsg }}
computed: {
    storageMsg: function () {
        return sessionStorage.getItem('xxx');
    },
    time: function () {// 不能响应的更新模板
        return Date.now();
    }
}
created () {
    sessionStorage.setItem('xxx', 111)
}
onClick() {
    sessionStorage.setItem('xxx', Math.random())
}
```

4. watch和computed的区别
1.1 watch是监听到某个数据变化后，做某些操作，而computed是为了监听到某个数据的渲染之后，更新其他的数据
2.1 watch是没有缓存的，computed是有缓存的

### 三、Vue.nextTick()的原理

```js
Vue.nextTick(() => {

})
```

Vue的异步执行DOM更新的，一旦观察到数据的变化，Vue就会开启一个任务队列，把同一个事件循环中观察数据的watcher推送进这个队列，如果同一个watcher触发多次，那只会被推进队列一次，当下次事件循环时，vue会清空异步队列，并且进行dom更新(在下一次时间循环里面)

Promise.then -> MutationObserver -> setImmediate -> setTimeout

vm.someData = 'new value', 此时dom并不会马上更新，而是在异步队列被清除时才会更新dom

宏任务 -> 微任务队列 -> UI render
如果当前的浏览器支持promise或者MutationObserver，那么此时其会在微任务队列中去执行，那此时不就在UI render之前执行了吗。这是因为，UI render只是浏览器将元素渲染出来，其实dom节点已经更新过了，所以vue.nextTick也是可以拿到渲染之后的DOM的。

一般什么时候用到nextTick呢？

在数变化后要执行某个操作，而这个操作依赖因你数据改变而改变的DOM，这个操作就应该被放到vue.nextTick回调中

```js
<template>
    <div v-if="loaded" ref="test/>
</template>

async showDiv () {
    this.loaded = true; // 因为这里将div显示出来
    // this.$refs.test // 这里会同步获取ref为test的dom(无法获取到)
    await Vue.nextTick();
    this.$refs.test.xxx();
}
```

### 四、手写一个简单的vue，实现响应式的更新
1. 首先新建一个目录
* index.html 主页面
* vue.js Vue主文件
* compiler.js 编译模板、解析指令
* dep.js 收集依赖关系，存储观察者 //以发布订阅的形式实现
* observer.js 数据劫持
* watcher.js 观察者对象的类

2. index.html内填内容
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>My Vue</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>

```

3. 初始化vue class
```js
export default class Vue {
    constructor(options = {}) {
        this.$options = options;
        this.$data = options.data;
        this.$methods = options.methods;
        this.initRootElement(options);
    }

    /**
     * 获取根元素，并存储到vue实例，检查传入的el是否合规
     * @param {*} options 
     */
    initRootElement (options) {
        // 如果传入的是一个string，那可能传入的是id或者class
        if (typeof options.el === 'string') {
            this.$el = document.querySelector(options.el);
        } else if (options.el instanceof HTMLElement) {
            // 如果传入的是一个HTML元素
            this.$el = options.el
        }
        if (!this.$el) {
            throw new Error('传入的el不合法，请传入css selector或者HTMLElement')
        }
    }
}
```

4. 新建index.js 验证

5. vue中的data可以通过this访问的

```js
_proxyData(data) {
    Object.keys(data).forEach(key => {
        Object.defineProperty(this, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                return data[key]
            },
            set: function (newValue) {
                if(!data[key] === newValue) {
                    return;
                }
                data[key] = newValue;
            }
        })
    })
}
```
6. 接下来先把几个核心类声明好
具体的实现先不管。

写好注释，对于外界会引用的方法，使用jsDoc的方式注释
* dep
```js
export default class Dep {
    constructor() {
        // 存储所有的观察者
        this.subs = [];

    }
    /**
     * 添加观察者
     */
    addSub(watcher) {

    }
    /** 发送通知 */
    notify() {

    }
}
```
* observer
```js
export default class Observer {
    constructor (data) {
        this.traverse(data)
    }
    /** 递归遍历data里的所有属性 */
    traverse(data) {

    }
    /** 给传入的数据设置getter/setter */
    defineReactive (obj, key, val) {

    }
}
```