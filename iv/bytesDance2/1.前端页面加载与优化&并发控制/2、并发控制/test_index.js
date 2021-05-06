const urls = [
	{
		info: "link1",
		time: 3000,
	},
	{
		info: "link2",
		time: 3000,
	},
	{
		info: "link3",
		time: 5000,
	},
	{
		info: "link4",
		time: 1000,
	},
	{
		info: "link5",
		time: 1200,
	},
	{
		info: "link6",
		time: 2000,
	},
	{
		info: "link7",
		time: 800,
	},
	{
		info: "link8",
		time: 3000,
	},
];

function loadImg(url) {
	return new Promise((resolve, reject) => {
		console.log("-----" + url.info + " start!");
		setTimeout(() => {
			console.log("-----" + url.info + " ok!");
			resolve();
		}, url.time);
	});
}

function limitLoad(urls, handler, limit) {
	let sequence = [].concat(urls);
	let promises = [];

	promises = sequence.splice(0, limit).map((url, index) => {
		return handler(url).then(() => {
			return index; // 执行了，然后把执行完的index返回
		});
	});

	let p = Promise.race(promises); // 这里拿到index

	// 将剩余的遍历
	// sequence.forEach((item, index) => {
	// 	// 采用链式调用的方式保证limit的个数
	// 	p = p.then((res) => {
	// 		promises[res] = handler(sequence[index]).then(() => {
	// 			return res;
	// 		});
	// 		return Promise.race(promises);
	// 	});
	// });
	for (let i = 0; i < sequence.length; i++) {
		p = p.then((res) => {
			// res为下标
			promises[res] = handler(sequence[i]).then(() => {
				return res;
			});
			return Promise.race(promises); // 再次获取一个执行的最快的
		});
	}
}

limitLoad(urls, loadImg, 3);
