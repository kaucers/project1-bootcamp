import React from "react";
import "./App.css";
import StopWatch from "./components/Stopwatch.js";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">

          <StopWatch setTime={3}/>

        </header>
      </div>
    );
  }
}

export default App;
