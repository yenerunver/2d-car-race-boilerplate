import { Car as CarType } from '../@types/Car';
import { Canvas } from './Canvas';
import { CanvasObjectPosition } from './CanvasObjectPosition';

export class Car {
  id;

  object;

  position;

  speed = 0;

  maxSpeed = 4;

  speedDecay = 0.98;

  acceleration = 1.1;

  backSpeed = 1.1;

  angleStep = 4;

  constructor(props: CarType) {
    this.id = Number(Math.random().toFixed(2)) * 100;
    this.object = props.object;
    this.position = props.position;
    if (props.speed) {
      this.speed = props.speed;
    }
  }

  isMoving() {
    return !(this.speed > -0.4 && this.speed < 0.4);
  }

  accelerate() {
    if (this.speed < this.maxSpeed) {
      if (this.speed < 0) {
        this.speed *= this.speedDecay;
      } else if (this.speed === 0) {
        this.speed = 0.4;
      } else {
        this.speed *= this.acceleration;
      }
    }
  }

  decelerate() {
    const min = 0;
    if (Math.abs(this.speed) < this.maxSpeed) {
      if (this.speed > 0) {
        this.speed *= this.speedDecay;
        this.speed = this.speed < min ? min : this.speed;
      } else if (this.speed === 0) {
        this.speed = -0.4;
      } else {
        this.speed *= this.backSpeed;
        this.speed = this.speed > min ? min : this.speed;
      }
    }
  }

  steerLeft() {
    if (this.isMoving()) {
      this.position.angle -= this.angleStep * (this.speed / this.maxSpeed);
    }
  }

  steerRight() {
    if (this.isMoving()) {
      this.position.angle += this.angleStep * (this.speed / this.maxSpeed);
    }
  }

  draw(canvas: Canvas, callback: Function) {
    canvas.drawObject(this.object, this.position, callback, this);
  }

  moveCar(callback: Function) {
    if (this.speed === 0) {
      return;
    }

    const newX = this.position.x + Math.sin((this.position.angle * Math.PI) / 180);
    const newY = this.position.y - Math.cos((this.position.angle * Math.PI) / 180);

    this.position = new CanvasObjectPosition({
      x: newX,
      y: newY,
      angle: this.position.angle,
    });

    callback(this);
  }
}
