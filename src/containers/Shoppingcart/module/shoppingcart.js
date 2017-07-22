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
        return { ...state, checkedItems: [...checkedItems], checkedItemsTotalPrice: caclCheckedItemsPrice(checkedItems) }
    },
    [UNCHECKEDITEM]: (state, action) => {
        const item = action.payload
        const checkedItems = state.checkedItems.filter((element) => item.id !== element.id)
        return { ...state, checkedItems: [...checkedItems], checkedItemsTotalPrice: caclCheckedItemsPrice(checkedItems) }
    },

    [CHECKEDALLITEMS]: (state, action) => ({ ...state, checkedItems:[...state.shoppingcarts], checkedItemsTotalPrice: caclCheckedItemsPrice(state.shoppingcarts) }),
    [UNCHECKEDALLITEMS]: (state, action) => ({ ...state, checkedItems:[], checkedItemsTotalPrice: 0 }),

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
    [`${DELETE_SHOPPINGCART_GOODS}_REJECTED`]: (state, action) => ({ ...state, deleteGoodsLoading: false, deleteGoodsLoaded:false })
}

const initialState = {
    shoppingcartLoading: false,
    shoppingcartLoaded: false,
    shoppingcartError: null,
    shoppingcarts: [{id:1, total: 423}, {id:2, total: 23}, {id:3, total: 234}, {id:4, total: 767}, {id:5, total: 345}, {id:6, total: 908}, {id:7, total: 438}, {id:8, total: 656}],
    checkedItems: [],
    hasMoreGoods: false,
    maxGoodsID: 0,
    checkedItemsTotalPrice: 0,

    deleteGoodsLoading: false,
    deleteGoodsLoaded: false
}

export default function shoppingcart(state=initialState, action) {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export function getShoppingcart() {
    return (dispatch, getState) => {
        const { authHeaders } = getState().login
        const { maxGoodsID } = getState().shoppingcart
        dispatch({
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
        dispatch({
            type: DELETE_SHOPPINGCART_GOODS,
            payload: (client) => client.del(`/cart/${goods.id}`, {
                headers: authHeaders
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

/**
 *  shopping utils
 */
function caclCheckedItemsPrice(checkedItems) {
    return checkedItems.map((item) => item.total).reduce((sum, value) => (sum + value), 0)
}
