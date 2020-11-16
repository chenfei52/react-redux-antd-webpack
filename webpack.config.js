/**
 * Created by chenfei on 2018/2/5.
 */

const webpack = require('webpack');
const path = require('path');
const paths = require('./config/paths');
const modules = require('./config/module');
const plugins = require('./config/plugins');
const externals = require('./config/externals');
const TerserPlugin = require('terser-webpack-plugin');

let proxyMap = {
};
let proxy = {
};
for(let key in proxyMap){
    proxy[key] = {
        target: proxyMap[key],
        secure: false,
        changeOrigin: true,  //设置跨域
    }
}
let devServer = {
    contentBase: path.join(__dirname, paths.output),
    port: 3000,
    host: 'localhost', //设置为0.0.0.0时表示用本机ip访问
    inline:true,
    hot:true,
    historyApiFallback: true,  //本地开发路由请求指向index.html
    proxy
};

let optimization = { //懒加载防止多次打包同一个模块
    splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: 'common',
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                name: 'common'
            },
            default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
            }
        }
    },
    //webpack4 默认内置使用 terser-webpack-plugin 插件压缩优化代码，而该插件使用 terser 来缩小 JavaScript
    //terser 使用多进程并行运行来提高构建速度
    minimizer: [
        new TerserPlugin({
            parallel: true,
        }),
    ],
};

switch(process.env.NODE_ENV){
    case 'production':
        devServer = undefined;
        break;
    default:
        optimization = undefined;
}

module.exports = {
    devtool: process.env.NODE_ENV === 'production' ? undefined : 'source-map',
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: __dirname + paths.output,
        publicPath: paths.publicPath,
        filename: 'build.[hash:6].js',
        chunkFilename: '[name].[hash:6].js',
    },
    optimization,
    devServer,
    module: modules,
    plugins: plugins,
    externals: externals,
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            "@src":path.resolve("src"),
        }
    }
};
