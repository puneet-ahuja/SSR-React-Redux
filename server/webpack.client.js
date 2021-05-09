const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const config = {

    // There is no need of target in client bundle.
    // target: 'node',

    // Tell the webpack the root file of our client application
    entry: './src/client/client.js',

    // Tell where to put the output file that is generated
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public' )
    }
}

module.exports = merge(baseConfig, config);