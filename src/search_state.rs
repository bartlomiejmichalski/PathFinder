use std::cmp::Ordering;

use super::Point;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone, Debug)]
pub struct SearchState{
    pos: Point,
    path: Vec<Point>,
    h: f64,
    g: f64,
    f: f64
}

#[wasm_bindgen]
impl SearchState {
    pub fn all_path(&self) -> *const Point {
        self.path.as_ptr()
    }
    pub fn count(&self) -> usize{
        self.path.len()
    }
}
impl SearchState {
    pub fn current_path(&self) -> &Vec<Point>{
        &self.path
    }
    pub fn current_pos(&self) -> &Point {
        &self.pos
    }
    pub fn cost(&self) -> f64{
        self.g
    }
    pub fn distance(&self) -> f64{
        self.h
    }
    pub fn scoring(&self) -> f64{
        self.f
    }

}
impl PartialOrd for SearchState {
    fn partial_cmp(&self, other: &SearchState) -> Option<Ordering> {
        self.f.partial_cmp(&other.f)
    }
}

impl PartialEq for SearchState {
    fn eq(&self, other: &SearchState) -> bool {
        self.f == other.f
    }
}

impl SearchState{
    pub fn new(point: Point, path: Vec<Point>, h: f64, g: f64 ) -> SearchState {
        SearchState{pos: point, path, h, g, f: h + g}
    }
}