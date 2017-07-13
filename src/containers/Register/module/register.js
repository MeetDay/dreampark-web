const SMSCODE = 'redux/register/SMSCODE'
const IDCARD = 'redux/register/IDCARD'

const actionHandlers = {
    [`${SMSCODE}_PENDING`]: (state, action) => ({...state, }),
    [`${SMSCODE}_FULFILLED`]: (state, action) => ({...state, }),
    [`${SMSCODE}_REJECTED`]: (state, action) => ({...state, }),

    [`${IDCARD}_PENDING`]: (state, action) => ({ ...state, idcardLoading: true, idcardLoaded: false }),
    [`${IDCARD}_FULFILLED`]: (state, action) => ({ ...state, idcardLoading: false, idcardLoaded: true, idcardInfo: action.payload }),
    [`${IDCARD}_REJECTED`]: (state, action) => ({ ...state, idcardLoading: false, idcardLoaded: true, idcardError: action.payload })
}

const initialState = {

    idcardLoading: false,
    idcardLoaded: false,
    idcardInfo: null,
    idcardError: null
}

export default function register(state=initialState, action) {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export function comfirmUserInfo(name, cardno) {
    return {
        type: IDCARD,
        payload: (client) => client.get('http://localhost:3000/actions/user/login/idcard', {
            params: { name, cardno }
        })
    }
}

export function getSMSCodeAccordingTo(phonenumber) {
    return {
        type: SMSCODE,
        payload: (client) => client.get('/code')
    }
}
