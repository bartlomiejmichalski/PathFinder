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
const width = 80;
const height = 40;

const start_x = 5;
const start_y = 5;
const end_x = 77;
const end_y = 37;

using_web_sys()


document.getElementById("start_x").value = start_x;
document.getElementById("start_x").max = width
document.getElementById("start_y").value = start_y;
document.getElementById("start_y").max = height
document.getElementById("end_x").value = end_x;
document.getElementById("end_x").max = width
document.getElementById("end_y").value = end_y;
document.getElementById("end_y").max = height

const calculateButton = document.getElementById("calculate");

calculateButton.addEventListener("click", event => {
  drawCells();
  const start_x = parseInt(document.getElementById("start_x").value)
  const start_y = parseInt(document.getElementById("start_y").value)
  const end_x = parseInt(document.getElementById("end_x").value)
  const end_y = parseInt(document.getElementById("end_y").value)
  const startPoint = Point.new(start_x, start_y);
  const endPoint = Point.new(end_x, end_y);
  const result =  search(startPoint, endPoint, board)
  const cells = new Uint32Array (memory.buffer,  result.all_path(), result.count() * 2);
  drawPath(cells, result.count() * 2)
});

const startPoint = Point.new(5, 5);
const endPoint = Point.new(77, 37);
const board = Board.new(width, height, startPoint, endPoint);
console.log(startPoint);

const canvas = document.getElementById("the_canvas");
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const ctx = canvas.getContext('2d');

const getIndex = (row, column) => {
  return row * width + column;
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
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

  ctx.beginPath();

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
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

drawCells();

generate();

const generatorButton = document.getElementById("generator");

generatorButton.addEventListener("click", event => generate());