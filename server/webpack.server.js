const path = require('path');
const merge = require('webpack-merge');
const baseConnfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {

    // Inform webpack that we are building a bundle for node JS,
    // Rather than a browser
    target: 'node',

    // Tell the webpack the root file of our server application
    entry: './src/index.js',

    // Tell where to put the output file that is generated
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build' )
    },

    // This is help reducing bundle size for server.
    externals: [webpackNodeExternals()]
};

module.exports = merge(baseConnfig, config);