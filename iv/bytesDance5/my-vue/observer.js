/**
 * 用于遍历所有的属性，并且将所有的属性劫持
 */
export default class Observer {
    constructor (data) {
        this.traverse(data)
    }
    /** 递归遍历data里的所有属性 */
    traverse(data) {

    }
    /** 给传入的数据设置getter/setter */
    defineReactive (obj, key, val) {
        // TODO 递归遍历

    }
}