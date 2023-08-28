import { createDefer } from "@reskit/shared";
import { Color } from "./entities/color";
import { ColorGroup } from "./entities/color-group";

let image: HTMLImageElement;
let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D | null;

function getScaleDownRadio(width: number, height: number) {
  let MAX = 600;
  if (width <= MAX || height <= MAX) {
    return 1;
  }

  return Math.max(width, height) / MAX;
}

function getImageInUint8Array(url: string, scaleDown?: boolean): Promise<Uint8Array> {
  const defer = createDefer<Uint8Array>();

  if (!image) {
    image = new Image();
    image.crossOrigin = "Anonymous";
  }

  image.onload = function () {
    if (!canvas) {
      canvas = document.createElement("canvas");
      context = canvas.getContext("2d");

      document.body.appendChild(canvas);
    }
    if (!context) {
      throw new Error("Cannot get context");
    }

    const scale = scaleDown ? getScaleDownRadio(image.width, image.height) : 1;

    canvas.width = image.width / scale;
    canvas.height = image.height / scale;

    context.drawImage(
      image,
      0,
      0,
      image.width,
      image.height,
      0,
      0,
      image.width / scale,
      image.height / scale
    );

    const imageData = context.getImageData(0, 0, image.width / scale, image.height / scale);

    defer.resolve(new Uint8Array(imageData.data));
  };
  image.onerror = defer.reject;
  image.src = url;

  return defer.promise;
}

async function extractColorFromImage(url: string, maxNum: number): Promise<Color[]> {
  const imageData = await getImageInUint8Array(url, true);
  const colors: Color[] = [];

  for (let i = 0; i < imageData.length; i += 4) {
    const r = imageData[i];
    const g = imageData[i + 1];
    const b = imageData[i + 2];

    if (r < 250 && g < 250 && b < 250 && r >= 5 && g >= 0 && b >= 0) {
      colors.push(new Color(r, g, b, imageData[i + 3] / 255));
    }
  }

  const colorGroups: ColorGroup[] = [];

  for (let i = 0; i < maxNum; i++) {
    const index = Math.floor(Math.random() * colors.length);
    const colorGroup = new ColorGroup();

    colorGroup.setMainColor(colors[index]);
    colorGroups.push(colorGroup);
  }

  colors.forEach((color) => {
    const minGroup = colorGroups.reduce((prev, curr) => {
      return curr.getDistance(color) < prev.getDistance(color) ? curr : prev;
    }, colorGroups[0]);

    minGroup.addColor(color);
  });

  return colorGroups.sort((c1, c2) => c2.size - c1.size).map((colorGroup) => colorGroup.main);
}

export { getImageInUint8Array, extractColorFromImage };
