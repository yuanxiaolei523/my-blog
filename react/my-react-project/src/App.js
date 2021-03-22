import React, { Component } from 'react';

export default class GetMousePosition extends Component {
	handleClick() {
		console.log(123, appRouter);
		appRouter('com.qunar.quick', '/');
	}
	render () {
		return <button onClick={this.handleClick.bind(this)}>button</button>
	}

}
