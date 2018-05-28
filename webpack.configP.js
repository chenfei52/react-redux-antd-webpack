/**
 * Created by chenfei on 2018/2/5.
 */

const webpack = require('webpack');
const path = require('path');

const HtmlwebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //打包结果分析插件


module.exports = {
    // devtool: 'source-map',
    entry: ['babel-polyfill', './src/index.js'],
            //可以不使用babel-polyfill 而使用Polyfill.io  网站：https://c7sky.com/polyfill-io.html
    output: {
        path: path.join(__dirname, '/dist'),
        // publicPath: '/app/', //配置该属性后页面加载的资源打包后路径都将加上该路径
        filename: 'build[chunkhash:6].js'
    },
    module: {
        rules : [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'env', 'stage-0'],
                        // plugins: [["import", {libraryName: "antd", style: true}]]  //antd的按需加载,antd不用cdn加速的情况下
                    }
                }
            },
            //一般需要引入css-loader和style-loader，其中css-loader用于解析，而style-loader则将解析后的样式嵌入js代码
            {
                test: /\.(scss$|css$)/,
                exclude: /node_modules/,
                use: ['style-loader','css-loader','sass-loader'] ,
                //loader:'style-loader!css-loader!sass-loader' ,
            },
            {
                test: /\.less$/,
                use: ['style-loader','css-loader',{
                    loader: 'less-loader',
                    options: {
                        javascriptEnabled: true
                    }
                }],
            },
            {
                test:/\.(woff|svg|eot|ttf)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'font/[name].[ext]',
                            limit: 1
                        }
                    }
                ]
            },
            {
                test:/\.(jpg|png|jpeg)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'name=images/[name].[ext]',
                            limit: 1
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new HtmlwebpackPlugin({
            template: './src/index.html',
            title: 'webpack demo',
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
                // {
                //     from:'./src/common/jquery/',
                //     to:'common/jquery/'
                // }
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
            manifest: require('./dist/manifest.json')
        }),
    ],
    externals:{
        'react': 'React',
        'react-dom': 'ReactDOM',
        "antd": 'antd'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};