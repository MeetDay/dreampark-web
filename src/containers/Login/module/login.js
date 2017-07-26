import sha256 from 'js-sha256'
import Cookies from 'universal-cookie'
import * as Constant from '../../../utils/constant'

const LOGIN = 'redux/login/LOGIN'
const SIGNUP = 'redux/login/SIGNUP'
const UPDATE_USER = 'redux/login/UPDATE_USER'
const WECHATLOGIN = 'redux/login/WECHATLOGIN'
const LOADCOOKIESYNC = 'redux/login/LOADCOOKIESYNC'
const LOADCOOKIE = 'redux/login/LOADCOOKIE'

export function isEmptyObject(obj) {
    return obj === undefined || obj === null || Object.keys(obj).length === 0
}

export function generatorAuthHeadersForUser(user) {
    if (isEmptyObject(user)) return
    return {
        ['X-Tella-Request-AppVersion']: '1.0.0',
        ['X-Tella-Request-Provider']: 'web',
        ['X-Tella-Request-Timestamp']: user.token_timestamp,
        ['X-Tella-Request-Token']: user.access_token,
        ['X-Tella-Request-Userid']: user.userid,
        ['X-Tella-Request-Device']: 10
    }
}

const actionhandlers = {
    [`${LOGIN}_PENDING`]: (state, action) => ({ ...state, userLoading: true, userLoaded: false }),
    [`${LOGIN}_FULFILLED`]: (state, action) => ({ ...state, userLoading: false, userLoaded: true, user: action.payload, authHeaders: generatorAuthHeadersForUser(action.payload) }),
    [`${LOGIN}_REJECTED`]: (state, action) => ({ ...state, userLoading: false, userLoaded: true, userLoginError: action.payload }),

    [`${SIGNUP}_PENDING`]: (state, action) => ({...state, signupLoading: true, signupLoaded: false }),
    [`${SIGNUP}_FULFILLED`]: (state, action) => ({ ...state, signupLoading: false, signupLoaded: true, user: action.payload, authHeaders: generatorAuthHeadersForUser(action.payload) }),
    [`${SIGNUP}_REJECTED`]: (state, action) => ({ ...state, signupLoading: false, signupLoaded: false, userSignupError: action.payload }),

    [`${UPDATE_USER}_PENDING`]: (state, action) => ({ ...state, updateUserLoading: true, updateUserLoaded: false }),
    [`${UPDATE_USER}_FULFILLED`]: (state, action) => ({ ...state, updateUserLoading: false, updateUserLoaded: true, user: action.payload }),
    [`${UPDATE_USER}_REJECTED`]: (state, action) => ({ ...state, updateUserLoading: false, updateUserLoaded: false, updateUserError: action.payload }),

    [`${WECHATLOGIN}_PENDING`]: (state, action) => ({ ...state, weChatInfoLoading: true, weChatInfoLoaded: false }),
    [`${WECHATLOGIN}_FULFILLED`]: (state, action) => {
        const { data } = action.payload
        console.log(data)
        return {
            ...state,
            weChatInfoLoading: false,
            weChatInfoLoaded: true,
            weChatInfo: data.weChatUserInfo,
            weChatInfoError: data.userError,
            user: data.userInfo,
            authHeaders: generatorAuthHeadersForUser(data.userInfo)
        }
    },
    [`${WECHATLOGIN}_REJECTED`]: (state, action) => ({...state, weChatInfoLoading: false, weChatInfoLoaded: false, weChatInfoError: action.payload.data }),

    [`${LOADCOOKIESYNC}`]: (state, action) => ({ ...state, user: action.cookie, authHeaders: generatorAuthHeadersForUser(action.cookie) })
};

const initialState = {
    userLoading: false,
    userLoaded: false,
    userLoginError: null,

    signupLoading: false,
    signupLoaded: false,
    userSignupError: null,

    updateUserLoading: false,
    updateUserLoaded: false,
    updateUserError: null,

    user: null,
    authHeaders: null,

    weChatInfo: null,
    weChatInfoLoading: false,
    weChatInfoLoaded: false,
    weChatInfoError: null
};

/**
 *  reducer login
 */
export default function login(state=initialState, action) {
    const handler = actionhandlers[action.type];
    return handler ? handler(state, action) : state;
}

// user login
export function userLogin(username, password) {
    const data = {
        username,
        password: sha256(password),
        timestamp: Math.floor(Date.now() / 1000)
    }
    return {
        type: LOGIN,
        payload: (client) => client.get('/signin', { data })
    }
}

// user signup
export function userSignup(data) {
    return {
        type: SIGNUP,
        payload: (client) => client.post('/signup', { data })
    }
}

// user update
export function updateUserInfo(data) {
    return (dispatch, getState) => {
        const { user, authHeaders } = getState().login
        dispatch({
            type: UPDATE_USER,
            payload: (client) => client.post(`/${user.id}`, { data, headers: authHeaders })
        })
    }
}

/**
 *  wechat login
 */
export function wechatLogin(code) {
    return {
        type: WECHATLOGIN,
        payload: (client) => client.get('/login/wechat', { params: { code }, subpath: '/actions/user' })
    }
}

export function isWechatInfoLoaded(globalState) {
     return globalState.login && globalState.login.weChatInfo
}

/**
 *  cookie
 */
export function loadCookieSync(cookie) {
    return {
        type: LOADCOOKIESYNC,
        cookie
    }
}

export function loadCookie() {
    const cookies = new Cookies()
    return loadCookieSync(cookies.get(Constant.USER_COOKIE))
}

export function isCookieLoaded(globalState) {
    return globalState.login && globalState.login.user
}
