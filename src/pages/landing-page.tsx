import React from 'react';
import { connect } from 'react-redux';
import { gameStarted, optionsOpened } from '../actions';
import { LandingPage as LandingPageType } from '../@types/LandingPage';

function LandingPageDummy({ startGameOnClick, optionsOnClick }: LandingPageType) {
  return (
    <section className="pt-24 md:mt-0 md:h-screen flex flex-col justify-center text-center md:text-left md:flex-row md:justify-between md:items-center lg:px-48 md:px-12 px-4 bg-secondary">
      <div className="md:flex-1 md:mr-10">
        <h1 className="font-pt-serif text-5xl font-bold mb-7">Your Cool Game</h1>
        <p className="font-pt-serif font-normal mb-7">
          This is a 2D Top View car racing game built on
        </p>
        <ul className="list-disc">
          <li>ViteJS</li>
          <li>ReactJS</li>
          <li>TailwindCSS</li>
        </ul>
        <br />
        <div className="font-montserrat">
          <button
            type="button"
            className="bg-black px-6 py-4 rounded-lg border-2 border-black border-solid text-white mr-2 mb-2"
            onClick={() => startGameOnClick()}
          >
            Start Game
          </button>
          <button
            type="button"
            className="px-6 py-4 border-2 border-black border-solid rounded-lg"
            onClick={() => optionsOnClick()}
          >
            Options
          </button>
        </div>
      </div>
      <div className="flex justify-around md:block mt-8 md:mt-0 md:flex-1">
        <div className="relative">
          <video controls className="w-screen">
            <source src="" type="video/mp4" />
            <track src="" kind="captions" srcLang="en" />
          </video>
        </div>
      </div>
    </section>
  );
}

const mapDispatchToProps = {
  startGameOnClick: gameStarted,
  optionsOnClick: optionsOpened,
};

const LandingPage = connect(null, mapDispatchToProps)(LandingPageDummy);

export default LandingPage;
