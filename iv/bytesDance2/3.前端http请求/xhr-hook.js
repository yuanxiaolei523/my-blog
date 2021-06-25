/**
 * 能给 xhr 添加 hook，实现在各个阶段打印日志吗？
 * 重写xhr属性和方法
 */
class XhrHook {
    // 两个hooks，一个在调用的方法之前触发，一个在调用之后触发
    constructor(beforeHooks = {}, afterHooks = {}) {
        this.XHR = window.XMLHttpRequest;
        this.beforeHooks = beforeHooks;
        this.afterHooks = afterHooks;
        this.init();
    }

    init() {
        let _this = this;
        // 不能使用箭头函数
        window.XMLHttpRequest = function () {
            this._xhr = new _this();
            _this.overwrite(this);
        };
    }

    overwrite(proxyXHR) {
        for (const key in proxyXHR._xhr) {
            if (typeof proxyXHR._xhr[key] === 'function') {
                this.overwriteMethod(key, proxyXHR);
                continue;
            }
            this.overwriteAttributes(key, proxyXHR);
        }
    }
    overwriteMethod(key, proxyXHR) {
        let beforeHooks = this.beforeHooks; // 我们应该可以拦截原有行为
        let afterHooks = this.afterHooks;
        proxyXHR[key] = (...args) => {
            if (beforeHooks[key]) {
                const res = beforeHooks[key].call(proxyXHR, args);
                if (res === false) return; //假设如果返回false，则不执行后续的
            }
            const res = proxyXHR._xhr[key].apply(proxyXHR._xhr, args);
            afterHooks[key] && afterHooks[key].call(proxyXHR._xhr, res);
            return res;
        };
    }

    overwriteAttributes(key, proxyXHR) {
        Object.defineProperties(
            proxyXHR,
            key,
            this.setPropertyDescriptor(key, proxyXHR)
        );
    }
    setPropertyDescriptor(key, proxyXHR) {
        let obj = Object.create(null);
        let _this = this;
        obj.set = function (val) {
            if (!key.startsWith('on')) {
                proxyXHR['__' + key] = val;
                return;
            }
            // 如果beforeHooks中有这个属性，则需要做处理
            if (_this.beforeHooks[key]) {
                this._xhr[key] = function (...args) {
                    _this.beforeHooks[key].call(proxyXHR);
                    val.apply(proxyXHR, args);
                };
                return;
            }
            // 如果beforeHooks中没有这个属性，则可以直接赋值
            this._xhr[key] = val;
        };

        obj.get = function () {
            return proxyXHR['__' + key] || this._xhr[key];
        };
        return obj;
    }
}

new XhrHook({
    open: function () {},
    onLoad: function () {},
    onreadystatechange: function () {},
    onerror: function () {},
});

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://www.baidu.com', true);
xhr.send();
xhr.onreadystatechange = function (res) {
    console.log(res);
};
