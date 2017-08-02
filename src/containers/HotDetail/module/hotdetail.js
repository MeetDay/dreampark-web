const HOTDETAIL = 'redux/hotdetail/hotdetail'

const actionHandlers = {
    [`${HOTDETAIL}_PENDING`]: (state, action) => ({ ...state, hotDetailLoading: true, hotDetailLoaded: false }),
    [`${HOTDETAIL}_FULFILLED`]: (state, action) => ({ ...state, hotDetailLoading: false, hotDetailLoaded: true, hotDetail: action.payload }),
    [`${HOTDETAIL}_REJECTED`]: (state, action) => ({ ...state, hotDetailLoading: false, hotDetailLoaded: false, hotDetailError: action.payload })
}

const initialState = {
    hotDetailLoading: false,
    hotDetailLoaded: false,
    hotDetailError: null,
    hotDetail: null
}

export default function hotdetail(state=initialState, action) {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export function getHotDetailBy(id) {
    return (dispatch, getState) => {
        const { authHeaders } = getState().login
        return dispatch({
            type: HOTDETAIL,
            payload: (client) => client.get(`/pois/${id}`, { headers: authHeaders, subpath: '/fbpark/v1' })
        })
    }
}

export function collectHotDetail(id) {
    return (dispatch, getState) => {
        const { authHeaders } = getState().login;
        return dispatch({
            type: 'redux/hotdetail/collect',
            payload: (client) => client.post(`/${id}/collect`, { headers: authHeaders })
        })
    }
}

export function isHotDetailLoaded(globalState) {
    return globalState.hotdetail && globalState.hotdetail.hotDetail
}
