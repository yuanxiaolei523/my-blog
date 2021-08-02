// function Parent() {
// 	this.obj = {
// 		name: "shine",
// 	};
// }

// function Child() {
// 	Parent.call(this);
// }
// var c1 = new Child();
// var c2 = new Child();
// console.log(c1.obj.name, c2.obj.name); // shine shine
// c1.obj.name = "stone";
// console.log(c1.obj.name, c2.obj.name); // stone shine


function Parent(name) {
    this.name = name;
    this.sayHi = function() {
        console.log(this, this.name);
        return this.name;
    };
}

Parent.prototype.age = 14;
Parent.prototype.sayName = function() {
    console.log(this.name);
    
};
function Child(name) {
    Parent.call(this, name);
}

let c1 = new Child('zs');
let c2 = new Child('ls');
console.log(c1.sayHi(), c2);
// c1.sayName();
// 可以向父类中传参
// 自类不会共享父类的属性和方法了

/*
 缺点：
 1. 子类无法继承父类原型上的属性和方法
 2. 方法都在构造函数中声明，所以无法实现函数的复用
*/