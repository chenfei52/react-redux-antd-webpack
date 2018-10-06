# 项目说明
------
基于webpack4 使用 react + react-router + redux快速搭建react项目

### 基本介绍

##### 项目启动流程
>* npm install 下载项目所需依赖包
>* npm run json 生成vendor.js 第三方包公用js
>* npm start || npm run start 启动项目 启动成功后可在浏览器输入 localhost:3000访问
>* npm run build 构建项目

##### 配置文件
根目录下三个webpack配置文件
>* webpack.dll.config.js 用于分离第三方js
>* webpack.config.js 用于开发环境
>* webpack.configP.js 用于生产环境打包

##### 目录
src为前端代码，其下的component存放组件，public下的所有文件在打包时都将拷贝到打包路径下同名文件夹中


webpack.dll.config.js 中以下代码配置分离打包指定的js
```javascript
entry: {
        vendors: [
            'react-redux',
            'react-router',
            'react-router-dom',
            'redux'
        ]
    }
```

##### 项目基本配置
在开发环境配置文件中有以下代码
```javascript
devServer: {
        contentBase: path.join(__dirname, paths.output),
        port: 3000, //指定本地启用的端口
        host: 'localhost',
        inline:true,
        hot:true,
        historyApiFallback: true,  //react 非hash路由时404解决配置 本地开发路由请求指向index.html
        proxy: {    //可配置多个
            '/url': { //有该前缀的api代理设置为target IP
                 target: 'http://0.0.0.0:80',
                 secure: false
                 changeOrigin: true,  //设置跨域
            }
        }
    },
```


### webpack配置介绍

##### 1.antd开启按需加载 在config目录下modules.js中修改如下代码
```javascript
{
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['react', 'env', 'stage-0'],
            plugins: ['transform-decorators-legacy' , ["import", {libraryName: "antd", style: true}]]
        }
    }
}
```
以上代码首先test正则匹配js文件以按照配置处理js文件
exclude：排除目录下的目标js
presets 中的 state-0 用于引进许多预案，可修改为按需引入
