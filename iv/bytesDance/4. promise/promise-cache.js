/*
 promise的缓存
 利用Promise一创建就会初始化的特性来实现
 一些Promise的结果是固定的，在每一个页面都有调用，所以此时可以使用Promise的缓存
*/

const cacheMap = new Map();
function enableCache(target, name, descriptor) {
	const val = descriptor.value;
	descriptor.value = async function (...args) {
		const cacheKey = name + JSON.stringify(args);
		if (!cacheMap.get(cacheKey)) {
			const cacheValue = Promise.resolve(val.apply(this, args)).catch(
				(_) => {
					cacheMap.set(cacheKey, null);
				}
			);
			cacheMap.set(cacheKey, cacheValue);
		}
	};
}

class PromiseClass {
	@enableCache
	static async getInfo() {}
}
