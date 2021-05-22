// var obj = {
//     name: 'shine'
// } 
// function bar () {
//     console.log(this.name);
//     return 1;
// }

// var barBind = bar.bind(obj);
/**
 * 实现返回函数
 */
Function.prototype.bind1 = function (context) {
    var self = this;
    return function () {
        // 返回的函数可能会有返回值
        return self.apply(context);
    }

}
// console.log(bar.bind2(obj)())

var foo = {
    value: 1
};

function bar(name, age) {
    console.log(this.value);
    console.log(name);
    console.log(age);

}

// var bindFoo = bar.bind(foo, 'shine');
// bindFoo('18');
/**
 * 实现函数传参
 */
Function.prototype.bind2 = function (context) {
    var self = this;
    let args = Array.prototype.slice.call(arguments, 1);
    return function () {
        // 这个时候的arguments是指bind返回的函数传入的参数
        let bindArgs = Array.prototype.slice.call(arguments);
        // 返回的函数可能会有返回值
        return self.apply(context, bindArgs.concat(args));
    }
}


var bindFoo = bar.bind2(foo, 'shine');
bindFoo('18');

/**
 * 绑定的函数可以使用new操作符创建对象
 */
Function.prototype.bind3 = function (context) {
    if (typeof this !== "function") {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    var self = this;
    let args = Array.prototype.slice.call(arguments, 1);

    var fNop = function () { }
    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        //当作为构造函数时，this指向实例，此时结果为true，将绑定函数的this指向该实例，可以让实例获得来自绑定函数的值
        // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
        return self.apply(this instanceof fNop ? this : context, args.concat(bindArgs));
    }
    fNop.prototype = this.prototype;
    fBound.prototype = new fNop();
    // fBound.prototype = this.prototype;
    return fBound;
}