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
    https: false,
    historyApiFallback: true,  //本地开发路由请求指向index.html 非hash路由时的问题
    proxy
};

let optimization = { //懒加载防止多次打包同一个模块
    splitChunks: {
        chunks: 'async', //async(只从异步加载得模块（动态加载import()）里面进行拆分)、initial(表示只从入口模块进行拆分)和all
        minSize: 0, //表示在压缩前要满足的最小模块大小
        minChunks: 1, //表示被引用次数
        maxAsyncRequests: 5, //最大的按需(异步)加载次数
        maxInitialRequests: 3, //最大的初始化加载次数
        name: true,
        cacheGroups: { //缓存组 可以任意增加 满足任意条件即可 key值即为名字前缀
            vendors: {
                test: /node_modules/,  //指定路径
                priority: 20, //权重 同时满足时的优先级
                name: "common"
            },
            default: {
                minChunks: 2, //至少有幾個chunk引入才进行拆分
                priority: 10,
                reuseExistingChunk: true //是否使用已有的 chunk  true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的
            }
            //缓存组属性 enforce: 布尔类型，默认为 false。当设为 true 时，webpack 会忽略
            // splitChunks.minSize、splitChunks.minChunks、splitChunks.maxAsyncRequests、splitChunks.maxInitialRequests 这几个配置项，
            // 并且只要某个缓存组设置了 enforce 为 true，匹配的模块就会忽略前面提到的那几个属性，即使有其他的缓存组匹配同样的模块，也没有设置 enforce，
            // 同时优先级比设置了 enforce 的高，enforce: true 仍然有效。
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
    entry: ['./src/index.js'],
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
