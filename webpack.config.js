const path = require('path');
const webpack = require('webpack');
const BabiliPlugin = require('babili-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'react-layout-transition.js',
        library: 'ReactLayoutTransition',
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
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new BabiliPlugin({}, {
            removeComments: true,
        }),
    ],
};
