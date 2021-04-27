import React from 'react';
import './App.css';
import Hello from './components/basic/Hello';
import Hello2 from './components/basic/Hello2'

function App() {
  return (
    <div className="App">
      <Hello name={'zhangsan'}></Hello>
      <Hello2 name={'lisi'}></Hello2>
    </div>
  );
}

export default App;
