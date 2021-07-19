/**
 * 找出两个数的最大公约数
 */

function getCommonDivisor(num1, num2) {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        throw new Error('必须是数字');
    }
    if (num1 <= 0 || num2 <= 0) {
        return;
    }
    let arr = [];
    let num = Math.min(num1, num2);
    for (let i = 1; i <= num; i++) {
        if (num1 % i == 0 && num2 % i === 0) {
            arr.push(i);
        }
    }
    return arr[arr.length - 1];
}



console.log(getCommonDivisor(15, 5));