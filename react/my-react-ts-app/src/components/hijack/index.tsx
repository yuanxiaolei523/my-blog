import React, { Component } from 'react';
import { hiJackHoc } from '../../hoc/hijack'


interface Props {
    name?: string;
}

interface State {
    weight?: number;
    height?: number;
}
@hiJackHoc
class HijackDemoComponent extends Component<Props, State> {
    state: State = {
        weight: 100,
        height: 170
    }
    handleClick () {
        this.setState({
            weight: this.state.weight! + 1
        })
    }
    render() {
        return (
            <div onClick = {() => this.handleClick()}>
                点我{this.state.weight}
                {/* bye ugly world my name is {this.props.name} */}
            </div>
        )
    }
}

export default HijackDemoComponent