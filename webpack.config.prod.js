const path = require('path');
const webpack = require('webpack');
const BabiliPlugin = require('babili-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestPlugin = require('inline-manifest-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PrepackPlugin = require('prepack-webpack-plugin').default;

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
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env', {
                                targets: {
                                    browsers: ['last 3 versions', 'not ie < 11'],
                                },
                                modules: false,
                                useBuiltIns: true,
                            }],
                            'react',
                        ],
                        plugins: [
                            'transform-class-properties',
                            'transform-object-rest-spread',
                        ],
                    },
                },
                exclude: path.resolve(__dirname, 'node_modules'),
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
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new PrepackPlugin({
            prepack: {
                compatibility: 'browser',
            },
        }),
        new BabiliPlugin({}, {
            comments: false,
        }),
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
