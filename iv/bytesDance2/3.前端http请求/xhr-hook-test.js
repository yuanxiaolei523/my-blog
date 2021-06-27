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
        // 重写一个东西，一定要保存之前的东西的实例
        this.XHR = window.XMLHttpRequest;
        this.beforeHooks = beforeHooks;
        this.afterHooks = afterHooks;
        this.init();
    }
    /**
     * 重写XMLHttpRequest
     */
    init () {
        // 因为使用的是普通的函数，所以调用XHRHook内的函数或者属性会出现问题
        let _this = this;
        // 将其重写
        // 因为我们要使用new来获得实例，所以我们使用普通函数
        window.XMLHttpRequest = function () {
            // 将xhr的实例保存在window.XMLHttpRequest中
            this._xhr = new _this.XHR(); // 将XMLHttpRequest的方法和属性保存在this._xhr上
            _this.overwrite(this);

        };
    }

    overwrite (proxyXHR) {
        // 这里的key就是官方的XML上的各种属性和方法
        for (const key in proxyXHR._xhr) {
            if (typeof proxyXHR._xhr[key] === 'function') {
                this.overwriteMethod(proxyXHR, key);
                continue;
            } 
            this.overwriteAttributes(proxyXHR, key);
        }
    } 
    /**
     * 重写方法
     * @param {*} proxyXHR 
     * @param {*} key 
     */
    overwriteMethod(proxyXHR, key) {
        let beforeHooks = this.beforeHooks;
        let afterHooks = this.afterHooks;
        // 重写这个方法
        proxyXHR[key] = (...args) => {
            // beforeHooks要起到拦截作用
            if (beforeHooks[key]) {
                // 如果钩子函数内部返回true，那么就不执行原有函数了，如果返回false就执行
                const res = beforeHooks[key].call(proxyXHR, args);
                if (res === false) {
                    return;
                }
            }
            const res = proxyXHR._xhr[key].apply(proxyXHR._xhr, args);
            // afterHooks可能会需要原有函数的返回值做事情
            afterHooks[key] && afterHooks[key].call(proxyXHR, res);
            return res;
            
        };
    }
    /**
     * 重写属性
     * @param {*} proxyXHR 
     * @param {*} key 
     */
    overwriteAttributes(proxyXHR, key) {
        console.log(this);
        Object.defineProperty(proxyXHR, key, this.setProperty(key, proxyXHR));
    }


    setProperty(key, proxyXHR) {
        let obj = Object.create(null);
        let _this = this;
        obj.set = function (val) {
            // 如果不是以on开头的，那么直接重写新的属性并赋值
            if (!key.startsWith('on')) {
                proxyXHR['__' + key] = val;
                return;
            }
            // 如果重写了这个属性
            if (_this.beforeHooks[key]) {
                // 直接重写父元素,这里的this是window.XMLHttpRequest
                this._xhr[key] = function(...args) {
                    _this.beforeHooks[key].call(proxyXHR, args);
                    val.apply(proxyXHR, args);
                    // const res = val.apply(proxyXHR, args);

                    // _this.afterHooks[key] && _this.afterHooks[key].call(proxyXHR, res);
                };
                return;
            }
            // 如果当前beforeHooks中没有这个属性，那么直接赋值即可
            this._xhr[key] = val;
        };  
        obj.get = function () {
            return proxyXHR['__' + key] || this._xhr[key];
        };
        return obj;
    }
    getProperty() {
        
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