import React, { Component } from 'react';
import { Button } from 'antd';

export default class TestSetState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: true
        }
    }
    render(par) {
        console.log('render', par);
        return (
            <div>
                {this.state.isShow + ''}
                <Button onClick={() => this.handleClick()}>显示</Button>
            </div>
        )
    }
    handleClick() {
        this.setState({
            isShow: !this.state.isShow
        })
    }
    componentDidUpdate(par, par2) {
        console.log('componentDidUpdate', par, par2);
    }
}
