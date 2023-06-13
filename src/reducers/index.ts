import {
  CAR_ADDED,
  GAME_RESET,
  GAME_STARTED,
  OPTIONS_CLOSED,
  OPTIONS_OPENED,
  TRACK_LOADED,
} from '../actions';

export const initialState = {
  isGameStarted: false,
  areOptionsVisible: false,
};

const reducer = (state: any, action: { type: string; payload: any }) => {
  switch (action.type) {
    case GAME_RESET:
      return initialState;

    case GAME_STARTED:
      return { ...state, isGameStarted: true, isTrackLoaded: false, cars: [] };

    case OPTIONS_OPENED:
      return { ...state, areOptionsVisible: true };

    case OPTIONS_CLOSED:
      return { ...state, areOptionsVisible: false };

    case TRACK_LOADED:
      return { ...state, isTrackLoaded: true, track: action.payload };

    case CAR_ADDED:
      return { ...state, cars: [action.payload, ...state.cars] };

    default:
      return state;
  }
};
export default reducer;
