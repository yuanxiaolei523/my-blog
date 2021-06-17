/*
删除字符串中出现次数 >= 2 次的相邻字符

输入："abbbaca"
输出："ca"
解释："abbbaca" => "aaca"=>"ca"
*/

function removeDuplicates(str) {
    let stack = [];
    let top, next;
    let i = 0;
    while (i < str.length) {
        top = stack[stack.length - 1]; // 栈顶
        next = str[i]; // 当前
        if (next === top) {
            stack.pop();
            while (str[i] === top) i += 1;
        } else {
            stack.push(next);
            i += 1;
        }
    }
    return stack.join('');
    // for (let s = 0; s < str.length; s++) {
    //     let prev = stack.pop();
    //     if (!prev || prev[0] !== str[s]) { // b === b
    //         stack.push(prev); // undefined 
    //         stack.push(str[s]); // [undefined, a, b]
    //     } else if (prev[0] === str[s]){ // 栈顶和当前元素相同
    //         prev += str[s];
    //         if (prev[0] === str[s + 1]) {
    //             ++s;
    //             prev += str[s];
    //             stack.push(prev);
    //         } else {
    //             ++s;
    //         }
    //     }
    // }
    // return stack.join('');
}
console.log(removeDuplicates('abbbaca'));
