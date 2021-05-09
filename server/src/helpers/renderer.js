import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes} from 'react-router-config'
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import Routes from '../client/Routes';

export default (req, store, context) => {
    const content = renderToString(
        <Provider store={store}>
            {/* 
            Static Router is used for routing at server. 
             1. We have to explicitily pass location in this.
             2. Context is passed to all the rendered Components.
            */}
            <StaticRouter location={req.path} context={context}>
                <div>{renderRoutes(Routes)}</div>
            </StaticRouter>
        </Provider>
    );

    const helmet = Helmet.renderStatic();

    // Adding client bundle to our application.
    // Adding initial State to window.
    return `
        <html>
            <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
                <!-- Compiled and minified JavaScript -->
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
            </head>
            <body>
                <div id="root">${content}</div>
                <script>
                    window.INITIAL_STATE = ${serialize(store.getState())}
                </script>
                <script src="bundle.js"></script>
            </body>
        </html>
    `;
};