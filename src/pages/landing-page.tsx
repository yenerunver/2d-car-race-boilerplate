import React from "react";
import { connect } from "react-redux";
import { gameStarted } from "../actions";

function LandingPageDummy(): JSX.Element {
  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-wrap">
        <div className="w-full px-5 md:w-7/12">Game Video here</div>
        <div className="w-full px-5 md:w-5/12">
          Game instructions here
          <button type="button" onClick={gameStarted}>
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  gameStarted,
};

const LandingPage = connect(null, mapDispatchToProps)(LandingPageDummy);

export default LandingPage;
