/**
 * 是一个观察者，需要将更改前的方法存储起来
 */
export default class Watcher {
    /**
     * 
     * @param {*} vm vue实例
     * @param {*} key data中的属性名
     * @param {*} cb 负责更新视图的回调函数
     */
    constructor(vm, key, cb) {
        this.vm = vm;
        this.key = key;
        this.cb = cb;

        Dep.target =this;
        // 触发get方法，在get方法里回去做一些操作
        this.oldValue = vm[key];
    }
    /** 当数据变化的时候，更新视图 */
    update() {
        let newValue = this.vm[this.key];
        if (this.oldValue === newValue) {
            return;
        }
        this.cb(newValue);
    }
}

// 在watcher初始化获取oldValue的时候，会去做一些什么操作?
