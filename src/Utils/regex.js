export function legalPhoneNumber(phonenumber) {
    if (typeof phonenumber === 'string') {
        return /^1(3|4|5|7|8)\d{9}$/g.test(clearWhiteSpaceOf(phonenumber))
    }
}

export function formatPhoneNumber(phonenumber) {
    if (typeof phonenumber === 'string') {
        return phonenumber.replace(/(\d)(?=(\d{4})+(?!\d))/g, '$1' + ' ')
    }
}

export function appendWhiteSpaceOnMatchCharacter(neededMatchString, phone=true) {
    if (typeof neededMatchString === 'string') {
        return Array.from(clearWhiteSpaceOf(neededMatchString))
            .map(insertWhiteSpace(phone))
            .join("")
    }
}
function insertWhiteSpace(phone) {
    let neededInsertWhiteSpaceIndex = [3, 7]
    if (!phone) neededInsertWhiteSpaceIndex = [3, 6, 10, 14]
    return function(value, index) {
        if (neededInsertWhiteSpaceIndex.includes(index)) return " " + value
        return value
    }
}


export function clearWhiteSpaceOf(formatPhoneNumber) {
    if (typeof formatPhoneNumber === 'string') {
        return formatPhoneNumber.replace(/(\s)/gi, (match) => match.trim())
    }
}

export function legalSMSCode(code) {
    return /^\d{4}$/g.test(code)
}

export function illegalCardNumber(cardno) {
    return /(^\d{15}$)|(^\d{17}([0-9]|X)$)/gi.test(clearWhiteSpaceOf(cardno))
}
