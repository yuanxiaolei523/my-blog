import React, { Component } from 'react';
import { decoratorWithNameHeight, decoratorWithNameWidth } from '../../hoc/index'

interface Props {
    name?: string
}
@decoratorWithNameWidth(100)
@decoratorWithNameHeight(180)
export default class UglyWorld extends Component<Props, any> {
    render() {
        return (
            <div>
                bye ugly world my name is {this.props.name}
            </div>
        )
    }
}