import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { carAdded, gameReset, optionsOpened, trackLoaded } from "../actions";
import { Car as CarType } from "../@types/Car";
import { Car } from "../models/Car";
import { Track } from "../models/Track";
import trackData from "../../public/assets/tracks/sample/track.json";
import { Canvas } from "../models/Canvas";
import { CanvasObject } from "../models/CanvasObject";
import { CanvasObjectPosition } from "../models/CanvasObjectPosition";

interface IGamePage {
  isTrackLoaded: boolean;
  resetGameOnClick: Function;
  optionsOnClick: Function;
  onTrackLoad: Function;
  addCarOnLoad: Function;
}

const TRACK_ASSET = `${import.meta.env.BASE_URL || "/"}${trackData.background}`;
const CAR_ASSET = `${import.meta.env.BASE_URL || "/"}${trackData.car}`;

function GamePageDummy({
  isTrackLoaded,
  resetGameOnClick,
  optionsOnClick,
  onTrackLoad,
  addCarOnLoad,
}: IGamePage) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current!;

    const canvas = new Canvas({
      canvas: canvasElement,
      width: trackData.size.width,
      height: trackData.size.height,
    });

    const drawGame = async () => {
      const trackObject = await CanvasObject.createFromAssetURL(TRACK_ASSET);
      console.log(trackObject.asset);
      const track = new Track({
        object: trackObject,
      });

      track.draw(canvas, onTrackLoad);

      if (isTrackLoaded) {
        console.log("isTrackLoaded", isTrackLoaded);
        const carObject = await CanvasObject.createFromAssetURL(CAR_ASSET, 64);
        const carPosition = new CanvasObjectPosition({
          ...trackData.startingPoint,
        });
        const car = new Car({
          object: carObject,
          position: carPosition,
        });

        const carLoadCallback = () => addCarOnLoad(car);

        car.draw(canvas, carLoadCallback);
      }
    };

    // noinspection JSIgnoredPromiseFromCall
    drawGame();
  }, [addCarOnLoad, isTrackLoaded, onTrackLoad]);

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
  isTrackLoaded: boolean;
  cars: [CarType];
}) => ({
  isTrackLoaded: state.isTrackLoaded,
  cars: state.cars,
});

const mapDispatchToProps = {
  resetGameOnClick: gameReset,
  optionsOnClick: optionsOpened,
  onTrackLoad: trackLoaded,
  addCarOnLoad: carAdded,
};

const GamePage = connect(mapStateToProps, mapDispatchToProps)(GamePageDummy);

export default GamePage;
