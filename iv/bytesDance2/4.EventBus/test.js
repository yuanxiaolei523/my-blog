class EventEmitter {
    constructor() {
        this.events = [];
    }
    // 注册监听
    on(event, cb) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(cb);
        return this;
    }
    // 注册监听且只实现一次
    once (event, cb) {
        const fn = (...args) => {
            this.off(event, fn);
            cb.apply(this, args);
        };
        this.on(event, fn);
        return this;
    }
    // 触发监听
    emit(event, ...args) {
        let cbs = this.events[event];
        if (!cbs) {
            throw new Error('没有这个事件');
        }
        cbs.forEach(cb => {
            cb.apply(this, args);
        });
        return this;
    }
    // 卸载监听
    off(event, cb) {
        if (!cb) {
            this.events[event] = null;
        }
        this.events[event] = this.events[event].filter(curCb => {
            return curCb !== cb;
        });
        return this;
    }
}