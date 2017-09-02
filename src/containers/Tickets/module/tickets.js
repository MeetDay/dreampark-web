/**
 * @Author: WangChao
 * @Date:   2017-07-15T10:33:41+08:00
 * @Email:  crazyitcoder9527@126.com
 * @Project: dreampark-web
 * @Last modified by:   WangChao
 * @Last modified time: 2017-09-02T10:13:57+08:00
 */

const UNUSED_TICKETS = 'redux/tickets/unused'
const USED_TICKETS = 'redux/tickets/used'
const UNPAID_TICKETS = 'redux/tickets/unpaid'
const RECOMMEND_TICKETS = 'redux/tickets/recommend/tickets'
const SEARCH_TICKETS = 'redux/tickets/search_tickets'
const CANCEL_ORDER = 'redux/tickets/cancel_order'
const REFUND_TICKET = 'redux/tickets/refund_tickets'

const TICKET_COUNT_PER_REQUEST = 20

const actionHandlers = {
    // 未使用
    [`${UNUSED_TICKETS}_PENDING`]: (state, action) => ({ ...state, unusedTicketsLoading: true, unusedTicketsLoaded: false }),
    [`${UNUSED_TICKETS}_FULFILLED`]: (state, action) => {
        let unusedTickets = action.payload.order_tickets, hasMoreUnusedTickets = false, maxUnusedTicketsID = undefined;
        if (state.hasMoreUnusedTickets && unusedTickets && Array.isArray(unusedTickets) && unusedTickets.length > 0) {
            if (unusedTickets[0].orderTicket_id <= state.unusedTickets[state.unusedTickets.length - 1].orderTicket_id) {
                unusedTickets = [...state.unusedTickets, ...unusedTickets];
            }
        }
        if (unusedTickets && Array.isArray(unusedTickets)&& unusedTickets.length > 0 && (unusedTickets.length % TICKET_COUNT_PER_REQUEST == 0)) {
            hasMoreUnusedTickets = true;
        }
        if (unusedTickets && Array.isArray(unusedTickets) && unusedTickets.length > 0) {
            maxUnusedTicketsID = unusedTickets[unusedTickets.length - 1].orderTicket_id;
        }
        return {
            ...state,
            unusedTicketsLoading: false,
            unusedTicketsLoaded: true,
            unusedTickets: [...unusedTickets],
            hasMoreUnusedTickets: hasMoreUnusedTickets,
            maxUnusedTicketsID: maxUnusedTicketsID,
            user: action.payload.user
        }
    },
    [`${UNUSED_TICKETS}_REJECTED`]: (state, action) => ({ ...state, unusedTicketsLoading: false, unusedTicketsLoaded: false, unusedTicketsError: action.payload }),

    // 已使用
    [`${USED_TICKETS}_PENDING`]: (state, action) => ({ ...state, usedTicktsLoading: true, usedTicktsLoaded: false }),
    [`${USED_TICKETS}_FULFILLED`]: (state, action) => {
        let usedTickets = action.payload.order_tickets, hasMoreUsedTickets = false, maxUsedTicketsID = undefined;
        if (state.hasMoreUsedTickets && usedTickets && Array.isArray(usedTickets) && usedTickets.length > 0) {
            if (usedTickets[0].orderTicket_id <= state.usedTickets[state.usedTickets.length - 1].orderTicket_id) {
                usedTickets = [...state.usedTickets, ...usedTickets];
            }
        }
        if (usedTickets && Array.isArray(usedTickets) && usedTickets.length > 0 && (usedTickets.length % TICKET_COUNT_PER_REQUEST == 0)) {
            hasMoreUsedTickets = true;
        }
        if (usedTickets && Array.isArray(usedTickets) && usedTickets.length > 0) {
            maxUsedTicketsID = usedTickets[usedTickets.length - 1].orderTicket_id;
        }
        return {
            ...state,
            usedTicktsLoading: false,
            usedTicktsLoaded: true,
            usedTickts: [...usedTickets],
            hasMoreUsedTickets: hasMoreUsedTickets,
            maxUsedTicketsID: maxUsedTicketsID,
            user: action.payload.user
        }
    },
    [`${USED_TICKETS}_REJECTED`]: (state, action) => ({ ...state, usedTicktsLoading: false, usedTicktsLoaded: false, usedTicktsError: action.payload }),

    // 未支付
    [`${UNPAID_TICKETS}_PENDING`]: (state, action) => ({ ...state, unpaidTicketsLoading:true, unpaidTicketsLoaded: false }),
    [`${UNPAID_TICKETS}_FULFILLED`]: (state, action) => {
        let unpaidTickets = action.payload.orders, hasMoreUnpaidTickets = false, maxUnpaidTicketsID = undefined;
        if (state.hasMoreUnpaidTickets && unpaidTickets && Array.isArray(unpaidTickets) && unpaidTickets.length > 0) {
            if (unpaidTickets[0].id <= state.unpaidTickets[state.unpaidTickets.length - 1].id) {
                unpaidTickets = [...state.unpaidTickets, ...unpaidTickets];
            }
        }
        if (unpaidTickets && Array.isArray(unpaidTickets) && unpaidTickets.length > 0 && (unpaidTickets.length % TICKET_COUNT_PER_REQUEST == 0)) {
            hasMoreUnpaidTickets = true;
        }
        if (unpaidTickets && Array.isArray(unpaidTickets) && unpaidTickets.length > 0) {
            maxUnpaidTicketsID = unpaidTickets[unpaidTickets.length - 1].id;
        }
        return {
            ...state,
            unpaidTicketsLoading:false,
            unpaidTicketsLoaded: true,
            unpaidTickets: [...unpaidTickets],
            hasMoreUnpaidTickets: hasMoreUnpaidTickets,
            maxUnpaidTicketsID: maxUnpaidTicketsID,
            user: action.payload.user
        };
    },
    [`${UNPAID_TICKETS}_REJECTED`]: (state, action) => ({ ...state, unpaidTicketsLoading:false, unpaidTicketsLoaded: false, unpaidTicketsError: action.payload }),

    // 推荐门票
    [`${RECOMMEND_TICKETS}_PENDING`]: (state, action) => ({ ...state, recommendTicketsLoading: true, recommendTicketsLoaded: false }),
    [`${RECOMMEND_TICKETS}_FULFILLED`]: (state, action) => {
        let tickets = action.payload, hasMoreRecommendTickets = false, recommendTicketMaxID = undefined
        if (state.hasMoreRecommendTickets && tickets && Array.isArray(tickets)) {
            tickets = [...state.recommendTickets, ...tickets]
        }
        if (tickets && Array.isArray(tickets) && (tickets.length % TICKET_COUNT_PER_REQUEST == 0)) {
            hasMoreRecommendTickets = true
        }
        if (tickets && Array.isArray(tickets) && tickets.length > 0) {
            recommendTicketMaxID = tickets[tickets.length - 1].id
        }
        return {
            ...state,
            recommendTicketsLoading: false,
            recommendTicketsLoaded: true,
            recommendTickets: [...tickets],
            hasMoreRecommendTickets: hasMoreRecommendTickets,
            recommendTicketMaxID: recommendTicketMaxID
        }
    },
    [`${RECOMMEND_TICKETS}_REJECTED`]: (state, action) => ({ ...state, recommendTicketsLoading: false, recommendTicketsLoaded: false, recommendTicketsError: action.payload }),

    // 搜索门票
    [`${SEARCH_TICKETS}_PENDING`]: (state, action) => ({...state, searchTicketsLoading: true, searchTicketsLoaded: false }),
    [`${SEARCH_TICKETS}_FULFILLED`]: (state, action) => ({ ...state, searchTicketsLoading: false, searchTicketsLoaded: true, searchedTickets: action.payload }),
    [`${SEARCH_TICKETS}_REJECTED`]: (state, action) => ({...state, searchTicketsLoading: false, searchTicketsLoaded: false, searchTicketError: action.payload }),

    // 取消订单
    [`${CANCEL_ORDER}_PENDING`]: (state, action) => ({...state, cancelOrderLoading: true, cancelOrderLoaded: false }),
    [`${CANCEL_ORDER}_FULFILLED`]: (state, action) => {
        const cancelOrder = action.payload
        const unpaidTickets = state.unpaidTickets.filter(unpaidOrder => unpaidOrder.id !== cancelOrder.id)
        return { ...state, cancelOrderLoading: false, cancelOrderLoaded: true, unpaidTickets: unpaidTickets }
    },
    [`${CANCEL_ORDER}_REJECTED`]: (state, action) => ({...state, cancelOrderLoading: false, cancelOrderLoaded: false, cancelOrderError: action.payload }),

    [`${REFUND_TICKET}_PENDING`]: (state, action) => ({...state, refundTicketLoading:true, refundTicketLoaded: false }),
    [`${REFUND_TICKET}_FULFILLED`]: (state, action) => ({...state, refundTicketLoading:false, refundTicketLoaded: true, refundTicket: action.payload }),
    [`${REFUND_TICKET}_REJECTED`]: (state, action) => ({...state, refundTicketLoading:false, refundTicketLoaded: false, refundTicketError: action.payload })
}

const initialState = {
    user: null,
    unusedTicketsLoading: false,
    unusedTicketsLoaded: false,
    unusedTicketsError: null,
    unusedTickets: [],
    hasMoreUnusedTickets: false,
    maxUnusedTicketsID: undefined,

    usedTicktsLoading: false,
    usedTicktsLoaded: false,
    usedTicktsError: null,
    usedTickts: [],
    hasMoreUsedTickets: false,
    maxUsedTicketsID: undefined,

    unpaidTicketsLoading: false,
    unpaidTicketsLoaded: false,
    unpaidTicketsError: null,
    unpaidTickets: [],
    hasMoreUnpaidTickets: false,
    maxUnpaidTicketsID: undefined,

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
    cancelOrderError: null,

    refundTicketLoading: false,
    refundTicketLoaded: false,
    refundTicketError: null,
    refundTicket: null
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
    return globalState.tickets && globalState.tickets.recommendTicketsLoaded
}

export function getUnusedTikects({ headerRefreshing = false } = {}) {
    return (dispatch, getState) => {
        const { authHeaders } = getState().login;
        const { maxUnusedTicketsID } = getState().tickets;
        return dispatch({
            type: UNUSED_TICKETS,
            payload: (client) => client.get('/unuse_ticket', {
                headers: authHeaders,
                params: { max_id: headerRefreshing ? undefined : maxUnusedTicketsID }
            })
        })
    }
}

export function getUsedTickts({ headerRefreshing = false } = {}) {
    return (dispatch, getState) => {
        const { authHeaders } = getState().login;
        const { maxUsedTicketsID } = getState().tickets;
        return dispatch({
            type: USED_TICKETS,
            payload: (client) => client.get('/used_ticket', {
                headers: authHeaders,
                params: { max_id: headerRefreshing ? undefined : maxUsedTicketsID }
            })
        })
    }
}

export function getUnpaidTickets({ headerRefreshing = false } = {}) {
    return (dispatch, getState) => {
        const { authHeaders } = getState().login;
        const { maxUnpaidTicketsID } = getState().tickets;
        return dispatch({
            type: UNPAID_TICKETS,
            payload: (client) => client.get('/unpaid_orders', {
                headers: authHeaders,
                params: { max_id: headerRefreshing ? undefined : maxUnpaidTicketsID }
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

// 退票
export function refundTicket(ticketID) {
    return (dispatch, getState) => {
        const { authHeaders } = getState().login;
        return dispatch({
            type: REFUND_TICKET,
            payload: (client) => client.post('/return_ticket', {
                headers: authHeaders,
                data: { id: ticketID }
            })
        })
    }
}

//门票列表
export function getRecommendTickets() {
    return (dispatch, getState) => {
        const { authHeaders } = getState().login;
        const { recommendTicketMaxID } = getState().tickets
        return dispatch({
            type: RECOMMEND_TICKETS,
            payload: (client) => client.get('/pois/ticket', {
                headers: authHeaders,
                params: { count: TICKET_COUNT_PER_REQUEST, max_id: recommendTicketMaxID },
                subpath: '/api/v1'
            })
        })
    }
}

// 搜索门票
export function searchTickets(title) {
    return {
        type: SEARCH_TICKETS,
        payload: (client) => client.get('/pois/ticket', {
            params: { title: title },
            subpath: '/api/v1'
        })
    }
}
