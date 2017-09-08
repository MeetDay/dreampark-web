/**
 * @Author: WangChao
 * @Date:   2017-09-04T14:34:57+08:00
 * @Email:  crazyitcoder9527@126.com
 * @Project: dreampark-web
 * @Last modified by:   WangChao
 * @Last modified time: 2017-09-07T18:26:56+08:00
 */

const SMSCODE = 'redux/register/SMSCODE'
const IDCARD = 'redux/register/IDCARD'
const SIGNUP = 'redux/register/SIGNUP'
const VIP_INFO = 'redux/regiter/VIP_INFO'

const actionHandlers = {
    [`${SMSCODE}_PENDING`]: (state, action) => ({ ...state, smsCodeSuccess:false, }),
    [`${SMSCODE}_FULFILLED`]: (state, action) => ({ ...state, smsCodeSuccess: true }),
    [`${SMSCODE}_REJECTED`]: (state, action) => ({ ...state, smsCodeSuccess:false, smsCodeError: action.payload }),

    [`${IDCARD}_PENDING`]: (state, action) => ({ ...state, idcardLoading: true, idcardLoaded: false }),
    [`${IDCARD}_FULFILLED`]: (state, action) => ({ ...state, idcardLoading: false, idcardLoaded: true, idcardInfo: action.payload }),
    [`${IDCARD}_REJECTED`]: (state, action) => ({ ...state, idcardLoading: false, idcardLoaded: true, idcardError: action.payload }),

    [`${VIP_INFO}_PENDING`]: (state, action) => ({ ...state, vipInfoLoading: true, vipInfoLoaded: false }),
    [`${VIP_INFO}_FULFILLED`]: (state, action) => ({ ...state, vipInfoLoading: false, vipInfoLoaded: true, vipInfo: action.payload }),
    [`${VIP_INFO}_REJECTED`]: (state, action) => ({ ...state, vipInfoLoading: false, vipInfoLoaded: false, vipInfoError: action.payload })
}

const initialState = {
    idcardLoading: false,
    idcardLoaded: false,
    idcardInfo: null,
    idcardError: null,

    vipInfo: null,
    vipInfoLoading: false,
    vipInfoLoaded: false,
    vipInfoError: null,

    smsCodeSuccess: false,
    smsCodeError: null,
}

export default function register(state=initialState, action) {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export function isVipInfoLoaded(globalState) {
    return globalState.register && globalState.register.vipInfoLoaded
}

export function getVipInfo() {
    return (dispatch, getState) => {
        const { authHeaders } = getState().login;
        return dispatch({
            type: VIP_INFO,
            payload: (client) => client.get('/vip', { headers: authHeaders })
        })
    }
}

export function getSMSCodeAccordingTo(phonenumber) {
    return {
        type: SMSCODE,
        payload: (client) => client.post('/sms/code', {
            data: { zone: 86, phone: phonenumber },
            subpath: '/actions/user'
        })
    }
}

export function comfirmUserInfo(name, cardno) {
    return {
        type: IDCARD,
        payload: (client) => client.get('/login/idcard', {
            params: { name, cardno },
            subpath: '/actions/user'
        })
    }
}
