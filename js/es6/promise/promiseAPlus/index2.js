// 复习1

const PENDING = "pending";
const FUILLFILLED = "fullfilled";
const REJECTED = "rejected";

class MyPromise {
	constructor(executor) {
		this.status = PENDING;
		this.value = undefined;
		this.reason = undefined;
		this.resolve = (value) => {
			if (this.status === PENDING) {
				this.status = FUILLFILLED;
				this.value = value;
			}
		};
		this.reject = (reason) => {
			if (this.status === PENDING) {
				this.status = PENDING;
				this.reason = reason;
			}
		};
		executor(this.resolve, this.reject);
	}
	then = (onFullfillCb, onRejectCb) => {
		if (this.status === FUILLFILLED) {
			onFullfillCb(this.value);
		}
		if (this.status === REJECTED) {
			onRejectCb(this.reason);
		}
	};
}
// 已经实现了一版简单的，但是上面那版无法解决异步的resolve或者reject，所以下面我们实现一版
class MyPromise2 {
	constructor(executor) {
		this.status = PENDING;
		this.reason = undefined;
		this.value = undefined;
		this.onFullfillCbs = [];
		this.onRejectCbs = [];
		this.resolve = (value) => {
			if (this.status === PENDING) {
				this.value = value;
				this.status = FUILLFILLED;
				this.onFullfillCbs.forEach((cb) => cb());
			}
		};
		this.reject = (reason) => {
			if (this.status === PENDING) {
				this.reason = reason;
				this.status === REJECTED;
				this.onRejectCbs.forEach((cb) => cb());
			}
		};
		executor(this.resolve, this.reject);
	}
	then = (onFullfillCb, onRejectCb) => {
		if (this.status === FUILLFILLED) {
			this.onFullfillCbs.push(() => {
				onFullfillCb(this.value);
			});
		}
		if (this.status === REJECTED) {
			this.onFullfillCbs.push(() => {
				onRejectCb(this.reason);
			});
		}
		if (this.status === PENDING) {
			this.onFullfillCbs.push(() => {
				onFullfillCb(this.value);
			});
			this.onRejectCbs.push(() => {
				onRejectCb(this.reason);
			});
		}
	};
}

ss MyPromise3 {
	constructor(executor) {
		this.status = PENDING;
		this.reason = undefined;
		this.value = undefined;
		this.onFullfillCbs = [];
		this.onRejectCbs = [];
		this.resolve = (value) => {
			if (this.status === PENDING) {
				this.value = value;
				this.status = FUILLFILLED;
				this.onFullfillCbs.forEach((cb) => cb());
			}
		};
		this.reject = (reason) => {
			if (this.status === PENDING) {
				this.reason = reason;
				this.status === REJECTED;
				this.onRejectCbs.forEach((cb) => cb());
			}
		};
		executor(this.resolve, this.reject);
	}
	then = (onFullfillCb, onRejectCb) => {
        let promise2 = new Promise3((resolve, reject) => {
            if (this.status === FUILLFILLED) {
                this.onFullfillCbs.push(() => {
                    let x = onFullfillCb(this.value);
                    resolvePromise(promise2, x , resolve, reject);
                });
            }
            if (this.status === REJECTED) {
                this.onFullfillCbs.push(() => {
                    let x = onRejectCb(this.reason);
                    resolvePromise(promise2, x, resolve, reject);
                    // onRejectCb(this.reason);
                });
            }
            if (this.status === PENDING) {
                this.onFullfillCbs.push(() => {
                    let x = onFullfillCb(this.value);
                    resolvePromise(promise2, x, resolve, reject);
                });
                this.onRejectCbs.push(() => {
                    let x = onRejectCb(this.reason);
                    resolvePromise(promise2, x, resolve, reject);
                });
            }
        });
        return promise2;
		
	};
}
function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
        return reject(new TypeError('Chaining cycle detected for promise'));
    }
    let called;
    if(x !== null && (typeof x === 'object' || typeof x === 'function')) {
        let then = x.then;
        // promise
        if (typeof then === 'function') {
            then.call(x, y => {
                if (called) {
                    return;
                }
                called = true;
                resolvePromise(promise2, y, resolve, reject);
            }, err => {
                if (called) return;
                called = true;
                reject(err);// 失败了就失败了
            })
        } else {
            resolve(x)
        }
    } else {
        resolve(x);
    }
}

export default MyPromise2;
