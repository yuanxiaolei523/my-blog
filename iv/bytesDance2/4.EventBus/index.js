class EventEmitter {
    constructor(maxListeners) {
        // 因为使用时需要一个key和一个value，所以我们使用对象存储
        this.events = {};
        // 新需求：如果需要对每个事件加一个最大监听数
        this.maxListeners = maxListeners || Infinity;
    }
    // 添加事件的监听
    on(event, cb) {
        // 如果没有绑定过这个事件
        if (!this.events[event]) {
            this.events[event] = []; // 一个事件可能会有多个监听，所以需要用数组
        }
        // TODO 拦截最大监听
        if (
            this.maxListeners !== Infinity &&
			this.events[event].length >= this.maxListeners
        ) {
            console.warn(`当前事件${event}已超过最大监听数`);
            return this;
        }
        this.events[event].push(cb);
        return this;
    }
    // 给事件添加监听，但是监听只执行一次
    once(event, cb) {
        const func = (...args) => {
            this.off(event, func);
            cb.apply(this, args);
        };
        this.on(event, func);
        return this;
    }
    emit(event, ...args) {
        console.log(this);
        if (!this.events[event]) {
            console.log('没有这个事件');
            return;
        }
        const cbs = this.events[event];
        cbs.forEach((cb) => cb.apply(this, args));
        return this;
    }
    // 解除事件的监听
    off(event, cb) {
        if (!cb) {
            this.events[event] = null; //如果不传cb，那么该事件所有的回调函数移除
        } else {
            this.events[event] = this.events[event].filter(
                (item) => item != cb
            );
        }
        return this;
    }
}

const add = (a, b) => console.log(a + b);
const log = (...args) => console.log(...args);
const event = new EventEmitter();

event.on('add', add);
event.on('log', log);
event.on('add', log);
event.emit('add', 1, 2);
event.emit('log', 'hi');
// event.off('add');
// event.emit('add', 1, 2);
// event.once('once', add);
// event.emit('once', 1, 2);
// event.emit('once', 1, 2);
// event.emit('once', 1, 2);
