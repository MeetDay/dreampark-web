const UNUSED_TICKETS = 'redux/tickets/unused'
const USED_TICKETS = 'redux/tickets/used'

const actionHandlers = {
    [`${UNUSED_TICKETS}_PENDING`]: (state, action) => ({ ...state, unusedTikectsLoading: true, unusedTikectsLoaded: false }),
    [`${UNUSED_TICKETS}_FULFILLED`]: (state, action) => {
        return { ...state, unusedTikectsLoading: false, unusedTikectsLoaded: true, unusedTikects: action.payload.order_tickets, user: action.payload.user }
    },
    [`${UNUSED_TICKETS}_REJECTED`]: (state, action) => ({ ...state, unusedTikectsLoading: false, unusedTikectsLoaded: false, unusedTikectsError: action.payload }),

    [`${USED_TICKETS}_PENDING`]: (state, action) => ({ ...state, usedTicktsLoading: true, usedTicktsLoaded: false }),
    [`${USED_TICKETS}_FULFILLED`]: (state, action) => {
        return { ...state, usedTicktsLoading: false, usedTicktsLoaded: true, usedTickts: action.payload }
    },
    [`${USED_TICKETS}_REJECTED`]: (state, action) => ({ ...state, usedTicktsLoading: false, usedTicktsLoaded: false, usedTicktsError: action.payload })
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
    usedTickts: []
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
