import {foo} from './a.js';
export function bar() {
    let random = Math.random();
    console.log(random)
    if (random > 0.5) {
        foo();
    }
}