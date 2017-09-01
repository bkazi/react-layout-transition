const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require("babel-minify-webpack-plugin");

const isProd = process.env.NODE_ENV === 'PRODUCTION';

const outputFilename = isProd ? 'interpolators.min.js' : 'interpolators.js';

module.exports = {
    devtool: !isProd ? 'source-map' : '',
    entry: path.resolve(__dirname, 'src/interpolators/index.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: outputFilename,
        library: 'Interpolators',
        libraryTarget: 'umd',
    },
    externals: {
        'react': {
            commonjs: 'react',
            commonjs2: 'react',
            root: 'React',
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx|ts?$/,
                loader: 'awesome-typescript-loader',
                exclude: path.resolve(__dirname, 'node_modules'),
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    plugins: isProd ? [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new MinifyPlugin({}, {
            removeComments: true,
        }),
    ] : [],
};
