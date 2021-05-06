// 双指针方式

function trap(arr = []) {
	if (arr.length === 0) {
		return 0;
	}

	const n = arr.length;

	let res = 0;

	let left = 0;
	let right = 0;
    
	let l_max = arr[0];
	let r_max = arr[n - 1];

	while (left <= right) {
		l_max = Math.max(l_max, arr[left]);
		r_max = Math.max(r_max, arr[right]);

		if (l_max < r_max) {
			res += l_max - arr[left];
			left++;
		} else {
			res += r_max - arr[right];
			right--;
		}
	}
	return res;
}
let arr = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];

let result = trap(arr);
console.log(result);
