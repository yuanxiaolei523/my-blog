var findRepeatNumber = function (nums) {
	if (Object.prototype.toString.call(nums) !== "[object Array]") {
		return;
	}
	let arr = [];
	let retNum;
	nums.every((num) => {
		if (arr.includes(num)) {
			retNum = num;
			return false;
		} else {
			arr.push(num);
			return true;
		}
	});
	console.log(arr);
	return retNum;
};

const arr = [2, 7, 1, 0, 2, 5, 3];

console.log(findRepeatNumber(arr));
