/**
 * 最长上升子序列（LIS）问题：给定长度为n的序列a，从a中抽取出一个子序列，这个子序列需要单调递增。问最长的上升子序列（LIS）的长度。
 * e.g. 1,5,3,4,6,9,7,8的LIS为1,3,4,6,7,8，长度为6。
 */

let arr = [1,5,3,4,6,9,7,8,2];

// 将问题简化，子问题为找以当前元素结尾的LTS
/**
 * dp[i] 表示以 dp[i] 这个数结尾的最长递增子序列的长度。
 * dp[1] = 1
 * 
 */

function getLargetIncrementString (arr) {
    let dp = new Array(arr.length);
    dp.fill(1); // 假设每个dp的长度最少都包含自己 
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < i; j++) { // 因为每个dp都包含自己，所以需要寻找在当前下标之前比当前nums[i]小的值
            if(arr[i] > arr[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1); // 取当前的dp和之前某个包含自己的LIS的长度+当前值做比较，取一个较大的
            }
        }
    }
    let res = 0;
    for (let i = 0; i < dp.length; i++ ) {
        res = Math.max(dp[i], res);
    }
    return res;
}

// console.log(getLargetIncrementString(arr));

/**
 * 上面的算法我们可以看到使用双层for循环进行遍历的，所以他的时间复杂度是o(n²)，
 * 下面我们采用二分+贪心的方式，来实现一个o(nlgn)的算法
 * 
 * a[i]表示第i个元素
 * dp[i]表示长度为i+1的LIS结尾元素的最小值，
 * 当前dp内的最后一个数组越小，越有利于我们添加元素
 * 因此，我们只需要维护dp数组，其表示的就是长度为i+1的LIS结尾元素的最小值，保证每一位都是最小值，这样子dp数组的长度就是LIS的长度。
 * dp[0] = arr[0] = 1;（dp = {1}）
 * a[1] = 5, a[1]>dp[0]; 因此直接添加到dp尾，dp[1]=a[1]。（dp = {1, 5}）
 * 对于a[2]=3，dp[0]< a[2]< dp[1]，因此a[2]替换dp[1]，令dp[1]=a[2]，因为长度为2的LIS，结尾元素自然是3好过于7，因为越小这样有利于后续添加新元素。 （dp = {1, 3}）
 * 对于a[3]=5，a[3]>dp[1]，因此直接添加到dp尾，dp[2]=a[3]。 （dp = {1, 3, 5}）
 */
function getLargetIncrementString(arr) {

}
