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
        let l_max = height[0];
        let r_max = height[n - 1];
        for (let j = 1; j < i; j++) {
            l_max = Math.max(l_max, height[j]);
        }
        for (let j = n - 1; j >= i + 1; j--) {
            r_max = Math.max(r_max, height[j]);
        }
        res += Math.max(0, Math.min(l_max, r_max) - height[i]);
    }
    
    return res;
}

console.log(trap(height));
console.log(trap([4, 2, 0, 3, 2, 5]));