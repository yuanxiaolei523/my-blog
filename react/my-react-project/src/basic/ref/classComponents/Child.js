import React from 'react';
class CustomTextInput extends React.Component {
    constructor(props) {
        super(props);
         this.myRef = React.createRef();
    }
    focusTextInput () {
        this.myRef.current.focus();
    }
    render() {
        return (
            <div>
                <input ref={this.myRef} />
                <button onClick={this.focusTextInput.bind(this)}>点击</button>
            </div>

        )
    }
}
export default CustomTextInput;