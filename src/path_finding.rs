use std::cmp::Ordering;
use super::Point;
use super::Board;
use super::SearchState;
use super::Cell;
use super::log;

use wasm_bindgen::prelude::*;

fn create_initial_state(start_point: &Point,  end_point: &Point) -> SearchState {
    SearchState::new(start_point.clone(), vec![start_point.clone()], start_point.dist_to(&end_point), 0.00)
}
fn reverse(ordering: Ordering) -> std::cmp::Ordering{
    match ordering{
        Ordering::Less => Ordering::Greater,
        Ordering::Greater => Ordering::Less,
        Ordering::Equal => Ordering::Equal,
    }
}
#[wasm_bindgen]
pub fn search(start_point: &Point, end_point: &Point, board: &Board) -> Option<SearchState>{
    log!("Hello");
    let mut fringe:Vec<SearchState> = Vec::new();
    let mut closed:Vec<Point> = Vec::new();
    fringe.push(create_initial_state(&start_point, &end_point));
    loop {
        if fringe.is_empty() {
            break None;
        }
        fringe.sort_by(|a,b| reverse(a.partial_cmp(&b).unwrap()));
        let state: SearchState = fringe.pop().unwrap();

        if state.current_pos().eq(&end_point){
            break Some(state);
        }
        if closed.contains(state.current_pos()) {
            continue;
        }
        closed.push(state.current_pos().clone());
        fringe.append(&mut get_successors(&state, &end_point, &board));
    }
}

fn get_successors(state : &SearchState, end_point: &Point, board: &Board) -> Vec<SearchState>{
    let mut successors : Vec<SearchState> = Vec::new();
    let directions:Vec<(i32, i32)> = vec![(-1,0), (-1, 1), (0, 1), (1, 1), (1,0), (1, -1), (0, -1), (-1, -1)];
    for direction in &directions {
        let new_pos = state.current_pos().move_to(&direction);
        if board.is_off(&new_pos) {
            continue;
        }

        let cell = board.cell(&new_pos);
        if cell == Cell::Wall {
            continue;
        }
        let mut path = state.current_path().clone();
        path.push(new_pos.clone());
        let cost = state.cost() + calculate_cost(&cell);
        let h = new_pos.dist_to(&end_point);
        successors.push(SearchState::new(
            new_pos,
            path,
            h,
            cost));
    }
    successors
}
fn calculate_cost(cell : &Cell) -> f64 {
    match cell {
        Cell::Free => 1.0,
        Cell::Tree => 3.0 ,
        Cell::Water => 5.0,
        _ => 1000.0
    }
}
