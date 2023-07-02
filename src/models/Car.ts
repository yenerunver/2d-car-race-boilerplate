import { Car as CarType } from '../@types/Car';
import { Canvas } from './Canvas';
import { CanvasObjectPosition } from './CanvasObjectPosition';
import { Track } from './Track';

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

  moveCar(canvas: Canvas, callback: Function) {
    if (this.speed === 0) {
      return;
    }

    let newX = this.position.x + Math.sin((this.position.angle * Math.PI) / 180) * this.speed;
    let newY = this.position.y - Math.cos((this.position.angle * Math.PI) / 180) * this.speed;

    if (newX > canvas.canvas.width) {
      newX = canvas.canvas.width;
    } else if (newX < 0) {
      newX = 0;
    }

    if (newY > canvas.canvas.height) {
      newY = canvas.canvas.height;
    } else if (newY < 0) {
      newY = 0;
    }

    this.position = new CanvasObjectPosition({
      x: newX,
      y: newY,
      angle: this.position.angle,
    });

    callback(this);
  }
}
