use wasm_bindgen::prelude::*;
use super::Cell;
use super::Point;

#[wasm_bindgen]
pub struct Board {
    width: u32,
    height: u32,
    cells: Vec<Cell>,
}

fn calculate_index(point: &Point, width: u32) -> u32 {
    let idx = point.x + point.y * width as i32;
    if idx > 0 {
        idx as u32
    }
    else {
        0
    }
}

#[wasm_bindgen]
impl Board {
    pub fn new(width: u32, height: u32, start_point: &Point, end_point: &Point) -> Board {
        let cells: Vec<Cell> = (0..width * height)
            .map(|i| {
                if i == calculate_index(&start_point, width){
                    Cell::Start
                }
                else if i == calculate_index(&end_point, width){
                    Cell::End
                }
                else if i < width || i >= width * (height - 1) || i % width == 0 || (i + 1) % width == 0 {
                    Cell::Wall
                }
                else {
                    if js_sys::Math::random() < 0.5 {
                        Cell::Free
                    } else if js_sys::Math::random() < 0.5{
                        Cell::Tree
                    } else if js_sys::Math::random() < 0.5{
                        Cell::Water
                    }
                    else {
                        Cell::Wall
                    }
                }
            })
            .collect();

        Board {
            width,
            height,
            cells,
        }
    }

    pub fn width(&self) -> u32 {
        self.width
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    pub fn all_cells(&self) -> *const Cell {
        self.cells.as_ptr()
    }
}

impl Board {
    pub fn is_off(&self, point: &Point) -> bool{
        point.x < 0 || point.x >= self.width as i32 || point.y < 0 || point.y >= self.height as i32
    } 
    pub fn cell(&self, point: &Point) ->Cell {
        let idx = point.x + self.width as i32 * point.y;
        self.cells[idx as usize]
    }
}