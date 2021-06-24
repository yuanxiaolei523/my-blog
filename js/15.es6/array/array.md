# Array
## 展开运算符(...)
ES6中增加了展开运算符，将一个数组转为用逗号分隔的参数序列
```js
let arr = [1, 2, 3];
console.log(...arr) // 1 2 3
```
展开运算符主要用于函数的参数， 相当于reset运算符的逆运算
```js
let number = [1, 3, 5];
function getNumber(x, ...items) {
    console.log(x, items) // 1, [3, 5]
}
getNumber(...number);

```
如果扩展运算符后面是一个**空数组**，则不产生任何效果。
> 注意，只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错。
```js
// console.log((...[1,2])) // 报错
```
### 替代apply方法
ES6之前没有展开运算符，那么我们想将数组转为函数的参数貌似只有通过apply方法了
```js
let arr = [1,2,3];
function test(x, y, z) {
    console.log(x, y ,z)
}
test.apply(this, arr); // 1, 2, 3

console.log(Math.max.apply(this, [1, 2, 3])) // 3
```
在有了展开运算符之后就不需要了
```js
let arr = [1,2,3]
Math.max(...arr) // 3
```
### 应用
1. 浅拷贝数组
ES5只能通过方法来克隆
```js
let arr = [1,2,3]
let arr2 = arr.concat([]);
arr.push(4, 5)
console.log(arr, arr2) // [ 1, 2, 3, 4, 5 ] [ 1, 2, 3 ]
```   

```js
let arr = [1,2,3]
// let arr2 = [...arr] 
// 另外一种写法就是
let [...arr2] = arr
arr.push(4, 5)
console.log(arr, arr2) // [ 1, 2, 3, 4, 5 ] [ 1, 2, 3 ]
```
2.合并数组
```js
let arr = [1,2];
let arr2 = [3, 4];
let arr3 = [1,2,3,4]
```
3. 与解构赋值联合使用
```js
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]
```
使用扩展运算符对数组进行赋值，只能放在参数的最后一位
4. 字符串
```js
let arr = [...'hello']
console.log(arr) // [ 'h', 'e', 'l', 'l', 'o' ]
```
5. 任何实现了Iterator接口的数据结构都可以使用展开运算符
6. Map、Set、Generator
```js
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr = [...map.keys()]; // [1, 2, 3]
```
```js
const go = function*(){
  yield 1;
  yield 2;
  yield 3;
};

[...go()] // [1, 2, 3]
```

## 2. Array.from
1. 作用：是将类似数组的对象和可遍历的对象转换为真正的数组
ES5之前想要将伪数组转换为数组需要
```js
let obj = {
    1: 1,
    2: 2,
    length: 3
}
console.log([].slice.call(obj)) // [ <1 empty item>, 1, 2 ]
```   
ES6
```js
let obj = {
    1: 1,
    2: 2,
    length: 3
}
console.log(Array.from(obj)) // [ undefined, 1, 2 ]
```
> 注：主要是具备Iterator接口的数据结构，都可以被Array.from被转成数组

2. 第二个参数
Array.from提供了第二个参数，类似于map方法， 处理当前的元素，然后放入数组
   
```js
let obj = {
    1: 1,
    2: 2,
    length: 3
}
console.log(Array.from(obj, (x) => x * x)) [ NaN, 1, 4 ]
```
3. 第三个参数
Array.from提供了第三个参数，用于绑定this
   
## 3. Array.of
用于将一组数转换成数组,类似于new Array
1. 为什么我们在有了new Array之后还要出现一个Array.of函数呢
首先new Array的方式存在缺陷,构造函数参数个数的不同代表了不同的含义
   
````js
console.log(new Array()); // 返回一个空数组
console.log(new Array(1)); // 返回一个长度为1，但是为空值的数组
console.log(new Array(2, 3)); // [ 2, 3 ]
console.log(new Array(2,3,4)) // [ 2, 3, 4 ]
````
当Array的参数为空时，会返回一个空数组
当Array参数个数为1时，会创建一个长度为n，但是每个位置都是空值的数组
当Array参数个数大于等于2时，会创建一个由参数返回的新数组
所以Array.of就出现了
2. Array.of的使用
```js
console.log(Array.of(1, 2, 3)) // [1,2,3] 
console.log(Array.of(null, undefined, '')) //[ null, undefined, '' ]
```
Array.of不会对null和undefined做特殊处理

## copyWithin(target, start, end)
copyWithin主要是用于将start-end位置的元素拷贝到从target开始的地方
```js
console.log([1, 2, 3, 4, 5].copyWithin(0, 2)) // [ 3, 4, 5, 4, 5 ]
```

1. 参数
 - target：从该位置开始替换数据
 - start: 从该位置开始读取数据，默认为0，传负值相当于从末尾开始计算 -1位最后一位
 - end： 表示从该位置结束读取数据，默认为数组的长度，传负值表示从末尾开始计算

## 5. find和findIndex
find主要是用于查找数组中的元素，如果查找到，则返回该元素，如果查找不到，则返回undefined
```js
let num = [1,2,3].find((x) => x > 2)
console.log(num) // 3
let num = [1,2,3].find((x) => x > 3)
console.log(num) // undefined
```

findIndex主要是用于查找元素，如果查找到了，则返回下表，如果没有查找到，则返回-1
```js
let num2 = [1,2,3].findIndex(x => x > 2)
console.log(num2) // 2

let num2 = [1,2,3].findIndex(x => x > 3)
console.log(num2) // -1
```
1. 为什么有了indexOf还需要这两个方法呢
因为indexOf方法无法正常的发现NaN，这里两个方法我们可以通过某种方式来判断NaN
   
```js
[1, 2, NaN].findIndex(x => Object.is(NaN, x)) // 2 
```
6. fill(value, start, end)
该方法用于填充数组
```js
[1,2,3].fill(3)// [3,3,3]
```

**参数**
 - value: 表示使用什么值进行填充
 - start: 表示从哪个位置开始, 默认为0，如果为负数，则从末尾开始
 - end: 表示到哪个位置结束填充, 默认为数组的长度，如果为负数，则从末尾开始
```js
console.log([1,2,3].fill(3, 1)) // [1, 3, 3]
```

## 8. entries(), keys(), values()
keys用于获取数组的key
values用于获取数组的value
entries用于获取数组的键值对,然后再次遍历拿到key或者value
```js
console.log([1,2,3].entries()) //Object [Array Iterator] {}

for (let [index, elem] of ['a', 'b'].entries()) {
    console.log(index, elem);
}
// 0 "a"
// 1 "b"
```
## 8. includes(value, start)
用于判断某个元素是否在数组中
参数
- value：判断的值
- start：从哪个元素开始，默认为0，如果是负数，则从后面开始，如果大于数组的长度，则为0
```js
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
```
1. 为什么有了indexOf还要出现includes方法
- indexOf不够语义化 它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1
- 不能正确判断NaN

## 9. flat flatMap
flat是用于数组的扁平化的,会返回一个新的数组

**参数**
如果不传参数，则表示扁平一层
如果传递负数，则该方法不起作用
如果传递正数，则扁平n层
如果传递Infinity，则将数组扁平成一层
```js
console.log([1, 2, [3, [4, 5]]].flat()) // [1, 2, 3, [4, 5]]
```
**对空位的处理**

如果原数组有空位，则flat会忽略空位，返回一个不包含空位的数组

flatMap

flatMap只会展开一层数组
```js
[1, 2, 3, 4].flatMap(x => [[x * 2]])
// [[2], [4], [6], [8]]
```
## 10.数组的空位
ES5 对空位的处理
1. forEach、map、reduce、every、someh会跳过空位
2. map会跳过空位，但是会保留这个值
3. join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
```js
// forEach方法
[,'a'].forEach((x,i) => console.log(i)); // 1

// filter方法
['a',,'b'].filter(x => true) // ['a','b']

// every方法
[,'a'].every(x => x==='a') // true

// reduce方法
[1,,2].reduce((x,y) => x+y) // 3

// some方法
[,'a'].some(x => x !== 'a') // false

// map方法
[,'a'].map(x => 1) // [,1]

// join方法
[,'a',undefined,null].join('#') // "#a##"

// toString方法
[,'a',undefined,null].toString() // ",a,,"
```
ES6中则是将空位转为undefined