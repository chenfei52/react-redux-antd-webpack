/**
 * Created by chenfei on 2018/2/5.
 */

const webpack = require('webpack');
const path = require('path');
const paths = require('./config/paths');
const modules = require('./config/module');
const plugins = require('./config/plugins');
const externals = require('./config/externals');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


let devServer = {
    contentBase: path.join(__dirname, paths.output),
    port: 3000,
    host: 'localhost', //设置为0.0.0.0时表示用本机ip访问
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
}

let optimization = { //懒加载防止多次打包同一个模块
    splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: true,
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10
            },
            default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
            }
        }
    }
}

switch(process.env.NODE_ENV){
    case 'production':
        devServer = undefined;
        // plugins.push(new BundleAnalyzerPlugin()); //分析打包结果
        break;
    default:
        optimization = undefined;
        plugins.push(new webpack.DefinePlugin({
            'process.env': {
                NODE_GLOBAL1: "test"
            }
        })); //设置构建时的环境变量
        plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
    devtool: 'source-map',
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: __dirname + paths.output,
        publicPath: paths.publicPath, //配置该属性后所有用相对路径加载的资源路径都将加上该路径
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
