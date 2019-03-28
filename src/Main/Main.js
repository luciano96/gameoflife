import React from "react";
import Grid from "../Grid/Grid";
import classes from "./Main.module.css";

class Main extends React.Component {
  constructor(props) {
    super();
    this.speed = 400;
    this.rows = 45;
    this.cols = 50;
    this.state = {
      generation: 0,
      gridFull: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false))
    };
  }

  slowDown = () => {
    this.speed += 50;
    this.playButton();
  };

  fastenup = () => {
    if (this.speed > 50) {
      this.speed -= 50;
      this.playButton();
    }
  };

  selectBox = (i, j) => {
    let grid = this.state.gridFull.slice();
    grid[i][j] = !grid[i][j];
    this.setState({ gridFull: grid });
  };

  seed = () => {
    let grid = this.state.gridFull.slice();
    grid.forEach((row, i) => {
      row.forEach((col, j) => {
        if (Math.random() * 4 < 0.4) {
          grid[i][j] = true;
        }
      });
    });
    this.setState({ gridFull: grid });
  };

  refresh = () => {
    let grid = Array(this.rows)
      .fill()
      .map(() => Array(this.cols).fill(false));
    this.setState({ gridFull: grid, generation: 0 });
  };

  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
  };

  pauseButton = () => {
    clearInterval(this.intervalId);
  };

  play = () => {
    const { gridFull } = this.state;
    let grid = gridFull.slice();

    grid.forEach((row, i) => {
      row.forEach((col, j) => {
        let neighbors = 0;
        if (i > 0) if (gridFull[i - 1][j]) neighbors++;
        if (i > 0 && j > 0) if (gridFull[i - 1][j - 1]) neighbors++;
        if (i > 0 && j < this.cols - 1) if (gridFull[i - 1][j + 1]) neighbors++;
        if (j < this.cols - 1) if (gridFull[i][j + 1]) neighbors++;
        if (j > 0) if (gridFull[i][j - 1]) neighbors++;
        if (i < this.rows - 1) if (gridFull[i + 1][j]) neighbors++;
        if (i < this.rows - 1 && j > 0) if (gridFull[i + 1][j - 1]) neighbors++;
        if (i < this.rows - 1 && j < this.cols - 1)
          if (gridFull[i + 1][j + 1]) neighbors++;
        if (gridFull[i][j] && (neighbors < 2 || neighbors > 3))
          grid[i][j] = false;
        if (!gridFull[i][j] && neighbors === 3) grid[i][j] = true;
      });
    });

    this.setState({ gridFull: grid, generation: this.state.generation + 1 });
  };

  shrinkC = () => {
    this.cols--;
    this.refresh();
  };

  shrinkR = () => {
    this.rows--;
    this.refresh();
  };

  growC = () => {
    this.cols++;
    this.refresh();
  };
  growR = () => {
    this.rows++;
    this.refresh();
  };

  render() {
    return (
      <div className={classes.Container}>
        <h1>Game of Life</h1>
        <div className={classes.Buttons}>
          <button className={classes.button} onClick={this.playButton}>
            Play
          </button>
          <button className={classes.button} onClick={this.pauseButton}>
            Pause
          </button>
          <button className={classes.button} onClick={this.seed}>
            Seed
          </button>
          <button className={classes.button} onClick={this.refresh}>
            Clear
          </button>
          <button className={classes.button} onClick={this.fastenup}>
            Faster
          </button>
          <button className={classes.button} onClick={this.slowDown}>
            Slower
          </button>
          <button className={classes.button} onClick={this.growC}>
            AddCol
          </button>
          <button className={classes.button} onClick={this.shrinkC}>
            RemoveCol
          </button>
          <button className={classes.button} onClick={this.growR}>
            AddLine
          </button>
          <button className={classes.button} onClick={this.shrinkR}>
            RemoveLine
          </button>
        </div>
        <div className={classes.gridDiv}>
          <Grid
            gridFull={this.state.gridFull}
            rows={this.rows}
            cols={this.cols}
            selectBox={this.selectBox}
          />
          <div className={classes.addButtons}>
            <button className={classes.button} onClick={this.growC}>
              AddCol
            </button>
            <button className={classes.button} onClick={this.shrinkC}>
              RemoveCol
            </button>
            <button className={classes.button} onClick={this.growR}>
              AddLine
            </button>
            <button className={classes.button} onClick={this.shrinkR}>
              RemoveLine
            </button>
          </div>
        </div>
        <h2>Generations: {this.state.generation}</h2>
      </div>
    );
  }
}

export default Main;
