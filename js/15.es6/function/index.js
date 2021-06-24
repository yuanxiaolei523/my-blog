// function test (x = 10, y = 20) {
//     return x + y
// }
// console.log(test());

// function test2(x, x, y ) {
//     console.log(x, y);
// }
// function test3(x, x, y = 10 ) {
//     console.log(x);
// }
// console.log(test2(1,2,3));

// 函数参数的解构赋值
// function test ({x, y = 5} = {x: 1}) {
//     console.log(x, y) // 1, 5
// }
  
//   test ({x: 2, y :10})

/*
// 解构赋值和默认值的比较
function m1({x = 0, y = 0} = {}) {
    console.log([x, y]);
  }
  
  // 写法二
  function m2({x, y} = { x: 0, y: 0 }) {
    console.log([x, y]);
  }
  m1(); // [0, 0]
  m2(); // [0, 0]

  m1({x: 1}) // [1, 0]
  m2({x: 1}) // [1. undefined]

  m1({x: 1, y: 2}); // [ 1, 2 ]
  m2({x: 1, y: 2}); // [ 1, 2 ]

  m1({z: 1}); // [0, 0]
  m2({z: 1}); // [ undefined, undefined]
*/

// 默认值的位置
// function test(x, y =1, z) {
//     console.log(x, y, 2);
// }
// test(1, undefined,2)

/*
// length属性
function test(a, b, c) {
    console.log(0);
}
console.log(test.length);

function test2(a, b, c = 1) {
    console.log(0);
}
console.log(test2.length);

function test3(a, b = 1, d , c = 1, e, f= 1) {
    console.log(0);
}
console.log(test3.length);
*/

/*
// 作用域
var x = 1;
function test(x, y = x) {
    console.log(y); // 2
}
test(2);

var x = 1;
function test(x, y = x) {
    console.log(y); // 2
}
test();

// 声明之前访问
var x = 1;
function test(y = x, x) {
    console.log(y); // 2
}
test(undefined, 2);

var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() // 3
x // 1

*/

// reset

// function test (...arr) {
//     console.log(arr);
// }
// test(1, 2, 3);

// 严格模式
// function doSomething(value = 070) {
//     'use strict';
//     return value;
// }

// function doSomething() {
//     "use strict";
//     return function (value = 010) {
//         return value
//     }
// }

// name属性
// function test (...arr) {
//     console.log(arr);
// }
// console.log(test.name);

// let test = function () {
//     console.log(arr);
// }
// console.log(test.name);
// console.log(test.bind(this).name);

//箭头函数
// let test = (v) => v
// let test1 = function (v) {
//     return v;
// }
// console.log(test(1)); // 1
// console.log(test1(2)); // 2

// let test2 = (v1, v2) => {v1: v1, v2: v2} // 报错
// console.log(test(1));

// let test1 = (v1, v2) => ({v1: v1, v2: v2})
// console.log(test1(2,3));

// 阶乘
// function factorial (n, total) {
//     if (n === 0 || n === 1) {
//         return total;
//     }
//     return factorial(n -1, n * total)
//
// }

// console.log(factorial(4, 1))

// 斐波那契
// function Fibonacci (n) {
//     if ( n <= 1 ) {return n};
//     return Fibonacci(n - 1) + Fibonacci(n - 2);
// }
// console.log(Fibonacci(6))

// 尾调用优化
// var Fibonacci2 = function(n, ac1 = 0, ac2 = 1) {
//     if(n === 1) return ac2;
//     if(n === 0) return 0
//     return Fibonacci2(n-1, ac2, ac1+ ac2)
// };
// console.log(Fibonacci2(6))


// 函数柯里化优化
// function Fibonacci3(n, total) {
//     if (n <= 1) return total;
//     return Fibonacci3(n - 1, n * total)
// }
// function curry(fn, n) {
//     return function (m) {
//         return fn.call(this, m, n);
//     }
// }
//
// console.log(curry(Fibonacci3, 1)(5))

// 加法
// function sum(x, y) {
//     if (y > 0) return sum(x + 1, y - 1)
//     return x;
// }
//
// console.log(sum(1, 100000)) // 栈溢出

// 解决方法：蹦床函数
// function trampoline(fn) {
//     while(fn && fn instanceof Function) {
//         fn = fn();
//     }
//     return fn;
// }
// function sum2 (x, y) {
//     if (y> 0) return sum2.bind(this,x + 1, y -1);
//     return x;
// }
//
// console.log(trampoline(sum2(1, 1000000)))

// 尾逗号
// function close (param1, param2,) {
//     console.log(13)
// }
//
// close()

// toString
// function /** getName */ getName() {
//     console.log(123)
// }
//
// console.log(getName.toString())

// catch
try {
    console.log(123)
}catch {

}