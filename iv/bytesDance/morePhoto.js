// 如果页面上有巨量的图片，除了懒加载，还有其他方式限制加载的数量吗

// 代码实现promise的并发控制
function limitLoad(urls, handler, limit) {
	const sequence = [].concat(urls);
	let promises = [];
	promises = sequence.splice(0, limit).map((url, index) => {
		return handler(url).then(() => {
			return index;
		});
	});

	let p = Promise.race(promises);
	for (let i = 0; i < sequence.length; i++) {
		p = p.then((res) => {
			promises[res] = handler(sequence[i]).then(() => {
				return res;
			});
			return Promise.race(promises);
		});
	}
}

const urls = [
	{
		url: "12",
		time: 1000,
	},
	{
		url: "23",
		time: 2000,
	},
];

function loading(url) {
	return new Promise((resolve, reject) => {
		console.log(url.url + "---start");
		setTimeout(() => {
			console.log(url.url + "---end");

			resolve();
		}, url.time);
	});
}

limitLoad(urls, loading, 1);
