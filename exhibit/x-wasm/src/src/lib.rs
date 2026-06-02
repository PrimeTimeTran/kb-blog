mod counter;
use wasm_bindgen::prelude::*;
use serde_json::Value;
use std::collections::HashMap;

//
// =========================
// 1. BASIC PING / PONG
// =========================
//

#[wasm_bindgen]
pub fn ping(input: &str) -> String {
  format!("pong: {}", input)
}

//
// =========================
// 2. STRING UTIL EXHIBITS
// =========================
//

#[wasm_bindgen]
pub fn reverse(input: &str) -> String {
  input.chars().rev().collect()
}

#[wasm_bindgen]
pub fn upper(input: &str) -> String {
  input.to_uppercase()
}

#[wasm_bindgen]
pub fn count_chars(input: &str) -> usize {
  input.chars().count()
}

//
// =========================
// 3. JSON ECHO TOOL
// (JS ↔ Rust structured data practice)
// =========================
//

#[wasm_bindgen]
pub fn json_echo(input: &str) -> String {
  let parsed: Result<Value, _> = serde_json::from_str(input);

  match parsed {
    Ok(v) =>
      serde_json::json!({
            "status": "ok",
            "received": v
        }).to_string(),

    Err(e) =>
      serde_json::json!({
            "status": "error",
            "message": e.to_string()
        }).to_string(),
  }
}

//
// =========================
// 4. MINI GRAPH BUILDER (VFS PREVIEW)
// (this is your bundler preview)
// =========================
//

#[wasm_bindgen]
pub fn build_edges(files: &str) -> String {
  // input: JSON like:
  // {
  //   "a.ts": ["b.ts", "c.ts"],
  //   "b.ts": []
  // }

  let parsed: Result<HashMap<String, Vec<String>>, _> = serde_json::from_str(files);

  match parsed {
    Ok(graph) => {
      let mut edges = Vec::new();

      for (from, tos) in graph.iter() {
        for to in tos {
          edges.push(format!("{} -> {}", from, to));
        }
      }

      serde_json::json!({
                "edges": edges
            }).to_string()
    }

    Err(e) => serde_json::json!({
            "error": e.to_string()
        }).to_string(),
  }
}

//
// =========================
// 5. SIMPLE HASH TOOL (for caching later)
// =========================
//

#[wasm_bindgen]
pub fn simple_hash(input: &str) -> u32 {
  let mut hash: u32 = 5381;

  for byte in input.bytes() {
    hash = (hash << 5).wrapping_add(hash) + (byte as u32);
  }

  hash
}
