const testData = {
	a: 111,
	b: "cccc",
	2222: false,
};

const seen = new WeakSet();
function sizeOfObject(object) {
	if (object === null) {
		return 0;
	}
	let bytes = 0;
	// key和value同时占用内存
	const properties = Object.keys(object);
	// 由于可能存在某个value的值是相同的，此时他们用到的是相同的内存
	for (let i = 0; i < properties.length; i++) {
		const key = properties[i];
		bytes += calculator(key);
		if (typeof object[key] === "object" && object[key] !== null) {
			if (seen.has(object[key])) {
				continue;
			}
			seen.add(object[key]);
		}
		bytes += calculator(object[key]);
	}
	return bytes;
}

function calculator(object) {
	const objectType = typeof object;
	switch (objectType) {
		case "string":
			return object.length * 2;
		case "boolean":
			return 4;
		case "number":
			return 8;
		case "object": {
			if (Array.isArray(object)) {
				// 对数组的处理
				return object
					.map(calculator)
					.reduce((res, current) => res + current, 0);
			} else {
				// 对对象的处理
				return sizeOfObject(object);
			}
		}
		default:
			return 0;
	}
}

console.log(calculator(testData));
