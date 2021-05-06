function limitLoad(urls, handler, limit) {
	const sequence = [].concat(urls); // 尽量不要影响到外在的数组或对象
	let promises = []; // 用来存储要执行的promise
	promises = sequence.splice(0, limit).map((url, index) => {
		return handler(url).then((res) => {
			return index;
		});
	});

	let p = Promise.race(promises);
	for (let i = 0; i < sequence.length; i++) {
		p = p.then((res) => {
			// res 为索引
			promises[res] = handler(sequence[i]).then(() => {
				return res;
			});
			return Promise.race(promises);
		});
	}
}

const urls = [
	{
		info: "link1",
		time: 3000,
	},
	{
		info: "link2",
		time: 2000,
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

limitLoad(urls, loadImg, 3);
