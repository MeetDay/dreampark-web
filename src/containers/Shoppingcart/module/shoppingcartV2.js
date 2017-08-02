const SHOPPINGCART = 'redux/shoppingcart/shoppingcart'
const DELETE_SHOPPINGCART_GOODS = 'redux/shoppingcart/delelte_shoppingcart_goods'
const ADD_CONTACT = 'redux/shoppingcart/add_contact'
const TICKET_INFO = 'redux/shoppingcart/ticketinfo'
const GOODS_COUNT_PER_REQUEST = 20

const actionHandlers = {
    [`${SHOPPINGCART}_PENDING`]: (state, action) => ({ ...state, shoppingcartLoading: true, shoppingcartLoaded: false }),
    [`${SHOPPINGCART}_FULFILLED`]: (state, action) => {
        let shoppingcarts = action.payload, hasMoreGoods = false, maxGoodsID = 0
        if (state.hasMoreGoods && state.maxGoodsID > 0) shoppingcarts = [...state.shoppingcarts, ...shoppingcarts]
        if (shoppingcarts.length >= GOODS_COUNT_PER_REQUEST) hasMoreGoods = true
        if (hasMoreGoods) maxGoodsID = shoppingcarts[shoppingcarts.length - 1].id
        return {
            ...state,
            shoppingcarts: shoppingcarts,
            hasMoreGoods: hasMoreGoods,
            maxGoodsID: maxGoodsID
        }
    },
    [`${SHOPPINGCART}_REJECTED`]: (state, action) => ({ ...state, shoppingcartLoading: false, shoppingcartLoaded: true, shoppingcartError: action.payload }),

    [`${DELETE_SHOPPINGCART_GOODS}_PENDING`]: (state, action) => ({ ...state, deleteGoodsLoading: true, deleteGoodsLoaded:false }),
    [`${DELETE_SHOPPINGCART_GOODS}_FULFILLED`]: (state, action) => {
        const { id: goodsID } = action.payload
        const newShoppingcarts = state.shoppingcarts.filter((goods) => goods.id !== goodsID)
        return {
            ...state,
            shoppingcarts: [...newShoppingcarts],
            deleteGoodsLoading: false,
            deleteGoodsLoaded: true
        }
    },
    [`${DELETE_SHOPPINGCART_GOODS}_REJECTED`]: (state, action) => ({ ...state, deleteGoodsLoading: false, deleteGoodsLoaded:false }),

    [`${ADD_CONTACT}_PENDING`]: (state, action) => ({ ...state, contactLoading: true, contactLoaded: false }),
    [`${ADD_CONTACT}_FULFILLED`]: (state, action) => {
        const contact = action.payload
        console.log(contact)
        return {
            ...state,
            contactLoading: false,
            contactLoaded: true,
            contactList: [...state.contactList, contact]
        }
    },
    [`${ADD_CONTACT}_REJECTED`]: (state, action) => ({ ...state, contactLoading: false, contactLoaded: false, contactError: action.payload }),

    [`${TICKET_INFO}_PENDING`]: (state, action) => ({ ...state, ticketInfoLoading: true, ticketInfoLoaded: false }),
    [`${TICKET_INFO}_FULFILLED`]: (state, action) => ({ ...state, ticketInfoLoading: false, ticketInfoLoaded: true, ticketInfo: action.payload.ticket, contactList: action.payload.contacters }),
    [`${TICKET_INFO}_REJECTED`]: (state, action) => ({ ...state, ticketInfoLoading: false, ticketInfoLoaded: false, ticketInfoError: action.payload }),
}

const initialState = {
    shoppingcartLoading: false,
    shoppingcartLoaded: false,
    shoppingcartError: null,
    shoppingcarts: [{id:1, total: 423}, {id:2, total: 23}, {id:3, total: 234}, {id:4, total: 767}, {id:5, total: 345}, {id:6, total: 908}, {id:7, total: 438}, {id:8, total: 656}],

    hasMoreGoods: false,
    maxGoodsID: 0,

    deleteGoodsLoading: false,
    deleteGoodsLoaded: false,

    contactLoading: false,
    contactLoaded: false,
    contactError: null,

    ticketInfoLoading: false,
    ticketInfoLoaded: false,
    ticketInfoError: null,
    ticketInfo: null,
    contactList: []
}

export default function shoppingcart(state=initialState, action) {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export function isShoppingcartLoaded(globalState) {
    return globalState.shoppingcart && globalState.shoppingcart.shoppingcarts
}

export function isTicketInfoLoaded(globalState) {
    return globalState.shoppingcart && globalState.shoppingcart.ticketInfo
}

export function getShoppingcart() {
    return (dispatch, getState) => {
        const { authHeaders } = getState().login
        const { maxGoodsID } = getState().shoppingcart
        return dispatch({
            type: SHOPPINGCART,
            payload: (client) => client.get('/cart', {
                params: { max_id: maxGoodsID },
                headers: authHeaders
            })
        })
    }
}

export function deleteGoodsFromShoppingCart(goods) {
    return (dispatch, getState) => {
        const { authHeaders } = getState().login
        return dispatch({
            type: DELETE_SHOPPINGCART_GOODS,
            payload: (client) => client.del(`/cart/${goods.id}`, {
                headers: authHeaders
            })
        })
    }
}

export function getTicketInfoBy(ticketID) {
    return (dispatch, getState) => {
        const { authHeaders } = getState().login
        return dispatch({
            type: TICKET_INFO,
            payload: (client) => client.get(`/tickets/ticket_order_info/${ticketID}`, {
                headers: authHeaders
            })
        })
    }
}

export function addContact(contact) {
    return {
        type: ADD_CONTACT,
        payload: (client) =>
            client.get('/login/idcard', { params: contact, subpath: '/actions/user' })
                .then((err, { body } = {}) => {
                    if (!err && body && body.resp.code === 0) {
                        return (dispatch, getState) => {
                            const { authHeaders } = getState().login
                            return dispatch({
                                type: ADD_CONTACT,
                                payload: (client) => client.post('/contacter', {
                                    headers: authHeaders,
                                    data: contact
                                })
                            })
                        }
                    }
                }).catch(err => console.log(err))
    }
}
