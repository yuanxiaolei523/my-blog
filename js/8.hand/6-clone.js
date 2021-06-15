/*
 * 深克隆的实现方法
 */

// 1
// let obj = {
//     person: {
//         age: 14
//     }
// };
// let obj2 = JSON.parse(JSON.stringify(obj));
// obj2.person.age = 18;
// console.log(obj, obj2);

/**
 * 
 * @param {Object} obj 要克隆的对象
 * @param {Map} map 用于解决循环应用
 * @returns 
 */
function cloneDeep (obj, map = new Map()) {
    if (obj !== null && typeof obj !== 'object') {
        throw new Error('obj必须是对象');
    }
    console.log(map, obj);
    
    let newObj = Array.isArray(obj) ? [] : {};
    if (typeof obj === 'object') {
        if (map.get(obj)) {
            return obj;
        }
        map.set(obj, newObj);
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                newObj[key] = typeof obj[key] === 'object' ? cloneDeep(obj[key], map) : obj[key];
            }
        }
        
    } else {
        return target;
    }
    return newObj;
}

// let arr = [1, 2, 3];
// cloneDeep(obj);
// let obj2 = cloneDeep(obj);
// let arr2 = cloneDeep(arr);
// arr2.push(4);
// obj2.person.age = 18;
// console.log(obj, obj2, arr, arr2, null);

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8]
};
target.target = target;
let obj2 = cloneDeep(target);
console.log(obj2);