/*
    结合了 函数作用域、原型、原型对象、运算符优先级、this 指向、变量提升、函数声明提升 等一系列问题。
    在函数中
*/

function Foo () {
    getName = function () {
        console.log(1);
    };
    // this.getName = function () {
    //     console.log(12);
    // }
    // var getName = function () {
    //     console.log(10);
    // }
    // console.log(this);
    return this;
}
Foo.getName = function() {
    console.log(2);
};
Foo.prototype.getName = function () {
    console.log(3);
};

var getName = function () {
    console.log(4);
};

function getName() {
    console.log(5);
}

Foo.getName(); // 2 访问静态方法
getName(); // 4 因为5会声明提升
Foo().getName(); // 1 Foo执行完毕后，会对window中的getName重新赋值
getName(); // 1
new Foo.getName(); // 2
new Foo().getName(); // 3 函数调用的优先级大于不带参数的new的优先级, 小于带参数的new的优先级
new new Foo().getName() //3


// function myNew (ctx) {
//     let obj = new Object();
//     obj.__proto__ = ctx.prototype;
//     let args = [].slice.call(arguments, 1);
//     let res = ctx.apply(obj, args);
//     return typeof res === 'object' ? res : obj 
// }

// let a = myNew(Foo);
// console.log(a.getName());