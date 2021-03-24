let arr = [
    [1,2,8,9],
    [2,4,9,12],
    [4,7,10,13],
    [6,8,11,15]
];
let target = 0;

// 方法1：双重遍历
function Find(target, array) {
    console.log(arr[arr.length -1][arr[arr.length -1].length -1]);
    if (!Array.isArray(array)) {
        return false;
    }
    if (target < arr[0][0] || target > arr[arr.length -1][arr[arr.length -1].length -1]) {
        return false
    }
    for (let i = 0; i < arr.length; i++) {
        if (!Array.isArray(arr[i])) {
            continue;
        }
        if (isInArr(target, arr[i][0], arr[i][arr[i].length -1])) {
            continue;
        } 
        if (arr[i].includes(target)) {
            return true;
        } else {
            continue;
        }
        
    }
    return false;
}

function isInArr (target, min, max) {
    return target > max || target < min
}

console.log(Find(target, arr));



















/*
在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。
请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
7
[
    [1,2,8,9],
    [2,4,9,12],
    [4,7,10,13],
    [6,8,11,15]
]
*/