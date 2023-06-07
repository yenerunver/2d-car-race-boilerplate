import { Track as TrackType } from '../@types/Track';
import { Canvas } from './Canvas';

export class Track {
  object;

  constructor(props: TrackType) {
    this.object = props.object;
  }

  draw(canvas: Canvas, callback: Function) {
    canvas.drawBackground(this.object, callback);
  }
}
