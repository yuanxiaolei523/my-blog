import React from 'react';

export default class PropsTest extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
    }
    render() {
        return <div>{this.props.name}</div>
    }
}
PropsTest.defaultProps = {
    name: 123
}