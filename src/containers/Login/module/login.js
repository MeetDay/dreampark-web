import sha256 from 'js-sha256'
const LOGIN = 'redux/login/LOGIN'
const SIGNUP = 'redux/login/SIGNUP'
const WECHATLOGIN = 'redux/login/WECHATLOGIN'

export function generatorAuthHeadersForUser(user) {
    return {
        'X-Tella-Request-AppVersion': '1.0.0',
        'X-Tella-Request-Provider': 'web',
        'X-Tella-Request-Timestamp': user.token_timestamp,
        'X-Tella-Request-Token': user.access_token,
        'X-Tella-Request-Userid': user.userid,
        'X-Tella-Request-Device': 10
    }
}

const actionhandlers = {
    [`${LOGIN}_PENDING`]: (state, action) => ({ ...state, userLoading: true, userLoaded: false }),
    [`${LOGIN}_FULFILLED`]: (state, action) => ({ ...state, userLoading: false, userLoaded: true, user: action.payload, authHeaders: generatorAuthHeadersForUser(action.payload) }),
    [`${LOGIN}_REJECTED`]: (state, action) => ({ ...state, userLoading: false, userLoaded: true, userLoginError: action.payload }),

    [`${SIGNUP}_PENDING`]: (state, action) => ({...state, userLoading: true, userLoaded: false }),
    [`${SIGNUP}_FULFILLED`]: (state, action) => ({ ...state, userLoading: false, userLoaded: true, user: action.payload, authHeaders: generatorAuthHeadersForUser(action.payload) }),
    [`${SIGNUP}_REJECTED`]: (state, action) => ({ ...state, userLoading: false, userLoaded: true, userRegisterError: action.payload }),
};

const initialState = {
    userLoading: false,
    userLoaded: false,
    userLoginError: null,
    userRegisterError: null,
    user: null,
    authHeaders: null
};

/**
 *  reducer login
 */
export default function login(state=initialState, action) {
    const handler = actionhandlers[action.type];
    return handler ? handler(state, action) : state;
}

/**
 *  user login
 */
export function userLogin(username, password) {
    const data = {
        username,
        password: sha256(password).toUpperCase(),
        timestamp: Math.floor(Date.now() / 1000)
    }
    return {
        type: LOGIN,
        payload: (client) => client.get('/signin', { data })
    }
}

export function userSignup(data) {
    return {
        type: SIGNUP,
        payload: (client) => client.post('/signup', { data })
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
