/**
 * Created by chenfei on 2018/2/5.
 */

const webpack = require('webpack');
const path = require('path');

const HtmlwebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


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
                        presets: ['react', 'env', 'stage-0']
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
                use:'url-loader',
            },
            {
                test:/\.(jpg|png|jpeg)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'name=images/[name].[ext]',
                            limit: 10
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            template: './src/index.html',
            title: 'webpack demo',
            inject: 'body',
            filename:'index.html'
        }),
        new CleanWebpackPlugin(
            ['dist'],
            {
                // "root":"[]",     // 一个根的绝对路径 不设置将默认为当前路径 不可删除上级目录的文件
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