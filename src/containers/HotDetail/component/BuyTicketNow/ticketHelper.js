export function ticketExisted(tickets, ticket) {
    let isExisted = false
    if (Array.isArray(tickets)) {
        const results = tickets.find((item) => item.id === ticket.id)
        if (results) isExisted = true
    }
    return isExisted
}
