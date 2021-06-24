let set;

// set = new Set();
// set.add(1);
// console.log(set); // Set { 1 }

// set = new Set([1, 2, 3]);
// console.log(set); // Set { 1, 2, 3 }

// set = new Set("123");
// console.log(set); // Set { '1', '2', '3' }

// 和展开运算符结合使用
// set = new Set([1, 2, 3]);
// console.log([...set]); // [1, 2, 3]

// NaN
// console.log(new Set([NaN, 1, NaN]));
// console.log(new Set([{}, {}, 1]));
// let obj = {};
// console.log(new Set([obj, obj, 1]));

// 去除重复的数组元素
// let arr = [...new Set([1, 2, 2, 4, 5, 1])];
// console.log(arr); // [1, 2, 4, 5]

// let str = [...new Set([1, 2, 2, 4, 5, 1])].join("");
// console.log(str);

// let keys = new Set([1, 2, 3]).entries();

// for (let i of keys) {
// 	console.log(i);
// }

// set = new Set([1, 2, 3]);
// for (const iterator of set) {
// 	console.log(iterator);
// }

/**
 * 以下为WeakSet
 */

// let ws = new WeakSet();
// ws.add([
// 	[1, 2],
// 	[3, 4],
// ]);
// console.log(ws);

// const b = [3, 4];
// const ws = new WeakSet(b);

// let ws = new WeakSet();
// ws.add([1, 2]);
// console.log(ws);

// let ws = new WeakSet([
// 	[1, 2],
// 	[3, 4],
// ]);
// ws.delete([1, 2]);
// console.log(ws);

/**
 * 以下为Map
 */
// let m = new Map();
// m.set(null, 123);
// console.log(m);

// let map = new Map([
// 	[1, 2],
// 	[null, 2],
// ]);

// console.log(map);
// map.set(1, 3);
// console.log(map);
// map.set(NaN, 1);
// console.log(map);
// map.set(NaN, 3);
// console.log(map);
// let obj = { name: 1 };
// let obj2 = { name: 1 };
// let map = new Map([
// 	[obj, 1],
// 	[obj2, 2],
// ]);
// console.log(map);
// console.log(map.get(obj));

// let map = new Map();

// map.set(-0, 123);
// map.get(+0); // 123
// console.log(map.get(0));

// let map = new Map();
// map.set(1, 2).set(2, 3);

// for (const [key, value] of map) {
// 	console.log(key, value);
// }

let map = new Map([[1,2]])
console.log(...map)
