/**
 * 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
 * push(x) —— 将元素 x 推入栈中。
 * pop() —— 删除栈顶的元素。
 * top() —— 获取栈顶元素。
 * getMin() —— 检索栈中的最小元素。
 * MinStack minStack = new MinStack();
 * minStack.push(-2);
 * minStack.push(0);
 * minStack.push(-3);
 * minStack.getMin();   --> 返回 -3.
 * minStack.pop();
 * minStack.top();      --> 返回 0.
 * minStack.getMin();   --> 返回 -2.
 */

function MinStack() {
    this.items = [];
    this.min = null;
}
MinStack.prototype.push = function (item) {
    this.items.push(item);
};

MinStack.prototype.pop = function () {
    if (this.items.length > 0) {
        return this.items.pop();
    }
};

MinStack.prototype.top = function () {
    if (this.items.length > 0) {
        return this.items[this.items.length - 1];
    }
};

MinStack.prototype.getMin = function () {
    return Math.min(...this.items);
    // return this.items.reduce((prev, cur) => Math.min(prev, cur));
};

let minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin());  
minStack.pop();
console.log(minStack.top());      
console.log(minStack.getMin()); 