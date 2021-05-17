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
        // 返回的函数可能会有返回值
        let bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(context, bindArgs.concat(args));
    }
}


var bindFoo = bar.bind2(foo, 'shine');
bindFoo('18');