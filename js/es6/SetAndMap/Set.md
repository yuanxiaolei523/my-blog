# Set、Map、WeakSet、WeakMap

## Set

### 特点

1. 类似于数组的结构
2. 其值是唯一的

### 构造函数 Set()

```js
let set = new Set();
set.add(1);
console.log(set); // Set { 1 }
```

除此之外，Set 还可以接受一个数组(任何具备 Iterator 接口的数据结构)作为参数

```js
set = new Set([1, 2, 3]);
console.log(set); // Set { 1, 2, 3 }

set = new Set("123");
console.log(set); // Set { '1', '2', '3' }
```

### 将 Set 转换为数组

1. Set 和展开运算符结合使用

```js
set = new Set([1, 2, 3]);
console.log([...set]); // [1, 2, 3]
```

2. 使用 Array.from

```js
set = new Set([1, 2, 3]);
console.log(Array.from(set)); // [1, 2, 3]
```

> 注意：因为 Set 的实例默认就是可以遍历的，它的默认的遍历生成器函数就是 values 函数，所以可以直接使用 for...of 来遍历 set 的实例

```js
set = new Set([1, 2, 3]);
for (const iterator of set) {
	console.log(iterator);
}
```

### Set 是如何保证自己的属性是唯一的呢

基本数据类型
首先 Set 内部不会做类型转换

其次 Set 内部时采用了一种类似于精确相等运算符的算法(===), 与===的主要区别就是，Set 内部认为 NaN 等于 NaN，而===却认为 NaN 和 NaN 不相等

对象类型
两个对象在 Set 内部总是不等的，除非是同一个引用

```js
console.log(new Set([NaN, 1, NaN]));
// Set { NaN, 1 }

console.log(new Set([{}, {}, 1]));
// Set { {}, {}, 1 }

let obj = {};
console.log(new Set([obj, obj, 1]));
// Set { {}, 1 }
```

> 注意：向set内添加+0、-0的时候，会自动转成0，也就是说在set中认为0、-0、+0是相同的

### 常用函数和属性

1. add()
   向 set 结构中添加数据
2. size
   查询 set 结构的长度
3. delete()
   删除 set 内的某个元素
4. has()
   判断 set 内是否包含某个元素
5. clear()
   清空 set 内所有的元素
6. values()
   获取到一个关于 set 的值的遍历器对象, 可以通过 `for...of` 遍历
    ```js
    console.log(new Set([1, 2, 3]).values()); //[Set Iterator] { 1, 2, 3 }
    ```
7. keys()
   因为 Set 没有 key，只有 value，所以 keys 方法获取的和 values 获取的都是键值
    ```js
    console.log(new Set([1, 2, 3]).keys()); //[Set Iterator] { 1, 2, 3 }
    ```
8. entries()
   获取到 Set 的键值对, 没一项是一个数组，数组内包含 key 和 value(Set 内相同)

    ```js
    let keys = new Set([1, 2, 3]).entries();
    for (let i of keys) {
    	console.log(i);
    }
    // [1, 1][(2, 2)][(3, 3)];
    ```

9. forEach()
   Set 内有自己的 forEach 方法，forEach 的第一个参数是回调函数，回调函数的第一个参数是 value，第二个参数是 key，第三个参数是 Set 本身，这和数组的 forEach 方法不同
    ```js
    let set = new Set([1, 4, 9]);
    set.forEach((value, key) => console.log(key + " : " + value));
    ```

### 用处

1. 去除数组重复的成员

```js
let arr = [...new Set([1, 2, 2, 4, 5, 1])];
console.log(arr); // [1, 2, 4, 5]
```

2. 去除字符串中重复的字符

```js
let str = [...new Set([1, 2, 2, 4, 5, 1])].join(""); // '1245'
```

## WeakSet

WeakSet 和 Set 的结构类似，也是`不重复`的值的集合

### 1. 为什么有了 Set 之后还要有 WeakSet

首先 Set 和 WeakSet 都是不重复的值的集合，但是两者还是有区别的

-   是WeakSet的成员只能是非基本类型(数组、对象、函数)，不能是其他的数据结构

```js
const b = [3, 4];
const ws = new WeakSet(b);
//Invalid value used in weak set

let wsArr = new WeakSet([[1, 2]])
let wsObj = new WeakSet([{name: 12}])
let a = function () {}
let wsFun = new WeakSet([a])
```

-   WeakSet 中的对象都是弱引用的
    垃圾回收机制不考虑 WeakSet 的引用，即只要其他的属性不引用该对象，那么垃圾回收机制就会回收该对象所占的内存

    这是因为垃圾回收机制依赖引用计数，当一个值的引用次数不为 0 时，垃圾回收机制就不会释放这块内存，结束使用该值时，有时会忘记取消引用，导致内存无法释放，造成内存泄漏，WeakSet 可以避免这种情况

### 构造函数 WeakSet

WeakSet 可以接收一个数组作为参数，数组的成员是数组或者类似数组的对象作为参数(任何具备 Iterator 接口的数据结构)，该数组的所有对象都会成为 WeakSet 实例对象的成员

```js
const a = [
	[1, 2],
	[3, 4],
];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}
```

上面代码中，a 是一个数组，它有两个成员，也都是数组。将 a 作为 WeakSet 构造函数的参数，a 的成员会自动成为 WeakSet 的成员。

注意，是 a 数组的成员成为 WeakSet 的成员，而不是 a 数组本身。这意味着，**数组的成员只能是对象**。

### WeakSet 的属性和方法

1. add()
   用于向 WeakSet 中添加成员
    ```js
    let ws = new WeakSet();
    ws.add([1, 2]);
    ```
2. delete()
   用于从 WeakSet 中删除成员
    ```js
   let arr = [1,2];
    let ws = new WeakSet([
    	a,
    	[3, 4],
    ]);
    ws.delete(a);
    ```
3. has()
   用于判断 WeakSet 是否拥有某些成员
   因为 WeakSet 没有 size 属性，所以对其使用 forEach 是无效的

## Map

### 含义和基本用法

JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。

为了解决这个问题，ES6 提供了 Map 这种数据结构。他类似于对象，也是一个键值对的集合，但是和对象的区别就是，它的键不仅仅只能是字符串了，可以是其他**任意类型**

```js
const map = new Map();
const o = { p: "Hello World" };

map.set(o, "content");
m.get(o); // "content"

m.has(o); // true
m.delete(o); // true
m.has(o); // false
```

### 构造函数 Map()

除了上述中的构造方法，还有一种就是给 Map 的构造函数传入一个数组，数组的每项成员都是一个键值对的数组

```js
let map = new Map([
	[1, 2],
	[null, 2],
]);
console.log(map);
// Map { 1 => 2, null => 2 }
```

### key 的唯一性

当对 Map 的某个相同的键赋值两次时，后面的会覆盖前面的，这一点要注意 key 为对象的时候，和 Set 一致

key 采用的也是类似于精确相等运算符，认为 0 和-0、+0 是相同的键，NaN 是相同的，undefined 和 null 是不同的键

### 对应的属性和方法

1.  set()
    向 map 中添加一个键值对
    返回值是当前的 Map 对象，所以可以链式调用
2.  get()
    获取某个键的值，如果没有则返回 undefined
3.  has()
    判断是否有某个键
4.  delete()
    删除某个键值对，如果删除失败，则返回 false
5.  size
    返回 Map 中的键值对的个数
6.  clear()
    清空 Map，没有返回值
7.  keys()
    返回键的遍历器
8.  values()
    返回值的遍历器
9.  entries()
    返回键值对的遍历器
    注意: Map 结构的默认的遍历器接口就是 entries，所以可以调用 for...of 进行遍历

    ```js
    let map = new Map();
    map.set(1, 2).set(2, 3);
    for (const [key, value] of map) {
    	console.log(key, value);
    }
    ```

10. forEach
    遍历 Map 的所有成员

### Map和展开运算符
```js
let map = new Map([[1,2]])
console.log(...map) // [ 1, 2 ]
```

## WeakMap
WeakMap和Map的数据结构一致，也是用于生成键值对的集合
```js
let wm = new WeakMap();
const key = {name : 1}
wm.set(key, 1)
```
### 与Map的不同
1. 只能用对象作为key(null除外)
2. 键名是弱引用

### 方法
1. get()
2. set()
3. has()
4. delete()

### 用处
1. 用于对某个对象(比如DOM)做某些处理时，可以用到