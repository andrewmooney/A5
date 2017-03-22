const webpack = require('webpack'),
    path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public/client/src'),
    APP_DIR = path.resolve(__dirname, 'views/client/app');

const config = {
    entry: `${APP_DIR}/index.jsx`,
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: APP_DIR,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    }
};

module.exports = config;