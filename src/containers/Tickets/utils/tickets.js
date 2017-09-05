/**
 * @Author: WangChao
 * @Date:   2017-09-05T20:21:29+08:00
 * @Email:  crazyitcoder9527@126.com
 * @Project: dreampark-web
 * @Last modified by:   WangChao
 * @Last modified time: 2017-09-05T21:08:08+08:00
 */

export default function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {
         script.onreadystatechange = function() {
             if (script.readyState == "loaded" || script.readyState == "complete") {
                 script.onreadystatechange = null;
                 callback();
             }
         }
    } else {
        script.onload = function() {
            callback();
        }
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

const letterString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

export function generatorRandomString(count) {
    const letterArray = Array.from(letterString);
    const randomLetterArray = letterArray.sort(() => Math.random() * 100 > 50);
    randomLetterArray.length = 20;
    return randomLetterArray.join("")
}
