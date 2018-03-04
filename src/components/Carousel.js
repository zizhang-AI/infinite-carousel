import React, { PureComponent } from "react";

const isEqual = require("lodash.isequal");

export default class Carousel extends PureComponent {
  startX = 0;
  endX = 0;
  currIdx = 0;
  enableDrag = false;
  componentDidMount() {
    this.currIdx = 1;
    this.content = document.querySelector(".content");
    this.goToPage(1);
  }
  // when new children's length less than the current one, there could be problem.
  componentDidUpdate() {
    this.currIdx = 1;
    this.goToPage(1);
  }
  touchStart = e => {
    this.enableDrag = true;
    this.startX = e.changedTouches ? e.changedTouches[0].pageX : e.clientX;
    this.start = this.startX;
  };
  touchMove = e => {
    if (this.enableDrag) {
      const currX = e.changedTouches ? e.changedTouches[0].pageX : e.clientX;
      const delta = currX - this.startX;
      this.content.style.left = `${this.content.offsetLeft + delta}px`;
      this.startX = currX;
    }
  };
  touchEnd = e => {
    if (this.enableDrag) {
      const halfWidth = this.props.width / 2;
      const totalMove =
        (e.touches ? e.changedTouches[0].pageX : e.clientX) - this.start;
      if (totalMove > halfWidth) {
        this.goToPage(this.currIdx - 1);
      } else if (totalMove < -halfWidth) {
        this.goToPage(this.currIdx + 1);
      } else {
        this.goToPage(this.currIdx);
      }
    }
    this.enableDrag = false;
  };
  goToPage = pageIdx => {
    this.content.style.left = `${-pageIdx * this.props.width}px`;
    this.currIdx = pageIdx;
    if (pageIdx === 0) this.goToPage(this.props.children.length);
    if (pageIdx === this.props.children.length + 1) this.goToPage(1);
  };
  render() {
    const children = React.Children.toArray(this.props.children);
    const head = children[0];
    const tail = children[children.length - 1];
    const pages = [tail, ...children, head].map((ele, i) => ({
      ...ele,
      key: `${ele.props.id || ""}_${i}`
    }));
    const { width } = this.props;
    return (
      <div
        className="slider"
        onMouseDown={this.touchStart}
        onMouseMove={this.touchMove}
        onMouseUp={this.touchEnd}
        onMouseLeave={this.touchEnd}
        onTouchStart={this.touchStart}
        onTouchMove={this.touchMove}
        onTouchEnd={this.touchEnd}
        style={{ width: this.props.width }}
      >
        <div className="content" style={{ width: width * pages.length }}>
          {pages}
        </div>
      </div>
    );
  }
}
