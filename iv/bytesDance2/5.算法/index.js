// 01背包问题

/**
 * 
 * @param {Number} W 背包容量
 * @param {Number} N 物品总数
 * @param {Array} wt 物品重量数组
 * @param {Array} val 物品价值数组
 */
function knapsack(W, N, wt = [], val = []) {
    // 因为物品和重量不存在0，但是dp数组存在0行和0列，所以声明N+1和W+1
    const dp = Array.from(new Array(N + 1), () => new Array(W + 1).fill(0));
    for (let i = 1; i <= N; i++) {
        for (let w = 1; w <= W; w++) {
            if (w - wt[i - 1] < 0) {
                dp[i][w] = dp[i - 1][w];
            } else {
                dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - wt[i - 1]] + val[i - 1]);
            }
        }
    }
    return dp[N][W];
}

const W = 4;
const N = 3;
const wt = [2, 1, 3];
const val = [4, 2, 3];

console.log(knapsack(W, N, wt, val));