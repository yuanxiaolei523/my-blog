/**
 * 斐波那契数列最简单的解法就是递归
 */

function fib(n) {
    if (n == 1 || n == 2) return 1;
    return fib(n -1) + fib(n - 2);
}

/**
 * 上面的方法有很多节点都是重复计算的，所以我们采取一种备忘录的形式来计算
 */
function fib3(n) {
    if (n < 1) return 0;
    let arr = new Array(n + 1);
    arr.fill(0);
    return helper(arr, n);
}

function helper (arr, n) {
    if (n == 1 || n == 2) return 1;
    if (arr[n] !== 0) return arr[n];
    debugger;

    arr[n] = helper(arr, n - 1) + helper(arr, n - 2);
    return arr[n]
}

console.log(fib3(7));

/**
 * 尝试采用动态规划(并不是真正的动态规划)
 */
function fib2 (n) {
    if(n < 1) return 0;
    if (n == 1 || n == 2) return 1;
    let dp = new Array(n);
    dp.fill(0);
    dp[0] = dp[1] = 1;
    for (let i = 2; i < n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n - 1]
}
console.log(fib2(7));