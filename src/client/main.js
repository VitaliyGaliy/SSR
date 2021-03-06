/* global window, document */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';

import App from './pages/App';
import createStore from '../common/redux/store';

const initialState = window.__INITIAL_STATE__; // eslint-disable-line no-underscore-dangle
const store = createStore(initialState);
const history = createBrowserHistory();



import { AppContainer } from 'react-hot-loader';

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
    document.getElementById('app'),
    () => {
      delete window.__INITIAL_STATE__; // eslint-disable-line no-underscore-dangle
    },
  );
};

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept('./pages/App', () => renderApp());
}

renderApp();
