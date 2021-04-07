# Promise



## Promise的含义

### Promise存在的意义

众所周知，在Promise出现之前，我们都是通过回调函数的形式来实现异步编程的，即在一件事情执行完之后，再去执行另外一件事情，但是这种情况下很容易产生回调地狱，造成代码的阅读不便性；当嵌套层数过多时，很难处理错误，所以ES6就推出了Promise



Promise可以理解为是一个容器，里面存储着未来某个事件发生的结果

从语法上讲Promise是一个对象，可以获取异步操作的消息



### Promise的特点

1. 对象的状态不受外界的影响

   `Promise`对象代表一个异步操作，有三种状态，pending、fullfilled、rejected，只有异步操作的结果，才能决定对象 的状态是哪一个，其他任何操作都无法改变

2. 对象的状态一旦改变，就不会再变，`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

#### Promise的缺点

1. 无法取消Promise，一旦新建就会**立即**执行
2. 如果不设置回调函数，那么内部抛出的错误，外部无法获取
3. 当处于pending状态时，无法得知目前进展到哪个阶段

## 基本用法



### 常用方法

#### 构造函数

ES6规定，Promise是一个构造函数，用来生成promise实例

```js
let p = new Promise((resolve, reject) => {
  if (true) {
     resolve() 
  } else {
    reject()
  }
})
```

Promise回调函数接收两个函数作为参数，一个是resolve(), 一个是reject(), resolve负责将Promise的状态从pending变为fullfilled，reject负责将Promise的状态从pending变为rejected，在异步操作失败时调用，并将错误当做reject的参数传出去



#### Promise.prototype.then(() => {}, () => {})

then函数是定义在Promise的原型上的，它的作用是为 Promise 实例添加状态改变时的回调函数

Promise返回实例可以调用then方法，我们可以通过then函数来处理Promise对象内部成功或者失败时的结果，第一个参数是当Promise的状态为resolve时调用，第二个参数当Promise的状态为reject时调用，这两个函数都是可选的

```js
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}

timeout(100).then((value) => {
  console.log(value); 
});
```

上面的代码会在100ms后打印出done



then方法返回的是一个`新的Promise实例`,因此可以链式调用then函数

链式调用的时候，只有当前一个then函数return了之后下一个才会执行



#### Promise.prorotype.catch

`Promise.prototype.catch()`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误时的回调函数。

当Promise内部有错误抛出时，就会被catch所捕获



```js
const promise = new Promise(function(resolve, reject) {
  throw new Error('test');
});
promise.catch(function(error) {
  console.log(error);
});
// Error: test
```

**如果Promise的状态已经是resolve了，那么再抛出错误也是无效的**

```js
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok
```

Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个`catch`语句捕获。



一般来说，不推荐使用then的第二个参数来捕获错误，推荐使用catch进行捕获

理由是第二种写法可以捕获前面`then`方法执行中的错误，也更接近同步的写法（`try/catch`）。因此，建议总是使用`catch()`方法，而不使用`then()`方法的第二个参数。



跟传统的`try/catch`代码块不同的是，如果没有使用`catch()`方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应

```js
function getAny(){
  return new Promise((resolve) => {
    resolve(x + 1)
  })
}
getAny().then(res => {
  console.log(res)
})
setTimeout(() => { console.log(123) }, 2000);

```

上面的执行，因为resolve(x+1), x并没有声明，所以会报错，但是2s后仍然会打印123，也就是说Promise内部的错误不会影响到外部的代码，promise会将错误吃掉



#### 在resolve之后报错

1. 在resolve之后同步报错

   ```js
   const promise = new Promise(function (resolve, reject) {
   	resolve("ok");
   	throw new Error("test");
   });
   promise
   	.then(function (value) {
   		console.log(value, "then");
   	})
   	.catch((res) => {
   		console.log(res, "catch");
   	});
   // ok, then
   ```

   

2. 在resolve之后异步报错

   ```js
   const promise = new Promise(function (resolve, reject) {
   	resolve("ok");
   	// throw new Error("test");
   	setTimeout(function () {
   		throw new Error("test");
   	}, 0);
   });
   promise
   	.then(function (value) {
   		console.log(value, "then");
   	})
   	.catch((res) => {
   		console.log(res, "catch");
   	});
   // ok, then
   // 未捕获的错误
   ```

   上面的代码中Promise是在下一轮事件循环中抛出错误，此时Promise已经执行完毕了，所以catch不会去捕获错误了,这种错误就已经抛出到Promise外部了，会阻断后续程序的执行



catch的返回值还是一个Promise,所以catch后面还可以跟then或者catch方法



***Promise新建后就会立即执行***

```js
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');
// promise hi resolved
```



case: 使用Promise实现一个Ajax

```js
function getData (url) {
  return new Promise((resolve, reject) => {
    const handler = function () {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status=== 200) {
        resolve(this.response)
      } else {
        reject(this.response)
      }
    }
    const client = new XMLHttpRequest();
    client.open('GET', url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();
  })
}

```



如果调用`resolve`函数和`reject`函数时带有参数，那么它们的参数会被传递给回调函数。`reject`函数的参数通常是`Error`对象的实例，表示抛出的错误；`resolve`函数的参数除了正常的值以外，还可能是另一个 Promise 实例，比如像下面这样。

```js
let p1 = new Promise((resolve) =>
	setTimeout(() => {
		resolve(456);
	}, 2000)
);

let p2 = new Promise((resolve) => {
	console.log(123);
	resolve(p1);
}).then((res) => {
	console.log(res);
});

```

上面的例子p1在2s后会进行resolve，然后p2 resolve的参数是p1，此时会先打印123，然后等到p1的状态改变了之后，才会resolve，然后then方法内打印456

如果p1的状态是pending，那么resolve就会等待p1的状态改变之后执行，要注意的是，**其并不会阻断后面代码的执行**(调用`resolve`或`reject`并不会终结 Promise 的参数函数的执行。)，如果resolve(p1)后面有console.log(342), 那么342会在123之后进行打印



注意如果**resolve的参数是reject函数调用结果的话，那么就会造成当前promise对象的状态无效，取决于参数内的reject**

```js

let p;
p = new Promise((resolve, reject) => {
	resolve(reject("12"));
})
	.then((res) => {
		console.log(res, "then");
	})
	.catch((res) => {
		console.log(res, "catch");
	});
// 12, catch
```



我们来看下面这个例子

```js
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error, 'catch'))

// error fail, catch
```

当然反过来也是这样子的