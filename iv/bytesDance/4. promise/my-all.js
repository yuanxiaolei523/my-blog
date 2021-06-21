function PromiseAll(promiseArray) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promiseArray)) {
            reject(new Error('传入的必须是数组'));
        }
        const res = [];
        const promiseLength = promiseArray.length;
        let counter = 0;
        for (let i = 0; i < promiseArray.length; i++) {
            // const isPromise =
            // 	Object.prototype.toString.call(promiseArray[i]) ===
            // 	"[object Promise]";
            // if (isPromise) {
            // 	promiseArray[i].then((result) => {
            // 		res.push(result);
            // 	});
            // } else {
            // 	res.push(promiseArray[i]);
            // }
            Promise.resolve(promiseArray[i])
                .then((value) => {
                    // res.push(value); // 由于Promise.all的输出顺序和输入顺序一致，所以pass
                    // if (res.length === promiseLength) { // 因为数组的特性res[3]=3,此时数组的长度为4
                    // 	resolve(res);
                    // }
                    counter++;
                    res[i] = value;
                    if (counter === promiseLength) {
                        resolve(res);
                    }
                })
                .catch((e) => reject(e));
        }
    });
}

const p1 = new Promise((res) => {
    setTimeout(() => {
        res('1');
    }, 1000);
});
const p2 = new Promise((res) => {
    setTimeout(() => {
        res('2');
    }, 2000);
});

const p3 = new Promise((res) => {
    setTimeout(() => {
        res('3');
    }, 3000);
});

const prom = PromiseAll([p1, p2, p3])
    .then((res) => {
        console.log(res);
    })
    .catch((e) => {
        console.log(e);
    });
function MyPromiseAll(arr) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(arr)) {
            reject(new Error('传入的值必须是数组'));
        }
        let count = 0;
        let result = [];
        const promiseLength = arr.length;
        for (let i = 0; i < promiseLength; i++) {
            Promise.resolve(arr[i])
                .then((res) => {
                    count++;
                    result[i] = res;
                    if (count === arr.length) {
                        resolve(result);
                    }
                })
                .catch((e) => reject(e));
        }
    });
}
// MyPromiseAll([p1, p2, p3])
// 	.then((res) => console.log(res))
// 	.catch((e) => {
// 		console.log(e);
// 	});
