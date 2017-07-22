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
        dispatch({
            type: HOTDETAIL,
            payload: (client) => client.get(`/pois/${id}`, { headers: authHeaders, subpath: '/fbpark/v1' })
        })
    }
}

export function isHotDetailLoaded(globalState) {
    console.log(globalState.hotdetail)
    return globalState.hotdetail && globalState.hotdetail.hotDetail
}
