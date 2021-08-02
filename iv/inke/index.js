// 映客直播
var name = 'oop';
var Person = function (options) {
    this.name = options.name;
    this.age = 10;
    // this.getPersonName = function () {
    //     console.log(this);
    // };
};

Person.prototype.name = 'Person Prototype';
Person.prototype.getName = function () {
    console.log(this);
    return this.name;
};

var p = new Person({ name: 'inke' });
// console.log(p.constructor); // 实例的constructor指向构造函数
// console.log(p instanceof Person); // true
// console.log(p.hasOwnProperty("name")); // true
// console.log(p.hasOwnProperty("getName")); // false
// console.log("getName" in p); // true

// console.log(p.getPersonName()); // this指向Person
var getName = p.getName;
console.log(Person.prototype.getName()); // this指向的Person.prototype

console.log(getName()); // oop
console.log(getName === Person.prototype.getName); // true
console.log(p.getName()); // inke
