export function legalPhoneNumber(phone) {
    return /^1(3|4|5|7|8)\d{9}$/g.test(phone)
}

export function formatPhoneNumber(phone) {
    if (typeof phone === 'string') {
        return phone.replace(/(\d)(?=(\d{4})+(?!\d))/g, '$1' + ' ')
    }
}

export function covertFormatPhoneToRealPhone(formatPhoneNumber) {
    if (typeof formatPhoneNumber === 'string') {
        return formatPhoneNumber.replace(/(\s)/gi, (match) => match.trim())
    }
}

export function legalSMSCode(code) {
    return /^\d{4}$/g.test(code)
}

export function illegalCardNunber(cardno) {
    return /(^\d{15}$)|(^\d{17}([0-9]|X)$)/gi.test(cardno)
}
