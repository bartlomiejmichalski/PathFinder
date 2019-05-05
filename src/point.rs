use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Point {
    pub x: i32,
    pub y: i32
}

#[wasm_bindgen]
impl Point {
    pub fn new(x: i32, y: i32) -> Point {
        Point { x, y }
    }
    
}

impl Point {
    pub fn move_to(&self, offset: &(i32, i32)) -> Point {
        Point { x: self.x + offset.0, y: self.y + offset.1 }
    }
    pub fn dist_to(&self, other: &Point) -> f64 {
        let dx: i32 = self.x - other.x;
        let dy: i32 = self.y - other.y;
        let a = (dx * dx + dy * dy) as f64;
        a.sqrt()
    }
}