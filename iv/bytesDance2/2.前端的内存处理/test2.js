const testData = {
    a: 111,
    b: 'cccc',
    2222: false,
};

function calculator(obj) {
    const objType = typeof obj;
    switch (objType) {
        case 'number':
            return 8;
        case 'string':
            return 2 * obj.length;
        case 'boolean':
            return 4;
        case 'object': 
            if (Array.isArray(obj)) {
                return obj.map(calculator).reduce((prev, cur) => prev + cur, 0);
            } else {
                return sizeOfObject(obj);
            }
    }
}

let ws = new WeakSet();

function sizeOfObject (obj) {
    if (obj === null) {
        return 0;
    }
    let bytes = 0;
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const val = obj[key];
        bytes += calculator(key);
        if (typeof val === 'object' && !val) {
            if (ws.has(val)) {
                continue;
            }
            ws.add(val);
            
        }
        bytes += calculator(val);
    }
    return bytes;
}
console.log(calculator(testData));