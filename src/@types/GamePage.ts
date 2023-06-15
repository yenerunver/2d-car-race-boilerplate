import { Track } from '../models/Track';
import { Car } from '../models/Car';
import { Canvas } from '../models/Canvas';

export interface GamePage {
  canvas: Canvas;
  track: Track;
  cars: Car[];
  keysPressed: [string];
  resetGameOnClick: Function;
  optionsOnClick: Function;
  onCanvasLoad: Function;
  onTrackLoad: Function;
  onCarLoad: Function;
  onCarMove: Function;
  onKeyDown: Function;
  onKeyUp: Function;
}
