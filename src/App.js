import React, { Component } from 'react';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import logo from './logo.svg';
import './App.css';

const generateClassName = createGenerateClassName({ dangerouslyUseGlobalCSS: true })

class App extends Component {
  render() {
    return (
      <StylesProvider generateClassName={generateClassName}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
        <Button>
          Hello
        </Button>
      </StylesProvider>
    );
  }
}

export default App;
