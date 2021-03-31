// const a = require('./b');
// console.log(a.foo())
// setTimeout(() => {
//     console.log(a.foo())
// }, 600)
// setTimeout(() => {
//     console.log(require('./b').foo())
// }, 1200)


console.log('a starting');
exports.done = false;
const b = require('./b');
console.log('in a, b.done =', b.done);
exports.done = true;
console.log('a done');


/*
a starting
b starting
in a, b.done = false
a done
in b, a.done = true
b done

*/