export function convertToLocalDate(timestamp) {
    const targetDate = new Date(timestamp * 1000)
    return {
        date: getLocalDateString(targetDate),
        week: getLocalWeekString(targetDate),
        time: getLocalTimeString(targetDate)
    }
}

function getLocalDateString(date) {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

function getLocalWeekString(date) {
    const cn = ["日", "一", "二", "三", "四", "五", "六"]
    return `星期${cn[date.getDay()]}`
}

function getLocalTimeString(date) {
    const hours = date.getHours()
    const mins = date.getMinutes()
    const hourString = hours < 10 ? `0${hours}` : `${hours}`
    const minsString = mins < 10 ? `0${mins}` : `${mins}`
    return `${hourString}:${minsString}`
}
