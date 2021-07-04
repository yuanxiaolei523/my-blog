function throttle1 (fn, wait) {
    let prev = new Date();
    return function () {
        let now = new Date();
        if (now - prev > wait) {
            fn.apply(this, arguments);
            prev = now;
        }
    };
}

/*
需求：我想第一次不立即执行
*/
function throttle2(fn, wait) {
    let timer;
    return function () {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, arguments);
                timer = null;
            }, wait);
        }
    };
}

/*
有没有什么方法让其第一次和最后一次立即执行
*/

function throttle (fn, wait) {
    let startTime = new Date();
    let timer;
    return function () {
        let now = new Date();
        let context = this;
        let args = arguments;
        let remaining = delay - (now - startTime);
        if (remaining <= 0) { // 表示间隔的时间小于上次执行的时间的间隔
            fn.apply(context, args);
            startTime = now;
        } else {
            timer = setTimeout(() => {
                fn.apply(context, args);
            }, wait);
        }
        
    };
}