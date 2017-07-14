const UNUSED_TICKETS = 'redux/tickets/unused'
const USED_TICKETS = 'redux/tickets/used'

const actionHandlers = {
    [`${UNUSED_TICKETS}_PENDING`]: (state, action) => ({ ...state, unusedTikectsLoading: true, unusedTikectsLoaded: false }),
    [`${UNUSED_TICKETS}_FULFILLED`]: (state, action) => ({ ...state, unusedTikectsLoading: false, unusedTikectsLoaded: true, unusedTikects: action.payload.orders, user: action.payload.user }),
    [`${UNUSED_TICKETS}_REJECTED`]: (state, action) => ({ ...state, unusedTikectsLoading: false, unusedTikectsLoaded: true, unusedTikectsError: action.payload }),

    [`${USED_TICKETS}_PENDING`]: (state, action) => ({ ...state, usedTicktsLoading: true, usedTicktsLoaded: false }),
    [`${USED_TICKETS}_FULFILLED`]: (state, action) => ({ ...state, usedTicktsLoading: false, usedTicktsLoaded: true, usedTickts: action.payload }),
    [`${USED_TICKETS}_REJECTED`]: (state, action) => ({ ...state, usedTicktsLoading: false, usedTicktsLoaded: true, usedTicktsError: action.payload })
}

const initialState = {
    user: { id: 1, username: '王超', level: "vip" },
    unusedTikectsLoading: false,
    unusedTikectsLoaded: false,
    unusedTikectsError: null,
    unusedTikects: [{id:1},{id:2}],

    usedTicktsLoading: false,
    usedTicktsLoaded: false,
    usedTicktsError: null,
    usedTickts: [{id:4},{id:5},{id:6},{id:7},{id:8},{id:9}]
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
        const authHeaders = getState().login
        dispatch({
            type: UNUSED_TICKETS,
            payload: (client) => client.get('/unuse_ticket', {
                headers: authHeaders
            })
        })
    }
}

export function getUsedTickts() {
    return (dispatch, getState) => {
        const authHeaders = getState().login
        dispatch({
            type: UNUSED_TICKETS,
            payload: (client) => client.get('/used_ticket', {
                headers: authHeaders
            })
        })
    }
}
