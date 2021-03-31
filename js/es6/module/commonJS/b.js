// let foo = 1;
// setTimeout(() => {
//     foo = 2;
// }, 500);
// setTimeout(() => {
//     foo = 3
// }, 1100)
// module.exports = {
//     foo: () => {
//         return foo;
//     },
// };
//
// console.log(123)

// b.js
console.log('b starting');
exports.done = false;
const a = require('./a');
console.log('in b, a.done =', a.done);
exports.done = true;
console.log('b done');