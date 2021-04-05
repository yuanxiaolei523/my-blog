async function async1() {
	console.log("async1 start");
	await async2();
	console.log("async1 end");
}

async function async2() {
	console.log("async2");
	new Promise((resolve) => {
		console.log(123);
		resolve();
	}).then(() => {
		console.log("async2 promise then");
	});
}

console.log("script start");
setTimeout(function () {
	console.log("setTimeout1");
}, 2000);
async1();
new Promise(function (resolve, reject) {
	console.log("promise1");
	resolve();
}).then(() => {
	console.log("promise2");
});
console.log("script end");
// script start --> async1 start --> async2 --> promise2 --> script end --> async1 end --> promise2 --> setTimeout1
