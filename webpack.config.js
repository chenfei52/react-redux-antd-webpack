/**
 * Created by chenfei on 2018/2/5.
 */

const webpack = require('webpack');
const path = require('path');

const HtmlwebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //抽离CSS

module.exports = {
    devtool: 'source-map',
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: __dirname + '/dist',
        // publicPath: '/app/', //配置该属性后所有用相对路径加载的资源路径都将加上该路径
        filename: 'build.js'
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 8000,
        host: 'localhost',
        inline:true,
        hot:true,
        historyApiFallback: true,  //本地开发路由请求指向index.html
        // proxy: {
        //      有该前缀的api其代理设置为target IP
        //     '/url': {
        //         target: 'http://123.57.72.140:3001',
        //         secure: false
        //     }
        // }
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
                        plugins: ['transform-decorators-legacy' ]  //支持@修饰符
                    }
                }
            },
            //一般需要引入css-loader和style-loader，其中css-loader用于解析，而style-loader则将解析后的样式嵌入js代码
            {
                test: /\.(scss$|css$)/,
                exclude: [
                    /(node_modules)/,
                    path.join(__dirname, 'src/style/static')
                ],
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true, //开启CSS Modules
                                importLoaders: 2 //作用是用于配置css-loader作用于 @import 的资源之前需要经过其他loader的个数
                            }
                        },
                        {
                            //自动补全css前缀 需要在package.json 中配置browserslist以决定兼容的浏览器
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require("autoprefixer")()
                                ]
                            }
                        },
                        'sass-loader'
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(scss$|css$)/,
                include: [
                    path.join(__dirname, 'src/style/static')
                ],
                use: ExtractTextPlugin.extract({
                    use: [
                        {loader: 'css-loader'},
                        {
                            //自动补全css前缀 需要在package.json 中配置browserslist以决定兼容的浏览器
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require("autoprefixer")()
                                ]
                            }
                        },
                        'sass-loader'
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test:/\.(woff|svg|eot|ttf)$/,
                use:'url-loader',
            },
            {
                test:/\.(jpg|png|jpeg)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'images/[name].[ext]',
                            limit: 10
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style[chunkhash:6].css'),
        new HtmlwebpackPlugin({
            template: './src/index.html',
            title: 'webpack demo',
            inject: 'body',
            filename:'index.html'
        }),
        new CleanWebpackPlugin(
            ['dist'],
            {
                // "root":path.join(__dirname, '..'),     // 一个根的绝对路径 不设置将默认为当前路径 不可删除上级目录的文件
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
            manifest: require('./dist/manifest.json')
        }),
        new webpack.HotModuleReplacementPlugin()
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