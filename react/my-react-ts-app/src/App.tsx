import React from 'react';
import './App.css';
import Hello from './components/basic/Hello';
// import Hello2 from './components/basic/Hello2'
import ByeWorld from './components/decorator/ByeWorld';
import RefDemoComponent from './components/ref';
import HijackDemoComponent from './components/hijack'


function App() {
  return (
    <div className="App">
      <Hello name="zhangSan"></Hello>
      {/* <HijackDemoComponent name='zhangsan'></HijackDemoComponent> */}
    </div>
  );
}

export default App;
