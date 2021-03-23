# function

## function的默认值

### ES6之前

ES6之前不能直接为函数的参数赋默认值，只能通过下面这种变通的方法来进行

```js
function test (x, y) {
    x = x || 10;
    y = y || 20;
    return x + y
}
console.log(test());j
```

但是这种方法会有缺点，如果x或者y赋值了false或者''等值为falsy的时，会直接读取默认值了，虽然我们可以通过判断x是否为undefined来解决，但是我们还是不希望写这些烦杂的代码

### ES6

ES6之后，可以直接为函数的形参赋默认值了

```js
function test (x = 10, y = 20) {
    return x + y
}
console.log(test());
```

#### 优点

1. 阅读者可以立即知道哪些参数是可以省略的
2. 有利于将来的代码优化，即使彻底拿掉这个参数也不会报错

### 注意

1. 函数的参数是默认声明的，不能再函数体内使用let或者const再次声明

2. 使用参数默认值时，函数不能有同名参数

   ```js
   // 不报错
   function test2(x, x, y ) {// 后面的会将前面的参数覆盖
       console.log(x, y);  // 2, 3
   }
   // 报错
   function test3(x, x, y = 10 ) {
       console.log(x);
   }
   ```

3. 参数默认值是惰性求值的

### 与解构赋值结合使用

#### 对象的解构赋值

```js
function test ({x, y=5}) {
	console.log(x, y) // 1,2 
}
test ({x: 1, y: 2})
test ({x: 1}) // 1, 5
foo() // TypeError: Cannot read property 'x' of undefined
```

上面我们可以看到，不给test传参的时候，就会报错，这时我们可以通过默认值的解构赋值来解决

#### 函数参数默认值的解构赋值

```js
function test ({x, y = 5} = {x: 1}) {
  console.log(x, y) // 1, 5
}

test () // 1, 5
test ({x: 2, y :10}) // 2, 10
```

#### test

问：以下两种写法有什么不同

```js
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
```

答：第一种方式是对变量进行的解构赋值，当你调用函数的时候，如果不传值，或者传入一个对象，对象内没有x、y属性，那么x、y也会有默认值，第二种式对函数的形参设置默认值，第二种如果你调用函数，不传值的时候，x、y会有默认值，当传入值的时候，x、y就是undefined了
```js
  m1(); // [0, 0]
  m2(); // [0, 0]

  m1({x: 1}) // [1, 0]
  m2({x: 1}) // [1. undefined]

  m1({x: 1, y: 2}); // [ 1, 2 ]
  m2({x: 1, y: 2}); // [ 1, 2 ]

  m1({z: 1}); // [0, 0]
  m2({z: 1}); // [ undefined, undefined ]
```
### 参数默认值的位置
通常情况下。定义了默认值的参数，都应该是函数的尾参数
```js
function test(x, y =1, z) {
    console.log(x, y, 2);
}
test(1, undefined, 2)
```
如果定义了默认值的参数，不是尾参数，那么想给第三个参数赋值、第二值使用默认值的时候，就必须需要给第二个参数设置为**undefined**，否则会报错，**null**也不行

### length属性
#### 没有指定参数的默认值的情况
如果没有指定函数参数的默认值时，函数的length属性表明的是函数参数的个数
```js
function test(a, b, c) {
    console.log(0);
}
console.log(test.length); // 3
```
#### 具有默认值的参数是尾参数的情况
如果指定了函数参数的默认值时，那么函数的length属性表明的就是没有指定默认值的参数的个数
```js
function test2(a, b, c = 1) {
    console.log(0);
}
console.log(test2.length); // 2
```

#### 具有默认值的参数不是尾参数的情况
此时length属性只会计算具有默认值的参数之前的参数的个数了
```js
function test3(a, b = 1, d , c = 1) {
    console.log(0);
}
console.log(test3.length); // 1
```
### 作用域
一旦设置了参数的默认值时，在函数进行声明初始化时，参数会形成一个**单独**的作用域，等初始化结束，这个作用域就会消失

```js
var x = 1;
function test(x, y = x) {
    console.log(y); // 2
}
test(2); 
```
因为在y之前已经声明了x了，所以此时调用函数的时候会形成一个单独的作用域，在这个作用域里y=x，取得就是形参x

```js
var x = 1;
function test(y = x) {
    let x = 3;
    console.log(y, x); // 1
}
test();
```
因为在函数的单独的形参作用域中没有声明x，所以会去父级作用域中寻找，此时找到x = 1

在函数形参中，如果在**声明之前去访问，会报错**
```js
var x = 1;
function test(y = x, x) {
    console.log(y);
}
test(undefined, 2); // ReferenceError: x is not defined
```

#### case

**case1:**

```js
var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() // 3
x // 1
```
**解释**
首先函数外层声明一个变量x，然后执行foo，foo执行过程中，其形参会形成一个单独的作用域,此时作用域为空{}，然后此时形参x进入作用域
{let x = undefined;},之后将y push进作用域内，此时作用域内就是下面这个样子了
{
    let x = undefined;
    let y = function () {
        x = 2
    }
}
所以可以看出，y内访问的x其实是当前作用域内的形参x
后续在foo内声明了变量x并赋值为3，执行y之后，将形参的x变为2了，console.log(x) 打印的是foo内声明的x，所以其值为3,至于外层的x，压根没有做改变，所以其值还是1

**case2**
```js
var x = 1;
function foo(x, y = function() { x = 2; }) {
  x = 3;
  y();
  console.log(x);
}

foo() // 2
x // 1
```
**解释**
这个和上面那个不同的是，foo内没有再次声明变量x了，所以此时对x进行赋值，其实修改的是形参x，然后又调用y，又把x赋值成2了，然后console.log(x)打印的还是形参x，所以结果是2，至于外层的x，没有做过任何修改
## 注意点：
1. 函数的参数实际上可以理解为是以let声明的变量，重复声明还是会报错的

## reset参数
ES6引入了reset参数，用于获取函数的多余参数，这样就不需要arguments对象了，reset参数搭配的变量就是一个数组，将改函数多余的参数放进去
```js
function test (...arr) {
    console.log(arr);
}

test(1, 2, 3);// [ 1, 2, 3 ]
```
## 严格模式
ES2016 做了一点修改，规定只要**函数参数**使用了默认值、解构赋值、或者扩展运算符，那么**函数内部**就不能显式设定为严格模式，否则会报错。
**原因:**函数内部的严格模式，同时适用于函数体和函数参数。但是，函数执行的时候，先执行函数参数，然后再执行函数体。这样就有一个不合理的地方，只有从函数体之中，才能知道参数是否应该以严格模式执行，但是参数却应该先于函数体执行。
```js
function doSomething(value = 070) {
  'use strict';
  return value;
}
```
上面的函数执行会报错（SyntaxError: Illegal 'use strict' directive in function with non-simple parameter list），这是因为函数的参数是以0开头的(八进制)，但是严格模式下已经禁止八进制以0开头了，所以会报错

### 解决方法
1. 全局的严格模式
2. 通过函数内部返回匿名函数的方式
```js
function doSomethine() {
    "use strict";
    return function (value = 010) {
        return value
    }
}
```
执行函数的时候报错：0不能用于严格模式中

## name属性
ES6中将name属性写入了标准，通过name属性我们可以得知当前函数的名字
```js
function test (...arr) {
    console.log(arr);
} 
console.log(test.name); // test

let test = function () {
    console.log(arr);
}
console.log(test.name);// test
```
与ES5不同的是，ES5中如果将一个匿名函数赋值给一个变量，那么他的name属性为空，但是es6中可以正常返回
### 使用Function构造函数返回的实例
使用Function构造函数返回的实例的name属性，其值是匿名的
(new Function).name // "anonymous"

### 使用bind函数之后的name属性
使用bind函数之后的name属性，其值会在函数名前加上bound
```js
let test = function () {
}
console.log(test.bind(this).name);// bound test
```
## 箭头函数
ES6中支持箭头函数了
```js
let test = v => v

let test1 = function (v) {
    return v;
}
console.log(test(1)); // 1
console.log(test1(2)); // 2
```
上面这两种方式等同
如果当前箭头函数**不需要参数或者需要多个参数**，则可以使用一个圆括号代表参数部分
```js
let test = () => 1
```

如果箭头函数的函数体超过一条语句，则需要使用大括号将它们括起来，并且使用return语句返回。
```js
let test = (v1, v2) => {
    console.log(v1, v2);
    return v1 + v2;
}
```
使用箭头函数返回一个对象
```js
let test2 = (v1, v2) => {v1: v1, v2: v2}
```
这种会直接报错，因为js会将{}当做代码块，所以上述代码会直接报错，所以如果在箭头函数中返回一个对象，需要在外面加一层();
```js
let test2 = (v1, v2) => ({v1: v1, v2: v2})// { v1: 2, v2: 3 }

```
### 优点
1. 使得函数看起来更加简洁
2. 简化回调函数

### 注意：
1. 箭头函数内没有this，或者箭头函数的this是定义时所在的对象，不是使用时所在的对象(不能使用call、apply、bind)
2. 箭头函数内不能使用arguments
3. 箭头函数不可以当做构造函数(不能使用new.target)
4. 箭头函数不能使用yield命令
### 不适应场合
1. 定义对象内部的函数时
2. 动态this

## 尾调用
尾调用就是在函数的最后一步调用其他函数
```js
// 示例
function f() {
    return g();
}
```
以下三种情况均不属于尾调用
```js
// 情况一: 在调用之后还有赋值操作
function f(x){
  let y = g(x);
  return y;
}

// 情况二: 在调用之后还有加法操作
function f(x){
  return g(x) + 1;
}

// 情况三: 在调用之后还有return undefined
function f(x){
  g(x);
}
```
尾调用并不一定是函数的最后一行，只要是函数执行的**最后一步**操作即可

### 尾调用优化
**非尾调用**

在函数调用的时候，会形成一个调用帧，然后将调用帧push到调用栈内。如果有一个函数A，其内部调用了函数B，
此时我们调用函数A的时候，会形成一个调用帧A，然后push到调用栈内，其次会执行到调用函数B时，函数B形成
调用帧B，然后push到调用栈内，这个时候当函数B调用完毕之后，就会将B帧pop出调用栈，然后等待A调用完成
后，将A pop出调用栈，至此执行完毕

**尾调用**

尾调用的执行就在于因为函数在最后一步调用，所以不需要保存外层的调用帧了，因为调用位置和内部变量等都用不到了
，所以只需要用内层函数的调用帧，代替外层函数的调用帧即可

注意：下面这个函数并不属于尾调用优化，因为inner还用到了外层的变量one，所以不属于尾调用优化
```js
function addOne(a){
  var one = 1;
  function inner(b){
    return b + one;
  }
  return inner(a);
}
```
> 注意：目前只有safari支持尾调用优化

### 尾递归
尾递归就是尾调用自身，就称为尾递归.
```js
// 阶乘示例
function factorial(n) {
    if (n === 0 || n === 1) {
        return n;
    }
    return factorial(n -1) * n
}
// 尾递归优化
function factorial (n, total) {
    if (n === 0 || n === 1) {
        return total;
    }
    return factorial(n -1, n * total)
    
}

// 斐波那契示例
function Fibonacci(n) {
    if (n <= 1) return n;
    return Fibonacci(n - 1) + Fibonacci(n - 2);
}
// 尾调用优化
var Fibonacci2 = function(n, ac1 = 0, ac2 = 1) {
    if(n === 1) return ac2;
    if(n === 0) return 0
    return Fibonacci2(n-1, ac2, ac1+ ac2)
};
// 函数柯理化优化
function Fibonacci3(n, total) {
    if (n <= 1) return total;
    return Fibonacci3(n - 1, n * total)
}
function curry(fn, n) {
    return function (m) {
        return fn.call(this, m, n);
    }
}

curry(Fibonacci3, 4)
```

### 严格模式
ES6的尾调用优化只在严格模式下开启
这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。
    - func.arguments：返回调用时函数的参数。
    - func.caller：返回调用当前函数的那个函数。
尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效。

### 非严格模式下的尾调用优化
1. 如何自己实现一个尾调用优化呢
首先尾调用优化的原因就是因为调用栈太多，会造成溢出，那么只要我们减少调用栈即可,怎么才能减少调用栈呢，这里
   我们使用蹦床函数来解决，将递归调用转换为循环调用
```js
function sum(x, y) {
    if (y > 0) return sum(x + 1, y - 1)
    return x;
}

console.log(sum(1, 100000)) // 栈溢出

// 解决方法
function trampoline(f) {
    while(f && f instanceof  Function) {
        f = f();
    }
    return f;
}
function sum(x, y) {
    if (y > 0) return sum(x + 1, y - 1)
    return x;
}

```   
## 7.函数参数的尾逗号
ES2017支持函数的最后一个参数后有一个逗号，

## 8. Function.prototype.toString()
在ES2019之前，函数代码会返回代码本身，省略空格和注释，但是ES2019开始会原样返回函数
```js
function /** getName */ getName() {
    console.log(123)
}
console.log(getName.toString())
//function /** getName */ getName() {
//    console.log(123)
//}

```

## 9.catch函数的参数省略
ES2019之前catch的参数必须带上，不管有没有用到，但是ES2019规定catch函数可以不写
```js
try {
    console.log(123)
}catch {
    
}
```