# Promise

## Promise 的含义

### Promise 存在的意义

众所周知，在 Promise 出现之前，我们都是通过回调函数的形式来实现异步编程的，即在一件事情执行完之后，再去执行另外一件事情，但是这种情况下很容易产生回调地狱，造成代码的阅读不便性；当嵌套层数过多时，很难处理错误，所以 ES6 就推出了 Promise

Promise 可以理解为是一个容器，里面存储着未来某个事件发生的结果

从语法上讲 Promise 是一个对象，可以获取异步操作的消息

### Promise 的特点

1. 对象的状态不受外界的影响

    `Promise`对象代表一个异步操作，有三种状态，pending、fullfilled、rejected，只有异步操作的结果，才能决定对象 的状态是哪一个，其他任何操作都无法改变

2. 对象的状态一旦改变，就不会再变，`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

#### Promise 的缺点

1. 无法取消 Promise，一旦新建就会立即执行
2. 如果不设置回调函数，那么内部抛出的错误，外部无法获取(不会阻断后续代码的执行)
3. 当处于 pending 状态时，无法得知目前进展到哪个阶段

## 基本用法

### 常用方法

#### 构造函数

ES6 规定，Promise 是一个构造函数，用来生成 promise 实例

```js
let p = new Promise((resolve, reject) => {
	if (true) {
		resolve();
	} else {
		reject();
	}
});
```

Promise 回调函数接收两个函数作为参数，一个是 resolve(), 一个是 reject(), resolve 负责将 Promise 的状态从 pending 变为 fullfilled，reject 负责将 Promise 的状态从 pending 变为 rejected，在异步操作失败时调用，并将错误当做 reject 的参数传出去

#### Promise.prototype.then(() => {}, () => {})

then 函数是定义在 Promise 的原型上的，它的作用是为 Promise 实例添加状态改变时的回调函数

Promise 返回实例可以调用 then 方法，我们可以通过 then 函数来处理 Promise 对象内部成功或者失败时的结果，第一个参数是当 Promise 的状态为 resolve 时调用，第二个参数当 Promise 的状态为 reject 时调用，这两个函数都是可选的

```js
function timeout(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, ms, "done");
	});
}

timeout(100).then((value) => {
	console.log(value);
});
```

上面的代码会在 100ms 后打印出 done

then 方法返回的是一个`新的`Promise 实例,因此可以链式调用 then 函数

链式调用的时候，只有当前一个 then 函数 return 了之后下一个才会执行

#### Promise.prototype.catch

`Promise.prototype.catch()`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误时的回调函数。

当 Promise 内部有错误抛出时，就会被 catch 所捕获

```js
const promise = new Promise(function (resolve, reject) {
	throw new Error("test");
});
promise.catch(function (error) {
	console.log(error);
});
// Error: test
```

如果 Promise 的状态已经是 resolve 了，那么再抛出错误也是无效的，此时实例的状态已经凝固了

```js
const promise = new Promise(function (resolve, reject) {
	resolve("ok");
	throw new Error("test"); // 无法被外部的try...catch捕获
});
promise
	.then(function (value) {
		console.log(value);
	})
	.catch(function (error) {
		console.log(error);
	});
// ok
```

Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个`catch`语句捕获。

一般来说，不推荐使用 then 的第二个参数来捕获错误，推荐使用 catch 进行捕获

理由是第二种写法可以捕获前面`then`方法执行中的错误，也更接近同步的写法（`try/catch`）。因此，建议总是使用`catch()`方法，而不使用`then()`方法的第二个参数。

跟传统的`try/catch`代码块不同的是，如果没有使用`catch()`方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应

```js
function getAny() {
	return new Promise((resolve) => {
		resolve(x + 1);
	});
}
getAny().then((res) => {
	console.log(res);
});
setTimeout(() => {
	console.log(123);
}, 2000);
```

上面的执行，因为 resolve(x+1), x 并没有声明，所以会报错，但是 2s 后仍然会打印 123，也就是说 Promise 内部的错误不会影响到外部的代码，promise 会将错误吃掉

#### 在 resolve 之后报错

1. 在 resolve 之后同步报错

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

2. 在 resolve 之后异步报错

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
    // 未捕获的错误：test
    ```

    上面的代码中 Promise 是在下一轮事件循环中抛出错误，此时 Promise 已经执行完毕了，所以 catch 不会去捕获错误了,这种错误就已经抛出到 Promise 外部了，会阻断后续程序的执行

catch 的返回值还是一个 Promise,所以 catch 后面还可以跟 then 或者 catch 方法

Promise 新建后就会立即执行

```js
let promise = new Promise(function (resolve, reject) {
	console.log("Promise");
	resolve();
});

promise.then(function () {
	console.log("resolved.");
});

console.log("Hi!");
// promise hi resolved
```

case: 使用 Promise 实现一个 Ajax

```js
function getData(url) {
	return new Promise((resolve, reject) => {
		const handler = function () {
			if (this.readyState !== 4) {
				return;
			}
			if (this.status === 200) {
				resolve(this.response);
			} else {
				reject(this.response);
			}
		};
		const client = new XMLHttpRequest();
		client.open("GET", url);
		client.onreadystatechange = handler;
		client.responseType = "json";
		client.setRequestHeader("Accept", "application/json");
		client.send();
	});
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

上面的例子 p1 在 2s 后会进行 resolve，然后 p2 resolve 的参数是 p1，此时会先打印 123，然后等到 p1 的状态改变了之后，才会 resolve，然后 then 方法内打印 456

如果 p1 的状态是 pending，那么 resolve 就会等待 p1 的状态改变之后执行，要注意的是，其并不会阻断后面代码的执行(调用`resolve`或`reject`并不会终结 Promise 的参数函数的执行。)，如果 resolve(p1)后面有 console.log(342), 那么 342 会在 123 之后进行打印

注意如果 resolve 的参数是 reject 函数调用结果的话，那么就会造成当前 promise 对象的状态无效，取决于参数内的 reject

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
	setTimeout(() => reject(new Error("fail")), 3000);
});

const p2 = new Promise(function (resolve, reject) {
	setTimeout(() => resolve(p1), 1000);
});

p2.then((result) => console.log(result)).catch((error) =>
	console.log(error, "catch")
);

// error fail, catch
```

当然反过来也是这样子的

#### Promise.prototype.finally()

finally 方法是在 ES2018 引入的，不管 Promise 对象的状态如何，都会执行的一个方法

finally 的参数是一个回调函数，回调函数内不接收参数，这意味着，finally 的执行的 Promise 的状态无关

finally 方法的实现

```js
Promise.prototype.finally = function (callback) {
	let P = this.constructor;

	return this.then(
		(value) => P.resolve(callback()).then(() => value),

		(reason) =>
			P.resolve(callback()).then(() => {
				throw reason;
			})
	);
};
```

上面代码中，不管前面的 Promise 是 fulfilled 还是 rejected，都会执行回调函数 callback。

从上面的实现还可以看到，finally 方法总是会返回原来的值。

#### Promise.all()

用于将多个 Promise 实例包装成一个 Promise 实例，包装成一个新的 Promise

```js
const p = Promise.all([p1, p2, p3]);
```

上面代码中，Promise.all()方法接受一个数组作为参数，p1、p2、p3 都是 Promise 实例，

如果不是，就会先调用下面讲到的 Promise.resolve 方法，将参数转为 Promise 实例，再进一步处理。

另外，Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

##### 新的 Promise 状态的确定

调用 Promise.all()返回的实例的状态会有以下两种情况

1. 当 p1、p2、p3 的状态都为 fullfilled 的时候，p 的状态才会是 fullfilled，此时会返回一个由 p1、p2、p3 返回值组成的数组，顺序和传入 Promise 时的顺序相同

2. 只要三个中有一个 reject 了，那么 p 的值就会变成 reject，此时第一个 reject 实例的返回值会被返回，

注意：其中一个 Promise rejected 了之后，并不会影响其他 Promise 的执行

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
})

// p1 p2 1 p3(1s后打印)
```

如果 p 自己定义了自己的 catch 方法，当 p2 报错时，Promise.all()后面的 catch 方法不会执行，这种情况下，p2 返回的仍然是 fullfilled，因为他的错误已经被捕获了

```js
const p1 = new Promise((resolve, reject) => {
	resolve("hello");
})
	.then((result) => result)
	.catch((e) => e);

const p2 = new Promise((resolve, reject) => {
	throw new Error("报错了");
})
	.then((result) => result)
	.catch((e) => e);

Promise.all([p1, p2])
	.then((result) => console.log(result, "then"))
	.catch((e) => console.log(e));

// [hello, 报错了], then
```

解释一下：首先 p1 的状态是 resolve，这个是没有争议的，关于 p2，最开始 throw error 之后，他的状态变为 rejected，但是因为定义了自己的 catch 方法

所以会被 catch 捕获到，因为 catch 会返回一个新的 Promise，所以 Promise.all 内两个实例都是 resolved，所以会执行 then 方法

#### Promise.race()

Promise.race()是用于将多个 Promise 包装成一个 Promise 实例

```js
const p = Promise.race([p1, p2, p3]);
```

如果 p1、p2、p3 中的某一个不是一个 Promise 实例，那么就会调用 Promise.resolve()方法来将其转换为 Promise 实例，在进一步处理

##### p 的状态

p 的状态和 Promise.all 有些不同，只要某一个实例的状态发生变化，p 的状态就会发生变化(和 p1-p3 中的状态一致)，率先变化的 Promise 实例的返回值，会传给 p 的回调函数

```js
const p = Promise.race([p2, p1, p3]);
p.then((res) => {
	console.log(res, "res");
}).catch((res) => {
	console.log(res, "catch");
});
console.log(p, "race");
// 如果p2是一个rejected，那么就会调用p的catch方法，如果是resolve，那么就会调用then
```

同时当有一个实例的状态为 resolve 时，并不会阻断其他 Promise 的执行

#### Promise.allSettled()

Promise.allSettled()接受一组 Promise 实例作为参数，返回一个新的 Promise 实例，只有等到所有的实例都返回了(fullfilled || rejected)，新的 Promise 实例的状态才会发生改变(一旦发生改变，promise 实例的状态总是 fullfilled)

```js
let p1 = new Promise((resolve) => {
	console.log("p1");
	resolve(1);
});
let p2 = new Promise((resolve, reject) => {
	console.log("p2");
	reject(1);
});
const p = Promise.allSettled([p1, p2]);

p.then((res) => {
	console.log(res);
});
// p1 p2
/
	res是一个数组
	[
    { status: 'fulfilled', value: 1 },
    { status: 'rejected', reason: 1 }
  ]
/
```

Promise.allSettled()的返回值 p，状态只能是 fullfilled，他的监听函数 then 函数接受一个数组，数组内有两个对象，每个对象有一个 status，用来标识这个实力的状态,只能是 fullfilled 或者 rejected，然后 fullfilled 状态的实例还会返回一个 value，用于显示 resolve 的值 ，rejected 状态的实例会返回一个 reason，用于显示 rejected 的值

##### 和 Promise.all 的区别

1. 首先是状态 Promise.all 的状态取决于每个实例的状态，当所有的实例都为 resolve 时，p 才为 resolved,只要有一个 rejected，那么 p 就是 rejected，而 Promise.allSettled()是只有等所有的实例的状态都返回了，就会变成 fullfilled
2. 可以使用 Promise.allSettled()来确定是否所有的异步操作都已经结束了，但是 Promise.all 却无法做到

#### Promise.any()

Promise.any 接受一组 Promise 实例并将其包装成一个 Promise 实例，只要有一个实例的状态变为 fullfilled，那么返回的实例就会变成 fullfilled，如果所有的实例参数都变成了 rejected，那么包装实例就会变成 rejected，ES2021 中引入了这个方法

```js
var resolved = Promise.resolve(42);
var rejected = Promise.reject(-1);
var alsoRejected = Promise.reject(Infinity);

Promise.any([resolved, rejected, alsoRejected]).then(function (result) {
	console.log(result); // 42
});

Promise.any([rejected, alsoRejected]).catch(function (results) {
	console.log(results); // [-1, Infinity]
});
```

`Promise.any()`抛出的错误，不是一个一般的错误，而是一个 AggregateError 实例。它相当于一个数组，每个成员对应一个被`rejected`的操作所抛出的错误。下面是 AggregateError 的实现示例。

#### Promise.resolve()

作用：将现有对象转换为一个 Promise 对象。

```js
const p = Promise.resolve(1);
console.log(p); // Promise { 1 }

// 上面的写法等价于
new Promise((resolve) => resolve(1));
```

##### 参数

Promise.resolve()的参数有四种情况

-   参数是一个 Promise

    如果参数是 Promise 实例，那么`Promise.resolve`将不做任何修改、原封不动地返回这个实例。

-   参数是一个 thenable 对象

    `thenable`对象指的是具有`then`方法的对象，比如下面这个对象。

    ```js
    let thenable = {
    	then: function (resolve, reject) {
    		resolve(42);
    	},
    };
    ```

    `Promise.resolve()`方法会将这个对象转为 Promise 对象，然后就立即执行`thenable`对象的`then()`方法。

    ```js
    let thenable = {
    	then: function (resolve, reject) {
    		console.log(123);
    		resolve(42);
    	},
    };
    p = Promise.resolve(thenable);

    p.then(function (value) {
    	console.log(value);
    });
    // 123 42
    ```

-   参数不是 thenable 对象，或者不是一个对象

    如果参数是一个原始值，或者是一个不具有`then()`方法的对象，则`Promise.resolve()`方法返回一个新的 Promise 对象，状态为`resolved`。

-   参数为空

    `Promise.resolve()`方法允许调用时不带参数，直接返回一个`resolved`状态的 Promise 对象。

#### Promise.reject()

`Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`。

```js
const p = Promise.reject("出错了");
// 等同于
const p = new Promise((resolve, reject) => reject("出错了"));

p.then(null, function (s) {
	console.log(s);
});
```
