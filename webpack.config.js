const Path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var BUILD_DIR = Path.resolve(__dirname, 'src/main/webapp');
var APP_DIR = Path.resolve(__dirname, 'src');
var GLOBAL_STYLES_DIR = Path.resolve(APP_DIR, 'styles');
var cssModulesScopedName = '[name]_[local]_[hash:base64:5]';

var config = {
    entry: [
        'whatwg-fetch',
        APP_DIR + '/client.js'
    ],
    output: {
        path: BUILD_DIR,
        filename: 'scripts/eligibility/bundle.js'
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
                        ['react-css-modules', { generateScopedName: cssModulesScopedName }]
                    ]
                }
            },
            {
                test: /\.s?css$/,
                include: APP_DIR,
                exclude: GLOBAL_STYLES_DIR,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?modules&importLoaders=1&localIdentName=' + cssModulesScopedName + '!sass-loader'
                })
            },
            {
                test: /\.s?css$/,
                include: GLOBAL_STYLES_DIR,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles/eligibility/bundle.css")
    ]
};

module.exports = config;
