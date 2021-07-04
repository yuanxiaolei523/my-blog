/**
 * new的步骤
 * 1. 创建一个空的js对象
 * 2. 将空对象的原型指向构造函数的原型对象
 * 3. 将this指向这个空对象，执行构造函数中的代码，以获取私有属性
 * 4. 如果构造函数返回了一个对象res，就将该返回值res返回，如果返回值不是对象，就将创建的对象返回
 * 
 * new 的特性：
 * 1. 可以访问构造函数上的属性和方法 通过apply将构造函数上的属性绑定到obj上
 * 2. 可以访问构造函数原型上的属性和方法 通过原型链的形式让obj可以访问构造函数原型上的属性和方法
 * 3. new会返回一个新的对象obj，如果构造函数中有返回值并且返回值为对象形式，那么就返回这个对象，否则返回obj
 */
// function myNew(cons) {
//     let obj = Object.create(null);
//     obj.__proto__ = cons.prototype;
//     var ret = cons.apply(obj, Array.from(arguments).slice(1))
//     return ret instanceof Object ? ret : obj;
// }

function Person(name, age) {
    this.age = age;
    this.strength = 60;
    return [];
}

let p = new Person();
console.log(p);

Person.prototype.name = '123';
Person.prototype.getName = function () {
    // console.log();
    return this.age;
};
// var person = new2(Person, 'shine', 18)
// console.log(person, person.name);

function myNew() {
    var obj = {};
    let constructor = Array.prototype.shift.call(arguments);
    obj.__proto__ = constructor.prototype;
    var ret = constructor.apply(obj, arguments);
    return typeof ret === 'object' ? ret : obj;
}

// Function.prototype.myApply = function (ctx) {
//     ctx = ctx || window; // 以为当ctx不传的时候，默认绑定的是window
//     ctx.fn = this;
//     let args = [].slice.call(arguments, 1);
//     let ret = ctx.fn(args);
//     delete ctx.fn;
//     return ret;
// }


// let p = new Person('shine', 18);
// p.name = '456'
// console.log(p.age, p.strength, p.getName(), p.name, p.__proto__);

function myNew2 () {
    let obj = {};
    let Cons = [].shift.call(arguments);
    obj.__proto__ = Cons.prototype;
    var ret = Cons.apply(obj, arguments);
    return typeof ret === 'object' ? ret : obj;
}