let arr = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
function trap(arr) {
    if (arr.length === 0) {
        return 0;
    }

    const len = arr.length;
    let res = 0;
    let left = 0;
    let right = len - 1;
    let l_max = arr[0];
    let r_max = arr[len - 1];

    while (left < right) { // 只要左指针小于右指针
        // 取左边最大的数
        l_max = Math.max(arr[left], l_max); 
        // 取右边最大的数
        r_max = Math.max(arr[right], r_max);
        // 当左边最大的数，比右边最大的数小的时候
        if (l_max < r_max) {
            res += l_max - arr[left]; // 左边的最大的数减去当前左边的值
            left++;
        } else {
            res += r_max - arr[right];//// 右边的最大的数减去当前右边的值
            right--;
        }
    }
    return res;

    // let left = 0;
    // let right = arr.length - 1;
    // // let max = arr[left];
    // let max = arr.sort((a, b) => {
    //     return a - b;
    // })[arr.length - 1];
    // let index = arr.indexOf(max);
    // let leftMin = arr[left];
    // let rightMin = arr[right];
    // // let mid = 
    // while (left < index) {
    //     if (leftMin > arr[right]) {
    //         leftMin = arr[right];
    //         // swap(arr[right], arr[right - 1]);
    //     }
    //     left++;
    // }
    // while (index < right) {
    //     if (rightMin > arr[right]) {
    //         rightMin = arr[right];
    //     }
    //     right--;
    // }
    // console.log(max, leftMin, rightMin);
    // return (max - leftMin) + (max - rightMin);

}

console.log(trap(arr));