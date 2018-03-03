import React, { PureComponent } from "react";

export default class Carousel extends PureComponent {
  startX = 0;
  endX = 0;
  currIdx = 0;
  cssTransform(ele, attr, val) {
    if (!ele.transform) {
      ele.transform = {};
    }
    //当传入值时对属性进行设置。
    if (arguments.length > 2) {
      ele.transform[attr] = val;
      var sval = "";
      for (var s in ele.transform) {
        if (s === "translateX") {
          sval += s + "(" + ele.transform[s] + "px)";
        }
        //如果实在不理解，可以console.log(sval)可以看到到最后一张时会有一个先跳到第二张再快速到第三张的过程
        ele.style.WebkitTransform = ele.style.transform = sval;
      }
    } else {
      val = ele.transform[attr];
      if (typeof val === "undefined") {
        if (attr === "translateX") {
          val = 0;
        }
      }
      return val;
    }
  }
  touchStart(e) {
    e.stopPropagation();
    this.LunBoEle.style.transition = "none";
    let moveX = this.cssTransform.bind(this)(this.LunBoEle, "translateX");
    this.now = Math.round(-moveX / this.sliderWidth);
    if (this.now === 0) {
      this.now = this.props.len / 2;
    } else if (this.now === this.props.len - 1) {
      this.now = this.props.len / 2 - 1;
    }
    this.cssTransform(
      this.LunBoEle,
      "translateX",
      -this.now * this.sliderWidth
    );
    this.startPoint = e.changedTouches[0].pageX;
    this.startEle = this.cssTransform.bind(this)(this.LunBoEle, "translateX");
  }
  //移动
  touchMove(e) {
    e.preventDefault();
    e.stopPropagation();
    let endPoint = e.changedTouches[0].pageX;
    let disX = endPoint - this.startPoint;
    this.cssTransform.bind(this)(
      this.LunBoEle,
      "translateX",
      disX + this.startEle
    );
  }
  touchEnd(e) {
    e.stopPropagation();
    let moveX = this.cssTransform.bind(this)(this.LunBoEle, "translateX");
    //这边我是对移动做了判断
    if (Math.abs(moveX) > Math.abs(this.now * this.sliderWidth)) {
      this.now = Math.ceil(-moveX / this.sliderWidth);
    } else {
      this.now = Math.floor(-moveX / this.sliderWidth);
    }
    this.tab.bind(this)();
    this.auto.bind(this)();
  }
  render() {
    return (
      <div className="slider">
        <div className="content">
          <div className="page" />
          <div className="page" />
          <div className="page" />
        </div>
      </div>
    );
  }
}
