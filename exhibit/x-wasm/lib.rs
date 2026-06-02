use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn ping(input: &str) -> String {
    format!("pong: {}", input)
}
