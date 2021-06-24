let PENDING = "pending";
let FULLFILLED = "fullfilled";
let REJECTED = "rejected";
class MyPromise1 {
	constructor(executor) {
		this.status = PENDING;
		this.value = undefined;
		this.reason = undefined;
		let resolve = (value) => {
			if (this.status === PENDING) {
				this.status = FULLFILLED;
				this.value = value;
			}
		};
		// 失败
		let reject = (reason) => {
			if (this.status === PENDING) {
				this.status = REJECTED;
				this.reason = reason;
			}
		};
		executor(resolve, reject);
	}
	then(onFullfilledCb, onRejectedCb) {
		if (this.status === FULLFILLED) {
			onFullfilledCb(this.value);
		} else if (this.status === REJECTED) {
			onRejectedCb(this.reason);
		}
	}
}
// 上面我们已经基本上实现了一版Promise了，但是它的缺点就是，
// 当setTimeout中resolve或reject时会then函数内部已经执行完毕了;
class MyPromise2 {
	constructor(executor) {
		this.status = PENDING;
		this.value = undefined;
		this.reason = undefined;
		this.onFullfilledCbs = [];
		this.onRejectedCbs = [];
		let resolve = (value) => {
			if (this.status === PENDING) {
				this.status = FULLFILLED;
				this.value = value;
				this.onFullfilledCbs.forEach((cb) => {
					cb(this.value);
				});
			}
		};
		// 失败
		let reject = (reason) => {
			if (this.status === PENDING) {
				this.status = REJECTED;
				this.reason = reason;
				this.onRejectedCbs.forEach((cb) => cb(this.reason));
			}
		};
		executor(resolve, reject);
	}
	then(onFullfilledCb, onRejectedCb) {
		if (this.status === FULLFILLED) {
			onFullfilledCb(this.value);
		} else if (this.status === REJECTED) {
			onRejectedCb(this.reason);
		} else if (this.status === PENDING) {
			this.onFullfilledCbs.push(onFullfilledCb);
			this.onRejectedCbs.push(onRejectedCb);
		}
	}
}

// 上面一版已经可以解决setTimeout的问题了，但是我们都知道then是可以链式调用的
class MyPromise3 {
	constructor(executor) {
		this.status = PENDING;
		this.value = undefined;
		this.reason = undefined;
		this.onFullfilledCbs = [];
		this.onRejectedCbs = [];
		let resolve = (value) => {
			if (this.status === PENDING) {
				this.status = FULLFILLED;
				this.value = value;
				this.onFullfilledCbs.forEach((cb) => cb());
			}
		};
		// 失败
		let reject = (reason) => {
			if (this.status === PENDING) {
				this.status = REJECTED;
				this.reason = reason;
				this.onRejectedCbs.forEach((cb) => cb());
			}
		};
		executor(resolve, reject);
	}
	then(onFullfilledCb, onRejectedCb) {
		onFullfilledCb =
			typeof onFullfilledCb === "function"
				? onFullfilledCb
				: (value) => {
						console.log(value);
						return value;
				  };
		onRejectedCb =
			typeof onRejectedCb === "function"
				? onRejectedCb
				: (err) => {
						throw err;
				  };
		let promise2 = new MyPromise3((resolve, reject) => {
			if (this.status === FULLFILLED) {
				setTimeout(() => {
					try {
						let x = onFullfilledCb(this.value);
						resolvePromise(promise2, x, resolve, reject);
					} catch (e) {
						reject(e);
					}
				}, 0);
			} else if (this.status === REJECTED) {
				setTimeout(() => {
					try {
						let x = onRejectedCb(this.reason);
						resolvePromise(promise2, x, resolve, reject);
					} catch (e) {
						reject(e);
					}
				}, 0);
			} else if (this.status === PENDING) {
				setTimeout(() => {
					try {
						this.onFullfilledCbs.push(() => {
							let x = onFullfilledCb(this.value);
							resolvePromise(promise2, x, resolve, reject);
						});
					} catch (e) {
						reject(e);
					}
				}, 0);
				setTimeout(() => {
					try {
						this.onRejectedCbs.push(() => {
							let x = onRejectedCb(this.reason);
							resolvePromise(promise2, x, resolve, reject);
						});
					} catch (e) {
						reject(e);
					}
				}, 0);
			}
		});

		return promise2;
	}
}
function resolvePromise(promise2, x, resolve, reject) {
	// 循环引用报错
	if (x === promise2) {
		return reject(new TypeError("Chaining cycle detected for promise"));
	}
	// 防止多次调用
	let called;
	// x不是null 且x是对象或者函数
	if (x != null && (typeof x === "object" || typeof x === "function")) {
		try {
			// A+规定，声明then = x的then方法
			let then = x.then;
			// 如果then是函数，就默认是promise了
			if (typeof then === "function") {
				// 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
				then.call(
					x,
					(y) => {
						// 成功和失败只能调用一个
						if (called) return;
						called = true;
						// resolve的结果依旧是promise 那就继续解析
						resolvePromise(promise2, y, resolve, reject);
					},
					(err) => {
						// 成功和失败只能调用一个
						if (called) return;
						called = true;
						reject(err); // 失败了就失败了
					}
				);
			} else {
				resolve(x); // 直接成功即可
			}
		} catch (e) {
			// 也属于失败
			if (called) return;
			called = true;
			// 取then出错了那就不要在继续执行了
			reject(e);
		}
	} else {
		resolve(x);
	}
}

export default MyPromise3;
