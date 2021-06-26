/**
 * 首先要知道的是每种数据类型占的字节数
 * boolean: 一个boolean占四个字节
 * string: 一个字符占两个字节。
 * number: 一个数字总共占8个字节，0-51位存储数字或者小数，52-62位存储指数，正负数使用第63位存储
 * symbol:
 * bigInt:
 * undefined:
 * null:
 * 
 * 其次就是如果某个value是对象的话，会有引用同一个地址的情况
 */

const testData = {
    a: 111,
    b: 'cccc',
    2222: false,
    arr: [1, 2, '1']
};


console.log(getSizeOf(testData));
function getSizeOf (obj) {
    let size = 0;
    if (typeof obj !== 'object' && !obj) {
        return 0;
    }
    for (const key in obj) {
        size += calculatorSize(key);
        console.log(size, calculatorSize(key), key);
        let value = obj[key];
        if (typeof value === 'object') {
            size += getSizeOf(value);
        } else {
            size += calculatorSize(value);
        }
    }
    return size;
}

function calculatorSize(data) {
    switch (typeof data) {
        case 'number':
            return 8;
        case 'string':
            return data.length * 2;
        case 'boolean': 
            return 4;
        default:
            return 0;
    }
}