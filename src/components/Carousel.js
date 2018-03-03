import React, { PureComponent } from "react";

export default class Carousel extends PureComponent {
  startX = 0;
  endX = 0;
  currIdx = 0;
  enableDrag = false;
  componentDidMount() {
    this.currIdx = 1;
    this.goToPage(1);
  }
  touchStart = e => {
    // e.stopPropagation();
    this.enableDrag = true;
    this.startX = e.clientX;
    this.start = e.clientX;
  };
  touchMove = e => {
    if (this.enableDrag) {
      // e.preventDefault();
      // e.stopPropagation();
      const delta = e.clientX - this.startX;
      const content = document.querySelector(".content");
      content.style.left = `${content.offsetLeft + delta}px`;
      this.startX = e.clientX;
    }
  };
  touchEnd = e => {
    // e.stopPropagation();
    this.enableDrag = false;
    const totalMove = e.clientX - this.start;
    if (totalMove > 150) {
      this.goToPage(this.currIdx - 1);
    } else if (totalMove < -150) {
      this.goToPage(this.currIdx + 1);
    } else {
      this.goToPage(this.currIdx);
    }
  };
  goToPage = pageIdx => {
    const content = document.querySelector(".content");
    content.style.left = `${-pageIdx * 300}px`;
    this.currIdx = pageIdx;
    if (pageIdx === 0) this.goToPage(3);
    if (pageIdx === 4) this.goToPage(1);
  };
  render() {
    return (
      <div
        className="slider"
        onMouseDown={this.touchStart}
        onMouseMove={this.touchMove}
        onMouseUp={this.touchEnd}
        onMouseLeave={this.touchEnd}
      >
        <div className="content">
          <div className="page">3</div>
          <div className="page">1</div>
          <div className="page">2</div>
          <div className="page">3</div>
          <div className="page">1</div>
        </div>
      </div>
    );
  }
}
