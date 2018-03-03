import React, { PureComponent } from "react";

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
    this.enableDrag = false;
    const totalMove =
      (e.touches ? e.changedTouches[0].pageX : e.clientX) - this.start;
    if (totalMove > 150) {
      this.goToPage(this.currIdx - 1);
    } else if (totalMove < -150) {
      this.goToPage(this.currIdx + 1);
    } else {
      this.goToPage(this.currIdx);
    }
  };
  goToPage = pageIdx => {
    this.content.style.left = `${-pageIdx * 300}px`;
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
        onTouchStart={this.touchStart}
        onTouchMove={this.touchMove}
        onTouchEnd={this.touchEnd}
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
