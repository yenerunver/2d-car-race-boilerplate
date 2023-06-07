import { CanvasObjectPosition as CanvasObjectPositionType } from '../@types/CanvasObjectPosition';

export class CanvasObjectPosition {
  x;

  y;

  angle;

  constructor(props: CanvasObjectPositionType) {
    this.x = props.x;
    this.y = props.y;
    this.angle = props.angle;
  }
}
