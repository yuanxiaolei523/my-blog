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

function Parent (name, age) {
    this.name = name;
    this.age = age;
    this.sayName = function() {
        return this.name;
    };
}
Parent.prototype.sayAge = function () {
    return this.age;
};


function Child (name) {
    Parent.call(this, name);
}
Child.prototype = new Parent();
Child.prototype.constructor = Child;

let c1 = new Child('jj');
let c2 = new Child('xd');
console.log(c1.__proto__, c2.__proto__);
