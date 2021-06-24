### 4. 如何解决for循环下settimeout的打印问题
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