use crate::color::Color;
use js_sys::Math;

pub struct ColorGroup {
  pub main: Color,
  pub num: u32,
}

impl ColorGroup {
  pub fn new() -> ColorGroup {
    ColorGroup {
      main: Color::new(0.0, 0.0, 0.0, 0.0),
      num: 0,
    }
  }

  pub fn set_main_color(&mut self, color: &Color) {
    self.main = *color;
  }

  pub fn get_distance(&self, c: Color) -> f64 {
    return Math::abs((self.main.r - c.r).into())
      + Math::abs((self.main.g - c.g).into())
      + Math::abs((self.main.b - c.b).into());
  }

  pub fn add_color(&mut self, color: Color) {
    self.num = self.num + 1;

    self.main.r = (self.main.r + color.r) / 2.0;
    self.main.g = (self.main.g + color.g) / 2.0;
    self.main.b = (self.main.b + color.b) / 2.0;
  }
}
