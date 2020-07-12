/**
 * 格式化日期格式
 * @param time 需要格式化的时间eg: Date 时间戳 String
 * @param formateStr YYYY-MM-DD hh:mm:ss
 * @returns {string|*}
 */
export function formatTime (time, formateStr) {
    if(!time){
        return '';
    }

    if(!time.indexOf || time.indexOf('T') !== -1){
        time = new Date(time);
    }else{
        //兼容os不支持YYYY-MM-DD格式
        time = new Date(time.replace(/-/g,'/'));
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
        seconds = addZero(time.getSeconds());

    formateStr = formateStr.replace('YYYY', year);
    formateStr = formateStr.replace('MM', month);
    formateStr = formateStr.replace('DD', day);
    formateStr = formateStr.replace('hh', hour);
    formateStr = formateStr.replace('mm', minute);
    formateStr = formateStr.replace('ss', seconds);
    return formateStr;
}

/**
 * 获取url上面的参数
 * @param key 要获取的参数的名字 不传则直接返回整个参数对象
 * @returns {*}
 */
export function getUrlParams(name){
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if(r!=null)return decodeURI(r[2]); return null;
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

/**
 * 深拷贝
 * @param obj
 * @returns {{}}
 */
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


/**
 * 一维数组还原树状数据
 * @param data 一维数组
 * @param parentIdKey 标示父级的KEY
 * @param idKey
 * @returns {*[]}
 */
export function getTreeData(data = [], parentIdKey, idKey) {
    let tree = [];
    let _data = [...data];
    function getLeaf(){
        let over = true;
        _data.forEach(item=>{
            if(!item.replace && item[parentIdKey] && (!_data.find(it=>(!it.replace && it[parentIdKey] === item[idKey]) ))){
                over = false;
                let index = _data.findIndex(it=>it[idKey] === item[parentIdKey]);
                if(index > -1) {
                    if(!_data[index].children)_data[index].children = [];
                    _data[index].children.push({ ...item });
                    item.replace = true;
                }
            }
            if(item[parentIdKey] && !_data.find(it=>(it[idKey] === item[parentIdKey]) )){
                item.replace = true;
            }
        });
        return over;
    }
    let i = 0;//防止因为数据出错导致死循环
    while (!getLeaf() && (i<100)){
        i++;
        getLeaf();
    }
    tree = _data.filter(item=>!item.replace);
    return tree;
}


export function testBuild(){
    console.log('this is test');
}
