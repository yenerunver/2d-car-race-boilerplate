import { Car as CarType } from '../@types/Car';
import { Canvas } from './Canvas';

export class Car {
  object;

  position;

  speed = 0;

  // maxSpeed = 4;
  //
  // speedDecay = 0.98;
  //
  // acceleration = 1.1;
  //
  // backSpeed = 1.1;
  //
  // angleStep = 4;

  constructor(props: CarType) {
    this.object = props.object;
    this.position = props.position;
    if (props.speed) {
      this.speed = props.speed;
    }
  }

  // isMoving() {
  //   return !(this.speed > -0.4 && this.speed < 0.4);
  // }

  // accelerate() {
  //   if (this.speed < this.maxSpeed) {
  //     if (this.speed < 0) {
  //       this.speed *= this.speedDecay;
  //     } else if (this.speed === 0) {
  //       this.speed = 0.4;
  //     } else {
  //       this.speed *= this.acceleration;
  //     }
  //   }
  // }

  // decelerate(amount: number) {
  //   const min = amount || 0;
  //   if (Math.abs(this.speed) < this.maxSpeed) {
  //     if (this.speed > 0) {
  //       this.speed *= this.speedDecay;
  //       this.speed = this.speed < min ? min : this.speed;
  //     } else if (this.speed === 0) {
  //       this.speed = -0.4;
  //     } else {
  //       this.speed *= this.backSpeed;
  //       this.speed = this.speed > min ? min : this.speed;
  //     }
  //   }
  // }

  // steerLeft() {
  //   if (this.isMoving()) {
  //     this.angle -= this.angleStep * (this.speed / this.maxSpeed);
  //   }
  // }

  // steerRight() {
  //   if (this.isMoving()) {
  //     this.angle += this.angleStep * (this.speed / this.maxSpeed);
  //   }
  // }

  draw(canvas: Canvas, callback: Function) {
    canvas.drawObject(this.object, this.position, callback);
  }

  // static moveCar(
  //   context: CanvasRenderingContext2D,
  //   asset: string,
  //   carProps: Car,
  //   callback: Function
  // ) {
  //   const TO_RADIANS = Math.PI / 180;
  //   const CAR_SIZE = 64;
  //
  //   context.clearRect(0, 0, con.width, canvas.height);
  //
  //   context.translate(carProps.x, carProps.y);
  //
  //   context.rotate(carProps.angle * TO_RADIANS);
  //
  //   const car = new Image();
  //   car.src = asset;
  //
  //   car.onload = () => {
  //     context.drawImage(
  //       car,
  //       -car.width / 2,
  //       -car.height / 2,
  //       CAR_SIZE,
  //       (CAR_SIZE * car.height) / car.width
  //     );
  //
  //     context.restore();
  //
  //     callback();
  //   };
  // }
}
