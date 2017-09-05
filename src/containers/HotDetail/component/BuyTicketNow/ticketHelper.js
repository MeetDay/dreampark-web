/**
 * @Author: WangChao
 * @Date:   2017-09-04T14:34:57+08:00
 * @Email:  crazyitcoder9527@126.com
 * @Project: dreampark-web
 * @Last modified by:   WangChao
 * @Last modified time: 2017-09-05T16:42:11+08:00
 */

export function ticketExisted(tickets, ticket) {
    let isExisted = false
    if (Array.isArray(tickets)) {
        const results = tickets.find((item) => item.id === ticket.id)
        if (results) isExisted = true
    }
    return isExisted;
}
