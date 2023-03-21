import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { carAdded, gameReset, optionsOpened, trackLoaded } from "../actions";
import { ICar } from "../@types/ICar";
import { Car } from "../models/Car";
import { Background } from "../models/Background";
import track from "../../public/assets/tracks/sample/track.json";

interface IGamePage {
  isTrackLoaded: boolean;
  resetGameOnClick: Function;
  optionsOnClick: Function;
  onTrackLoad: Function;
  addCarOnLoad: Function;
}

function GamePageDummy({
  isTrackLoaded,
  resetGameOnClick,
  optionsOnClick,
  onTrackLoad,
  addCarOnLoad,
}: IGamePage) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    canvas.width = track.size.width;
    canvas.height = track.size.height;

    Background.drawBackground(
      ctx,
      `${import.meta.env.BASE_URL || "/"}${track.background}`,
      onTrackLoad
    );
  }, [onTrackLoad]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    if (isTrackLoaded) {
      const carProps = { speed: 0, ...track.startingPoint };
      Car.drawCar(
        ctx,
        `${import.meta.env.BASE_URL || "/"}${track.car}`,
        carProps,
        addCarOnLoad(carProps)
      );
    }
  }, [isTrackLoaded, addCarOnLoad]);

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
const mapStateToProps = (state: { isTrackLoaded: boolean; cars: [ICar] }) => ({
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
