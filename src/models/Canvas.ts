import { Canvas as CanvasType } from '../@types/Canvas';
import { CanvasObject as CanvasObjectType } from '../@types/CanvasObject';
import { CanvasObjectPosition } from './CanvasObjectPosition';

export class Canvas {
  canvas;

  constructor(props: CanvasType) {
    this.canvas = props.canvas;
    this.canvas.width = props.width;
    this.canvas.height = props.height;
  }

  clear() {
    const context = this.canvas.getContext('2d')!;

    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground(object: CanvasObjectType, callback: Function = () => {}, ...callbackParams: any) {
    const context = this.canvas.getContext('2d')!;

    context.drawImage(object.asset, 0, 0);

    callback(...callbackParams);
  }

  drawObject(
    object: CanvasObjectType,
    position: CanvasObjectPosition,
    callback: Function = () => {},
    ...callbackParams: any
  ) {
    const TO_RADIANS = Math.PI / 180;
    const context = this.canvas.getContext('2d')!;

    context.save();

    context.translate(position.x, position.y);

    context.rotate(position.angle * TO_RADIANS);

    context.drawImage(
      object.asset,
      -object.asset.width / 4,
      -object.asset.height / 4,
      object.size!,
      (object.size! * object.asset.height) / object.asset.width
    );

    context.restore();

    callback(...callbackParams);
  }
}
