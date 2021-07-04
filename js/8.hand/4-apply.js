Function.prototype.myApply = function (ctx, arr) {
    var ctx = ctx || window;
    ctx.fn = this;
    let result = arr ? ctx.fn() : ctx.fn(arr);
    delete ctx.fn;
    return result;
};

Function.prototype.myApply2 = function(ctx, arr) {
    ctx = ctx || window;
    ctx.fn = this;
    let ret = ctx.fn(arr);
    delete ctx.fn;
    return ret;
};