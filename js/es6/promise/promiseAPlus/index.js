/*
自己动手实现一个Promise
 */
// 首先Promise内会传入一个executor，是立即执行的，并且会有resolve和reject函数

// class MyPromise1 {
//     constructor (executor) {
//         executor(this.resolve, this.reject);
//     }
//     resolve = () => {
//
//     }
//     reject = () => {
//
//     }
// }

// 其次添加promise的状态
const PENDING = 'pending';
const FULLFILLED = 'fullfilled';
const REJECTED = 'rejected';
class MyPromise2 {
    constructor(executor) {
        executor(this.resolve, this.reject);
    }
    status = PENDING;
    value = null;
    reason = null;


    resolve = (value) => {
        if (this.status === PENDING) {
            this.status = FULLFILLED;
            this.value = value;
        }
    }
    reject = (reason) => {
        if(this.status === REJECTED) {
            this.status = REJECTED;
            this.reason = reason
        }
    }
    then = function (fullfillCallback, rejectCallback) {
        if (this.status === FULLFILLED) {
            fullfillCallback(this.value)
        }
        if (this.status === REJECTED) {
            rejectCallback(this.reason)
        }
    }
}

/**
 * 上面这一版已经可以简单的处理同步的promise了，但是面对异步的Promise还是无法处理的，所以我们做一下修改
 */
class MyPromise3 {
    constructor(executor) {
        executor(this.resolve, this.reject);
    }
    status = PENDING;
    value = null;
    reason = null;
    // 新增成功和失败后的处理函数
    onFullfilledCallback = null;
    onRejectedCallback = null;

    resolve = (value) => {
        if (this.status === PENDING) {
            this.status = FULLFILLED;
            this.value = value;
            // 成功后的回调函数
            this.onFullfilledCallback && this.onFullfilledCallback(value);
        }
    }
    reject = (reason) => {
        if(this.status === REJECTED) {
            this.status = REJECTED;
            this.reason = reason;
            // 失败后的回调函数
            this.onRejectedCallback && this.onRejectedCallback(reason);
        }
    }
    then = function (fullfillCallback, rejectCallback) {
        if (this.status === FULLFILLED) {
            fullfillCallback(this.value)
        }
        if (this.status === REJECTED) {
            rejectCallback(this.reason)
        }
        if(this.status === PENDING) {
            // ==== 新增 ====
            // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
            // 等到执行成功失败函数的时候再传递
            this.onFullfilledCallback = fullfillCallback;
            this.onRejectedCallback = rejectCallback;
        }
    }
}

/**
 * 上面的代码实现了异步的resolve或者reject，但是当异步resolve时，多次调用then函数只会打印最后一次的then的回调函数，下面我们来解决这个问题
 */

class MyPromise4 {
    constructor(executor) {
        executor(this.resolve, this.reject);
    }
    status = PENDING;
    value = null;
    reason = null;
    // 新增成功和失败后的处理函数
    // onFullfilledCallback = null;
    // onRejectedCallback = null;
    onFulfilledCallbacks = [];
    onRejectedCallbacks = [];

    resolve = (value) => {
        if (this.status === PENDING) {
            this.status = FULLFILLED;
            this.value = value;
            // 成功后的回调函数
            // this.onFullfilledCallback && this.onFullfilledCallback(value);
            while (this.onFulfilledCallbacks.length) {
                this.onFulfilledCallbacks.shift()(value)
            }
        }
    }
    reject = (reason) => {
        if(this.status === REJECTED) {
            this.status = REJECTED;
            this.reason = reason;
            // 失败后的回调函数
            // this.onRejectedCallback && this.onRejectedCallback(reason);
            while(this.onRejectedCallbacks.length) {
                this.onRejectedCallbacks.shift()(value);
            }
        }
    }
    then = function (fullfillCallback, rejectCallback) {
        if (this.status === FULLFILLED) {
            fullfillCallback(this.value)
        }
        if (this.status === REJECTED) {
            rejectCallback(this.reason)
        }
        if(this.status === PENDING) {
            // ==== 新增 ====
            // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
            // 等到执行成功失败函数的时候再传递
            this.onFulfilledCallbacks.push(fullfillCallback);
            this.onRejectedCallbacks.push(rejectCallback);
            // this.onFullfilledCallback = fullfillCallback;
            // this.onRejectedCallback = rejectCallback;
        }
    }
}

/**
 * 下面我们来实现一个链式调用
 */
class MyPromise5 {
    constructor(executor) {
        executor(this.resolve, this.reject);
    }
    status = PENDING;
    value = null;
    reason = null;
    // 新增成功和失败后的处理函数
    // onFullfilledCallback = null;
    // onRejectedCallback = null;
    onFulfilledCallbacks = [];
    onRejectedCallbacks = [];

    resolve = (value) => {
        if (this.status === PENDING) {
            this.status = FULLFILLED;
            this.value = value;
            // 成功后的回调函数
            // this.onFullfilledCallback && this.onFullfilledCallback(value);
            while (this.onFulfilledCallbacks.length) {
                this.onFulfilledCallbacks.shift()(value)
            }
        }
    }
    reject = (reason) => {
        if(this.status === REJECTED) {
            this.status = REJECTED;
            this.reason = reason;
            // 失败后的回调函数
            // this.onRejectedCallback && this.onRejectedCallback(reason);
            while(this.onRejectedCallbacks.length) {
                this.onRejectedCallbacks.shift()(reason);
            }
        }
    }
    then = function (fullfillCallback, rejectCallback) {
        return new MyPromise5((resolve, reject) => {
            if (this.status === FULLFILLED) {
                const x = fullfillCallback(this.value);
                resolvePromise(x, resolve, reject);
            }
            if (this.status === REJECTED) {
                rejectCallback(this.reason)
            }
            if(this.status === PENDING) {
                // ==== 新增 ====
                // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
                // 等到执行成功失败函数的时候再传递
                this.onFulfilledCallbacks.push(fullfillCallback);
                this.onRejectedCallbacks.push(rejectCallback);
                // this.onFullfilledCallback = fullfillCallback;
                // this.onRejectedCallback = rejectCallback;
            }
        })
    }
}

/**
 * 判断是不是返回自己，避免循环调用
 */

class MyPromise6 {
    constructor(executor) {
        executor(this.resolve, this.reject);
    }
    status = PENDING;
    value = null;
    reason = null;
    // 新增成功和失败后的处理函数
    // onFullfilledCallback = null;
    // onRejectedCallback = null;
    onFulfilledCallbacks = [];
    onRejectedCallbacks = [];

    resolve = (value) => {
        if (this.status === PENDING) {
            this.status = FULLFILLED;
            this.value = value;
            // 成功后的回调函数
            // this.onFullfilledCallback && this.onFullfilledCallback(value);
            while (this.onFulfilledCallbacks.length) {
                this.onFulfilledCallbacks.shift()(value)
            }
        }
    }
    reject = (reason) => {
        if(this.status === PENDING) {
            this.status = REJECTED;
            this.reason = reason;
            console.log('reject123')
            // 失败后的回调函数
            // this.onRejectedCallback && this.onRejectedCallback(reason);
            while(this.onRejectedCallbacks.length) {
                this.onRejectedCallbacks.shift()(reason);
            }
        }
    }
    then = function (fullfillCallback, rejectCallback) {
        const promise2 =  new MyPromise6((resolve, reject) => {
            if (this.status === FULLFILLED) {
                // ==== 新增 ====
                // 创建一个微任务等待 promise2 完成初始化
                queueMicrotask(() => {
                    // 获取成功回调函数的执行结果
                    const x = fullfillCallback(this.value);
                    console.log(promise2, x)
                    // 传入 resolvePromise 集中处理
                    resolvePromise(promise2, x, resolve, reject);
                })
            }

            if (this.status === REJECTED) {
                rejectCallback(this.reason)
            }
            if(this.status === PENDING) {
                // ==== 新增 ====
                // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
                // 等到执行成功失败函数的时候再传递
                this.onFulfilledCallbacks.push(fullfillCallback);
                this.onRejectedCallbacks.push(rejectCallback);
                // this.onFullfilledCallback = fullfillCallback;
                // this.onRejectedCallback = rejectCallback;
            }
        });
        return promise2;
    }
}


function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new Error('Chaining cycle detected for promise #<Promise>'))
    }
    if(x instanceof MyPromise6) {
        x.then(resolve, reject)
    } else{
        resolve(x)
    }
}



export default MyPromise6