/**
 * 最长上升子序列（LIS）问题：给定长度为n的序列a，从a中抽取出一个子序列，这个子序列需要单调递增。问最长的上升子序列（LIS）的长度。
 * e.g. 1,5,3,4,6,9,7,8的LIS为1,3,4,6,7,8，长度为6。
 */

let arr = [1,5,3,4,6,9,7,8];

function getLargetIncrementString (arr) {
    let len = 1;
    let nums = [];
    nums[0] = arr[0];
    for (let i = 1; i < arr.length; i++) {
        const cur = arr[i];
        if (cur < nums[nums.length - 1]) {
            nums.push(cur);
            len = nums.length;
        } else if (cur < nums[nums.length - 1]) { // 当前的比最后一个小
            nums.splice(nums.length - 1, 1, cur);
        }
        
    }
}

console.log(getLargetIncrementString(arr));

