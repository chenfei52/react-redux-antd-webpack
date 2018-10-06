/**
 * Created by feichen on 2018/10/5.
 */
const webpack = require('webpack');
const path = require('path');
const paths = require('./paths');

const HtmlwebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //抽离CSS,css单独打包

var plugins = [
    // new BundleAnalyzerPlugin(),
    new ExtractTextPlugin('style[chunkhash:6].css'),
    new HtmlwebpackPlugin({
        template: './src/index.html',
        inject: 'body',
        filename:'index.html'
    }),
    new CleanWebpackPlugin(
        ['dist'],
        {
            // "root": path.join(__dirname, '..'),     // 一个根的绝对路径. 不配置这个不能删除上级目录的文件
            "verbose": true,    // 将log写到 console.
            "dry": false,   // 不要删除任何东西，主要用于测试.
            "exclude": ["manifest.json","vendors.js"] //排除不删除的目录
        }
    ),
    new CopyWebpackPlugin(
        [
            {
                from:'./src/public/',
                to:'public/' //存放静态资源
            }
        ],
        {
            context:'', //公共路径
            ignore:[],
            // copyUnmodified: true, //只复制修改过的
            debug:'debug'
        }
    ),
    new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require( path.join('./../' + paths.vendorPath, 'manifest.json') )
    }),
];
module.exports = plugins;