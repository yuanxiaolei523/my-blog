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
            }
        } else {
            t = setTimeout(() => {
                fn.apply(this, args);
            }, wait);
        }
        
    };
}