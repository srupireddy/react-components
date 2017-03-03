const Path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var BUILD_DIR = Path.resolve(__dirname, 'src/main/webapp/scripts/eligibility/');
var APP_DIR = Path.resolve(__dirname, 'src');
var STYLE_DIR = Path.resolve(APP_DIR, 'styles');

var config = {
    entry: [
        APP_DIR + '/client.js'
    ],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: "babel-loader",
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
                test: /\.s?css$/,
                include: APP_DIR,
                exclude: STYLE_DIR,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]!sass-loader'
                })
            },
            {
                test: /\.s?css$/,
                include: STYLE_DIR,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("../../styles/eligibility/bundle.css")
    ]
};

module.exports = config;
