/*
给定一个只包括 '(' ，')' ，'{' ，'}' ，'[' ，']' 的字符串，判断字符串是否有效。
有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。

case:
输入: "()"
输出: true

输入: "()[]{}"
输出: true

输入: "([)]"
输出: false
*/

function matched (str) {
    // let left = ['{', '(', '['];
    // let right = [']', ')', '}'];
    let map = {
        '{': '}',
        '(': ')',
        '[': ']'
    };
    let stack = [];
    if (!str) {
        return false; //字符串为空
    }
    for (let i = 0; i < str.length; i++) {
        if (map[str[i]]) {
            stack.push(str[i]);
        } else if (map[stack.pop()] !== str[i]) {
            return false;
        }
    }
    return true;
}

console.log(matched('([])'));

