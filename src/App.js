import React, { Component } from "react";
import Carousel from "./components/Carousel";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Carousel</h1>
        <Carousel />
      </div>
    );
  }
}

export default App;
