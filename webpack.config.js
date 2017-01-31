var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080/',
        APP_DIR + '/client.js'
    ],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loader : "babel-loader",
                query: {
                    plugins: [
                        'transform-react-jsx',
                        [
                            'react-css-modules',
                            {
                                APP_DIR
                            }
                        ]
                    ]
                }
            },
            {
                test : /\.css$/,
                include : APP_DIR,
                loaders : [
                    'style-loader',
                    'css-loader?importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
                ]
            }
        ]
    }
};

module.exports = config;