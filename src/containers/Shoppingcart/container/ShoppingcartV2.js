import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-async-connect'
import { bindActionCreators } from 'redux'
import { CardV2 } from '../component'
import { isShoppingcartLoaded, getShoppingcart, deleteGoodsFromShoppingCart } from '../module/shoppingcartV2';

@asyncConnect([{
    deferred: true,
    promise: ({ params, store: { dispatch, getState }, helpers }) => {
        if (!isShoppingcartLoaded(getState())) {
            return dispatch(getShoppingcart())
        }
    }
}])

@connect(
    state => ({
        shoppingcartLoading: state.shoppingcart.shoppingcartLoading,
        shoppingcartLoaded: state.shoppingcart.shoppingcartLoaded,
        shoppingcarts: state.shoppingcart.shoppingcarts
    }),
    dispatch => bindActionCreators({ getShoppingcart, deleteGoodsFromShoppingCart }, dispatch)
)

export default class ShoppingcartV2 extends React.Component {

    constructor(props) {
        super(props)
        this.goPayment = (goods) => this._goPayment(goods)
    }

    _goPayment(goods) {
        console.log('付款....')
    }

    render() {
        const styles = require('./ShoppingcartV2.scss')
        const { shoppingcarts } = this.props
        let content = (<div className={styles.nonGoods}>噢 喔...<br />购物车没有任何商品...</div>);
        if ( shoppingcarts && Array.isArray(shoppingcarts) && shoppingcarts.length > 0 ) {
            content = (
                <div className={styles.ticketsWrap}>
                    { shoppingcarts.map(goods => (<CardV2 key={goods.id} goods={goods} deleteGoodsFromShoppingCart={this.props.deleteGoodsFromShoppingCart} goPayment={this.goPayment} />)) }
                </div>
            );
        }
        return (
            <div className={styles.shoppingcartV2}>
                <div className={styles.nav}><span>购物车</span></div>
                <div className={styles.content}>
                    { content }
                </div>
            </div>
        );
    }
}
