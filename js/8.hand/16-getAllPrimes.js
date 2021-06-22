/*
    获取n内的所有的素数
*/

// function prime (n) {
//     if (n <= 1) {
//         return [];
//     }
//     let res = [];
//     let res2 = [];
//     for (let i = 2; i <= n; i++) {
//         for (let j = 1; j <= i; j++) {
//             if (i % j === 0 && i !== j && j !== 1) {
//                 res.push(i);
//             } 
//         }
//     }
//     for (let i = 2; i < n; i++) {
//         if (!res.includes(i)) {
//             res2.push(i);
//         }
//     }
        
//     return res2;
// }
// console.log(prime(49979));


function prime2 (n) {
    if (n < 3) {
        return 0;
    }
    let res = 0;
    for (let i = 2; i < n; ++i) {
        // if (isPrime(i)) {
        //     ;
        // }
        res += isPrime(i);
    }
    return res;
}
function isPrime(x) {
    for (let i = 2; i * i <= x; ++i) {
        if (x % i === 0) {
            return false;
        }        
    } 
    return true;
}


console.log(prime2(100000000));

