import MyPromise from "./index.js";

let promise = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		resolve(1);
	}, 1000);
});

promise.then(2).then((res) => {
	console.log(res);
});
//
// promise.then(value => {
//     console.log(2)
//     console.log('resolve', value)
// })
//
// promise.then(value => {
//     console.log(3)
//     console.log('resolve', value)
// })
// function other () {
//     return new MyPromise((resolve, reject) =>{
//         resolve('other')
//     })
// }
//
// promise.then(value => {
//     console.log(1)
//     console.log('resolve', value)
//     return other()
// }).then(value => {
//     console.log(2)
//     console.log('resolve', value)
// })

// const promise = new Promise((resolve, reject) => {
//     resolve(100)
// })
// const p1 = promise.then(value => {
//     console.log(value)
//     return p1
// })

// const promise = new MyPromise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve("success");
// 	}, 1000);
// });

// // 这个时候将promise定义一个p1，然后返回的时候返回p1这个promise
// promise
// 	.then((value) => {
// 		return 123;
// 		// setTimeout(() => {
// 		// 	console.log("resolve", value);
// 		// 	return 123;
// 		// }, 1000);
// 	})
// 	.then((value) => {
// 		console.log("resolve", 456);
// 		return 123;
// 	});

// 运行的时候会走reject
// p1.then(value => {
//     console.log(2)
//     console.log('resolve', value)
// }, reason => {
//     console.log(3)
//     console.log(reason.message)
// })

// let realP = new Promise((resolve) => {
// 	setTimeout(() => {
// 		resolve("success");
// 	}, 1000);
// });

// realP
// 	.then((res) => {
// 		console.log(123);
// 		return 123;
// 		setTimeout(() => {
// 			console.log(123, res);
// 			return 123;
// 		}, 1000);
// 	})
// 	.then((res) => {
// 		console.log(123, res);
// 		return 123;
// 	});
