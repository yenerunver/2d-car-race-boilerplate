import React, { useEffect, useRef, useState } from 'react';
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

const FPS = Number(import.meta.env.VITE_FPS);

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

  // Load canvas
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

  // Load track
  useEffect(() => {
    if (!canvas) return;

    const initializeTrack = async () => {
      const trackObject = await CanvasObject.createFromAssetURL(TRACK_ASSET);
      const trackToLoad = new Track({
        object: trackObject,
        roadPolygon: trackData.roadPolygon,
      });

      trackToLoad.draw(canvas, onTrackLoad);
    };

    if (track) return;

    initializeTrack();
  }, [canvas, onTrackLoad, track]);

  // Load car
  useEffect(() => {
    if (!canvas) return;

    const initializeCar = async () => {
      const carObject = await CanvasObject.createFromAssetURL(CAR_ASSET, 28);
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
  }, [onCarLoad, canvas, cars.length, onTrackLoad, track]);

  document.onkeydown = event => {
    event.preventDefault();
    onKeyDown(event.code);
  };
  document.onkeyup = event => {
    event.preventDefault();
    onKeyUp(event.code);
  };

  // Car position updates
  useEffect(() => {
    if (cars.length === 0) return;

    const car = cars[0];

    if (keysPressed.length > 0) {
      keysPressed.forEach(keyCode => {
        switch (keyCode) {
          case 'ArrowUp':
            car.accelerate(FPS);
            break;
          case 'ArrowDown':
            car.decelerate(FPS);
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

    car.moveCar(canvas, track, onCarMove);
  }, [canvas, cars, keysPressed, onCarMove, track]);

  const [timerStarted, setTimerStarted] = useState(false);
  // eslint-disable-next-line no-undef
  const [timerLoop, setTimerLoop] = useState(0);

  if (!timerStarted && cars.length > 0) {
    setTimerStarted(true);

    const loop = window.setInterval(() => {
      reDraw();
    }, 1000 / FPS);
    setTimerLoop(loop);
  }

  // Frame updates
  const reDraw = () => {
    if (cars.length === 0) return;

    canvas.clear();

    track.draw(canvas, () => {});
    const car = cars[0];
    car.draw(canvas, () => {});
  };

  return (
    <section className="pt-24 md:mt-0 md:h-screen flex flex-col justify-center text-center md:text-left md:flex-row md:justify-between md:items-center lg:px-48 md:px-12 px-4 bg-secondary">
      <div className="relative">
        <div className="font-montserrat">
          <button
            type="button"
            className="bg-black px-6 py-4 rounded-lg border-2 border-black border-solid text-white mr-2 mb-2"
            onClick={() => {
              window.clearInterval(timerLoop);
              resetGameOnClick();
            }}
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
        <div className="mt-6 mb-6 overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="">
              <tr className="text-sm font-semibold text-center border-b-2 border-blue-500 uppercase">
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Key</th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal text-gray-700 text-center">
              <tr className="py-10 bg-gray-100 hover:bg-gray-200 font-medium">
                <td className="px-4 py-4">Accelerate</td>
                <td className="px-4 py-4">
                  <kbd className="inline-flex items-center mr-1 px-2 py-1.5 text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                    <svg
                      className="w-2.5 h-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 10"
                    >
                      <path d="M9.207 1A2 2 0 0 0 6.38 1L.793 6.586A2 2 0 0 0 2.207 10H13.38a2 2 0 0 0 1.414-3.414L9.207 1Z" />
                    </svg>
                    <span className="sr-only">Arrow key up</span>
                  </kbd>
                </td>
              </tr>
              <tr className="py-10 bg-gray-100 hover:bg-gray-200 font-medium">
                <td className="px-4 py-4">Reverse</td>
                <td className="px-4 py-4">
                  <kbd className="inline-flex items-center px-2 py-1.5 text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                    <svg
                      className="w-2.5 h-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 10"
                    >
                      <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
                    </svg>
                    <span className="sr-only">Arrow key down</span>
                  </kbd>
                </td>
              </tr>
              <tr className="py-10 bg-gray-100 hover:bg-gray-200 font-medium">
                <td className="px-4 py-4">Steer Left</td>
                <td className="px-4 py-4">
                  <kbd className="inline-flex items-center mr-1 px-2 py-1.5 text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                    <svg
                      className="w-2.5 h-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 10 16"
                    >
                      <path d="M8.766.566A2 2 0 0 0 6.586 1L1 6.586a2 2 0 0 0 0 2.828L6.586 15A2 2 0 0 0 10 13.586V2.414A2 2 0 0 0 8.766.566Z" />
                    </svg>
                    <span className="sr-only">Arrow key left</span>
                  </kbd>
                </td>
              </tr>
              <tr className="py-10 bg-gray-100 hover:bg-gray-200 font-medium">
                <td className="px-4 py-4">Steer Right</td>
                <td className="px-4 py-4">
                  <kbd className="inline-flex items-center px-2 py-1.5 text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                    <svg
                      className="w-2.5 h-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 10 16"
                    >
                      <path d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z" />
                    </svg>
                    <span className="sr-only">Arrow key right</span>
                  </kbd>
                </td>
              </tr>
            </tbody>
          </table>
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
