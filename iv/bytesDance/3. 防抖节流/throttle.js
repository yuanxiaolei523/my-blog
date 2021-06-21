// 时间戳写法
function throttle(fn, delay) {
    let startTime = Date.now();
    console.log(startTime, 'startTime');
    return function () {
        let now = Date.now();
        console.log(now, 'now', startTime);
        if (now - startTime > 0) {
            fn.apply(this, arguments);
            startTime = now;
        }
    };
}

/**
 * 上面的节流函数会存在问题，就是第一次会立即执行，那么有什么方法能不让他立即执行呢
 */

function throttle2(fn, delay) {
    let timer = null;
    return function () {
        let context = this;
        let args = arguments;
        if (!timer) {
            timer = setTimeout(function () {
                fn.apply(context, args);
                timer = null;
            }, delay);
        }
    };
}
/**
 * throttle2是通过定时器的形式来定义节流函数，但是这种情况下最后一次不会立即执行,有什么方法能立即执行呢
 */

function throttle3(fn, delay) {
    let time = null;
    let startTime = Date.now();
    return function () {
        let now = Date.now();
        let context = this;
        let args = arguments;
        let remaining = delay - (now - startTime);
        clearTimeout(time);
        if (remaining <= 0) {
            fn.apply(context, args);
            startTime = now;
        } else {
            time = setTimeout(function () {
                fn.apply(context, args);
            }, remaining);
        }
    };
}

function handler() {
    setTimeout(() => {
        console.log(Math.random());
    }, 100);
}

const throttleHandler = throttle2(handler, 10);

throttleHandler();
setTimeout(() => {
    throttleHandler();
}, 10);
throttleHandler();
throttleHandler();
throttleHandler();
throttleHandler();
throttleHandler();
throttleHandler();
throttleHandler();
throttleHandler();
throttleHandler();
throttleHandler();
throttleHandler();
throttleHandler();
throttleHandler();
throttleHandler();
throttleHandler();
throttleHandler();
throttleHandler();
throttleHandler();
throttleHandler();
throttleHandler();
throttleHandler();
throttleHandler();
throttleHandler();
throttleHandler();
