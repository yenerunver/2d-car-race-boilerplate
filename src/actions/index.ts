import { Canvas as CanvasType } from '../@types/Canvas';
import { Track as TrackType } from '../@types/Track';
import { Car as CarType } from '../@types/Car';

export const GAME_RESET = 'GAME_RESET';
export const GAME_STARTED = 'GAME_STARTED';

export const OPTIONS_OPENED = 'OPTIONS_OPENED';
export const OPTIONS_SAVED = 'OPTIONS_SAVED';
export const OPTIONS_CLOSED = 'OPTIONS_CLOSED';

export const CANVAS_LOADED = 'CANVAS_LOADED';
export const TRACK_LOADED = 'TRACK_LOADED';
export const CAR_ADDED = 'CAR_ADDED';
export const CAR_MOVED = 'CAR_MOVED';
export const KEY_PRESSED = 'KEY_PRESSED';
export const KEY_RELEASED = 'KEY_RELEASED';

export const gameReset = () => ({
  type: GAME_RESET,
});

export const gameStarted = () => ({
  type: GAME_STARTED,
});

export const optionsOpened = () => ({
  type: OPTIONS_OPENED,
});

export const optionsSaved = () => ({
  type: OPTIONS_SAVED,
});

export const optionsClosed = () => ({
  type: OPTIONS_CLOSED,
});

export const canvasLoaded = (canvas: CanvasType) => ({
  type: CANVAS_LOADED,
  payload: canvas,
});

export const trackLoaded = (track: TrackType) => ({
  type: TRACK_LOADED,
  payload: track,
});

export const carAdded = (car: CarType) => ({
  type: CAR_ADDED,
  payload: car,
});

export const carMoved = (car: CarType) => ({
  type: CAR_MOVED,
  payload: car,
});

export const keyPressed = (keyCode: string) => ({
  type: KEY_PRESSED,
  payload: keyCode,
});

export const keyReleased = (keyCode: string) => ({
  type: KEY_RELEASED,
  payload: keyCode,
});
