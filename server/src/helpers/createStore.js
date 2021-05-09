import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from './../client/reducers';

// Provider is not required at Server Side.


/***
 * Why we are creating this funtion?
 * 
 */
export default (req) => {

    const axiosInstance = axios.create({
        baseURL: 'http://react-ssr-api.herokuapp.com',
        headers: {
            cookie: req.get('cookie') || ''
        }
    });

    const store = createStore(reducers, {}, applyMiddleware(thunk.withExtraArgument(axiosInstance)));

    return store;
}