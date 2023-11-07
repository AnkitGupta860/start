import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import User from './User';

function App() {
  
  function getData(){
    alert("Hello User");
  }

  return (
    <div className="App">
      <h1>User information</h1>
      <User data={getData}/>
      
    </div>
  );
}

export default App;
