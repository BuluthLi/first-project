// substr 方法
// 返回一个从指定位置开始的指定长度的子字符串。
// stringvar.substr(start[, length])

// substring 方法
// 返回位于 String 对象中指定位置的子字符串。
// strVariable.substring(start, end) 


// 正则字符串进行正则匹配，在目标字符串替换对应正则
export function dateFormat(date, dateFormat) {
    // 对年份进行处理
    if (/(y+)/.test(dateFormat)) {
        dateFormat = dateFormat.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.lenght));
    }
    // 首先对正则和想要的日期做对应关系
    let obj = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
    };
    for (let i in obj) {
        if (new RegExp(`(${i})`).test(dateFormat)) {
            let str = obj[i] + '';
            // 针对月份出现一位数字
            dateFormat = dateFormat.replace(RegExp.$1, (RegExp.$1.length == 1) ? str : doubleStr(str));
        }
    }
    return dateFormat;
    function doubleStr(str) {
        return ('00' + str).substr(str.length);
    }
};