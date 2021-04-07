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

let p;
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

const promise = new Promise(function (resolve, reject) {
	resolve("ok");
	// throw new Error("test");
	setTimeout(function () {
		throw new Error("test");
	}, 0);
});
promise
	.then(function (value) {
		setTimeout(() => {
			console.log(value, "then");
		}, 100);
	})
	.catch((res) => {
		console.log(res, "catch");
	});

setTimeout(() => {
	console.log(123);
}, 100);
