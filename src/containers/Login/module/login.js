
const LOGIN = 'redux/login/LOGIN'
const SIGNUP = 'redux/login/SIGNUP'
const WECHATLOGIN = 'redux/login/WECHATLOGIN'

const actionhandlers = {
    [`${LOGIN}_PENDING`]: (state, action) => ({...state, }),
    [`${LOGIN}_FULFILLED`]: (state, action) => ({...state, }),
    [`${LOGIN}_REJECTED`]: (state, action) => ({...state, }),
};

const initialState = {

};

/**
 *  reducer login
 */
export default function login(state=initialState, action) {
    const handler = actionhandlers[action.type];
    return handler ? hander(state, action) : state;
}

/**
 *  user login
 */
export function userLogin(username, password) {
    const data = { username, password, timestamp: new Date() }
    return {
        type: LOGIN,
        payload: (client) => client.post('/signin', { data })
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
