// function Parent(age) {
// 	this.names = ["shine", "stone"];
// 	this.age = age;
// }

// Parent.prototype.getAge = function () {
// 	console.log(this.age);
// };

// function Child(age) {
// 	Parent.call(this, age);
// }

// Child.prototype = new Parent();
// var c1 = new Child(18);
// var c2 = new Child(19);
// console.log(c1.names, c2.names);
// c1.names.push("shineStone");
// console.log(c1.names, c2.names);

function Parent(name) {
    this.name = name;
}
Parent.prototype.age = 14;

function Child(...args) {
    this.age = 14;
    Parent.call(this, args);
}

Child.prototype = new Parent();
