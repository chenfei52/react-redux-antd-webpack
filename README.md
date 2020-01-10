# 项目说明
------
基于webpack4 使用 react + react-router快速搭建react项目

### 基本介绍

##### 项目启动流程
>* npm install 下载项目所需依赖包
>* npm run json 生成vendor.js 第三方包公用js
>* npm start || npm run start 启动项目 启动成功后可在浏览器输入 localhost:3000访问
>* npm run build 构建项目

##### 配置文件
根目录webpack配置文件
>* webpack.dll.config.js 用于分离第三方js
>* webpack.config.js webpack配置文件
>* config 目录下为具体配置项

区分生产环境和开发环境的配置在package.json的命令项配置中设置NODE_ENV变量的值，如果需要配置别的环境变量可在webpack配置文件中的DefinePlugin插件处设置。

webpack.dll.config.js 中以下代码配置分离打包指定的js
```javascript
entry: {
        vendors: [
            //需要分离打包的js
        ]
    }
```

##### 目录
src为前端代码，其下的component存放组件，public下的所有文件在打包时都将拷贝到打包路径下同名文件夹中


##### 项目基本配置
配置webpack配置入口文件的proxyMap可以批量设置接口代理


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

##### 2.css Modules
根据scss文件名称决定是否开启css module， 名称以 .module.scss结尾则开启

##### 3.按需加载js
使用React提供的Suspense组件

##### 4.eslint
使用了eslint来检查代码，配置文件为根目录下.eslintrc,如想关闭请屏蔽module.js中的以下代码块
```javascript
{
    loader: "eslint-loader"
}
```
单行屏蔽eslint检查
```javascript
 // eslint-disable-next-line
```
若想要某个文件禁用eslint审查则在文件头部加入以下注释
```javascript
/* eslint-disable */
```
若想在某个文件中使用别处定义的全局变量 可在头部加 或者在.eslintrc配置文件中添加全局变量
```javascript
/* global var1, var2 */
```
