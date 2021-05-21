/**
 * new的步骤
 * 1. 创建一个空的js对象
 * 2. 将空对象的原型指向构造函数的原型对象
 * 3. 将this指向这个空对象，执行构造函数中的代码，以获取私有属性
 * 4. 如果构造函数返回了一个对象res，就将该返回值res返回，如果返回值不是对象，就将创建的对象返回
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

}

Person.prototype.name = '123';
var person = new2(Person, 'shine', 18)
console.log(person, person.name);

function new2() {
    let obj = new Object();
    let cons = [].shift.call(arguments); // 新函数
    console.log(typeof cons);
    obj.__proto__ = cons.Prototype;
    var ret = cons.myApply(obj, arguments); // 如果构造函数返回的是对象，那么new会将构造函数返回的对象return，否则返回当前实例
    return ret instanceof Object ? ret : obj;
}

Function.prototype.myApply = function (ctx) {
    ctx = ctx || window; // 以为当ctx不传的时候，默认绑定的是window
    ctx.fn = this;
    let args = [].slice.call(arguments, 1);
    let ret = ctx.fn(args);
    delete ctx.fn;
    return ret;

}