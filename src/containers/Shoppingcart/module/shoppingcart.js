
const actionHandlers = {

}

const initialState = {

}

export default function shoppingcart(state = initialState, action) {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}
