## 自我介绍
## 介绍项目
## 前端工程化
1. webpack的配置
具体介绍一下
2. 用过哪些plugin
HTMLwebpackPlugin
答得不是很多
3. Plugin和Loader分别是做什么的？怎么工作的？

4. 是否写过plugin和loader
写过loader
5. webpack的构建流程
答得不是很清楚
## 源码相关
1. vue的源码
2. react源码

## js相关
1. let、const、var的区别
```js
const a = {};
a.b = 123;
```
2. 异步编程的区别以及优缺点
3. async/await 的底层实现
generator

4. 写一下Promise.all

5. 看一道题目
```js
setTimeout(function () {
    console.log(1);
}, 0);
new Promise(function (resolve) {
    console.log(2);
    for(var i = 0; i < 10000; i++) {
        if (i === 999) {
            resolve();

        }
    }
    console.log(3);
}).then(function() {
    console.log(4);
})
console.log(5);
```
6.  如果几个异步请求没有关联，此时使用async await 如何解决
在await后面加Promise.all([p1, p2, p3]) 
6. 看一道题目
```js
function foo() {
     let a = b = 0;
     a++;
     return a;
}
foo();
typeof a;  ?
typeof b;   ?
```
 <!-- 介绍项目
 webpack的配置
 webpack的构建流程
 Plugin和Loader分别是做什么的？怎么工作的？
 是否写过plugin和loader
 vue的源码  放弃
 react源码
 Promise.all -->

