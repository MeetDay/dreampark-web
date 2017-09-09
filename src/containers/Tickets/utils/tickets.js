/**
 * @Author: WangChao
 * @Date:   2017-09-05T20:21:29+08:00
 * @Email:  crazyitcoder9527@126.com
 * @Project: dreampark-web
 * @Last modified by:   WangChao
 * @Last modified time: 2017-09-07T17:39:30+08:00
 */
import CryptoJS from 'crypto-js';

export function loadScript(url, callback) {
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
export function generatorRandomString(maxLength) {
    const letterArray = Array.from(letterString);
    const randomLetterArray = letterArray.sort(() => (Math.random() - 0.5));
    randomLetterArray.length = maxLength;
    return randomLetterArray.join("");
}

export function encrypt(content, key) {
    const realKey = key + (key.length < 16 ? Array(16 - key.length + 1).join(0) : "");
    const cipher = CryptoJS.AES.encrypt(content, CryptoJS.enc.Utf8.parse(realKey), {
        iv: CryptoJS.enc.Utf8.parse(Array(17).join(0)),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return {
        cipherText: cipher.toString(),
        cipherHexText: cipher.ciphertext.toString()
    }
}

function convertTo32HexNumber(targetNumber, keepDigits=2, radix=32) {
    if (Number.isInteger(parseInt(targetNumber))) {
        const formatValue = Number(targetNumber).toString(radix);
        const completionFormatValue = Array(keepDigits > formatValue.length ? (keepDigits - formatValue.length + 1) : 0).join(0) + formatValue;
        return completionFormatValue.toUpperCase();
    }
}

function convertCardno(cardno) {
    const matches = String(cardno).match(/\S{3}/gi);
    if (matches && matches.length > 0) {
        return matches.reduce((accumulator, currentValue, currentIndex) => {
            if (currentIndex == matches.length - 1) {
                return accumulator + currentValue;
            } else {
                return accumulator + convertTo32HexNumber(currentValue);
            }
        }, "");
    }
}

export function PersonQRCode(userid, userType, cardno) {
    this.userid = userid;
    this.userType = userType;
    this.cardno = cardno;

    this.getPersonQRCode = function() {
        const formatUserid = convertTo32HexNumber(this.userid, 6);
        const formatUserType = convertTo32HexNumber(this.userType, 2, 10);
        const formatCardno = convertCardno(this.cardno);
        return `${formatUserid}${formatCardno}${formatUserType}`;
    }
}

export function TicketQRCode(poiID, ticketType, ticketTime, cardno, checkRule) {
    this.poiID = poiID;
    this.ticketType = ticketType;
    this.ticketTime = ticketTime;
    this.cardno = cardno;
    this.checkRule = checkRule;

    this.getTicketQRCode = function() {
        const formatPoiID = convertTo32HexNumber(this.poiID, 2);
        const formatTicketType = convertTo32HexNumber(this.ticketType, 2);
        const formatCardno = convertCardno(this.cardno);
        const formatCheckRule = convertTo32HexNumber(this.checkRule, 2);
        const formatTicketTime =
            (function(ticketTime){
                return ticketTime.split('.')
                                 .reduce((accumulator, currentValue) => {
                                        return accumulator + convertTo32HexNumber(currentValue, 2)
                                    }, '');
            })(this.ticketTime);
        return `${formatPoiID}${formatTicketType}${formatTicketTime}${formatCardno}${formatCheckRule}`;
    }
}
