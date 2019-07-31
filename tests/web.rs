extern crate wasm_bindgen_test;
use wasm_bindgen_test::*;

extern crate path_finder;
use path_finder::{Board, Point, Cell, SearchState, search};

#[wasm_bindgen_test]
fn should_return_proper_path() {
    // given 
    let board = Board::new_test(2, 2, vec![Cell::Start, Cell::Water, Cell::Tree, Cell::End]);
    // expected 
    let expected_path = vec![Point::new(0, 0), Point::new(0, 1), Point::new(1, 1)];
    // when
    let result: Option<SearchState>  = search(&Point::new(0, 0), &Point::new(1, 1), &board);
    // then
    assert_eq!(&result.unwrap().get_path(), &expected_path);
}
