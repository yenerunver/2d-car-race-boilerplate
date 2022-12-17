import React from "react";
import { connect } from "react-redux";
import { gameReset, optionsOpened } from "../actions";

interface IGamePage {
  resetGameOnClick: Function;
  optionsOnClick: Function;
}

function GamePageDummy({ resetGameOnClick, optionsOnClick }: IGamePage) {
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
        <canvas>
          <object>Car</object>
        </canvas>
      </div>
    </section>
  );
}

const mapDispatchToProps = {
  resetGameOnClick: gameReset,
  optionsOnClick: optionsOpened,
};

const GamePage = connect(null, mapDispatchToProps)(GamePageDummy);

export default GamePage;
