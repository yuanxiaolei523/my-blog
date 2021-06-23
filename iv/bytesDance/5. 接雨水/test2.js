/**
 * 动态规划解题
 * 我们只看dp[i]仅对位置i，能接多少水
 * dp[i] = dp[i-1] + arr[i]
 * 能装多少水和左、右侧最高的柱子相关
 * 
 */

/**
 * 思路：
 *
 * 0 1 2 3 4 5
 * 0 0 0 1 2 0
 * dp[i] 仅对于位置i，能装多少水
 * dp[i] = dp[i -1] + arr[i]
 * 能装多少水，和左侧最高的、右侧最高的柱子相关
 *
 * left_max
 * right_max
 *
 * 那么i能装的最多的水是多少？
 * Math.min(left_max, right_max);
 */

let arr = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
function trap (arr) {
    if (!Array.isArray(arr)) {
        throw new Error('参数必须是数组');
    }
    let n = arr.length;
    if (n === 0) {
        return 0;
    }
    let sum = 0;
    let leftMaxArr = new Array(n).fill(0);
    let rightMaxArr = new Array(n).fill(0);
    leftMaxArr[0] = arr[0];
    rightMaxArr[n - 1] = arr[n - 1];
    
    for (let i = 1; i < n - 1; i++) {
        // leftMaxArr中每一项都是当项目左边最大的数
        leftMaxArr[i] = Math.max(leftMaxArr[i - 1], arr[i]);
    }
    for (let i = n - 2; i >= 0; i--) {
        rightMaxArr[i] = Math.max(rightMaxArr[i + 1], arr[i]);
    }

    for (let i = 1; i < n - 1; i++) {
        let min = Math.min(leftMaxArr[i], rightMaxArr[i]);
        if (min > arr[i]) {
            sum += min - arr[i];
        }
    }
    return sum;
    
}

console.log(trap(arr));
console.log(trap([4, 2, 0, 3, 2, 5]));