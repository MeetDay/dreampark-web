
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
    const data = { username, password, timestamp: new Date() }
    return {
        type: LOGIN,
        payload: (client) => client.get('/login/wechat', { data, subpath: '/actions/user'})
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
