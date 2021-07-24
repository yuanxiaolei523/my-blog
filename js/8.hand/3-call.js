/**
 * call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。
 * call传入的参数是多个参数
 */

Function.prototype.myCall = function (ctx) {
    ctx.fn = this;
    ctx.fn();
    delete ctx.fn();
};
var foo = {
    value: 1
};

function bar() {
    console.log(this.value, this.name);
}

bar.myCall(foo); // 1
/**
 * 增加对call方法的参数兼容
 * @param {function} ctx 
 * @returns obj
 */
Function.prototype.myCall2 = function (ctx) {
    var ctx = ctx || window;
    ctx.fn = this;
    var args = [].slice.call(arguments, 1);
    let ret = ctx.fn(...args);
    delete ctx.fn();
    return ret;
};

Function.prototype.myCall3 = function (ctx) {
    ctx = ctx || window;
    ctx.fn = this;
    let args = [].slice.call(arguments, 1);
    let ret = ctx.fn(...args);
    delete ctx.fn;
    return ret;
};

Function.prototype.myCall2 = function (ctx) {
    ctx = ctx || window;
    ctx.fn = this;
    let args = [].slice.call(arguments, 1);
    let ret = ctx.fn(...args);
    delete ctx.fn;
    return ret;
};