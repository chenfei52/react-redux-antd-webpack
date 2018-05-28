/**
 * Created by chenfei on 2018/2/6.
 */

const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        vendors: [
            'react-redux',
            'react-router',
            'react-router-dom',
            'redux'
        ]
    },

    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
        library: '[name]'
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname + '/dist', 'manifest.json'),    //本文件用于生成该文件
            name: '[name]'
        }),
    ],
};