/**
 * Created by feichen on 2018/10/5.
 */
const path = require('path');
const paths = require('./paths');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //抽离CSS

let prod = process.env.NODE_ENV;


let modules = {
    rules: [
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/react', '@babel/preset-env'],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            "@babel/plugin-proposal-export-default-from",
                            "@babel/transform-runtime"
                        ] //支持@修饰符
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
            use: getScssModule(false)
        },
        //对于scss文件以module.scss结尾的开启CSSModule
        {
            test: /\.module\.(scss$|css$)/,
            exclude: [
                /(node_modules)/
            ],
            use: getScssModule(true)
        },
        {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', {
                loader: 'less-loader',
                options: {
                    lessOptions: {
                        javascriptEnabled: true
                    }
                }
            }],
        },
        {
            test: /\.(woff|svg|eot|ttf)$/,
            use: [
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
            test: /\.(jpg|png|jpeg)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        name: 'images/[name].[ext]',
                        limit: 1, //大小不超出时会打包为base64
                    }
                }
            ]
        }
    ]
};

function getScssModule(cssModule) {
    return [
        (prod === 'production' ? {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: './../'
            }
        } : 'style-loader'),
        {
            loader: 'css-loader',
            options: {
                modules: cssModule || false, //开启CSS Modules
                // importLoaders: 2 //作用是用于配置css-loader作用于 @import 的资源之前需要经过其他loader的个数
            }
        },
        'sass-loader',
        //注入全局scss变量文件，不需要每个文件一一引入
        {
            loader: 'sass-resources-loader',
            options: {
                resources: [
                    path.resolve(__dirname, '../src/style/' + 'varible.scss'),
                    path.resolve(__dirname, '../src/style/' + 'mixin.scss'),
                ]
            }
        }
    ]
}

module.exports = modules;
