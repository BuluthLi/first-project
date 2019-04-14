/**
 * 将url的参数转化成对象形式
 * @example "?id=1255&haiidm=nima"
 * @return Object {id:1255,haiidm:nima}
 */
export function urlParse() {
    let result = {};
    let url = window.location.search;
    // +一次或多次；*零次或多次；.除去换行符以外的任意单个字符（妈的。老是忘）
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);//['?id=1255','&haiidm=nima']
    arr.forEach((item, index) => {
        let tempArr = item.substr(1).split('=');
        let key = tempArr[0];
        let value = tempArr[1];
        result[key] = value;
    });
    // RegExp.$1的使用方式
    var str2 = '120pt'
    var str3 = '120px'
    var regtest = /^(\d+)(pt|px|em)?/
    console.log(regtest.exec(str2))//整个正则表达式反回的结果。
    console.log(RegExp.$1)//返回正则中第一个子表达式的结果。
    console.log(RegExp.$2)//返回正则中第二个子表达式的结果。
    // console.log(regtest.exec(str3))//整个正则表达式反回的结果。
    // 使用RegExp.$1，必须使用一次正则，exec或者test(正则方法),或者match(字符串方法)
    // console.log(RegExp.$1)//返回正则中第第一个子表达式的结果。
    // console.log(RegExp.$2)//返回正则中第二个子表达式的结果。
    return result;

};