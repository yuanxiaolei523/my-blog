/*
    结合了 函数作用域、原型、原型对象、运算符优先级、this 指向、变量提升、函数声明提升 等一系列问题。
    在函数中
*/

function Foo () {
    // 相当于在window里面声明
    getName = function () {
        console.log(1);
    };
    return this;
}
// 声明了一个静态属性，只能通过Foo访问
Foo.getName = function() {
    console.log(2);
};

// 在Foo的原型链上挂载函数
Foo.prototype.getName = function () {
    console.log(3);
};
// 在window声明函数
var getName = function () {
    console.log(4);
};
// 在window内声明函数, 会有声明提升
function getName() {
    console.log(5);
}

Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // 2
new Foo().getName();  // 3
new new Foo().getName() // 3
