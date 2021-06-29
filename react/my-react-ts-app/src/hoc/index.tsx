import React, { Component } from 'react';

interface State {
    name: string
}

export const decoratorWithNameHeight = (height?: number) => {
    return (WrappedComponent: any) => {
        return class extends Component<any, State> {
            public state: State = {
                name: ''
            }
            componentWillMount() {
                let username = localStorage.getItem('myName');
                this.setState({
                    name: username || ''
                })
                console.log();

            }
            render() {
                return (
                    <div>
                        <WrappedComponent name={this.state.name} {...this.props}></WrappedComponent>
                        <p>身高为{height || 0}</p>
                    </div>
                )
            }
        }
    }
}

export const decoratorWithNameWidth = (width?: number) => {
    return (WrappedComponent: any) => {
        return class extends Component<any, State> {

            render() {
                return (
                    <div>
                        <WrappedComponent {...this.props}></WrappedComponent>
                        <p>宽度为{width || 0}</p>
                    </div>
                )
            }
        }
    }
}