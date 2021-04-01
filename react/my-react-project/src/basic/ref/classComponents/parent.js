import React from 'react';
import Child from './Child'
export default class AutoFocusTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    componentDidMount() {
        console.log(this.textInput.current)
        this.textInput.current.focusTextInput();
    }

    render() {
        return (
            <Child ref={this.textInput} />
        );
    }
}