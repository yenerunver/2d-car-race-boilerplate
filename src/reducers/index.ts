import { GAME_RESET, GAME_STARTED } from "../actions";

const initialState = {
  isGameStarted: false,
};

const reducer = (state: any, action: { type: string }) => {
  switch (action.type) {
    case GAME_RESET:
      return initialState;

    case GAME_STARTED:
      return { ...state, isGameStarted: true };

    default:
      return state;
  }
};
export default reducer;
