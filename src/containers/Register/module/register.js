const SMSCODE = 'redux/register/SMSCODE';


const actionHandlers = {
    `${SMSCODE}_PENDING`: (state, action) => ({...state, }),
    `${SMSCODE}_FULFILLED`: (state, action) => ({...state, }),
    `${SMSCODE}_REJECTED`: (state, action) => ({...state, }),
}

const initialState = {

}

export default function register(state=initialState, action) {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export function getSMSCodeAccordingTo(phonenumber) {
    return {
        action: SMSCODE,
        payload: (client) => client.get('/code')
    }
}
