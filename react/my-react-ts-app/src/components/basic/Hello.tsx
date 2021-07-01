import React, { Component } from 'react';
import Hello2 from './Hello2'
interface Props {
    name: string;
    enthusiasmLevel?: number;
}

interface State {
    msg: string
}

// function Hello({ name, enthusiasmLevel = 1 }: Props) {
//     if (enthusiasmLevel <= 0) {
//         throw new Error('You could be a little more enthusiastic. :D');
//     }
//     return (
//         <div className="hello">
//             <div className="greeting">
//                 Hello {name + getExclamationMarks(enthusiasmLevel)}
//             </div>
//         </div>
//     )
// }
// export default Hello;

// function getExclamationMarks(numChars: number) {
//     return Array(numChars + 1).join('!');
// }

export default class Hello extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            msg: 'name'
        }
    }
    handleClick() {
        this.setState({
            msg: 'world'
        })
    }
    handleClick2() {
        console.log(123);
    }
    render() {
        console.log(123);

        return (
            <div>
                <button onClick={this.handleClick.bind(this)}> hello</button>
                <div>hello</div>
                <Hello2 onClick={this.handleClick2.bind(this)}></Hello2>
            </div>

        )
    }
}