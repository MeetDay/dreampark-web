export function legalPhoneNumber(phone) {
    return /^1(3|4|5|7|8)\d{9}$/g.test(phone)
}

export function formatPhoneNumber(phone) {
    if (typeof phone === 'string') {
        return phone.replace(/(\d)(?=(\d{4})+(?!\d))/g, '$1' + ' ')
    }
}

export function legalSMSCode(code) {
    return /^\d{4}$/g.test(code)
}