import React, { Component } from 'react';

export default class CounterButton extends Component {
    constructor(props) {
      super(props);
      this.state = {count: 1};
    }
  
    shouldComponentUpdate(nextProps, nextState) {
        
      if (this.props.color !== nextProps.color) {
        return true;
      }
      if (this.state.count !== nextState.count) {
          console.log(this.state, nextState);
        return true;
      }
      return false;
    }
  
    render() {
        console.log(1);
      return (
        <button
          color={this.props.color}
          onClick={() => this.setState(state => ({count: state.count + 1}))}>
          Count: {this.state.count}
        </button>
      );
    }
  }