export const GAME_RESET = "GAME_RESET";
export const GAME_STARTED = "GAME_STARTED";

export const gameReset = () => ({
  type: GAME_RESET,
});

export const gameStarted = () => ({
  type: GAME_STARTED,
});
