// @ts-ignore
import classifyPoint from 'robust-point-in-polygon';

import { Track as TrackType } from '../@types/Track';
import { Canvas } from './Canvas';
import { CanvasObjectPosition } from './CanvasObjectPosition';

export class Track {
  object;

  roadPolygon;

  roadMap;

  constructor(props: TrackType) {
    this.object = props.object;
    this.roadPolygon = props.roadPolygon;
    this.roadMap = this.polygonToMap(this.roadPolygon);
  }

  draw(canvas: Canvas, callback: Function) {
    canvas.drawBackground(this.object, callback, this);
  }

  public polygonToMap = (polygon: string) => {
    const map: [[number, number] | []] = [[]];

    polygon
      .split(',')
      .map(parseFloat)
      .forEach((point, index) => {
        if (index % 2 === 0) {
          map[Math.floor(index / 2)] = [];
        }

        map[Math.floor(index / 2)][index % 2] = point;
      });

    return map;
  };

  isPointInsideRoadMap = (position: CanvasObjectPosition) =>
    classifyPoint(this.roadMap, [position.x, position.y]) <= 0;
}
