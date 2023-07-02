import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';

import App from './App';
import DevTools from './DevTools';

const isDevToolsEnabled = import.meta.env.VITE_DEV_TOOLS === 'true';

ReactDOM.render(
  <Provider store={store}>
    <App />
    {isDevToolsEnabled && <DevTools />}
  </Provider>,
  document.getElementById('root')
);
