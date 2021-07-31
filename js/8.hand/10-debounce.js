function debounce1(fn, delay) {
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
// 我们不希望非要等到事件停止触发后才执行，我希望立即执行函数，然后等到停止触发n秒后，才可以重新触发执行

function debounce2(func, wait, immediate) {

    var timeout, result;

    return function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait);
            if (callNow) result = func.apply(context, args);
        } else {
            timeout = setTimeout(function(){
                func.apply(context, args);
            }, wait);
        }
        return result;
    };
}

var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
}

container.onmousemove = debounce2(getUserAction, 1000, true);
