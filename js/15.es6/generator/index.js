// function* getName() {
//     // console.log(123);
//     yield 1;
//     yield 2;
//     return 3
// }

// let iter = getName();
// for (const v of iter) {
//     console.log(v);
// }
// console.log(iter.next());

// var g = function* () {
//   while (true) {
//     try {
//       yield;
//     } catch (e) {
//       if (e == 'a') throw e;
//       console.log('内部捕获', e);
//     }
//   }
// };

// var i = g();
// i.next();

// try {
//     i.throw('a')
// //   throw new Error('a');
//   throw new Error('b');
// } catch (e) {
//   console.log('外部捕获', e);
// }

// var gen = function* gen(){
//   try {
//     yield console.log('a');
//   } catch (e) {
//     // ...
//   }
//   yield console.log('b');
//   yield console.log('c');
// }

// var g = gen();
// g.next(1) // a
// g.throw() // b
// g.next() // c


const g = function* (x, y) {
  let result = yield x + y;
  let res2 = yield result + 1;
  return [result, res2];
};

const gen = g(1, 2);
console.log(gen.next(2)); // Object {value: 3, done: false}

console.log(gen.next(1));
console.log(gen.next(1));