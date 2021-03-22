/**
 * @param {*} param1 比较值1
 * @param {*} param2 比较值2
 * return {*} boolean
 */

function testObjectIs(param1, param2) {
    return Object.is(param1, param2)
}


console.log(testObjectIs([], []));
console.log(testObjectIs({}, {}));
console.log(testObjectIs({ age: 1 }, { age: 1 }));