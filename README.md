# 项目说明
------
基于webpack4 使用 react + react-router + redux快速搭建react项目

### 基本介绍
##### 1.项目启动流程
>* npm install 下载项目所需依赖包
>* npm run json 生成vendor.js 第三方包公用js
>* npm start || npm run start 启动项目
>* npm run build 构建项目

### webpack配置介绍

##### 1.js加载器
```javascript
{
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['react', 'env', 'stage-0'],
            plugins: ['transform-decorators-legacy' ] //支持@修饰符，数组配置功能
            // plugins: [["import", {libraryName: "antd", style: true}]]  //antd的按需加载,antd不用cdn，且不分离到公用包的情况下启用
        }
    }
}
```
以上代码首先test正则匹配js文件以按照配置处理js文件
exclude：排除目录下的目标js
presets 中的 state-0 用于引进许多预案，可修改为按需引入



下载后运行步骤：
npm install     //下载包

npm run json    //分离公用的第三方库
                //生成后下次可不必再执行
                //第三方库变动请重新执行
    若需要添加新的请修改目录下webpack.dll.config.js

npm start       //运行项目
    项目默认运行在http://localhost:8000 请手动打开访问
    如需修改请修改webpack.config.js 下的devServer的port
    其中proxy为设置本地代理

npm run build   //打包文件 输出目录在当前目录下的dist目录  用于生产环境
                //使用的webpack配置文件为webpack.configP.js