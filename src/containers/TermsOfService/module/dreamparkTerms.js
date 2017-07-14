const TERM = 'redux/terms/term'

const actionHandlers = {
    [`${TERM}_PENDING`]: (state, action) => ({...state, termLoading: true, termLoaded: false}),
    [`${TERM}_FULFILLED`]: (state, action) => ({ ...state, termLoading: false, termLoaded: true, title: action.payload.title, coverImage: action.payload.cover_image, elements: action.payload.elements }),
    [`${TERM}_REJECTED`]: (state, action) => ({...state, termLoading: false, termLoaded: false })
}

const initialState = {
    termLoading: false,
    termLoaded: false,
    termError: null,
    title: '',
    coverImage: null,
    elements: []
}

export default function dreamparkTerms(state=initialState, action) {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export function getUserTermsBy(serviceType) {
    return {
        type: TERM,
        payload: (client) => client.get(`/setting/${serviceType}`)
    }
}

export function isTermLoaded(globalState) {
    return globalState.terms && globalState.terms.termLoaded
}
