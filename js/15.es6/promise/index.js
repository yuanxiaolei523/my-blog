// 当resolve一个Promise的时候

// let p1 = new Promise((resolve) =>
// 	setTimeout(() => {
// 		resolve(123);
// 	}, 2000)
// );

// let p2 = new Promise((resolve) => {
// 	console.log(123);
// 	resolve(p1);
// 	console.log(432);
// }).then((res) => {
// 	console.log(res);
// });
// let p1 = new Promise((resolve) => {
//     console.log('p1');
//     resolve(1);
// });

// let p2 = new Promise((resolve, reject) => {
//     console.log('p2');
//     reject(1);
// }).catch((res) => {
//     console.log(res);
// });
// let p3 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('p3');
//         resolve(1);
//     }, 1000);
// });

// let p;
// p = new Promise((resolve, reject) => {
// 	resolve(reject("12"));
// })
// 	.then((res) => {
// 		console.log(res, "then");
// 	})
// 	.catch((res) => {
// 		console.log(res, "catch");
// 	});

// p = new Promise((resolve, reject) => {
// 	reject(resolve("12"));
// })
// 	.then((res) => {
// 		console.log(res, "then");
// 	})
// 	.catch((res) => {
// 		console.log(res, "catch");
// 	});
// const p1 = new Promise(function (resolve, reject) {
// 	setTimeout(() => reject(new Error("fail")), 3000);
// });

// const p2 = new Promise(function (resolve, reject) {
// 	setTimeout(() => resolve(p1), 1000);
// });

// p2.then((result) => console.log(result)).catch((error) =>
// 	console.log(error, "catch")
// );

// function getAny() {
// 	return new Promise((resolve) => {
// 		resolve(x + 1);
// 	});
// }
// getAny().then((res) => {
// 	console.log(res);
// });
// setTimeout(() => {
// 	console.log(123);
// }, 2000);

// const promise = new Promise(function (resolve, reject) {
// 	resolve("ok");
// 	// throw new Error("test");
// 	setTimeout(function () {
// 		throw new Error("test");
// 	}, 0);
// });
// promise
// 	.then(function (value) {
// 		setTimeout(() => {
// 			console.log(value, "then");
// 		}, 100);
// 	})
// 	.catch((res) => {
// 		console.log(res, "catch");
// 	});

// setTimeout(() => {
// 	console.log(123);
// }, 100);

// let p = new Promise(resolve => {
//     // console.log(0)
//     resolve(1);
// })
//     .finally(() => {return 1})
//     // .then(()=> {console.log(2)})
// console.log(p)

// Promise.all([p1, p2, p3]).catch(e => {
//     console.log(e)})

// const p1 = new Promise((resolve, reject) => {
// 	resolve("hello");
// })
// 	.then((result) => result)
// 	.catch((e) => e);

// const p2 = new Promise((resolve, reject) => {
// 	throw new Error("报错了");
// })
// 	.then((result) => result)
// 	.catch((e) => e);

// Promise.all([p1, p2])
// 	.then((result) => console.log(result, "then"))
// 	.catch((e) => console.log(e));

// const raceP = Promise.race([p2, p1, p3]);

// raceP
// 	.then((res) => {
// 		console.log(res, "res");
// 	})
// 	.catch((res) => {
// 		console.log(res, "catch");
// 	});
// console.log(raceP, "race");

// const pSettled = Promise.allSettled([p1, p2]);

// pSettled.then((res) => {
// 	console.log(res);
// });

// var rejected = Promise.reject(-1);
// Promise.any([rejected]).catch(function (results) {
// 	console.log(results); // [-1, Infinity]
// });

// p = Promise.resolve(1);
// console.log(p);

// let thenable = {
// 	then: function (resolve, reject) {
// 		console.log(123);
// 		resolve(42);
// 	},
// };
// p = Promise.resolve(thenable);
// console.log(thenable);
// p.then(function (value) {
// 	console.log(value); // 42
// });

// new Promise((resolve, reject) => {
// 	throw new Error("error");
// });

// console.log(11222);
// try {
// 	const promise = new Promise(function (resolve, reject) {
// 		// resolve("ok");
// 		throw new Error("test");
// 	});
// 	promise.then(function (value) {
// 		console.log(value);
// 	});
// 	// .catch(function (error) {
// 	// 	// console.log(error);
// 	// });
// } catch (e) {
// 	console.log(e, "catch");
// }
// p1 = new Promise((resolve) => {
// 	setTimeout(() => {
// 		resolve("p1 resolve");
// 	}, 1000);
// });

// new Promise((resolve) => {
// 	// throw new Error("ok");

// 	resolve(p1);
// 	console.log("pconsole");
// })
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((res) => {
// 		console.log(res, "catch");
// 	});
// console.log(456);

// let thenable = {
//     then: function (resolve, reject) {
//         console.log(123);
//         resolve(42);
//     },
// };
// p = Promise.resolve(thenable);

// p.then(function (value) {
//     console.log(value);
// });

// console.log(3455);


// p = Promise.race([p1, p2, p3]);
// p.then(res => {
//     console.log(res, 'then');
// });

try {
    new Promise((resolve, reject) => {
        reject(1);
    });
} catch (e) {
    console.log(e, 'catch');
}

