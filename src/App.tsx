import * as React from 'react';
import './App.css';
import Game from './components/Game';

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Conway's Game of Life</h1>
        </header>
        <Game />
      </div>
    );
  }
}

export default App;
