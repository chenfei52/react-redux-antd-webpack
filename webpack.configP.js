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

plugins.push(new BundleAnalyzerPlugin());
plugins.push(new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: "production"
    }
}));

module.exports = {
    // devtool: 'source-map',
    entry: ['babel-polyfill', './src/index.js'],
    optimization: { //懒加载防止多次打包同一个模块
        //https://www.jianshu.com/p/3066d96aec8b
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
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
    },
    output: {
        path: path.join(__dirname, paths.output),
        publicPath: paths.publicPath, //配置该属性后页面加载的资源打包后路径都将加上该路径
        filename: 'build.[hash:6].js',
        chunkFilename: '[name].[hash:6].js',
    },
    module: modules,
    plugins: plugins,
    externals: externals,
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
