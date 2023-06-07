import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer, { initialState } from './reducers';
import rootSaga from './sagas';
import DevTools from './DevTools';

const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(sagaMiddleware, logger),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument()
);

const store = createStore(rootReducer, initialState, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
