// const add2 = x => y => z => x + y + z;

// const curry = (fn, ...args) => args.length >= fn.length 
//     ? fn(...args) 
//     : (..._args) => curry(fn, ...args, ..._args);
// function add1(x, y, z) {
//     return x + y + z;
// }

// const add = curry(add1);



// console.log(add(1, 2)(3));


// 无线加版本
// function argsSum (...args) {
//     args.reduce((prev, cur) => prev + cur);
// }

// function add(...args1){ 
//     let sum1 = argsSum(args1); 
//     let fn = function(...args2){ 
//         let sum2 = argsSum(args2); 
//         return add(sum1 + sum2); 
//     }; 
//     fn.toString = function(){ 
//         return sum1; 
//     }; 
//     return fn; 
// }

// 如何实现add(1)(2)(3)(4)....
// function curry (x) {
//     function add (y) {
//         x = x + y;
//         return x;
//     }
//     add.toString = function () {
//         return x;
//     };
//     return add;
// }

// curry(1)(2)(3);


// function add(...args){ 
//     let sum = args.reduce((acc, cur) => acc + cur);
//     // let newArgs;
//     return function curry (...nextArgs) { 
//         // newArgs = nextArgs;
//         return nextArgs.length !== 0 ? add(sum, ...nextArgs) : sum; 
//     };
//     // return newArgs.length ? curry(sum, ...newArgs) : sum;
//     // curry.toString = function () {
//     //     return sum;
//     // };
//     // return curry;
// }
// console.log(add(1)(2));

// var add = function (m) {
//     var temp = function (n) {
//         return add(m + n);
//     };
//     temp.toString = function () {
//         return m;
//     };
//     return temp;
// };
function argsSum (args) {
    return args.reduce((prev, cur) => prev + cur);
}

// function add (...args1) {
//     let sum = argsSum(args1);
//     let curry = (...args) => add(sum + argsSum(args));
//     curry.toString = function () {
//         return sum;
//     };
//     return curry;
   
// }

// console.log(add(9, 2)(2)(3));

function getSum (args) {
    return args.reduce((prev, cur) => prev + cur);

}
function add2(...args1) {
    let res = getSum(args1);
    const func = (...args) => add2(res + getSum(args));
    func.toString = function () {
        return res;
    };
    return func;
}
console.log(add2(1)(2)(3));

function add2(...args) {
    let res = getSum(args);
    const func = (...args1) => add2(res + getSum(args1));
    func.toString = function () { return res; }
    return func()
}