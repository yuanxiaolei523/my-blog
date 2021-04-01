import React from 'react';

function Test(props) {
    return <input type="text"/>
}

export default class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }
    render() {
        return (
            <Test ref={this.textInput}></Test>
        )
    }
}