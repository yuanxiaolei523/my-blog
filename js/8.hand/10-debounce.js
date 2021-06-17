function debounce(fn, delay) {
    let timer;
    return function () {
        var ctx = this;
        let args = [].slice.call(arguments);
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(ctx, args);
        }, delay);
    };
}