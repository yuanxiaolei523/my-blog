function flat(arr, num = 1) {
    if (!Array.isArray(arr)) {
        throw new Error('必须是数组');
    }
    return arr.flat(num);
}

function flat2 (arr, num = 1) {
    if (num <= 0) {
        return arr;
    }
    if (!Array.isArray(arr)) {
        throw new Error('必须是数组');
    }
    let res = [];
    if (num === 'Infinity') {
        num = Number.MAX_SAFE_INTEGER;
    }
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            if (num > 0) { // 当可以扁平时，并且当前元素是数组，那么递归
                let r = flat2(arr[i], --num);
                res = res.concat(r);
            } else if (arr !== undefined && arr[i] !== null && !arr[i]){ 
                // 当层数大于扁平的时候并且当前元素是数组时，直接将其push进去
                continue;
            } else {
                res.push(arr[i]);
            }
        } else if (arr !== undefined && arr[i] !== null && !arr[i]){ 
            continue;
        } else {
            res.push(arr[i]);
        }
    }
    return res;
}

console.log(flat2([1, 2, [2, 3, [4, [6, [1, [1]]]], , 5], 6], 'Infinity'));