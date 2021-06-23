/**
 * 求某一列能装多少水？
 * 普通方法：循环遍历
 */

let height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
function trap(height) {
    if (!Array.isArray(height)) {
        throw new Error('参数必须是数组');
    }
    let n = height.length;
    if (n === 0) {
        return 0;
    }
    let res = 0;
    for (let i = 1; i < n - 1; i++) {
        let l_max = 0;
        for (let j = 0; j < i; j++) {
            if (height[j] > l_max) {
                l_max = height[j];
            }
        }
        let r_max = 0;
        for (let j = i + 1; j < n; j++) {
            if (height[j] > r_max) {
                r_max = height[j];
            }
        }
        // 当前这一列中可以存的雨水
        // let min = Math.min(l_max, r_max);
        // // 只有较小的一端大于当前列的高度时，该列才能存水
        // if (min > height[i]) {
        //     res += min - height[i];
        // }
        res += Math.max(0, Math.min(l_max, r_max) - height[i]);
        
    }
    return res;
}

console.log(trap(height));
console.log(trap([4, 2, 0, 3, 2, 5]));