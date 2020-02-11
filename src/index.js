import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


if (typeof Array.from === 'undefined' || typeof Object.assign === 'undefined') { import(/* webpackChunkName: "core-js" */ 'core-js').then(res => console.log(res)) }
if (typeof window.Promise === 'undefined') { import(/* webpackChunkName: "es6-promise" */ 'es6-promise').then(res => console.log(res)) }

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
