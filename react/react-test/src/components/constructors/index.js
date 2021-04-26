// 本组件用于测试React只生成不渲染的情况下，是否该组件的生命周期函数会被调用
import React, {Component} from 'react';

export default class MyButton extends Component {
    constructor() {
        super();
    }
    componentWillMount () {
        console.log('componentWillMount')
    }
    render () {
        console.log('render')
        return <div>123</div>
    }
}

