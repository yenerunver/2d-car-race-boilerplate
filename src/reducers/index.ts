import {
  GAME_RESET,
  GAME_STARTED,
  OPTIONS_CLOSED,
  OPTIONS_OPENED,
  CAR_ADDED,
} from "../actions";
import { Car } from "../models/Car";

export const initialState = {
  isGameStarted: false,
  areOptionsVisible: false,
};

const reducer = (state: any, action: { type: string; payload: any }) => {
  switch (action.type) {
    case GAME_RESET:
      return initialState;

    case GAME_STARTED:
      return { ...state, isGameStarted: true, cars: [] };

    case OPTIONS_OPENED:
      return { ...state, areOptionsVisible: true };

    case OPTIONS_CLOSED:
      return { ...state, areOptionsVisible: false };

    case CAR_ADDED:
      return { ...state, cars: [new Car(action.payload), ...state.cars] };

    default:
      return state;
  }
};
export default reducer;
