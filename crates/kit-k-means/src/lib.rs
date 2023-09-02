use js_sys::{Array, Math};
pub mod color;
pub mod color_group;

use crate::color::Color;
use crate::color_group::ColorGroup;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn cluster_color_in_k_means(image_data: &mut [u8], k: u8) -> Array {
  let mut i = 0;
  let mut colors = Vec::<Color>::new();

  while i < image_data.len() {
    let r = image_data[i];
    let g = image_data[i + 1];
    let b = image_data[i + 2];

    if r < 250 && g < 250 && b < 250 && r > 5 && g > 5 && b > 5 {
      let color = Color::new(
        r as f32,
        g as f32,
        b as f32,
        (image_data[i + 3] as f32) / 255.0,
      );
      colors.push(color);
    }

    i += 4;
  }

  let mut color_groups = vec![];
  let len = colors.len();

  for _i in 0..k {
    let mut color_group = ColorGroup::new();
    let random = Math::floor(Math::random() * len as f64) as usize;

    color_group.set_main_color(&colors[random]);
    color_groups.push(color_group);
  }

  colors.into_iter().for_each(|color| {
    let mut min_group_index = 0;
    let mut min_distance = 1024.0;

    let mut i = 0;
    color_groups.iter_mut().for_each(|group| {
      let distance = group.get_distance(color);

      if distance < min_distance {
        min_group_index = i;
        min_distance = distance;
      }

      i += 1;
    });

    color_groups[min_group_index].add_color(color);
  });

  color_groups.sort_by(|c1, c2| c2.num.cmp(&c1.num));

  return color_groups
    .into_iter()
    .map(|c| JsValue::from(c.main))
    .collect();
}
