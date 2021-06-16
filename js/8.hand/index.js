const chalk = require('chalk');
var obj = {
    name: 'shine'
}; 
function bar () {
    this.age = 13;
    // console.log(this.name);
    return { age: this.age };
}

var barBind = bar.bind(obj);
let bb = new barBind();
// console.log(bb);
// barBind(); // shine


let b = new bar();
console.log(b);
// console.log(b.age);

console.log(chalk.blue('hello') + chalk.keyword('orange')('waring'));
let name = '123';
console.log(chalk.bgRedBright.green('Hello %s'), name);

