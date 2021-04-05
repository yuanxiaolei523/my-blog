const xxx = {}
const testData = {
    a: 111,
    b: 'cccc',
    2222: false,
    c: xxx,
    d: xxx
}

/*
number是8字节
string：每个长度是2个字节
boolean：每个长度是4个字节

*/

const seen = new WeakSet();

function sizeOfObject(object) {
    if (object === null) return 0;
    let bytes = 0;
    // 对象里的key也是占用内存空间的
    let properties = Object.keys(object);
    for(let i = 0; i < properties.length; i++) {
        const key = properties[i];
        if (typeof object[key] === 'object' && object[key] !== null) {
            if (seen.has[object[key]]) {
                continue;
            } 
            seen.add(object[key])
        }   
        bytes += calculator(key);
        bytes += calculator(object[key]);
    }
}

function calculator (object) {
    let objectType = typeof object;
    switch (objectType) {
        case 'string':
            return Object.length * 2
            break;
        case 'boolean': 
            return 4;
        case 'number':
            return 8;
        case 'object':
            if (Array.isArray(object)) {
                return object.map(calculator).reduce((res, current) => res + current, 0);
            } else {
                return sizeOfObject(object);
            }
        default:
            return 0;
    }
}