/**
 * 格式化日期格式
 * @param time 需要格式化的时间eg: Date 时间戳 String
 * @param formateStr YYYY-MM-DD hh:mm:ss
 * @returns {string|*}
 */
export function formatTime(time, formateStr) {
    if (!time) {
        return '';
    }

    if (typeof time === 'string' && !time.includes('-')) {
        time = new Date(time);
    } else if(typeof time === 'string') {
        //兼容os不支持YYYY-MM-DD格式
        time = new Date(time.replace(/-/g, '/'));
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
 * 获取一个月的所有天数列表 会按日历补齐上月和下月的日期
 * @param dateObj 日期对象
 * @param firstIsZero 日历是否以周日开始 默认false
 * return [
 *      item: {
 *          day: 01,
 *          date: 2021-03-29,
 *          week: 1,
 *          isThis: true, //是否为当月
 *          isPrev: true, //上月
 *          isNext: true, //下月
 *      }
 * ]
 */
export function getMothDateList(dateObj, firstIsZero){
    if(typeof dateObj !== 'object' || !dateObj.getTime) return [];
    const year = dateObj.getFullYear(),
          month = dateObj.getMonth() + 1,
          firstDay = new Date(dateObj.setDate(1)),
          firstWeek = firstDay.getDay(),
          lastDay = new Date(new Date(new Date(dateObj.setDate(1)).setMonth(month)).setDate(0)),
          lastWeek = lastDay.getDay();

    let prevDay = firstWeek - (firstIsZero ? 0 : 1), //上月需要补的天数
        nextDay = (7 - lastWeek) - (firstIsZero ? 1 : 0); //下月需要补的天数

    const result = [];

    while (prevDay > 0){
        let _p = new Date((new Date(firstDay.getTime())).setDate(-( prevDay - 1 )));
        result.push({
            day: _p.getDate(),
            date: formatTime(_p, 'YYYY-MM-DD'),
            week: _p.getDay(),
            isPrev: true
        });
        prevDay --;
    }

    let pointer = firstDay;
    while(pointer.getTime() - lastDay.getTime() <= 0){
        result.push({
            day: pointer.getDate(),
            date: formatTime(pointer, 'YYYY-MM-DD'),
            week: pointer.getDay(),
            isThis: true
        });
        pointer = new Date(pointer.setDate(pointer.getDate() + 1));
    }

    let end = 1;
    while (end <= nextDay){
        let _p = new Date(new Date(new Date(new Date(dateObj.setDate(1)).setMonth(month))).setDate(end));
        result.push({
            day: _p.getDate(),
            date: formatTime(_p, 'YYYY-MM-DD'),
            week: _p.getDay(),
            isNext: true
        });
        end ++;
    }
    return result;
}
