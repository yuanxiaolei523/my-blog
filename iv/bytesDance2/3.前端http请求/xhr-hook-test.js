/**
 * open
 * onreadystatechange
 * onload
 * onerror
 * 
 * 重写属性和方法
 */

class XHRHook {
    constructor(beforeHooks, afterHooks) {
        this.beforeHooks = beforeHooks;
        this.afterHooks = afterHooks;
        this.XHR = window.XMLHttpRequest;
        this.init();
    }

    init () {
        let _this = this;
        window.XMLHttpRequest = function() {
            this._xhr = new window.XMLHttpRequest();
            _this.overwrite(this);
        };
    }
    overwrite(proxyXHR) {
        for (const key in proxyXHR._xhr) {
            if (typeof proxyXHR._xhr[key] === 'function') {
                this.overwriteMethod(proxyXHR, key);
            } else {
                this.overwriteProperty(proxyXHR);
            }
            
        }
    }
    overwriteMethod(proxyXHR, key) {
        let beforeHooks = this.beforeHooks;
        let afterHooks = this.afterHooks;
        proxyXHR[key] = (...args) => {
            if (beforeHooks[key]) {
                const res = beforeHooks[key].apply(this, args);
                if (res === null) return;
            }
            const res = proxyXHR._xhr[key].apply(proxyXHR._xhr, args);
            afterHooks[key] && afterHooks[key].call(proxyXHR._xhr, res);
            return res;
        };
    }

    overwriteProperty(proxyXHR, key) {
        Object.defineProperties(
            proxyXHR,
            key,
            this.setPropertyDescriptor(proxyXHR, key)
        );
    }
    setPropertyDescriptor(proxyXHR, key) {
        let obj = Object.create(null);
        let _this = this;
        obj.set = function (val) {
            if (!key.startsWith('on')) {
                proxyXHR['__' + key] = val;
                return; 
            }
            if (_this.beforeHooks[key]) {
                this._xhr[key] = function (...args) {
                    _this.beforeHooks[key].call(proxyXHR);
                    val.apply(proxyXHR, args);
                };
                return;
            }
            this._xhr[key] = val;
        };
        obj.get = function () {
            return proxyXHR['__' + key] || this._xhr[key];
        };
        return obj;
    }
}

let p = new XHRHook({
    open: function () {
        return true;
    },
    onLoad: function () {},
    onreadystatechange: function () {},
    onerror: function () {},
}, {
    open: function () {
        return false;
    }, 
});

var xhr = new XMLHttpRequest();
xhr.open('get', 'www.baidu.com');
xhr.onreadystatechange = function () {
    
};