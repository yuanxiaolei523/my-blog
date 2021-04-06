
function findDuplicateNums (arr) {
    if (!Array.isArray(arr)) {
        throw new Error('传入的参数有误')
    }

    let temp;
    for(let i = 0; i < arr.length; i++) {
        while(arr[i] !== i) {
            if(arr[i] === arr[arr[i]]) {
                return arr[i]
            }
            temp = arr[i];
            arr[i] = arr[temp];
            arr[temp] = temp;
        }
    }
    return -1

}
// 1 2 0
let arr = [3, 0 , 1 ,2, 2]
console.log(findDuplicateNums(arr))