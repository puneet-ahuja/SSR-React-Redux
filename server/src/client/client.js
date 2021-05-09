// Startup point for client Side Aplication.

/**
 * To support async await syntax.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';
import Routes from './Routes'
import reducers from './reducers';

/***
 * This will proxy all the requests like
 * axiosInstance.get('/users') -> '/api/users.'
 */
const axiosInstace = axios.create({
    baseURL: '/api'
})


const store = createStore(
    reducers,
    window.INITIAL_STATE,
    applyMiddleware(thunk.withExtraArgument(axiosInstace)));

ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <div>{renderRoutes(Routes)}</div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root') 
);