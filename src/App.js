import React, { Component } from "react";
import Carousel from "./components/Carousel";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Carousel</h1>
        <Carousel>
          <div className="page">1</div>
          <div className="page">2</div>
          <div className="page">3</div>
        </Carousel>
      </div>
    );
  }
}

export default App;
