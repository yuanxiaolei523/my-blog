/**
 * open
 * onreadystatechange
 * onload
 * onerror
 * 
 * 重写属性和方法
 */

class XHRHook {
    constructor(beforeHooks = {}, afterHooks = {}) {
        this.XHR = window.XMLHttpRequest;
        this.beforeHooks = beforeHooks;
        this.afterHooks = afterHooks;
        this.init();
    }
    init () {
        // 不能使用箭头函数
        let _this = this;
        // 将其重写
        window.XMLHttpRequest = function () {
            this._xhr = new _this.XHR(); // 将XMLHttpRequest的方法和属性保存在this._xhr上
            _this.overwrite(this);
        };
    }

    overwrite (proxyXHR) {

    }
    
}

new XHRHook({
    open: function () {},
    onLoad: function () {},
    onreadystatechange: function () {},
    onerror: function () {},
});

var xhr = new XMLHttpRequest();