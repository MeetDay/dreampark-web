const UNUSED_TICKETS = 'redux/tickets/unused'
const USED_TICKETS = 'redux/tickets/used'
const UNPAID_TICKETS = 'redux/tickets/unpaid'
const RECOMMEND_TICKETS = 'redux/tickets/recommend/tickets'
const SEARCH_TICKETS = 'redux/tickets/search_tickets'
const CANCEL_ORDER = 'redux/tickets/cancel_order'

const TICKET_COUNT_PER_REQUEST = 10

const actionHandlers = {
    [`${UNUSED_TICKETS}_PENDING`]: (state, action) => ({ ...state, unusedTikectsLoading: true, unusedTikectsLoaded: false }),
    [`${UNUSED_TICKETS}_FULFILLED`]: (state, action) => {
        return { ...state, unusedTikectsLoading: false, unusedTikectsLoaded: true, unusedTikects: action.payload.order_tickets, user: action.payload.user }
    },
    [`${UNUSED_TICKETS}_REJECTED`]: (state, action) => ({ ...state, unusedTikectsLoading: false, unusedTikectsLoaded: false, unusedTikectsError: action.payload }),

    [`${USED_TICKETS}_PENDING`]: (state, action) => ({ ...state, usedTicktsLoading: true, usedTicktsLoaded: false }),
    [`${USED_TICKETS}_FULFILLED`]: (state, action) => {
        return { ...state, usedTicktsLoading: false, usedTicktsLoaded: true, usedTickts: action.payload.order_tickets, user: action.payload.user }
    },
    [`${USED_TICKETS}_REJECTED`]: (state, action) => ({ ...state, usedTicktsLoading: false, usedTicktsLoaded: false, usedTicktsError: action.payload }),

    [`${UNPAID_TICKETS}_PENDING`]: (state, action) => ({ ...state, unpaidTicketsLoading:true, unpaidTicketsLoaded: false }),
    [`${UNPAID_TICKETS}_FULFILLED`]: (state, action) => ({ ...state, unpaidTicketsLoading:false, unpaidTicketsLoaded: true, unpaidTickets: action.payload.orders, user: action.payload.user }),
    [`${UNPAID_TICKETS}_REJECTED`]: (state, action) => ({ ...state, unpaidTicketsLoading:false, unpaidTicketsLoaded: false, unpaidTicketsError: action.payload }),

    [`${RECOMMEND_TICKETS}_PENDING`]: (state, action) => ({ ...state, recommendTicketsLoading: true, recommendTicketsLoaded: false }),
    [`${RECOMMEND_TICKETS}_FULFILLED`]: (state, action) => {
        let tickets = action.payload, hasMoreRecommendTickets = false, recommendTicketMaxID = undefined
        if (tickets && Array.isArray(tickets) && tickets.length >= TICKET_COUNT_PER_REQUEST) {
            hasMoreRecommendTickets = true
            recommendTicketMaxID = tickets[0].id
        }
        if (state.hasMoreRecommendTickets) tickets = [...state.recommendTickets, ...tickets]
        return {
            ...state,
            recommendTicketsLoading: false,
            recommendTicketsLoaded: true,
            recommendTickets: tickets,
            hasMoreRecommendTickets: hasMoreRecommendTickets,
            recommendTicketMaxID: recommendTicketMaxID
        }
    },
    [`${RECOMMEND_TICKETS}_REJECTED`]: (state, action) => ({ ...state, recommendTicketsLoading: false, recommendTicketsLoaded: false, recommendTicketsError: action.payload }),

    [`${SEARCH_TICKETS}_PENDING`]: (state, action) => ({...state, searchTicketsLoading: true, searchTicketsLoaded: false }),
    [`${SEARCH_TICKETS}_FULFILLED`]: (state, action) => ({ ...state, searchTicketsLoading: false, searchTicketsLoaded: true, searchedTickets: action.payload }),
    [`${SEARCH_TICKETS}_REJECTED`]: (state, action) => ({...state, searchTicketsLoading: false, searchTicketsLoaded: false, searchTicketError: action.payload }),

    [`${CANCEL_ORDER}_PENDING`]: (state, action) => ({...state, cancelOrderLoading: true, cancelOrderLoaded: false }),
    [`${CANCEL_ORDER}_FULFILLED`]: (state, action) => {
        const cancelOrder = action.payload
        const unpaidTickets = state.unpaidTickets.filter(unpaidOrder => unpaidOrder.id !== cancelOrder.id)
        return { ...state, cancelOrderLoading: false, cancelOrderLoaded: true, unpaidTickets: unpaidTickets }
    },
    [`${CANCEL_ORDER}_REJECTED`]: (state, action) => ({...state, cancelOrderLoading: false, cancelOrderLoaded: false, cancelOrderError: action.payload })
}

const initialState = {
    user: null,
    unusedTikectsLoading: false,
    unusedTikectsLoaded: false,
    unusedTikectsError: null,
    unusedTikects: [],

    usedTicktsLoading: false,
    usedTicktsLoaded: false,
    usedTicktsError: null,
    usedTickts: [],

    unpaidTicketsLoading: false,
    unpaidTicketsLoaded: false,
    unpaidTicketsError: null,
    unpaidTickets: [],

    recommendTicketsLoading: false,
    recommendTicketsLoaded: false,
    recommendTicketsError: null,
    recommendTickets: [],
    hasMoreRecommendTickets: false,
    recommendTicketMaxID: undefined,

    searchTicketsLoading: false,
    searchTicketsLoaded: false,
    searchTicketError: null,
    searchedTickets: [],

    cancelOrderLoading: false,
    cancelOrderLoaded: false,
    cancelOrderError: null
}

export default function tickets(state=initialState, action) {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export function isUnusedTicketsLoaded(globalState) {
    return globalState.tickets && globalState.tickets.unusedTikectsLoaded
}

export function isUsedTicketsLoaded(globalState) {
    return globalState.tickets && globalState.tickets.usedTicktsLoaded
}

export function isUnpaidTicketsLoaded(globalState) {
    return globalState.tickets && globalState.tickets.unpaidTicketsLoaded
}

export function isRecommendTicketsLoaded(globalState) {
    return globalState.tickets && globalState.tickets.searchTicketsLoaded
}

export function getUnusedTikects() {
    return (dispatch, getState) => {
        const { authHeaders } = getState().login
        return dispatch({
            type: UNUSED_TICKETS,
            payload: (client) => client.get('/unuse_ticket', {
                headers: authHeaders
            })
        })
    }
}

export function getUsedTickts() {
    return (dispatch, getState) => {
        const { authHeaders } = getState().login
        return dispatch({
            type: USED_TICKETS,
            payload: (client) => client.get('/used_ticket', {
                headers: authHeaders
            })
        })
    }
}

export function getUnpaidTickets() {
    return (dispatch, getState) => {
        const { authHeaders } = getState().login
        return dispatch({
            type: UNPAID_TICKETS,
            payload: (client) => client.get('/unpaid_orders', {
                headers: authHeaders
            })
        })
    }
}

//取消订单
export function cancelOrder(orderID) {
    return (dispatch, getState) => {
        const { authHeaders } = getState().login
        return dispatch({
            type: CANCEL_ORDER,
            payload: (client) => client.put('/cancel_orders', { headers: authHeaders, data: { id: orderID } })
        })
    }
}

//门票列表
export function getRecommendTickets() {
    return (dispatch, getState) => {
        const { recommendTicketMaxID } = getState().tickets
        return dispatch({
            type: RECOMMEND_TICKETS,
            payload: (client) => client.get('/tickets/list', {
                params: { count: TICKET_COUNT_PER_REQUEST, max_id: recommendTicketMaxID },
                subpath: '/fbpark/v1'
            })
        })
    }
}

// 搜索门票
export function searchTickets(title) {
    return {
        type: SEARCH_TICKETS,
        payload: (client) => client.get('/pois/search', {
            params: { title: title },
            subpath: '/fbpark/v1'
        })
    }
}
