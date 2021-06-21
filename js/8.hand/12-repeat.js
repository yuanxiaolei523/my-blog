/*
JavaScript专题之数组去重
*/
let arr = [1, 2, 3, 1, 4, 3, 1, 1, 2, 3, 1, 4, 3, 1, 56, 7, { name: 1 }, { name:1 } ];
// 方式1： 利用set的特性
function repeat1 (arr) {
    return [...new Set(arr)];
}
console.log(repeat1(arr));

// 方式2 循环
console.time();
function repeat2(arr) {
    let arr2 = [];
    arr.forEach(num => {
        if (!arr2.includes(num)) {
            arr2.push(num);
        }
    });
    return arr2;
}

let res2 = repeat2(arr);
console.timeEnd();
console.log(res2);


function repeat3 (arr) {
    return arr.filter((num, index, arr) => arr.indexOf(num) === index);
}
console.log(repeat3(arr));



function repeat4 (arr) {
    var obj = {};
    return arr.filter(num => obj.hasOwnProperty(num) ? false : (obj[num] = true));
}
console.log(repeat4(arr));
