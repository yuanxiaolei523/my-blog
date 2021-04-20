import './assets/index.scss';
import './assets/index2.css';
// const test1  = require('./test/index');
// console.log(test1())

async function test() {
   return await test2()
}
function test2() {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000, 123)
    })
}

console.log(test());

(() => {
    console.log(123)
})();
