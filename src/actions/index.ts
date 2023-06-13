import { Track as TrackType } from '../@types/Track';
import { Car as CarType } from '../@types/Car';

export const GAME_RESET = 'GAME_RESET';
export const GAME_STARTED = 'GAME_STARTED';

export const OPTIONS_OPENED = 'OPTIONS_OPENED';
export const OPTIONS_CLOSED = 'OPTIONS_CLOSED';

export const TRACK_LOADED = 'TRACK_LOADED';
export const CAR_ADDED = 'CAR_ADDED';

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

export const trackLoaded = (track: TrackType) => ({
  type: TRACK_LOADED,
  payload: track,
});

export const carAdded = (car: CarType) => ({
  type: CAR_ADDED,
  payload: car,
});
