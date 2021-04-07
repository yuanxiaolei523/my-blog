### Promise.prototype.finally()
finally方法是在ES2018引入的，不管Promise对象的状态如何，都会执行的一个方法

finally的参数是一个回调函数，回调函数内不接收参数，这意味着，finally的执行的Promise的状态无关

finally方法的实现
```js
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```
上面代码中，不管前面的 Promise 是fulfilled还是rejected，都会执行回调函数callback。

从上面的实现还可以看到，finally方法总是会返回原来的值。

### Promise.all()
用于将多个Promise实例包装成一个Promise实例，包装成一个新的Promise
```js
const p = Promise.all([p1, p2, p3]);
```
上面代码中，Promise.all()方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，
如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。
另外，Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

#### 新的Promise状态的确定
调用Promise.all()返回的实例的状态会有一下两种情况
1. 当p1、p2、p3的状态都为fullfilled的时候，p的状态才会是fullfilled，此时会返回一个由p1、p2、p3返回值组成的数组
**顺序和传入Promise时的顺序相同**
   
2. 只要三个中有一个reject了，那么p的值就会变成reject，此时第一个reject实例的返回值会被返回，
   
**注意：其中一个Promise rejected了之后，并不会影响其他Promise的执行**
```js
let p1 = new Promise(resolve => {
    console.log('p1')
    resolve(1);
})

let p2 = new Promise((resolve, reject) => {
    console.log('p2')
    reject(1)
})
let p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('p3');
        resolve(1)
    })
})
Promise.all([p1, p2, p3]).catch(e => {
    console.log(e)})

// p1 p2 1 p3(1s后打印)
```

如果p1自己定义了自己的catch方法，当p1报错时，Promise.all()后面的catch方法不会执行，这种情况下，p1返回的仍然是fullfilled，因为他的错误已经被捕获了
```js
const p1 = new Promise((resolve, reject) => {
    resolve('hello');
})
    .then(result => result)
    .catch(e => e);

const p2 = new Promise((resolve, reject) => {
    throw new Error('报错了');
})
    .then(result => result)
    .catch(e => e);

Promise.all([p1, p2])
    .then(result => console.log(result, 'then'))
    .catch(e => console.log(e));
// [hello, 报错了], then
```
解释一下：首先p1的状态是resolve，这个是没有争议的，关于p2，最开始throw error之后，他的状态变为rejected，但是因为定义了自己的catch方法
所以会被catch捕获到，因为catch会返回一个新的Promise，所以Promise.all内两个实例都是resolved，所以会执行then方法