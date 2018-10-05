/**
 * Created by chenfei on 2018/2/5.
 */

const webpack = require('webpack');
const path = require('path');
const paths = require('./config/paths');
const modules = require('./config/module');
const plugins = require('./config/plugins');
const externals = require('./config/externals');

module.exports = {
    // devtool: 'source-map',
    entry: ['babel-polyfill', './src/index.js'],
            //可以不使用babel-polyfill 而使用Polyfill.io  网站：https://c7sky.com/polyfill-io.html
    output: {
        path: path.join(__dirname, paths.output),
        publicPath: paths.publicPath, //配置该属性后页面加载的资源打包后路径都将加上该路径
        filename: 'build[chunkhash:6].js'
    },
    module: modules,
    plugins: plugins,
    externals: externals,
    resolve: {
        extensions: ['.js', '.jsx']
    }
};