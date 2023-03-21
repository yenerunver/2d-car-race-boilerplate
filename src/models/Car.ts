import { ICar } from "../@types/ICar";

export class Car {
  x;

  y;

  speed;

  angle;

  maxSpeed = 4;

  speedDecay = 0.98;

  acceleration = 1.1;

  backSpeed = 1.1;

  angleStep = 4;

  constructor(props: ICar) {
    this.x = props.x;
    this.y = props.y;
    this.speed = props.speed;
    this.angle = props.angle;
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

  decelerate(amount: number) {
    const min = amount || 0;
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
      this.angle -= this.angleStep * (this.speed / this.maxSpeed);
    }
  }

  steerRight() {
    if (this.isMoving()) {
      this.angle += this.angleStep * (this.speed / this.maxSpeed);
    }
  }

  static drawCar(
    context: CanvasRenderingContext2D,
    asset: string,
    carProps: ICar,
    callback: Function
  ) {
    const TO_RADIANS = Math.PI / 180;
    const CAR_SIZE = 64;

    context.save();

    context.translate(carProps.x, carProps.y);

    context.rotate(carProps.angle * TO_RADIANS);

    const car = new Image();
    car.src = asset;

    car.onload = () => {
      context.drawImage(
        car,
        -car.width / 2,
        -car.height / 2,
        CAR_SIZE,
        (CAR_SIZE * car.height) / car.width
      );

      context.restore();

      callback();
    };
  }
}
