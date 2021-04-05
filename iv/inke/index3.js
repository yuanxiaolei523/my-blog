var obj = {
    name: "baidu",
    arr: ["a", "b", "c"],
};

var obj2 = obj;
var arr = obj.arr;

obj2.arr = ["a", "b", "c", "d"];

obj2.name = "inke";

console.log(arr);

console.log(obj.name);
console.log(obj === obj2);
console.log(obj.arr === obj2.arr);
console.log(obj.arr === arr);
