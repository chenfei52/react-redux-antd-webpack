/**
 * Created by feichen on 2018/10/5.
 */
//路径配置均相对于webpack 配置文件所在位置
let paths = {
    vendorPath: '/dll', //vendor.js 打包路径
    output: '/dist', //js 打包路径
    publicPath: '', //配置该属性后页面加载的资源打包后路径都将加上该路径
};

module.exports = paths;
