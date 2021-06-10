// 实现trim
let str = '  hello world   ';
function myTrim(str) {
    return str.replace(/^\s+/, '').replace(/\s+$/, '');
}

function myTrim2(str) {
    return str.replace(/^\s\s*/, '').replace(/\s*\s+$/, '');
}
console.log(myTrim(str));

function myTrim3(str) {
    while(str) {
        if (str.startsWith(' ')) {
            str = str.substring(1);
        } else if (str.endsWith(' ')) {
            str = str.substring(0, str.length - 1);
        } else {
            break;
        }
    }
    return str
}
console.log(myTrim3(str));