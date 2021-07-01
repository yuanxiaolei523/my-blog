import React, { Component } from 'react'
interface Props {
    // name: string,
    // enthusiasmLevel?: number,
    onClick: Function
}

export default class Hello2 extends Component<Props, object> {
    render() {
        console.log(456);

        // let { name, enthusiasmLevel = 1 } = this.props;
        return (
            <div className="hello">
                <div className="greeting">
                    hello world
                    {/* Hello {name + getExclamationMarks(enthusiasmLevel)} */}
                </div>
            </div>
        )
    }
}

function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}