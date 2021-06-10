// function getName(a, b, c) {
//     arguments.a = 2;
//     console.log(arguments.a, a);
//     b = 2;
//     console.log(arguments.b);
//     if(a == 1) {
//         return 2 * arguments.callee(4)
//     }
//     return a;
//     // console.log(arguments.length, arguments.callee) // 1
// }

// console.log(getName(1));

// console.log(getName.length);

// function getName(a, b, c) {
//     a = 2;
//     console.log(arguments[0]);
//     b = 2;
//     console.log(arguments[1]);
// }

// getName(1);


let arguments = {
    0: 1,
    2: 3,
    length: 12
}
console.log(Array.from(arguments));
console.log(Array.prototype.concat.apply([], arguments));
