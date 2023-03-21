import { ICar } from "../@types/ICar";

export const GAME_RESET = "GAME_RESET";
export const GAME_STARTED = "GAME_STARTED";

export const OPTIONS_OPENED = "OPTIONS_OPENED";
export const OPTIONS_CLOSED = "OPTIONS_CLOSED";

export const TRACK_LOADED = "TRACK_LOADED";
export const CAR_ADDED = "CAR_ADDED";

export const gameReset = () => ({
  type: GAME_RESET,
});

export const gameStarted = () => ({
  type: GAME_STARTED,
});

export const optionsOpened = () => ({
  type: OPTIONS_OPENED,
});

export const optionsClosed = () => ({
  type: OPTIONS_CLOSED,
});

export const trackLoaded = () => ({
  type: TRACK_LOADED,
});

export const carAdded = (car: ICar) => ({
  type: CAR_ADDED,
  payload: car,
});
