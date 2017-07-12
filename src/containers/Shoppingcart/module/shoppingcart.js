const CHECKEDITEM = 'redux/shoppingcart/checkeditem'
const UNCHECKEDITEM = 'redux/shoppingcart/uncheckeditem'
const CHECKEDALLITEMS = 'redux/shoppingcart/checkedallitems'
const UNCHECKEDALLITEMS = 'redux/shoppingcart/uncheckedallitems'
const SHOPPINGCART = 'redux/shoppingcart/shoppingcart'
const DELETE_SHOPPINGCART_GOODS = 'redux/shoppingcart/delelte_shoppingcart_goods'
const GOODS_COUNT_PER_REQUEST = 20

const actionHandlers = {
    [CHECKEDITEM]: (state, action) => {
        const item = action.payload
        let checkedItems = state.checkedItems
        if (!state.checkedItems.includes(item)) checkedItems.push(item)
        return { ...state, checkedItems: [...checkedItems] }
    },
    [UNCHECKEDITEM]: (state, action) => {
        const item = action.payload
        const checkedItems = state.checkedItems.filter((element) => item.id !== element.id)
        return { ...state, checkedItems: [...checkedItems] }
    },
    [CHECKEDALLITEMS]: (state, action) => ({ ...state, checkedItems:[...state.shoppingcarts] }),
    [UNCHECKEDALLITEMS]: (state, action) => ({ ...state, checkedItems:[] }),

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

    [`${DELETE_SHOPPINGCART_GOODS}_PENDING`]: (state, action) => ({ ...state }),
    [`${DELETE_SHOPPINGCART_GOODS}_FULFILLED`]: (state, action) => ({ ...state }),
    [`${DELETE_SHOPPINGCART_GOODS}_REJECTED`]: (state, action) => ({ ...state })
}

const initialState = {
    shoppingcartLoading: false,
    shoppingcartLoaded: false,
    shoppingcartError: null,
    shoppingcarts: [{id:1}, {id:2}, {id:3}, {id:4}, {id:5}, {id:6}, {id:7}, {id:8}],
    checkedItems: [],
    hasMoreGoods: false,
    maxGoodsID: 0
}

export default function shoppingcart(state=initialState, action) {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export function getShoppingcart() {
    return (getState, dispatch) => {
        const { authHeaders } = getState().login
        const { maxGoodsID } = getState().shoppingcart
        dispatch({
            type: SHOPPINGCART,
            payload: (client) => client.get('/users/cart', {
                params: { max_id: maxGoodsID },
                headers: authHeaders
            })
        })
    }
}

export function deleteGoodsFromShoppingCart(goods) {
    return (getState, dispatch) => {
        const authHeaders = getState().login
        dispatch({
            type: DELETE_SHOPPINGCART_GOODS,
            payload: (client) => client.del(`/users/cart/${goods.id}`, {
                header: authHeaders
            })
        })
    }
}

export function checkedAllItems() {
    return { type: CHECKEDALLITEMS }
}

export function unCheckedAllItems() {
    return { type: UNCHECKEDALLITEMS }
}

export function checkedItem(item) {
    return {
        type: CHECKEDITEM,
        payload: item
    }
}

export function uncheckedItem(item) {
    return {
        type: UNCHECKEDITEM,
        payload: item
    }
}
