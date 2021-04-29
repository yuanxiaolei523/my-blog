/**
 * 给定一个整数数组，找到一个具有最大和的连续子数组，返回其最大和
 * 示例：输入[-2, 1, -3, 4, -1, 2, 1, -5, 4], 输出6
 * 解释: [4, -1, 2, 1] //为最大和的连续子数组
 */

let arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

// function getLargetSum(arr) {
//     let dp = new Array(arr.length);
//     dp[0] = arr[0];
//     let sum = arr[0];
//     for(let i = 1; i < dp.length; i++) {
//         dp[i] = Math.max(dp[i-1], 0) + arr[i];
//         sum = Math.max(dp[i], sum);
//         console.log(dp[i-1], arr[i], sum, dp[i]);

//     }
//     return sum;
// }

/**
 * 给定一个整数数组，找到一个具有最大和的连续子数组，返回其最大和
 * 示例：输入[-2, 1, -3, 4, -1, 2, 1, -5, 4], 输出6
 * 解释: [4, -1, 2, 1] //为最大和的连续子数组
 */
/**
 * 
 * @param {Array} arr 
 * 设置dp[i]为包含当前元素的最大的和的连续子数组
 */
function getLargetSum2(arr) {
    let dp = new Array(arr.length); // 
    let sum = arr[0];
    dp[0] = arr[0];
    for (let i = 1; i < arr.length; i++) { // 循环
        dp[i] = Math.max(0, dp[i-1]) + arr[i]
        sum = Math.max(dp[i], sum);
    }
    return sum

}

console.log(getLargetSum2(arr))
