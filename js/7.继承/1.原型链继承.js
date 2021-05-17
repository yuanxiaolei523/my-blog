// function Parent() {
// 	this.name = "shine";
// }

// Parent.prototype.getName = function () {
// 	console.log(this.name);
// };

// function Child() {
// 	this.name = "stone";
// }
// Child.prototype = new Parent();
// var c1 = new Child();
// console.log(c1.__proto__);
// c1.getName();

function Parent() {
	this.obj = {
		name: "shine",
	};
}
function Child() {}
Child.prototype = new Parent();
var c1 = new Child();
var c2 = new Child();
console.log(c1.obj, c2.obj);
c1.obj.name = "stone";
console.log(c1.obj, c2.obj);
Child.prototype.obj.name = "shineStone";
console.log(c1.obj, c2.obj);
