class EventEmitter {
    constructor() {
        this.events = {};
    }

    on (event, cb) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(cb);
        // 可以链式调用
        return this;
    }

    emit (event, ...args) {
        if (!this.events[event]) {
            throw new Error('该事件不存在');
        }
        this.events[event].forEach(cb => {
            cb.apply(this, args);
        });
        return this;
    }

    once (event, cb) {
        const func = (...args) => {
            this.off(event, func);
            cb.apply(this, args);
        };
        this.on(event, func);
        // if (!this.events[ev])
    }

    off(event, cb) {
        if (cb) {
            this.events[event] = null;
        } else {
            this.events[event] = this.events[event].filter(item => item != cb);
        }
        return this;
    }

}


const add = (a, b) => console.log(a + b);
const log = (...args) => console.log(...args);
const event = new EventEmitter();

// on是监听一个属性
event.on('add', add);
event.on('log', log);
// emit是触发一个属性，并传入参数
event.emit('add', 1, 2);
event.on('log', 'hi');
// off是移除回调
event.off('add');
event.emit('add', 1, 2);
// 只执行一次，后续在执行就不触发
event.once('once', add);
event.emit('once', 1, 2);
event.emit('once', 1, 2);
event.emit('once', 1, 2);
