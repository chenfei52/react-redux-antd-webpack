/**
 * Created by feichen on 2018/10/5.
 */
const webpack = require('webpack');
const path = require('path');
const paths = require('./paths');

const HtmlwebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //抽离CSS
const hardSourceWebpackPlugin = require('./hardSourceWebpack');

let plugins = [
    // hardSourceWebpackPlugin, //使用缓存提高构建速度
    new MiniCssExtractPlugin({
        filename: 'css/[name].[hash:6].css',
        chunkFilename: 'css/[name].[hash:6].css',
    }),
    new HtmlwebpackPlugin({
        template: './src/index.html',
        inject: 'body',
        filename: 'index.html'
    }),
    new CleanWebpackPlugin(
        {
            "verbose": true,
            "dry": false,
            "exclude": ["manifest.json", "vendors.js"]
        }
    ),
    new CopyWebpackPlugin({
        patterns: [
            {from: './src/public/', to: 'public/'},
            {from: './dll/', to: ''},
        ]
    }),
    new webpack.DllReferencePlugin({
        context: path.join(__dirname, './../'),
        manifest: require(path.join('./../' + paths.vendorPath, 'manifest.json'))
    }),
    new webpack.DefinePlugin({
        'process.env': {
            //设置编译时的环境变量
        }
    })
];

switch (process.env.NODE_ENV) {
    case 'production':
        if(process.env.npm_config_report){
            plugins.push(new BundleAnalyzerPlugin()); //分析打包结果
        }
        break;
    default:
        plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = plugins;
