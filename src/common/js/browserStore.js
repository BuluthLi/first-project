// 一般状态是
// 其中JSON.stringify和JSON.parse针对的是value,
// sessionStorage: {
//     key: value
// }
// -----------------------------------------------------------------------------------------------------------
// 当前存储形式
// 这里多加一层id，用来辨别身份，故此其中JSON.stringify和JSON.parse针对的是{key:value},
// sessionStorage: {
//     id: { 
//         key: value
//      }
// }
export function saveToSession(id, key, value) {
    let tempData = {};
    tempData[key] = value;
    window.sessionStorage.setItem(id, JSON.stringify(tempData));

};
export function loadFromSession(id, key, def) {
    let tempData = JSON.parse(window.sessionStorage.getItem(id));
    console.log(tempData);
    if (tempData) {
        return tempData[key];
    } else {
        return def;
    }
};