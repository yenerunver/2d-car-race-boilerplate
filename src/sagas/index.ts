import { takeLatest, all, call } from 'redux-saga/effects';
import { GAME_STARTED } from '../actions';

function* gameStartedHandler() {
  // eslint-disable-next-line no-console
  yield call(console.log, 'game started...');
}

function* actionWatcher() {
  yield takeLatest(GAME_STARTED, gameStartedHandler);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
