import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { Provider } from 'react-redux';
import createStore from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/normalize.css';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);

serviceWorker.unregister();
