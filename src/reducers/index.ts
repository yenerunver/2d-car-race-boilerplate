import {
  CAR_ADDED,
  CAR_MOVED,
  GAME_RESET,
  GAME_STARTED,
  OPTIONS_CLOSED,
  OPTIONS_OPENED,
  OPTIONS_SAVED,
  CANVAS_LOADED,
  TRACK_LOADED,
  KEY_PRESSED,
  KEY_RELEASED,
} from '../actions';
import { Car } from '../models/Car';

export const initialState = {
  isGameStarted: false,
  areOptionsVisible: false,
  cars: [],
  keysPressed: [],
};

const reducer = (state: any, action: { type: string; payload: any }) => {
  switch (action.type) {
    case GAME_RESET:
      return initialState;

    case GAME_STARTED:
      return { ...state, isGameStarted: true };

    case OPTIONS_OPENED:
      return { ...state, areOptionsVisible: true };

    case OPTIONS_CLOSED:
    case OPTIONS_SAVED:
      return { ...state, areOptionsVisible: false };

    case CANVAS_LOADED:
      return { ...state, canvas: action.payload };

    case TRACK_LOADED:
      return { ...state, track: action.payload };

    case CAR_ADDED:
      return { ...state, cars: [action.payload, ...state.cars] };

    case CAR_MOVED:
      if (
        state.cars.length === 0 ||
        !state.cars.map((car: Car) => car.id).includes(action.payload.id)
      ) {
        return state;
      }

      return {
        ...state,
        cars: [action.payload, ...state.cars.filter((car: Car) => car.id !== action.payload.id)],
      };

    case KEY_PRESSED:
      if (state.keysPressed.includes(action.payload)) {
        return state;
      }

      return {
        ...state,
        keysPressed: [...state.keysPressed, action.payload],
      };

    case KEY_RELEASED:
      if (!state.keysPressed.includes(action.payload)) {
        return state;
      }

      return {
        ...state,
        keysPressed: state.keysPressed.filter((code: string) => code !== action.payload),
      };

    default:
      return state;
  }
};
export default reducer;
