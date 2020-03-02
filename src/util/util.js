//格式化日期
export function formatTime (time, character, degree) {
    if(!time){
        return '';
    }

    if(!time.indexOf || time.indexOf('T') !== -1){
        time = new Date(time);
    }else{
        time = new Date(time.replace(/-/g,'/'));
    }

    if (!character) {
        character = '-'
    }

    function addZero(n) {
        if (n < 10) {
            return '0' + String(n);
        }
        return n;
    }
    let year = time.getFullYear(),
        month = addZero(time.getMonth() + 1),
        day = addZero(time.getDate()),
        hour = addZero(time.getHours()),
        minute = addZero(time.getMinutes()),
        seconds = addZero(time.getSeconds()),
        result = '';

    result += year;
    if (degree && degree === 'year') {
        return result;
    }
    result += character + String(month);
    if (degree && degree === 'month') {
        return result;
    }
    result += character + String(day);
    if (degree && degree === 'day') {
        return result;
    }
    result += ' ' + String(hour);
    if (degree && degree === 'hour') {
        return result;
    }
    result += ':' + String(minute);
    if (degree && degree === 'minute') {
        return result;
    }
    result += ':' + String(seconds);
    if (degree && degree === 'seconds') {
        return result;
    }
    return result;
}

/**
 * 获取url上面的参数
 * @param key 要获取的参数的名字 不传则直接返回整个参数对象
 * @returns {*}
 */
export function getUrlParams( key ){
    let params = {};
    let url = location.href.split('?');
    if(url.length > 1){
        let par = url[1];
        if(par.indexOf('#') > -1){
            par = par.split('#')[0]
        }
        par = par.split('&');
        par.forEach(function(val){
            let _par = val.split('=');
            params[_par[0]] = _par[1];
        })
    }
    if(!key){
        return params;
    }
    return params[key];
}

/**
 * 获取IE的版本
 * @returns {*}
 * @constructor
 */
export function IEVersion() {
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    let isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    let isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
        let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        let fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) {
            return 7;
        } else if(fIEVersion == 8) {
            return 8;
        } else if(fIEVersion == 9) {
            return 9;
        } else if(fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }
    } else if(isEdge) {
        return 'edge';//edge
    } else if(isIE11) {
        return 11; //IE11
    }else{
        return -1;//不是ie浏览器
    }
}

export function deepCopy(obj){
    if(typeof obj !== 'object') console.log('请传入一个对象');

    let res = null;
    obj instanceof Array ? res = [] : res={};
    for(let key in obj){
        if(typeof obj[key] === 'object'){
            res[key] = deepCopy(obj[key]);
        }else{
            res[key] = obj[key];
        }
    }
    return res;
}
