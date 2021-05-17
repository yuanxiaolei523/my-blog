function Parent() {
	this.obj = {
		name: "shine",
	};
}

function Child() {
	Parent.call(this);
}
var c1 = new Child();
var c2 = new Child();
console.log(c1.obj.name, c2.obj.name); // shine shine
c1.obj.name = "stone";
console.log(c1.obj.name, c2.obj.name); // stone shine
