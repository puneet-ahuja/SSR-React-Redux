// Import using CommonJS Module Pattern.
// const express = require('express');
// const React = require('react');
// const renderToString = require('react-dom/server').renderToString;
// const Home = require('./client/components/Home').default;


// ES6 Modules pattern.

/**
 * To support async await syntax.
 */
import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';


const app = express();

/***
 * Requesting the API Server for app the API Requests.
 * Using Proxy.
 */
app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts){
        opts.headers['x-forwarded-host'] = 'localhost:3000';
        return opts;
    }
}));

app.use(express.static('public'));

// We are using * as we want to haldle all the routes with React Router.
app.get('*', (req,res) => {

    /***
     * Why are we creating store in index.js file?
     * 
     * We will be needing the cookies from req.
     * That is why we are pasing cookies from here.
     */
    const store= createStore(req);

    /***
     * Some logic to initilize and load
     * data to the store.
     */

    /***
     * This will find all the paths matching from config.
     * We are wrapping all the promises with a different set of promises. So that it will never fail\.
     * We want to wait till all the requestes are not resolved.
     */
    const promises = matchRoutes(Routes, req.path).map(({route}) => {
        if( route.loadData ){
            /***
             * Passing store to it so that the function
             * has access to SSR Redux.
             */
            return route.loadData(store);
        }
        return null;
    }).map((promise)=>{
        if(promise){
            new Promise( (resolve,reject) => {
                promise.then(resolve).catch(resolve)
            })
        }
    });

    Promise.all(promises).then(() => {
        const context = {};
        const content = renderer(req, store, context)
        if(context.url){
            return res.redirect(301, context.url);
        }

        if(context.notFound){
            res.status(404);
        }
        res.send(content);
    });
    /***
     * Not a good approach to handle errors in SSR
     */
    // .catch(()=>{
    //     res.send('Something went wrong.');
    // });
});

app.listen(3000, () => {
    console.log('Listening on Port 3000!!')

});