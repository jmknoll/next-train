import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DataService from "./dataService";
const dataService = new DataService();

const transformLineNumber = val => {
  const lineNumberMap = {
    f: "21"
  };
  return lineNumberMap[val];
};

function App() {
  const data = dataService.getData(transformLineNumber("f"));
  return (
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
  );
}

export default App;
