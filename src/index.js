import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import AllReducers from "./redux/reducers";
import { createStore } from "redux";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import * as serviceWorker from './serviceWorker';
const store = createStore(
  AllReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


ReactDOM.render(
  <Provider store={store}>
    <Router>
    <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
)

serviceWorker.register();

 
