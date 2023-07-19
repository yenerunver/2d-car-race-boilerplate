import React from 'react';
import { connect } from 'react-redux';
import { gameStarted, optionsOpened } from '../actions';
import { LandingPage as LandingPageType } from '../@types/LandingPage';

function LandingPageDummy({ startGameOnClick, optionsOnClick }: LandingPageType) {
  return (
    <section className="background-radial-gradient text-white mb-40">
      <div className="px-6 py-12 text-center md:px-12 lg:text-left">
        <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="mt-12 lg:mt-0">
              <h1 className="mt-0 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl text-[hsl(218,81%,95%)]">
                Your new <br />
                <span className="text-[hsl(218,81%,75%)]">cool game</span>
              </h1>
              <p className="font-pt-serif font-normal mb-7">
                This is a 2D Top View car racing game built on
              </p>
              <ul className="mb-4 space-y-2 list-inside list-disc">
                <li>ViteJS</li>
                <li>ReactJS</li>
                <li>TailwindCSS</li>
              </ul>
              <button
                type="button"
                className="mb-2 inline-block rounded bg-neutral-50 px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] md:mr-2 md:mb-0"
                onClick={() => startGameOnClick()}
              >
                Start Game
              </button>
              <button
                type="button"
                className="inline-block rounded px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-200"
                onClick={() => optionsOnClick()}
              >
                Options
              </button>
            </div>
            <div className="mb-12 lg:mb-0">
              <video controls className="w-screen">
                <source src="" type="video/mp4" />
                <track src="" kind="captions" srcLang="en" />
              </video>
            </div>
          </div>
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
