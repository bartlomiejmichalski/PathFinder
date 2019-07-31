mod point;
mod search_state;
mod cell;
mod board;
mod path_finding;

use wasm_bindgen::prelude::*;
pub use point::Point;
pub use search_state::SearchState;
pub use cell::Cell;
pub use board::Board;
pub use path_finding::search;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;


#[macro_export]
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}
