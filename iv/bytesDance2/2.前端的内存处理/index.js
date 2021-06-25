const testData = {
    a: 111,
    b: 'cccc',
    2222: false,
};

/**
 * 在js中，
 * str：两个字节
 * number(64位)：8个字节
 * boolean: 4字节
 */

function calculator(obj) {
    let res = 0;
    if (typeof obj !== 'object' && !obj) {
        return 0;
    }

    if (Array.isArray(obj)) {
        obj.forEach((item) => {
            calculator(item);
        });
    }
    if (typeof obj === 'object' && obj != null) {
        console.log(res);

        Object.keys(obj).forEach((item) => {
            res += calculator(item);
        });
        // 如果value是同一个对象的情况下，那么此时会将其计算两次
        Object.values(obj).forEach((item) => {
            res += calculator(item);
        });
    }
    switch (typeof obj) {
        case 'number':
            res = 8;
            break;
        case 'string':
            res = 2 * obj.length;
            break;
        case 'boolean':
            res = 2;
            break;
    }
    return res;
}

console.log(calculator(testData));
