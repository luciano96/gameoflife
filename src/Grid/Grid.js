import React from "react";
import classes from "./Grid.module.css";
import Box from "../Box/Box";
class Grid extends React.Component {
  render() {
    const { cols, rows, gridFull } = this.props;
    let rowsArr = [];
    let boxClass = "";
    for (let row = 0; row < rows; row++) {
      let rowA = [];
      for (let col = 0; col < cols; col++) {
        let boxId = row + "_" + col;
        /*  console.log("col", col, "grid", gridFull[row][col]); */
        gridFull[row][col] === true
          ? (boxClass = "box on")
          : (boxClass = "box off");

        rowA.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={row}
            col={col}
            selectBox={this.props.selectBox}
          />
        );
      }
      rowsArr.push(
        <div key={row} className={classes.Row}>
          {rowA}
        </div>
      );
    }
    return <div className={classes.grids}>{rowsArr}</div>;
  }
}

export default Grid;
