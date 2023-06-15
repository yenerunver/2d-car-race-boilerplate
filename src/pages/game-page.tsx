import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  canvasLoaded,
  carAdded,
  carMoved,
  gameReset,
  keyPressed,
  keyReleased,
  optionsOpened,
  trackLoaded,
} from '../actions';
import { GamePage as GamePageType } from '../@types/GamePage';
import { Car } from '../models/Car';
import { Track } from '../models/Track';
import trackData from '../assets/tracks/sample/track.json';
import { Canvas } from '../models/Canvas';
import { CanvasObject } from '../models/CanvasObject';
import { CanvasObjectPosition } from '../models/CanvasObjectPosition';

const TRACK_ASSET = new URL(`/src/${trackData.background}`, import.meta.url).href;
const CAR_ASSET = new URL(`/src/${trackData.car}`, import.meta.url).href;

function GamePageDummy({
  canvas,
  track,
  cars,
  keysPressed,
  resetGameOnClick,
  optionsOnClick,
  onCanvasLoad,
  onTrackLoad,
  onCarLoad,
  onCarMove,
  onKeyDown,
  onKeyUp,
}: GamePageType) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current!;

    if (!canvasElement) return;

    if (canvas) return;

    onCanvasLoad(
      new Canvas({
        canvas: canvasElement,
        width: trackData.size.width,
        height: trackData.size.height,
      })
    );
  }, [canvas, onCanvasLoad]);

  useEffect(() => {
    if (!canvas) return;

    const initializeTrack = async () => {
      const trackObject = await CanvasObject.createFromAssetURL(TRACK_ASSET);
      const trackToLoad = new Track({
        object: trackObject,
      });

      trackToLoad.draw(canvas, onTrackLoad);
    };

    if (track) return;

    initializeTrack();
  }, [canvas, onTrackLoad, track]);

  useEffect(() => {
    if (!canvas) return;

    const initializeCar = async () => {
      const carObject = await CanvasObject.createFromAssetURL(CAR_ASSET, 64);
      const carPosition = new CanvasObjectPosition({
        ...trackData.startingPoint,
      });
      const car = new Car({
        object: carObject,
        position: carPosition,
      });

      car.draw(canvas, onCarLoad);
    };

    if (!track || cars.length > 0) return;

    initializeCar();
  }, [onCarLoad, canvas, cars, onTrackLoad, track]);

  document.onkeydown = event => onKeyDown(event.code);
  document.onkeyup = event => onKeyUp(event.code);
  console.log('keysPressed', keysPressed);

  useEffect(() => {
    if (cars.length === 0) return;

    const car = cars[0];

    if (!car.isMoving()) {
      car.speed = 0;
    } else {
      car.speed *= car.speedDecay;
    }

    if (keysPressed.length > 0) {
      keysPressed.forEach(keyCode => {
        switch (keyCode) {
          case 'ArrowUp':
            car.accelerate();
            break;
          case 'ArrowDown':
            car.decelerate();
            break;
          case 'ArrowLeft':
            car.steerLeft();
            break;
          case 'ArrowRight':
            car.steerRight();
            break;
          default:
            break;
        }
      });
    }

    car.moveCar(onCarMove);
  }, [cars, keysPressed, onCarMove]);

  useEffect(() => {
    if (cars.length === 0) return;

    canvas.clear();

    track.draw(canvas, () => {});

    const car = cars[0];
    car.draw(canvas, () => {});
  }, [canvas, cars, track]);

  return (
    <section className="pt-24 md:mt-0 md:h-screen flex flex-col justify-center text-center md:text-left md:flex-row md:justify-between md:items-center lg:px-48 md:px-12 px-4 bg-secondary">
      <div className="relative">
        <div className="font-montserrat">
          <button
            type="button"
            className="bg-black px-6 py-4 rounded-lg border-2 border-black border-solid text-white mr-2 mb-2"
            onClick={() => resetGameOnClick()}
          >
            Reset Game
          </button>
          <button
            type="button"
            className="px-6 py-4 border-2 border-black border-solid rounded-lg"
            onClick={() => optionsOnClick()}
          >
            Options
          </button>
        </div>
        <canvas ref={canvasRef} />
      </div>
    </section>
  );
}

const mapStateToProps = (state: {
  canvas: Canvas;
  track: Track;
  cars: [Car];
  keysPressed: [string];
}) => ({
  canvas: state.canvas,
  track: state.track,
  cars: state.cars,
  keysPressed: state.keysPressed,
});

const mapDispatchToProps = {
  resetGameOnClick: gameReset,
  optionsOnClick: optionsOpened,
  onCanvasLoad: canvasLoaded,
  onTrackLoad: trackLoaded,
  onCarLoad: carAdded,
  onCarMove: carMoved,
  onKeyDown: keyPressed,
  onKeyUp: keyReleased,
};

const GamePage = connect(mapStateToProps, mapDispatchToProps)(GamePageDummy);

export default GamePage;
