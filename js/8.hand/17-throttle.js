// function throttle1 (fn, wait) {
//     let prev = new Date();
//     return function () {
//         let now = new Date();
//         if (now - prev > wait) {
//             fn.apply(this, arguments);
//             prev = now;
//         }
//     };
// }

// /*
// 需求：我想第一次不立即执行
// */
// function throttle2(fn, wait) {
//     let timer;
//     return function () {
//         if (!timer) {
//             timer = setTimeout(() => {
//                 fn.apply(this, arguments);
//                 timer = null;
//             }, wait);
//         }
//     };
// }

// /*
// 有没有什么方法让其第一次和最后一次立即执行
// */

// function throttle (fn, wait) {
//     let startTime = new Date();
//     let timer;
//     return function () {
//         let now = new Date();
//         let context = this;
//         let args = arguments;
//         let remaining = delay - (now - startTime);
//         if (remaining <= 0) { // 表示间隔的时间小于上次执行的时间的间隔
//             fn.apply(context, args);
//             startTime = now;
//         } else {
//             timer = setTimeout(() => {
//                 fn.apply(context, args);
//             }, wait);
//         }
        
//     };
// }

function throttle(fn, delay) {
    let start = Date.now();
    return function () {
        let now = Date.now();
        if (now - start > delay) {
            fn.apply(this, arguments);
            start = now;
        }
    };
}
function throttle2 (fn, delay) {
    let t;
    return function() {
        let args = [...arguments];
        if (!t) {
            t = setTimeout(() => {
                fn.apply(this, args);
                t = null;
            }, delay);
        }
    };
}

function throttle3(fn, delay) {
    let start = Date.now();
    let t;
    return function () {
        let now = Date.now();
        let remaining = delay - (now - start);
        let args = arguments;
        console.log(remaining, t);
        if (remaining <= 0) {
            if (t) {
                clearTimeout(t);
            }
            fn.apply(this, args);
            start = Date.now();
        } else if (!t){
            t = setTimeout(() => {
                fn.apply(this, args);
                t = null;
                start = Date.now();
            }, delay);
        }
        
    };
}