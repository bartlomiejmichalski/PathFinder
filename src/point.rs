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
