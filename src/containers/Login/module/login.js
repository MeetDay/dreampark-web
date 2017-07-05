
const LOGIN = 'redux/login/LOGIN';

const actionhandlers = {
    [`${LOGIN}_PENDING`]: (state, action) => ({...state, }),
    [`${LOGIN}_FULFILLED`]: (state, action) => ({...state, }),
    [`${LOGIN}_REJECTED`]: (state, action) => ({...state, }),
};

const initialState = {

};

export default function login(state=initialState, action) {
    const handler = actionhandlers[action.type];
    return handler ? hander(state, action) : state;
}
