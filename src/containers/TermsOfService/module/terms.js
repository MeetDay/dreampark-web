const AGREEMENT = 'redux/terms/AGREEMENT'
const PRIVACY = 'redux/terms/PRIVACY'
const NOTICE = 'redux/terms/NOTICE'

const actionhandlers = {
    [`${AGREEMENT}_PENDING`]: (state, action) => ({...state, loading: true, loaded: false}),
    [`${AGREEMENT}_FULFILLED`]: (state, action) => ({...state, loading: false, loaded: true, }),
    [`${AGREEMENT}_REJECTED`]: (state, action) => ({...state}),

    [`${PRIVACY}_PENDING`]: (state, action) => ({...state}),
    [`${PRIVACY}_FULFILLED`]: (state, action) => ({...state}),
    [`${PRIVACY}_REJECTED`]: (state, action) => ({...state}),

    [`${NOTICE}_PENDING`]: (state, action) => ({...state}),
    [`${NOTICE}_FULFILLED`]: (state, action) => ({...state}),
    [`${NOTICE}_REJECTED`]: (state, action) => ({...state}),
}

const initialState = {
    loading: false,
    loaded: false,
    term: null
}

export default function terms(state = initialState, action) {
    const handler = actionhandlers[action.type]
    return handler ? handler(state, action) : state
}

export function getUserAgreement() {
    return {
        action: AGREEMENT,
        payload: (client) => client.get('')
    }
}

export function getPrivicyPolicy() {
    return {
        action: PRIVACY,
        payload: (client) => client.get('')
    }
}

export function getAdmissionNotice() {
    return {
        action: NOTICE,
        payload: (client) => client.get('')
    }
}
