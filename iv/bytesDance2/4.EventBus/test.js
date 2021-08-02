class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(event, cb) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(cb);
        return this;
    }
    once(event, cb) {
        const fn = (...args) => {
            this.off(event, cb);
            cb.apply(this, args);
        };
        this.on(event, fn);
        return this;
    }
    emit(event, ...args) {
        let cbs = this.events[event];
        if (!cbs) throw new Error('');
        cbs.forEach(cb => {
            cb.apply(this, args);
        });
        return this;
    }

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