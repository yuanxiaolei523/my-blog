// function Parent() {
// 	this.name = "shine";
// }

// Parent.prototype.getName = function () {
// 	console.log(this.name);
// };

// function Child() {
// 	this.name = "stone";
// }
// Child.prototype = new Parent();
// var c1 = new Child();
// console.log(c1.__proto__);
// c1.getName();

function Parent() {
    this.obj = {
        name: 'shine',
    };
    this.age = 13;
    this.getName = function () {
        console.log(123);
    };
}
function Child() {}
Child.prototype = new Parent();
var c1 = new Child();
var c2 = new Child();
console.log(c1.obj, c1.age);
c1.obj.name = 'stone';
c1.__proto__.age = 19;
c1.__proto__.getName = function () {
    console.log(456);
};
console.log(c1.__proto__, c2.__proto__, c1.age, c2.age);
// Child.prototype.obj.name = 'shineStone';
// console.log(c1.obj, c2.obj);


// 
// 子类实例会共享父类所有的属性和方法，一但修改，其他实例继承过来 的对象属性和方法也会被修改
// 无法向父类传参
