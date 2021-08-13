import React from 'react'
import MyButton from './components/constructors/index'
import MyProps from './components/constructors/props'

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
  componentDidMount() {
    this.init()
  }
  // uNSAFE_componentWillMount () {
  //   this.init()
  //   console.log(123);
  // }
  render () {
    let button = <MyButton/>
    console.log(button)
    let div = <div>hello</div>
    console.log(div)
    return (
      <React.Fragment>
        <div>{this.state.msg}</div>
        <div>{this.state.msg2}</div>
        <MyProps name={undefined} age={18} gender="male"></MyProps>
      </React.Fragment>
    )
  }
}