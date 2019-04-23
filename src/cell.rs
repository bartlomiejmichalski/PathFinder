use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq, Ord, PartialOrd)]
pub enum Cell {
    Wall = 0,
    Free = 1,
    Tree = 2,
    Water = 3,
    Start = 4,
    End = 5
}