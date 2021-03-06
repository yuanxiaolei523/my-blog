/**
 * 1. bind接受一堆参数，第一个参数是一个对象，后面的参数是传入的参数
 * 2. bind返回一个函数
 * 3. bind返回的函数可以使用new创建实例，提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。
 * 
 */

// // var barBind = bar.bind(obj);
// /**
//  * 实现返回函数
//  */
// Function.prototype.bind1 = function (context) {
//     var self = this;
//     return function () {
//         // 返回的函数可能会有返回值
//         return self.apply(context);
//     }

// }
// // console.log(bar.bind2(obj)())

// var foo = {
//     value: 1
// };

// function bar(name, age) {
//     console.log(this.value);
//     console.log(name);
//     console.log(age);

// }

// // var bindFoo = bar.bind(foo, 'shine');
// // bindFoo('18');
// /**
//  * 实现函数传参
//  */
// Function.prototype.bind2 = function (context) {
//     var self = this;
//     let args = Array.prototype.slice.call(arguments, 1);
//     return function () {
//         // 这个时候的arguments是指bind返回的函数传入的参数
//         let bindArgs = Array.prototype.slice.call(arguments);
//         // 返回的函数可能会有返回值
//         return self.apply(context, bindArgs.concat(args));
//     }
// }


// var bindFoo = bar.bind2(foo, 'shine');
// bindFoo('18');

// /**
//  * 绑定的函数可以使用new操作符创建对象
//  */
// Function.prototype.bind3 = function (ctx) {
//     if(typeof this !== 'function') {
//         throw new Error('函数')
//     }
//     ctx = ctx || window;
//     let self = this;
//     let args = [].slice.call(arguments, 1);
//     var fBound = function () {
//         let bindArgs = [].slice.call(arguments);
//         /*
//          * 当作为构造函数时，如果this指向实例，那么将绑定函数的this指向该实例，可以让实例活的来自绑定的值
//          * 当作为普通功函数时，this指向window，将绑定函数的this指向context
//          */
//         return self.apply(this instanceof fBound ? this : ctx, args.concat(bindArgs))
//     }
//     // 让实例继承绑定函数原型中的值(弊端：会将绑定函数的prototype属性修改)
//     fBound.prototype = this.prototype;
//     return fBound;
// }

Function.prototype.bind4 = function (ctx) {
    if (typeof this !== 'function') {
        throw new Error('函数');
    }
    ctx = ctx || window;
    let self = this;
    let args = [].slice.call(arguments, 1);
    // 空函数，做中转，防止绑定函数的prototype被修改
    var fNop = function () {}; 
    var fBound = function () {
        let bindArgs = [].slice.call(arguments);
        /*
         * 当作为构造函数时，如果this指向实例，那么将绑定函数的this指向该实例，可以让实例获得来自绑定的值
         * 当作为普通功函数时，this指向window，将绑定函数的this指向context
         */
        return self.apply(this instanceof fNop ? this : ctx, args.concat(bindArgs));
    };
    // 这样在修改
    fNop.prototype = this.prototype;
    fBound.prototype = new fNop(); // 想当于深拷贝了一份this.prototype
    // fBound.prototype = this.prototype;
    return fBound;
};

// bind4中通过fNop的中转可以做到在修改bindFoo的时候，不去修改bar的prototype


Function.prototype.myBind = function(ctx) {
    ctx = ctx || window;
    let self = this;
    // let args = [].slice.call(arguments, 1);
    return function () {
        return self.apply(ctx);
        // let innerArgs = [].concat(arguments);
        // let ret = ctx.fn(...args, ...innerArgs);
        // return ret;
    };
};

function bar() {
    this.value = 1;
}
function foo () {
    console.log(this.value);
}
console.log(foo.bind(bar)());
var bindFoo = foo.myBind(bar);
// bindFoo.prototype.value = 1;
console.log(bindFoo()); // 1
