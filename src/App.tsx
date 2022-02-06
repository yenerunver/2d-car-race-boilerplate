import React from "react";
import { connect } from "react-redux";
import LandingPage from "./pages/landing-page";
import GamePage from "./pages/game-page";

function AppDummy({ isGameStarted }: { isGameStarted: boolean }): JSX.Element {
  return (
    <div>
      {!isGameStarted && <LandingPage />}
      {isGameStarted && <GamePage />}
    </div>
  );
}

const mapStateToProps = (state: { isGameStarted: boolean }) => ({
  isGameStarted: state.isGameStarted,
});

const App = connect(mapStateToProps)(AppDummy);

export default App;
