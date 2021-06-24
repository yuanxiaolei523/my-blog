/*
    双指针方式
*/
let arr = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
function trap(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('参数必须是数组');
    }
    let n = arr.length;
    if (n === 0) {
        return 0;
    }
    let left = 0;
    let l_max = 0;
    let right = n - 1;
    let r_max = 0;
    let res = 0;
    while (left <= right) {
        l_max = Math.max(l_max, arr[left]);
        r_max = Math.max(r_max, arr[right]);

        if (l_max < r_max) {
            res += l_max - arr[left];
            left++;
        } else {
            res += r_max - arr[right];
            right--;
        }
    }
    return res;
}

console.log(trap(arr));
console.log(trap([4, 2, 0, 3, 2, 5]));