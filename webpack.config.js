const path = require('path');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: path.resolve(__dirname, 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader',
            },
        ],
    },
};
