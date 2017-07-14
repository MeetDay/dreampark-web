const HOTDETAIL = 'redux/hotdetail/hotdetail'

const actionHandlers = {

}

const initialState = {

}

export default function hotdetail(state=initialState, action) {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export function getHotDetailBy(id) {
    return (dispatch, getState) => {
        authHeaders = getState().login
        dispatch({
            type: HOTDETAIL,
            payload: (client) => client.get(`/get_content/${id}`, { headers: authHeaders })
        })
    }
}
