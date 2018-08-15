本项目是个人用于快速搭建react项目使用
默认使用react + react-router + redux
开启了CSS Modules 以及CSS前缀自动补全
antd配置了但没有分离到公用包

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