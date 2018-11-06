import * as React from 'react';
import { object } from 'prop-types';


interface CanvasProps {
  height: number;
  width: number;
}

interface CanvasState {
  cells: number[][];
}

class Canvas extends React.PureComponent<CanvasProps, CanvasState> {
  loopId?: number;

  constructor(props: CanvasProps) {
    super(props);
    this.loopId = undefined;
    const cells = Array(props.height);
    for(let i = 0; i < props.height; i++) {
      for(let j = 0; j < props.width; j++) {
        let cell = Math.round(Math.random());
        if (!cells[i]) {
          cells[i] = []
        }
        cells[i][j] = cell;
      }
    }
    this.state = {
      cells
    };
  }

  static contextTypes = {
    loop: object
  }

  componentDidMount() {
    const drawGrid = this.drawGrid.bind(this, this.props);
    const updateGrid = this.updateGrid.bind(this, this.props);
    this.loopId = this.context.loop.subscribe(drawGrid);
    this.loopId = this.context.loop.subscribe(updateGrid);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopId);
  }

  drawGrid() {
    const { height, width } = this.props;
    const { cells } = this.state;
    const canvas = this.refs.canvas as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    ctx.clearRect(0, 0, 400, 400);

    for(let i = 1; i < height; i++) {
      for(let j = 1; j < width; j++) {
        if(cells[i][j]) {
          ctx.fillStyle = "steelblue";
          ctx.fillRect(i, j, 1, 1);
        }
      }
    }

    ctx.stroke();
  }

  updateGrid() {
    const { height, width } = this.props;
    const { cells } = this.state;
    const mirror = cells.slice()
    cells.forEach((row: number[], rowIdx: number) => {
      row.forEach((cell: number, colIdx) => {
        let neighborCount = 0;
        for(let i = -1; i < 2; i++) {
          for(let j = -1; j < 2; j++) {
            if((i === 0 && j === 0) || (rowIdx + i < 0) ||
            (rowIdx + i > height - 1) || (colIdx + j < 0) ||
            (colIdx + j > width - 1)) {
              continue;
            }
            neighborCount += cells[rowIdx + i][colIdx + j];
          }
        }
        if (cell) {
          mirror[rowIdx][colIdx] = neighborCount < 2 ? 0 : neighborCount > 3 ? 0 : 1;
        } else {
          mirror[rowIdx][colIdx] = neighborCount === 3 ? 1 : 0;
        }
      });
    });
    this.setState({ cells: mirror })
  }

  render() {
    const {height, width} = this.props;
    return (
      <canvas ref="canvas" height={height} width={width} />
    );
  }
}

export default Canvas;
