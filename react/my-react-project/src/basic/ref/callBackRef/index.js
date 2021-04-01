import React from  'react';

export default class CustomInputText extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = null;
    }
    setTextInputRef = (ele) => {
        console.log(ele)
        this.textInput = ele;
    }
    focusTextInput = () => {
        // 使用原生 DOM API 使 text 输入框获得焦点
        if (this.textInput) this.textInput.focus();
    };
    componentDidMount() {
        this.focusTextInput()
    }

    render () {
        return (
            <div>
                <input type="text" ref={this.setTextInputRef}/>
                <button onClick={this.focusTextInput.bind(this)}>点击</button>
            </div>
        )
    }
}