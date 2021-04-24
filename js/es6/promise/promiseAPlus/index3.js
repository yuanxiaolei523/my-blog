/**
 * 该版本是我自行阅读Promise A+规范去进行编写的，最后还需要进行全面的测试
 */

// 1. Promise states
// Promise有三种状态，初始状态是pending，最终状态是fullfilled或者rejected，promise的状态只能从pending变为fullfilled或者rejected，不可逆转，而且一旦状态改变了之后，就不可以再次更改
const PENDING = 'pending';
const FULFILL = 'fulfilled';
const REJECTED = 'rejected';
class MyPromise {
    

    constructor(executor) {
        this.status = 
    }
}