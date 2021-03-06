/**
 * 给定n个非负整数表示每个宽度为1的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水
 * 示例1：
 * 输入： height = [0,1,0,2,1,0,1,3,2,1,2,1];
 * 输入：6
 * 解释：上面是由数组[0,1,0,2,1,0,1,3,2,1,2,1]表示的高度图，在这种情况下，可以接6个单位的雨水
 *
 * 示例2：
 * 输入： height=[4,2,0,3,2,5]
 * 输出：9
 * 木桶原理
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

function trap(arr) {
    if (arr.length === 0) return 0;

    let len = arr.length;
    let res = 0;

    for (let i = 1; i < len - 1; i++) {
        let l_max = 0;
        let r_max = 0;
        for (let j = 0; j < i; j++) {
            l_max = Math.max(l_max, arr[j]);
        }
        for (let j = i; j < len; j++) {
            r_max = Math.max(r_max, arr[j]);
        }
        res += Math.max(Math.min(l_max, r_max) - arr[i], 0);
        console.log(l_max, r_max, res, arr[i]);

    }
    return res;
}

console.log(trap(arr));

let arr2 = [4, 2, 0, 3, 2, 5];
console.log(trap(arr2));