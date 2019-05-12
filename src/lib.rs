mod point;
mod search_state;
mod cell;
mod board;
mod path_finding;

use wasm_bindgen::prelude::*;
use point::Point;
use search_state::SearchState;
use cell::Cell;
use board::Board;
use path_finding::search;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;


#[macro_export]
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}
