// Promise.all([])

// let p1 = new Promise((resolve, reject) => {
//     console.log('p1');
//     resolve(0);
// });
// let p2 = new Promise((resolve, reject) => {
//     console.log('p2');
//     resolve(0);
// });
// let p3 = new Promise((resolve, reject) => {
//     console.log('p3');
//     resolve(0);
// });

// let p = Promise.all([p1, p2, p3])
//     .then((res) => {
//         console.log(res); // 3s后打印123
//     })
//     .catch((res) => {
//         console.log(res);
//     });


let p = Promise.all([]);
console.log(p);