import React from "react";
import { connect } from "react-redux";
import LandingPage from "./pages/landing-page";
import GamePage from "./pages/game-page";
import OptionsPage from "./pages/options-page";

function AppDummy({
  isGameStarted,
  areOptionsVisible,
}: {
  isGameStarted: boolean;
  areOptionsVisible: boolean;
}): JSX.Element {
  return (
    <div>
      {!isGameStarted && <LandingPage />}
      {isGameStarted && <GamePage />}
      {areOptionsVisible && <OptionsPage />}
    </div>
  );
}

const mapStateToProps = (state: {
  isGameStarted: boolean;
  areOptionsVisible: boolean;
}) => ({
  isGameStarted: state.isGameStarted,
  areOptionsVisible: state.areOptionsVisible,
});

const App = connect(mapStateToProps)(AppDummy);

export default App;
