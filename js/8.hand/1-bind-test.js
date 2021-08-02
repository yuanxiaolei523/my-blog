Function.prototype.myCall = function (ctx) {
    ctx = ctx || window;
    ctx.fn = this;
    let args = [].slice.call(arguments, 1);
    let res = ctx.fn(...args);
    delete ctx.fn;
    return res;
};

Function.prototype.myApply = function(ctx) {
    ctx = ctx || window;
    ctx.fn = this;
    let args = [].slice.call(arguments, 1);
    let res = ctx.fn(args);
    delete ctx.fn;
    return res;
};

Function.prototype.myBind = function(ctx) {
    if (typeof this !== 'function') {
        throw new Error('');
    }
    ctx = ctx || window;
    let args = [].slice.call(arguments, 1);
    var self = this;
    var FNop = function () {};
    var FBound = function () {
        let bindArgs = [...arguments];
        /*
            当作为构造函数时，this 指向实例，此时 this instanceof fBound 结果为 true ，可以让实例获得来自绑定函数的值
            当作为普通函数时，this 指向 window ，此时结果为 false ，将绑定函数的 this 指向 context
        */
        return self.apply(this instanceof FNop ? this : ctx, args.concat(bindArgs));
    };
    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
    FNop.prototype = this.prototype;
    // 经过这步骤的原因是，如果直接使用FBound.prototype时，修改 fBound.prototype 的时候，也会直接修改 this.prototype
    FBound.prototype = new FNop();
    return FBound;
};

Function.prototype.myBind3 = function (ctx) {
    ctx = ctx || window;
    let self = this;
    let args = [].slice.call(arguments, 1);
    var fNop = function () {};
    var fBound = function () {
        let bindArgs = [...arguments];
        return self.apply(this instanceof fNop ? this : ctx, args.concat(bindArgs));
    };

    fNop.prototype = this.prototype;
    fBound.prototype = new fNop();
    return fBound;
};