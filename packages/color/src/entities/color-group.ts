import { Color } from "./color";

class ColorGroup {
  public main!: Color;
  public colors: Color[] = [];

  public get size() {
    return this.colors.length;
  }

  public setMainColor(color: Color) {
    this.main = color;
  }

  public getDistance(c: Color) {
    return Math.abs(this.main.r - c.r) + Math.abs(this.main.g - c.g) + Math.abs(this.main.b - c.b);
  }

  public addColor(color: Color) {
    this.colors.push(color);
    this.main.r = Math.floor((this.main.r + color.r) / 2);
    this.main.g = Math.floor((this.main.g + color.g) / 2);
    this.main.b = Math.floor((this.main.b + color.b) / 2);
  }
}

export { ColorGroup };
