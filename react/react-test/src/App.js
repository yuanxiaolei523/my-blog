import React, {useState} from 'react'

// function App() {
//   let msg = useState('hello')
//   return (
//     <div className="App">
//       {msg}
//     </div>
//   );
// }

// export default App;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: 'hello',
      msg2: 'hello2',
      name: 3333
    }
  }

  promiseContainer () {
    // return new Promise((resolve) => {
      this.setState({name: 123})
      
      // setTimeout(resolve, 2000, 'done')
    // })
  }

  async init () {
    let res = await this.promiseContainer();
    console.log(456, this.state.name);
    this.setState({
      msg2: 'world2'
    })
    console.log(res);
    return res;
  }
  componentWillMount () {
    this.init()
    console.log(123);
    // this.setState({
    //   msg2: 'world2'
    // })
    // setTimeout(() => {
    //   this.setState({
    //     msg: 'world'
    //   })
    // }, 2000)
  }
  componentDidMount() {

    // setTimeout(() => {
    //   this.setState({
    //     msg2: 'world2'
    //   });
    // }, 1000);
  }
  render () {
    return (
      <React.Fragment>
        <div>{this.state.msg}</div>
        <div>{this.state.msg2}</div>
      </React.Fragment>
    )
  }
}