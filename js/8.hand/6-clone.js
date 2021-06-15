/**
 * 深克隆的实现方法
 */

// 1
let obj = {
    person: {
        age: 14
    }
};
// let obj2 = JSON.parse(JSON.stringify(obj));
// obj2.person.age = 18;
// console.log(obj, obj2);

function cloneDeep (obj, map = new Map()) {
    // let objType = isObject(obj);
    if (obj !== null && typeof obj !== 'object') {
        throw new Error('obj必须是对象');
    }
    // console.log(map);
    // let isArray = objType === 'array';
    let newObj = Array.isArray(obj) ? [] : {};
    if (typeof obj === 'object') {
        if (map.get(obj)) {
            return obj;
        }
        map.set(obj, newObj);
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                // console.log(isObject(obj[key]) === 'other');
                // const element = obj[key];
                newObj[key] = typeof obj[key] === 'object' ? cloneDeep(obj[key], map) : obj[key];
            }
        }
        
    } else {
        return target;
    }
    // else {
    //     if (map.get(obj)) {
    //         return obj;
    //     } 
    //     map.set(obj);
        
    // }
    return newObj;
}


// function isObject(obj) {
//     // Array.isArray(obj)
//     switch (Object.prototype.toString.call(obj)) {
//         case '[object Array]':
//             return 'array';
//         case '[object Object]':
//             return 'object';
//         case '[object Null]':
//             return 'null';
//         default: 
//             return 'other';
//     }
// }

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