import React from "react";
import { connect } from "react-redux";
import { gameReset } from "../actions";

function GamePageDummy() {
  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-wrap">
        Game Map here
        <button type="button" onClick={gameReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  gameReset,
};

const GamePage = connect(null, mapDispatchToProps)(GamePageDummy);

export default GamePage;
