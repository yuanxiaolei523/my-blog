// let p = new Promise(resolve => {
//     // console.log(0)
//     resolve(1);
// })
//     .finally(() => {return 1})
//     // .then(()=> {console.log(2)})
// console.log(p)

// let p1 = new Promise(resolve => {
//     console.log('p1')
//     resolve(1);
// })
//
// let p2 = new Promise((resolve, reject) => {
//     console.log('p2')
//     reject(1)
// })
// let p3 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('p3');
//         resolve(1)
//     }, 1000)
// })
// Promise.all([p1, p2, p3]).catch(e => {
//     console.log(e)})

const p1 = new Promise((resolve, reject) => {
    resolve('hello');
})
    .then(result => result)
    .catch(e => e);

const p2 = new Promise((resolve, reject) => {
    throw new Error('报错了');
})
    .then(result => result)
    .catch(e => e);

Promise.all([p1, p2])
    .then(result => console.log(result, 'then'))
    .catch(e => console.log(e));