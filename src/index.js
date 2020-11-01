/*
    * path : src/index.js
    * description : applicatoin entry point
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// root reducer
import rootReducer from './reducers/index';
// react redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// create redux store
const store = createStore(rootReducer);

// use a special React Redux component called <Provider> to magically make the store available 
// to all container components in the application without passing it explicitly
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
