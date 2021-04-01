/**
 * 优化版
 * 因为数组内的元素不大于数组的长度，所以我们可以采用原地置换的思想来解决
 */

var findRepeatNumber = function (nums) {
	if (Object.prototype.toString.call(nums) !== "[object Array]") {
		return;
	}
	let temp;
	for (let i = 0; i < nums.length; i++) {
		while (nums[i] !== i) {
			if (nums[i] == nums[nums[i]]) {
				return nums[i];
			}
			temp = nums[i];
			nums[i] = nums[temp];
			nums[temp] = temp;
		}
	}
	return -1;
};

const arr = [2, 6, 1, 0, 2, 5, 3];

console.log(findRepeatNumber(arr));
