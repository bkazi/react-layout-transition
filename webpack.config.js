const path = require('path');

const config = {
    entry: path.resolve(__dirname, './index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'react-layout-transition.js',
        library: 'ReactTransitionLayout',
        libraryTarget: 'umd',
    },
    externals: [
        'react',
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules'),
            },
        ],
    },
};

module.exports = config;
