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

// console.log(flat2([1, 2, [2, 3, [4, [6, [1, [1]]]], , 5], 6], 'Infinity'));

function flat4(arr, deep = 1) {
    if (deep < 0) {
        return arr;
    }
    let res = [];
    if (!Array.isArray(arr)) {
        return;
    }
    arr.forEach((item) => {
        // console.log(item);
        if (Array.isArray(item)) {
            if (deep > 0) {
                res = res.concat(flat4(item, --deep));
            } else {
                res.push(item);
            }
        } else {
            res.push(item);
        }
    });
    return res;
}
// flat4([1, 2, [2, 3, [4, [6,, [1, [1]]]], , 5], 6]);
// console.log(flat4([1, 2, [2, 3, [4, [6,, [1, [1]]]], , 5], 6], 2));

function flat5 (arr, deep = 1) {
    if (deep < 0) {
        return arr;
    }
    if (!Array.isArray(arr)) {
        return;
    }
    return deep > 0 
        ? arr.reduce((prev, cur) => prev.concat(Array.isArray(cur) ? flat5(cur, --deep) : cur), [])
        : arr.slice();
}
console.log(flat5([1, 2, [2, 3, [4, [6,, [1, [1]]]], , 5], 6], 2));