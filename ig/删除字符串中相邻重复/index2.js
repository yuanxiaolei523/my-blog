/*
给你一个字符串 s，「k 倍重复项删除操作」将会从 s 中选择 k 个相邻且相等的字母，
并删除它们，使被删去的字符串的左侧和右侧连在一起。你需要对 s 重复进行无限次这样的删除操作，直到无法继续为止。
在执行完所有删除操作后，返回最终得到的字符串。

case：
输入：s = "abcd", k = 2
输出："abcd"
解释：没有要删除的内容。

输入：s = "deeedbbcccbdaa", k = 3
输出："aa"
解释： 
先删除 "eee" 和 "ccc"，得到 "ddbbbdaa"
再删除 "bbb"，得到 "dddaa"
最后删除 "ddd"，得到 "aa"
*/

const removeDuplicates = function(str, k) {
    let stack = [];
    for (const s of str) {
        let prev = stack.pop();
        if (!prev || prev[0] !== s) {
            stack.push(prev);
            stack.push(s);
            console.log();
        } else if (prev.length < k - 1) {
            prev += s;
            stack.push(prev);
        }
    }
    return stack.join('');
};
console.log(removeDuplicates('deeedbbcccbdaa', 3));