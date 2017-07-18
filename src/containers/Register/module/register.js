const SMSCODE = 'redux/register/SMSCODE'
const IDCARD = 'redux/register/IDCARD'
const SIGNUP = 'redux/register/SIGNUP'

const actionHandlers = {
    [`${SMSCODE}_PENDING`]: (state, action) => ({ ...state, smsCodeSuccess:false, }),
    [`${SMSCODE}_FULFILLED`]: (state, action) => ({ ...state, smsCodeSuccess: true }),
    [`${SMSCODE}_REJECTED`]: (state, action) => ({ ...state, smsCodeSuccess:false, smsCodeError: action.payload }),

    [`${IDCARD}_PENDING`]: (state, action) => ({ ...state, idcardLoading: true, idcardLoaded: false }),
    [`${IDCARD}_FULFILLED`]: (state, action) => ({ ...state, idcardLoading: false, idcardLoaded: true, idcardInfo: action.payload }),
    [`${IDCARD}_REJECTED`]: (state, action) => ({ ...state, idcardLoading: false, idcardLoaded: true, idcardError: action.payload })
}

const initialState = {
    idcardLoading: false,
    idcardLoaded: false,
    idcardInfo: null,
    idcardError: null,

    smsCodeSuccess: false,
    smsCodeError: null
}

export default function register(state=initialState, action) {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export function getSMSCodeAccordingTo(phonenumber) {
    return {
        type: SMSCODE,
        payload: (client) => client.post('http://localhost:3000/actions/user/sms/code', {
            data: { zone: 86, phone: phonenumber }
        })
    }
}

export function comfirmUserInfo(name, cardno) {
    return {
        type: IDCARD,
        payload: (client) => client.get('http://localhost:3000/actions/user/login/idcard', {
            params: { name, cardno }
        })
    }
}
