/**
 * 大数相加
 * js中的最大安全数是Math.pow(2, 53),最小安全数是-Math.pow(2, 53) + 1
 * 9007199254740992
 * 11111111111111111
 */ 

function num2Str(num) {
    return typeof num === 'number' ? num + '' : num;
}


function bigNumber (num1, num2) {
    num1 = num2Str(num1);
    num2 = num2Str(num2);
    let len1 = num1.length;
    let len2 = num2.length; 
    if (len1 > len2) {
        num2 = num2.padStart(len1, '0');
    } else if (len1 < len2) {
        num1 = num1.padStart(len2, '0');
    }
    let res = ''.padStart(18, '');

    for (let i = 0; i < num1.length; i++) {
        res += (Number(num1[i]) + Number(num2[i]));
    }
    return res;
}
console.log(bigNumber('11111111111111111', '111111111111111110'));