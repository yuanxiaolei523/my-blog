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
/**
 * 方法二：优化
 * @param {Array} arr
 * @returns
 */
function trapRainFall(arr = []) {
	if (arr.length === 0) return 0;
	const n = arr.length;
	let res = 0;

	let l_max = new Array(n);
	let r_max = new Array(n);
	l_max[0] = arr[0];
	r_max[n - 1] = arr[n - 1];
	// 计算l_max
	for (let i = 1; i < n; i++) {
		// 用来找右边最高的数字
		l_max[i] = Math.max(l_max[i - 1], arr[i]);
		// res += Math.max(0, Math.min(l_max, r_max) - arr[i]);
	}
	// 计算r_max，从右到左
	for (let i = n - 2; i >= 0; i--) {
		r_max[i] = Math.max(arr[i], r_max[i + 1]);
	}
	for (let i = 1; i < n - 1; i++) {
		res += Math.max(0, Math.min(l_max[i], r_max[i]) - arr[i]);
	}
	return res;
}

let arr = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];

let result = trapRainFall(arr);
console.log(result);
