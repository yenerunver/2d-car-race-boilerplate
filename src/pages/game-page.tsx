import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { carAdded, gameReset, optionsOpened } from "../actions";
import { ICar } from "../@types/ICar";
import { Car } from "../models/Car";
import { Background } from "../models/Background";

interface IGamePage {
  resetGameOnClick: Function;
  optionsOnClick: Function;
  addCarOnLoad: Function;
}

function GamePageDummy({
  resetGameOnClick,
  optionsOnClick,
  addCarOnLoad,
}: IGamePage) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    canvas.width = 1300;
    canvas.height = 520;

    Background.drawBackground(ctx, "../../assets/tracks/sample/sample.png");

    Car.drawCar(
      ctx,
      "../../assets/tracks/sample/car.svg",
      { x: 50, y: 50, speed: 0, angle: 0 },
      addCarOnLoad
    );
  }, [addCarOnLoad]);

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
const mapStateToProps = (state: { cars: [ICar] }) => ({
  cars: state.cars,
});

const mapDispatchToProps = {
  resetGameOnClick: gameReset,
  optionsOnClick: optionsOpened,
  addCarOnLoad: carAdded,
};

const GamePage = connect(mapStateToProps, mapDispatchToProps)(GamePageDummy);

export default GamePage;
