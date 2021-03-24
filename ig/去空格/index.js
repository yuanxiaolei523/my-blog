/*
请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。

输入："We Are Happy"
输出："We%20Are%20Happy"
*/

// 方式1
let str = "  We  Are  Happy";
function replaceTrim(str) {
    return str.replaceAll(' ', '%20') // node不行，浏览器可以 ES2021
}

let str2 = 'WeAreHappy'

// 方式2
function replaceTrim2(str) {
    let newStr = '';
    if (!/\s*/g.test(str)) {
        return str;
    }
    for(let i in str) {
        if (str[i] == ' ') {
            newStr = newStr + '%20'
        } else {
            newStr += str[i]
        }
    }
    return newStr
}

console.log(replaceTrim(str))
console.log(replaceTrim2(str2))
