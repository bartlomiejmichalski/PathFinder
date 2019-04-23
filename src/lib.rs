extern crate js_sys;

mod point;
mod cell;
mod board;

use point::Point;
use cell::Cell;
use board::Board;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
