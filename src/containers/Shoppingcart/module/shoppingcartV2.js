import Cookies from 'universal-cookie'
import superagent from 'superagent'
import * as Constant from '../../../utils/constant'

const SHOPPINGCART = 'redux/shoppingcart/shoppingcart'
const DELETE_SHOPPINGCART_GOODS = 'redux/shoppingcart/delelte_shoppingcart_goods'
const ADD_TICKET_TO_SHOPPINGCART = 'redux/shoppingcart/add_ticket_to_shoppingcart'
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
        let shoppingcarts = action.payload, hasMoreGoods = false, maxGoodsID = undefined;
        if (state.hasMoreGoods && shoppingcarts && Array.isArray(shoppingcarts)) {
            shoppingcarts = [...state.shoppingcarts, ...shoppingcarts];
        }
        if (shoppingcarts && Array.isArray(shoppingcarts) && shoppingcarts.length == GOODS_COUNT_PER_REQUEST){
            hasMoreGoods = true;
        }
        if (shoppingcarts && Array.isArray(shoppingcarts) && shoppingcarts.length > 0) {
            maxGoodsID = shoppingcarts[shoppingcarts.length - 1].id;
        }
        return {
            ...state,
            shoppingcartLoading: false,
            shoppingcartLoaded: true,
            shoppingcarts: shoppingcarts,
            hasMoreGoods: hasMoreGoods,
            maxGoodsID: maxGoodsID
        }
    },
    [`${SHOPPINGCART}_REJECTED`]: (state, action) => ({ ...state, shoppingcartLoading: false, shoppingcartLoaded: true, shoppingcartError: action.payload }),

    // 添加至购物车
    [`${ADD_TICKET_TO_SHOPPINGCART}_PENDING`]: (state, action) => ({ ...state, addTicketToShoppingcartLoading: true, addTicketToShoppingcartLoaded: false }),
    [`${ADD_TICKET_TO_SHOPPINGCART}_FULFILLED`]: (state, action) => ({ ...state, addTicketToShoppingcartLoading: false, addTicketToShoppingcartLoaded: true, addTicketToShoppingcart: action.payload }),
    [`${ADD_TICKET_TO_SHOPPINGCART}_REJECTED`]: (state, action) => ({ ...state, addTicketToShoppingcartLoading: false, addTicketToShoppingcartLoaded: false, addTicketToShoppingcartError: action.payload }),

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
        let checkedContactsNoInsurance = [], contacters = action.payload.contacters;
        if (contacters && contacters.length > 0 && contacters[0].insurant == 'no') {
            checkedContactsNoInsurance = [contacters[0]];
        }
        return {
            ...state,
            ticketInfoLoading: false,
            ticketInfoLoaded: true,
            ticketInfo: action.payload.ticket,
            contactList: action.payload.contacters,
            checkedContactsNoInsurance: checkedContactsNoInsurance
        }
    },
    [`${TICKET_INFO}_REJECTED`]: (state, action) => ({ ...state, ticketInfoLoading: false, ticketInfoLoaded: false, ticketInfoError: action.payload }),

    // 生成订单并支付
    [`${TICEKT_ORDER}_PENDING`]: (state, action) => ({ ...state, generatorTicketOrderLoading: true, generatorTicketOrderLoaded: false }),
    [`${TICEKT_ORDER}_FULFILLED`]: (state, action) => ({ ...state, generatorTicketOrderLoading: false, generatorTicketOrderLoaded: true, generatorTicketOrder: action.payload }),
    [`${TICEKT_ORDER}_REJECTED`]: (state, action) => ({ ...state, generatorTicketOrderLoading: false, generatorTicketOrderLoaded: false, generatorTicketOrderError: action.payload }),

    // 支付订单
    [`${PAYMENT}_PENDING`]: (state, action) => ({ ...state, paymentLoading: true, paymentLoaded: false }),
    [`${PAYMENT}_FULFILLED`]: (state, action) => ({ ...state, paymentLoading: false, paymentLoaded: true, payment: action.payload }),
    [`${PAYMENT}_REJECTED`]: (state, action) => ({ ...state, paymentLoading: false, paymentLoaded: false, paymentError: action.payload }),

    // 订单详情
    [`${TICKET_ORDER_INFO}_PENDING`]: (state, action) => ({ ...state, ticektOrderInfoLoading: true, ticketOrderInfoLoaded: false, isTicketOrderInfo:true }),
    [`${TICKET_ORDER_INFO}_FULFILLED`]: (state, action) => {
        let checkedContactsNoInsurance = [];
        const ticketOrderInfo = action.payload;
        const contactList = ticketOrderInfo.contacters;
        delete ticketOrderInfo.contacters;
        if (contactList && contactList.length > 0) {
            checkedContactsNoInsurance = contactList.filter(contact => contact.insurant == 'no');
        }
        return {
            ...state,
            ticektOrderInfoLoading: false,
            ticketOrderInfoLoaded: true,
            isTicketOrderInfo:true,
            ticketInfo: ticketOrderInfo,
            contactList: contactList,
            checkedContactsNoInsurance: checkedContactsNoInsurance
        }
    },
    [`${TICKET_ORDER_INFO}_REJECTED`]: (state, action) => ({ ...state, ticektOrderInfoLoading: false, ticketOrderInfoLoaded: false, isTicketOrderInfo:true, ticketOrderInfoError: action.payload })
}

const initialState = {
    // 购物车
    shoppingcartLoading: false,
    shoppingcartLoaded: false,
    shoppingcartError: null,
    shoppingcarts: [],

    hasMoreGoods: false,
    maxGoodsID: undefined,

    // 删除票
    deleteGoodsLoading: false,
    deleteGoodsLoaded: false,

    // 添加至购物车
    addTicketToShoppingcartLoading: false,
    addTicketToShoppingcartLoaded: false,
    addTicketToShoppingcartError: null,
    addTicketToShoppingcart: null,

    // 添加联系人
    contactLoading: false,
    contactLoaded: false,
    contactError: null,
    contact: null,

    // 票务信息页
    ticketInfoLoading: false,
    ticketInfoLoaded: false,
    ticketInfoError: null,
    ticketInfo: null,
    contactList: [],
    checkedContactsNoInsurance: [],

    // 订单详情页
    ticektOrderInfoLoading: false,
    ticketOrderInfoLoaded: false,
    ticketOrderInfoError: null,
    isTicketOrderInfo: false,

    // 票务信息页生成订单并支付
    generatorTicketOrderLoading: false,
    generatorTicketOrderLoaded: false,
    generatorTicketOrderError: null,
    generatorTicketOrder: null,

    // 订单支付
    paymentLoading: false,
    paymentLoaded: false,
    paymentError: null,
    paymentObject: null
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

export function addTicketToShoppingcart(ticketID) {
    return (dispatch, getState) => {
        const { authHeaders } = getState().login
        return dispatch({
            type: ADD_TICKET_TO_SHOPPINGCART,
            payload: (client) => client.post('/cart/add', { headers: authHeaders, data: { ticket_id: ticketID } })
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
            payload: (client) => client.get('/login/idcard', { params: contact, subpath: '/actions/user' })
                .then(result => {
                    return client.post('/contacter', {
                        headers: authHeaders,
                        data: {
                            name: contact.name,
                            identity_card: contact.cardno,
                            gender: result.data.sex,
                            birthday: result.data.birthday
                        }
                    })
                })
        })
    }
}

// 生成订单并且提交支付
export function submitTicketOrder(ticketInfo) {
    return (dispatch, getState) => {
        const { authHeaders } = getState().login
        return dispatch({
            type: TICEKT_ORDER,
            payload: (client) => client.post('/add_order', { headers: authHeaders, data: ticketInfo })
                .then(orderInfo => {
                    const cookies = new Cookies()
                    const openID = cookies.get(Constant.USER_OPENID)
                    return client.post('/charge', { headers: authHeaders, data: { id: orderInfo.orders_id, amount: ticketInfo.amount, open_id: 'oUr10wDQslvet8jtmGa_JAoAVvmI', pay_type: 'wx_pub' }})
                })
                .then(charge => {
                    return new Promise((resolve, reject) => {
                        pingpp.createPayment(charge, (result, error) => {
                            if (result == 'success') {
                                resolve(client.post('/check_charge', { headers: authHeaders, data: { charge_id: charge.id, order_no: charge.orderNo } }))
                            } else if (result == 'fail' ) {
                                console.log(error)
                                reject(error)
                            } else if (result == 'cancel') {
                                console.log(error)
                                reject(error)
                            }
                        })
                    })
                })
        })
    }
}

// 支付
export function payment(payment) {
    const cookies = new Cookies()
    const openID = cookies.get(Constant.USER_OPENID)
    const realPayment = Object.assign({ pay_type: 'wx_pub', open_id: 'oUr10wDQslvet8jtmGa_JAoAVvmI' }, payment)
    return (dispatch, getState) => {
        const { authHeaders } = getState().login
        return dispatch({
            type: PAYMENT,
            payload: (client) => client.post('/charge', { headers: authHeaders, data: realPayment })
                .then(charge => {
                    return new Promise((resolve, reject) => {
                        pingpp.createPayment(charge, (result, error) => {
                            if (result == 'success') {
                                resolve(client.post('/check_charge', { headers: authHeaders, data: { charge_id: charge.id, order_no: charge.orderNo } }))
                            } else if (result == 'fail') {
                                reject(error)
                            } else if (result === 'cancel') {
                                reject(error)
                            }
                        })
                    })
                })
        })
    }
}
