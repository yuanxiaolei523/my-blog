/*
 判断一个数是否是素数/质数
 素数/质数：只能被1和自己整除
*/

/**
 * 因为1不是素数，所以循环从2开始，到num-1，只要有一个能做num的约数，那么就说明是素数，否则不是
 * @param {number} x 
 * @returns boolean
 */
function isPrime(x) {
    for (let i = 2; i <= x - 1; i++) {
        if (x % i === 0) {
            return false;
        }
    } 
    return true;
}


/**
 * 优化：因为一个数如果是质数，那么他的约数一个要大于等于该数的平方根，一个要小于等于该数的平方根，
 * 所以只要循环从2到当前数的平方根即可，如果有能被整除的，则说明是，如果没有则不是
 * @param {number}} num 
 * @returns 
 */
function isPrime2(num) {
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
 
}

// console.log(isPrime2(6));

/**
 * 大于等于5的质数一定和6的倍数相邻
 * 大于5的质数: 5、7、11、13、17、19、23
 * @param {number}} num 
 * @returns boolean
 */
function isPrime3(num) {
    if (num === 2 || num === 3) {
        return true;
    }
   
    if (num % 6 !== 1 && num % 6 !== 5) {
        return false;
    }
    // let tmp = Math.sqrt(num);
    for (let i = 5; i <= Math.sqrt(num); i += 6) {
        // 如果num不是整除6的倍数-1或者6的倍数+1， 那么就不是质数
        if (num % i == 0 || num % (i + 2) == 0) {
            return false;
        }
        // for (let i = 5; i <= tmp; i += 6 )
        //     if (num % i == 0 || num % (i + 2) == 0 )
        //         return false;

    }
    return true;
}
console.log(isPrime3(23));