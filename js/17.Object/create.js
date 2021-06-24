let obj = {
	name: 123,
	ages: [12, 10],
};

let c = Object.create(obj);
let c2 = Object.create(obj);

console.log(c.name, c.ages);
c.ages.push(123);
c.__proto__.name = 234;
console.log(c, c.__proto__, obj, c2.__proto__);
