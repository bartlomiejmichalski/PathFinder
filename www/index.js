import { Board, Cell, Point, search, using_web_sys } from "path_finder";
import { memory } from "path_finder/path_finder_bg";

const CELL_SIZE = 15;
const WALL_COLOR = "#000000";
const FREE_COLOR = "#FFFFFF";
const WATER_COLOR = "#0000FF";
const TREE_COLOR = "#00FF00";
const START_COLOR = "#FF0000";
const PATH_COLOR = "#FF00FF";
const END_COLOR = "#00FFFF";
const WIDTH = 80;
const HEIGHT = 40;

const START_X = 5;
const START_Y = 5;
const END_X = 77;
const END_Y = 37;

const calculateButton = document.getElementById("calculate");
document.getElementById("start_x").value = START_X;
document.getElementById("start_x").max = WIDTH;
document.getElementById("start_y").value = START_Y;
document.getElementById("start_y").max = HEIGHT;
document.getElementById("end_x").value = END_X;
document.getElementById("end_x").max = WIDTH;
document.getElementById("end_y").value = END_Y;
document.getElementById("end_y").max = HEIGHT;

const canvas = document.getElementById("the_canvas");
canvas.height = (CELL_SIZE + 1) * HEIGHT + 1;
canvas.width = (CELL_SIZE + 1) * WIDTH + 1;

const ctx = canvas.getContext('2d');

const startPoint = Point.new(5, 5);
const endPoint = Point.new(77, 37);
const board = Board.new(WIDTH, HEIGHT, startPoint, endPoint);


calculateButton.addEventListener("click", event => {
  drawCells(board);
  const {startPoint, endPoint} = createPoints()
  const result =  search(startPoint, endPoint, board)
  const cells = new Uint32Array (memory.buffer,  result.all_path(), result.count() * 2);
  drawPath(cells, result.count() * 2)
});

const createPoints = () =>{
  const start_x = parseInt(document.getElementById("start_x").value)
  const start_y = parseInt(document.getElementById("start_y").value)
  const end_x = parseInt(document.getElementById("end_x").value)
  const end_y = parseInt(document.getElementById("end_y").value)
  const startPoint = Point.new(start_x, start_y);
  const endPoint = Point.new(end_x, end_y);
  return {
    startPoint, endPoint
  }
}
const getIndex = (row, column) => {
  return row * WIDTH + column;
};

const cellFillStyle = (cell) => {
  let fillStyle = FREE_COLOR
  if (cell === Cell.Wall) {
    fillStyle = WALL_COLOR
  }
  else if (cell === Cell.Tree) {
      fillStyle = TREE_COLOR
  }
  else if (cell === Cell.Water) {
    fillStyle = WATER_COLOR
  }
  else if (cell === Cell.Start) {
    fillStyle = START_COLOR
  }
  else if (cell=== Cell.End) {
    fillStyle = END_COLOR
  }
  return fillStyle;
}

const drawCells = (board) => {
  const cellsPtr = board.all_cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, WIDTH * HEIGHT);

  ctx.beginPath();

  for (let row = 0; row < HEIGHT; row++) {
    for (let col = 0; col < WIDTH; col++) {
      const idx = getIndex(row, col);
    
      ctx.fillStyle = cellFillStyle(cells[idx])

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  ctx.stroke();
};

const drawPath = (cells, count) => {
  ctx.beginPath();
  ctx.fillStyle = PATH_COLOR
  for (let step = 0; step < count; step += 2) { 
    const x = cells[step]
    const y = cells[step + 1] 

    ctx.fillRect(
      x * (CELL_SIZE + 1) + 1,
      y * (CELL_SIZE + 1) + 1,
      CELL_SIZE,
      CELL_SIZE
    );
  } 
  ctx.stroke();
}

drawCells(board);