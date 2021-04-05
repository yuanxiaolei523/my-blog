/**
 * 写一个节流，立即执行和最后一次执行
 * 圣杯和双飞翼，优缺点
 *
 */

// function foo() {
//     x = 8;

//     console.log(x, y);
//     const x = 6,
//         y = 9;
// }

// foo();

// function get() {
//     console.log(typeof foo);
//     console.log(typeof bar);

//     foo();
//     bar();
//     function foo() {
//         console.log("foo");
//     }
//     var bar = function () {
//         console.log("bar");
//     };
// }
// get();
function get(n) {
    let now = +new Date();
    while (now + n * 1000 > +new Date()) {}
}

window.addEventListener("click", function () {
    get(10);
});

setTimeout(() => {
    console.log(10);
}, 3000);
