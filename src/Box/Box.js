import React from "react";
import classes from "./Box.module.css";

class Box extends React.Component {
  selectBox = () => {
    this.props.selectBox(this.props.row, this.props.col);
  };
  render() {
    const { boxClass, boxId } = this.props;
    const item = boxClass.split(" ");
    return (
      <div
        className={[
          classes.box,
          item[1] === "on" ? classes.on : classes.off
        ].join(" ")}
        key={boxId}
        onClick={this.selectBox}
      />
    );
  }
}

export default Box;
