import Observer from './observer';
import Compiler from './compiler';

/**
 * 包括vue的构造函数、接受各种配置参数等等
 */
export default class Vue {
    constructor(options = {}) {
        this.$options = options;
        this.$data = options.data;
        this.$methods = options.methods;
        this.initRootElement(options);
        // 利用Object.defineProperty将data里的属性注入到vue的实例中
        this._proxyData(this.$data);
        // 实例化observer对象，监听数据变化
        new Observer(this.$data);
        // 实例化compiler对象，解析指令和模板表达式
        new Compiler(this);
    }

    /**
     * 获取根元素，并存储到vue实例，检查传入的el是否合规
     * @param {*} options 
     */
    initRootElement (options) {
        // 如果传入的是一个string，那可能传入的是id或者class
        if (typeof options.el === 'string') {
            this.$el = document.querySelector(options.el);
        } else if (options.el instanceof HTMLElement) {
            // 如果传入的是一个HTML元素
            this.$el = options.el
        }
        if (!this.$el) {
            throw new Error('传入的el不合法，请传入css selector或者HTMLElement')
        }
    }
    _proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get: function () {
                    return data[key]
                },
                set: function (newValue) {
                    if(!data[key] === newValue) {
                        return;
                    }
                    data[key] = newValue;
                }
            })
        })
    }
}