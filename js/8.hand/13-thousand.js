/*
将普通的数字转换为带千位分隔符格式的数字字符串是一个非常常见的问题，千位分隔符格式的规则是数字的整数部分每三位一组，以“，”分节。小数部分不分节 。
示例：19,351,235.235767
case:

var a=1234567894532;
var b=673439.4542;
*/
var a = 12345678945322;
var b = 673439.4542;
function thousand1 (num) {
    let arr = (num + '').split('.');
    let str = arr[0].split('').reverse().join('');
    let res = [];
    for (let i = 0; i < str.length; i++) {
        if (i % 3 === 0 && i !== 0) {
            res.push(',');
        }
        res.push(str[i]);
    }
    res.reverse();
    if (arr[1]) {
        res = res.concat('.' + arr[1]);
    }
    return res.join('');
}
// console.log(thousand1(a));
// console.log(thousand1(b));

// console.log(a.toLocaleString());
// console.log(b.toLocaleString()); // 会保留3位

function numFormat(num){
    var res = num.toString().replace(/\d+/, function(n){ // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g, function($1){
            console.log($1);
            return $1 + ',';
        });
    });
    return res;
}

console.log(numFormat(a));