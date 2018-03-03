import React, { PureComponent } from "react";

const itemStyle = {
  width: 200,
  height: 100,
  backgroundColor: "red",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0
};
const styles = {
  container: {
    transition: "all 2s ease",
    display: "flex",
    width: 200,
    overflow: "hidden",
    margin: "auto",
    padding: 0
  },
  item1: {
    ...itemStyle,
    backgroundColor: "red",
    transform: "translate(-20px)"
  },
  item2: {
    ...itemStyle,
    backgroundColor: "green",
    transform: "translate(-20px)"
  },
  item3: {
    ...itemStyle,
    backgroundColor: "blue"
  }
};
export default class Carousel extends PureComponent {
  startPos = 0;
  endPos = 0;
  render() {
    return (
      <ul style={styles.container}>
        <li style={styles.item1}>1</li>
        <li style={styles.item2}>2</li>
        <li style={styles.item3}>3</li>
      </ul>
    );
  }
}
