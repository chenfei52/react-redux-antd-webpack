import { message } from 'antd';
import { getCookie } from './util';

/**
 * fetch发起请求
 * @param options  请求配置
 *        {
 *          method: string 请求类型
 *          url: string ...
 *          data: obj | string 请求数据
 *          static: bool 为true则不将data JSON.stringify 否则...
 *          headers: obj 自定义header头
 *          hideLoadingText: bool 是否隐藏加载提示
 *          loadingText: str 加载时的文字提示
 *          blobData: bool  返回是否为二进制数据
 *          noAuth: bool   无用户验证头
 *        }
 * @param success   成功回调
 * @param error     错误回调
 */

export default function Req(options, success, error){
    let request = {
        method: options.type,
        headers: {}
        // credentials: 'include'
    };
    if(options.headers){
        for(let key in options.headers){
            request.headers[key] = options.headers[key];
        }
    }

    if(options.data && options.static){
        request.body = options.data;
    }else{
        request.body = JSON.stringify(options.data)
    }

    let params = '';
    //get请求加上时间戳
    if(options.type === 'GET'){
        params = (options.url.indexOf('?') === -1 ? '?' : '&') + `time=${ new Date().getTime() }`;
    }

    //对url参数进行编码 兼容IE传中文参数
    let url = options.url;
    if(url.indexOf('?') !== -1){
        let index = url.indexOf('?');
        let queryParams = url.slice(index + 1);
        url = url.slice(0, index + 1);
        url += encodeURI(queryParams);
    }

    let hide = null;
    if(!options.hideLoadingText)
        hide = message.loading(options.loadingText || "请求中...", 0);

    return  Promise.race([
        fetch(url + params, request),
        new Promise((resolve, reject)=>{
            setTimeout(()=>{
                reject(new Error('接口响应超时！'))
            }, 20000)
        })
    ]).then((res)=>{
        hide && hide();
        if(res.status === 401 || res.status === 403){
            message.warning("用户无权限!");
        }
        if(options.blobData){
            return res.blob();
        }
        if(!res.Status && !options.blobData){
            message.warning(res.Message || '调用接口出错!');
        }else{
            success && typeof success === 'function' && success(res);
        }
        return res.json();
    }).catch(error=>{
        console.log(error);
    });
}
