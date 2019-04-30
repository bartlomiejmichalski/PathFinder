import { Board, Cell, Point } from "path_finder";
import { memory } from "path_finder/path_finder_bg";

const CELL_SIZE = 15;
const WALL_COLOR = "#000000";
const FREE_COLOR = "#FFFFFF";
const WATER_COLOR = "#0000FF"
const TREE_COLOR = "#00FF00"
const START_COLOR = "#FF0000"
const END_COLOR = "#00FFFF"
const width = 80;
const height = 40;

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

const generate = () => {
  const startPoint = Point.new(5, 5);
  const endPoint = Point.new(77, 37);
  const board = Board.new(width, height, startPoint, endPoint);
  drawCells(board);
}

generate();

const generatorButton = document.getElementById("generator");

generatorButton.addEventListener("click", event => generate());