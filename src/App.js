import React, { Component } from "react";
import Carousel from "./components/Carousel";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Carousel</h1>
        <Carousel width={300}>
          <div className="page" style={{ width: 300, backgroundColor: "red" }}>
            1
          </div>
          <div
            className="page"
            style={{ width: 300, backgroundColor: "green" }}
          >
            2
          </div>
          <div className="page" style={{ width: 300, backgroundColor: "blue" }}>
            3
          </div>
          <div
            className="page"
            style={{ width: 300, backgroundColor: "yellow" }}
          >
            4
          </div>
        </Carousel>
      </div>
    );
  }
}

export default App;
