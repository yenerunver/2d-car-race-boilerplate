import { CanvasObjectPosition } from './CanvasObjectPosition';
import { CanvasObject } from './CanvasObject';

export interface Car {
  speed?: number;
  object: CanvasObject;
  position: CanvasObjectPosition;
}
