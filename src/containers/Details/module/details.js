const DETAIL = 'redux/details/details'

const actionHandlers = {
    [`${DETAIL}_PENDING`]: (state, action) => ({ ...state, detailLoading: true, detailLoaded: false }),
    [`${DETAIL}_FULFILLED`]: (state, action) => ({ ...state, detailLoading: false, detailLoaded: true, detail: action.payload }),
    [`${DETAIL}_REJECTED`]: (state, action) => ({ ...state, detailLoading: false, detailLoaded: false, detailError: action.payload })
}

const initialState = {
    detailLoading: false,
    detailLoaded: false,
    detailError: null,
    detail: null
}

export default function details(state=initialState, action) {
    const handle = actionHandlers[action.type]
    return handle ? handle(state, action) : state
}

export function isDetailLoaded(globalState) {
    return globalState.details && globalState.details.detail
}

export function getDetailsBy(id) {
    return {
        type: DETAIL,
        payload: (client) => client.get(`/content/${id}`)
    }
}
