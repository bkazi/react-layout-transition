const path = require('path');
const webpack = require('webpack');
const BabiliPlugin = require('babili-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestPlugin = require('inline-manifest-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        vendor: ['react', 'react-dom'],
        main: path.resolve(__dirname, 'index.prod.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js',
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader',
                include: [
                    path.resolve(__dirname, 'node_modules/react-layout-transition'),
                    path.resolve(__dirname, './src'),
                    path.resolve(__dirname, 'index.prod.js'),
                ],
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                        },
                    },
                }),
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new BabiliPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest'],
            minChunks: Infinity,
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin('[name].[contenthash].css'),
        new InlineManifestPlugin({
            name: 'webpackManifest',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
        }),
    ],
};
