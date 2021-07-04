// for (var i = 0; i < 5; i++) {
//     setTimeout(() => {
//         console.log(i)
//     }, i * 100)
// }
// // 会打印5个5
//
// // 解决方法
// for (let i = 0; i < 5; i++) {
//     setTimeout(() => {
//         console.log(i)
//     }, i * 100)
// }

// for (let i = 0; i < 5; i++) {
//     ((j) => {
//         setTimeout(() => {
//             console.log(j)
//         }, i * 100)
//     })(i)
// }

for (let i = 0; i < 5; i++) {
    setTimeout((j) => {
        console.log(j)
    }, i * 1000, i)
}


