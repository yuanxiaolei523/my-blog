// 1. 展开运算符
// let arr = [1, 2, 3];
// console.log(...arr)

// let number = [1, 3, 5];
// function getNumber(x, ...items) {
//     console.log(x, items)
// }
// getNumber(...number);

// 代替apply
// let arr = [1,2,3];
// function test(x, y, z,) {
//     console.log(x, y ,z)
// }
// test.apply(this, arr);

// console.log(Math.max.apply(this, [1, 2, 3]))

// let arr = [1,2,3]
// let arr2 = [...arr]
// arr.push(4, 5)
// console.log(arr, arr2)

// let arr2 = arr.concat([]);
// arr.push(4, 5)
// console.log(arr, arr2) // [ 1, 2, 3, 4, 5 ] [ 1, 2, 3 ]

// 字符串
// let arr = [...'hello']
// console.log(arr) //[ 'h', 'e', 'l', 'l', 'o' ]

// Array.from
// let obj = {
//     1: 1,
//     2: 2,
//     length: 3
// }
// console.log(Array.from(obj))


// let obj = {
//     1: 1,
//     2: 2,
//     length: 3
// }
// console.log([].slice.call(obj))

// Array.from
// let obj = {
//     1: 1,
//     2: 2,
//     length: 3
// }
// console.log(Array.from(obj, (x) => x * x))

// Array.of
// console.log(Array.of(1, 2, 3)) // [1,2,3]
// console.log(Array.of(null, undefined, ''))
// console.log(new Array());
// console.log(new Array(1));
// console.log(new Array(2, 3));
// console.log(new Array(2,3,4))
// copyWithin
// console.log([1, 2, 3, 4, 5].copyWithin(0, -2))

// find、findIndex
// find返回某个元素，findIndex返回下标
// let num = [1,2,3].find((x) => x > 3)
// console.log(num)

// let num2 = [1,2,3].findIndex(x => x > 3)
// console.log(num2)
// 判断NaN
// function isNaN() {
//     return [1, 2, NaN].findIndex(x => Object.is(NaN, x))
// }
// console.log(isNaN())

// fill
// console.log([1,2, 3].fill(3))
// console.log([1,2,3].fill(3, -2))

// console.log([1,2,3].entries())

console.log([1, 2, [3, [4, 5]]].flat())