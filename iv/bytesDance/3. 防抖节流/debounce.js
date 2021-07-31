function debounce1(fn, delay) {
    let t;
    return function() {
        if (t) clearTimeout(t);
        let args = arguments;
        t = setTimeout(() => {
            fn && fn.apply(this, args);
        }, delay);
    };
}
// 防抖的立即执行
function debounce2(fn, wait, immediate) {
    let t;
    return function () {
        if (t) clearTimeout(t);
        let args = arguments;
        let context = this;
        if (immediate) { // true
            let callNow = !t; // 第一次会立即执行，以后只有事件执行后才会再次触发
            t = setTimeout(function () {
                t = null;
            }, wait);
            if (callNow) {
                fn.apply(context, args);
                immediate = false;
            }
        } else {
            t = setTimeout(() => {
                fn.apply(this, args);
            }, wait);
        }
        
    };
}
// function debounce2(func, wait, immediate) {
//     let timeout;
//     return function () {
//         const context = this;
//         const args = [...arguments];
//         if (timeout) clearTimeout(timeout);
//         if (immediate) {
//             const callNow = !timeout;
//             timeout = setTimeout(() => {
//                 timeout = null;
//             }, wait);
//             if (callNow) func.apply(context, args);
//         } else {
//             timeout = setTimeout(() => {
//                 func.apply(context, args);
//             }, wait);
//         }
//     };
// }
// function debounce2(func, wait, immediate) {

//     var timeout, result;

//     return function () {
//         var context = this;
//         var args = arguments;

//         if (timeout) clearTimeout(timeout);
//         if (immediate) {
//             // 如果已经执行过，不再执行
//             var callNow = !timeout;
//             timeout = setTimeout(function(){
//                 timeout = null;
//             }, wait);
//             if (callNow) result = func.apply(context, args);
//         } else {
//             timeout = setTimeout(function(){
//                 func.apply(context, args);
//             }, wait);
//         }
//         return result;
//     };
// }
  