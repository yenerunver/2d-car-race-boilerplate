import { Canvas as CanvasType } from "../@types/Canvas";
import { CanvasObject as CanvasObjectType } from "../@types/CanvasObject";
import { CanvasObjectPosition } from "./CanvasObjectPosition";

export class Canvas {
  canvas;

  constructor(props: CanvasType) {
    this.canvas = props.canvas;
    this.canvas.width = props.width;
    this.canvas.height = props.height;
  }

  drawBackground(object: CanvasObjectType, callback: Function) {
    const context = this.canvas.getContext("2d")!;

    context.drawImage(object.asset, 0, 0);

    callback();
  }

  drawObject(
    object: CanvasObjectType,
    position: CanvasObjectPosition,
    callback: Function
  ) {
    const TO_RADIANS = Math.PI / 180;
    const context = this.canvas.getContext("2d")!;

    context.save();

    context.translate(position.x, position.y);

    context.rotate(position.angle * TO_RADIANS);

    context.drawImage(
      object.asset,
      -object.asset.width / 2,
      -object.asset.height / 2,
      object.size!,
      (object.size! * object.asset.height) / object.asset.width
    );

    context.restore();

    callback();
  }
}
