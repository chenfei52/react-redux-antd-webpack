/**
 * Created by feichen on 2018/10/5.
 */
const path = require('path');
const paths = require('./paths');

const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //抽离CSS

let modules = {
    rules : [
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'env', 'stage-0'],
                        plugins: ['transform-decorators-legacy'] //支持@修饰符
                        // plugins: [["import", {libraryName: "antd", style: true}]]  //antd的按需加载,antd不用cdn加速的情况下
                    }
                },
                {
                    loader: "eslint-loader"
                }
            ]
        },
        {
            test: /^((?!\.module).)*(\.scss$|\.css$)/,
            exclude: [
                /(node_modules)/
            ],
            use: [
                'style-loader',
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
            ]
        },

        //一般需要引入css-loader和style-loader，其中css-loader用于解析，而style-loader则将解析后的样式嵌入js代码
        {
            test: /\.module\.(scss$|css$)/,
            exclude: [
                /(node_modules)/
            ],
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true, //开启CSS Modules
                        // importLoaders: 2 //作用是用于配置css-loader作用于 @import 的资源之前需要经过其他loader的个数
                    }
                },
                'sass-loader'
            ]
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
                        name: 'images/[name].[ext]',
                        limit: 1
                    }
                }
            ]
        }
    ]
};

module.exports = modules;
