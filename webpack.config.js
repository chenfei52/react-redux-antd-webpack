/**
 * Created by chenfei on 2018/2/5.
 */

const webpack = require('webpack');
const path = require('path');
const paths = require('./config/paths');
const modules = require('./config/module');
const plugins = require('./config/plugins');
const externals = require('./config/externals');

plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = {
    devtool: 'source-map',
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: __dirname + paths.output,
        publicPath: paths.publicPath, //配置该属性后所有用相对路径加载的资源路径都将加上该路径
        filename: 'build.[hash:6].js',
        chunkFilename: '[name].[hash:6].js',
    },
    devServer: {
        contentBase: path.join(__dirname, paths.output),
        port: 3000,
        host: 'localhost',
        inline:true,
        hot:true,
        historyApiFallback: true,  //本地开发路由请求指向index.html
        // proxy: {
        //      有该前缀的api其代理设置为target IP
        //     '/url': {
        //         target: 'http://123.57.72.140:3001',
        //         secure: false
        //         changeOrigin: true,  //设置跨域
        //     }
        // }
    },
    module: modules,
    plugins: plugins,
    externals: externals,
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
