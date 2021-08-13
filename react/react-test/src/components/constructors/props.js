import React from 'react';

export default class PropsTest extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
    }
    render() {
        return <div>123</div>
    }
}
PropsTest.defaultProps = {
    name: 123
}