import { Car as CarType } from '../@types/Car';
import { Canvas } from './Canvas';
import { CanvasObjectPosition } from './CanvasObjectPosition';

export class Car {
  id;

  object;

  position;

  speed = 0;

  maxSpeed = 0.1;

  maxBackSpeed = 0.05;

  angleStep = 0.05;

  constructor(props: CarType) {
    this.id = Number(Math.random().toFixed(2)) * 100;
    this.object = props.object;
    this.position = props.position;
    if (props.speed) {
      this.speed = props.speed;
    }
  }

  isMoving() {
    return this.speed !== 0;
  }

  accelerate(FPS: number) {
    if (this.isMoving()) {
      return;
    }

    this.speed = this.maxSpeed;
    setTimeout(() => {
      this.speed = 0;
    }, 1000 / FPS);
  }

  decelerate(FPS: number) {
    if (this.isMoving()) {
      return;
    }

    this.speed = this.maxBackSpeed * -1;
    setTimeout(() => {
      this.speed = 0;
    }, FPS);
  }

  steerLeft() {
    if (!this.isMoving()) {
      return;
    }

    this.position.angle -= this.angleStep * (this.speed / this.maxSpeed);
  }

  steerRight() {
    if (!this.isMoving()) {
      return;
    }

    this.position.angle += this.angleStep * (this.speed / this.maxSpeed);
  }

  draw(canvas: Canvas, callback: Function) {
    canvas.drawObject(this.object, this.position, callback, this);
  }

  moveCar(callback: Function) {
    if (this.speed === 0) {
      return;
    }

    const newX = this.position.x + Math.sin((this.position.angle * Math.PI) / 180) * this.speed;
    const newY = this.position.y - Math.cos((this.position.angle * Math.PI) / 180) * this.speed;

    this.position = new CanvasObjectPosition({
      x: newX,
      y: newY,
      angle: this.position.angle,
    });

    callback(this);
  }
}
