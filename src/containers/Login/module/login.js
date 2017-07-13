import sha256 from 'js-sha256'
const LOGIN = 'redux/login/LOGIN'
const SIGNUP = 'redux/login/SIGNUP'
const WECHATLOGIN = 'redux/login/WECHATLOGIN'

const actionhandlers = {
    [`${LOGIN}_PENDING`]: (state, action) => ({
        ...state,
        loading: true,
        loaded: false
    }),
    [`${LOGIN}_FULFILLED`]: (state, action) => {
        console.log(action)
        return {
            ...state,
            loading: false,
            loaded: true
        }
    },
    [`${LOGIN}_REJECTED`]: (state, action) => ({
        ...state,
        loading: false,
        loaded: true
    })
};

const initialState = {
    loading: false,
    loaded: false
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
