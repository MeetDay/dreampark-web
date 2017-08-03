// var pingpp = require('pingpp-js');
import superagent from 'superagent'
const SHOPPINGCART = 'redux/shoppingcart/shoppingcart'
const DELETE_SHOPPINGCART_GOODS = 'redux/shoppingcart/delelte_shoppingcart_goods'
const ADD_CONTACT = 'redux/shoppingcart/add_contact'
const TICKET_INFO = 'redux/shoppingcart/ticketinfo'
const TICKET_ORDER_INFO = 'redux/shoppingcart/ticket_order_info'
const TICEKT_ORDER = 'redux/shoppingcart/ticket_order'
const PAYMENT = 'redux/shoppingcart/payment'
const GOODS_COUNT_PER_REQUEST = 20

const actionHandlers = {
    // 购物车
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

    // 删除商品
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

    // 添加联系人
    [`${ADD_CONTACT}_PENDING`]: (state, action) => ({ ...state, contactLoading: true, contactLoaded: false }),
    [`${ADD_CONTACT}_FULFILLED`]: (state, action) => {
        const contact = action.payload
        return { ...state, contactLoading: false, contactLoaded: true, contact: action.payload, contactList: [...state.contactList, contact] }
    },
    [`${ADD_CONTACT}_REJECTED`]: (state, action) => ({ ...state, contactLoading: false, contactLoaded: false, contactError: action.payload }),

    // 票务详情
    [`${TICKET_INFO}_PENDING`]: (state, action) => ({ ...state, ticketInfoLoading: true, ticketInfoLoaded: false }),
    [`${TICKET_INFO}_FULFILLED`]: (state, action) => {
        return { ...state, ticketInfoLoading: false, ticketInfoLoaded: true, ticketInfo: action.payload.ticket, contactList: action.payload.contacters }
    },
    [`${TICKET_INFO}_REJECTED`]: (state, action) => ({ ...state, ticketInfoLoading: false, ticketInfoLoaded: false, ticketInfoError: action.payload }),

    // 生成订单
    [`${TICEKT_ORDER}_PENDING`]: (state, action) => ({ ...state }),
    [`${TICEKT_ORDER}_FULFILLED`]: (state, action) => ({ ...state }),
    [`${TICEKT_ORDER}_REJECTED`]: (state, action) => ({ ...state }),

    // 订单详情
    [`${TICKET_ORDER_INFO}_PENDING`]: (state, action) => ({ ...state, ticektOrderInfoLoading: true, ticketOrderInfoLoaded: false, isTicketOrderInfo:false }),
    [`${TICKET_ORDER_INFO}_FULFILLED`]: (state, action) => {
        const ticketOrderInfo = action.payload
        const contactList = ticketOrderInfo.contacters;
        delete ticketOrderInfo.contacters;
        return { ...state, ticektOrderInfoLoading: false, ticketOrderInfoLoaded: true, isTicketOrderInfo:true, ticketInfo: ticketOrderInfo, contactList: contactList }
    },
    [`${TICKET_ORDER_INFO}_REJECTED`]: (state, action) => ({ ...state, ticektOrderInfoLoading: false, ticketOrderInfoLoaded: false, isTicketOrderInfo:false, ticketOrderInfoError: action.payload })
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
    contact: null,

    ticketInfoLoading: false,
    ticketInfoLoaded: false,
    ticketInfoError: null,
    ticketInfo: null,
    contactList: [],

    ticektOrderInfoLoading: false,
    ticketOrderInfoLoaded: false,
    ticketOrderInfoError: null,
    isTicketOrderInfo: false
}

export default function shoppingcart(state=initialState, action) {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export function isShoppingcartLoaded(globalState) {
    return globalState.shoppingcart && globalState.shoppingcart.shoppingcartLoaded
}

export function isTicketInfoLoaded(globalState) {
    return globalState.shoppingcart && globalState.shoppingcart.ticketInfoLoaded
}

export function isTicketOrderInfoLoaded(globalState) {
    return globalState.shoppingcart && globalState.shoppingcart.ticketOrderInfoLoaded
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

//得到订单详情
export function getTicketOrderInfoBy(ticketOrderNo) {
    return (dispatch, getState) => {
        const { authHeaders } = getState().login
        return dispatch({
            type: TICKET_ORDER_INFO,
            payload: (client) => client.get(`/orders_info/${ticketOrderNo}`, { headers: authHeaders })
        })
    }
}


// 补充订单信息
export function getTicketInfoBy(ticketID) {
    return (dispatch, getState) => {
        const { authHeaders } = getState().login
        return dispatch({
            type: TICKET_INFO,
            payload: (client) => client.get(`/tickets/ticket_order_info/${ticketID}`, {
                headers: authHeaders,
                subpath: '/fbpark/v1'
            })
        })
    }
}

export function addContact(contact) {
    return (dispatch, getState) => {
        const { authHeaders } = getState().login
        return dispatch({
            type: ADD_CONTACT,
            payload: (client) => client.get('http://localhost:3000/actions/user/login/idcard', { params: contact, subpath: '/actions/user' })
                .then(result => {
                    return client.post('/contacter', {
                        headers: authHeaders,
                        data: { name: contact.name, identity_card: contact.cardno }
                    })
                })
        })
    }
}

// 生成订单并且提交支付
export function submitTicketOrder(totalPrice, ticketInfo, selectedContacts) {
    const order = { amount: totalPrice, ticket: { id: ticketInfo.id, contacters: selectedContacts.map(contact => contact.id) } }
    return (dispatch, getState) => {
        const { authHeaders } = getState().login
        return dispatch({
            type: TICEKT_ORDER,
            payload: (client) =>
                client.post('/add_order', { headers: authHeaders, data: order })
                    .then(result => {
                        return client.post('/charge', { headers: authHeaders, data: { id: result.orders_id, pay_type: 'wx_pub', amount: totalPrice }})
                    })
                    .then(charge => {
                        console.log(charge)
                        pingpp.createPayment(charge, (result, error) => {
                            console.log(result)
                            console.log(error)
                        })
                    })
        })
    }
}

// 支付
export function payment(payment) {
    const realPayment = Object.assign({ pay_type: 'wx_pub', open_id: 'oUr10wDQslvet8jtmGa_JAoAVvmI' }, payment)
    return (dispatch, getState) => {
        const { authHeaders } = getState().login
        return dispatch({
            type: PAYMENT,
            payload: (client) =>
                client.post('/charge', { headers: authHeaders, data: realPayment })
                    .then(charge => {
                        pingpp.createPayment(charge, (result, error) => {
                            if (result == 'success') {
                                return client.post('/check_charge', { headers: authHeaders, data: { id: payment.id } })
                            } else if (result == 'fail') {

                            } else if (result === 'cancel') {

                            }
                        })
                    })
                    .then(result => {
                        console.log(result)
                    })
        })
    }
}
