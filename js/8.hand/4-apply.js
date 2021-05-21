Function.prototype.myApply = function (ctx, arr) {
    var ctx = ctx || window;
    ctx.fn = this;
    let result = arr ? ctx.fn() : ctx.fn(arr);
    delete ctx.fn;
    return result;
}