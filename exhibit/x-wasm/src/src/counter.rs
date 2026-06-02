use wasm_bindgen::prelude::*;
use std::cell::Cell;

// thread_local gives safe interior mutability in WASM
thread_local! {
    static COUNTER: Cell<i32> = Cell::new(0);
}

#[wasm_bindgen]
pub fn counter_increment() -> i32 {
    COUNTER.with(|c| {
        let v = c.get() + 1;
        c.set(v);
        v
    })
}

#[wasm_bindgen]
pub fn counter_decrement() -> i32 {
    COUNTER.with(|c| {
        let v = c.get() - 1;
        c.set(v);
        v
    })
}

#[wasm_bindgen]
pub fn counter_get() -> i32 {
    COUNTER.with(|c| c.get())
}

#[wasm_bindgen]
pub fn counter_reset() {
    COUNTER.with(|c| c.set(0));
}
