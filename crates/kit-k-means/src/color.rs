use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub struct Color {
  pub r: f32,
  pub g: f32,
  pub b: f32,
  pub a: f32,
}

impl Color {
  pub fn new(r: f32, g: f32, b: f32, a: f32) -> Color {
    Color { r, g, b, a }
  }
}
