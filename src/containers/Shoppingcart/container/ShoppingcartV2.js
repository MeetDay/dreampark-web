import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-async-connect'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux';
import { message } from 'antd';
import { CardV2 } from '../component'
import { LoadMoreButton } from '../../../components';
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
        shoppingcarts: state.shoppingcart.shoppingcarts,
        hasMoreGoods: state.shoppingcart.hasMoreGoods,

        deleteGoodsLoaded: state.shoppingcart.deleteGoodsLoaded
    }),
    dispatch => bindActionCreators({ push, getShoppingcart, deleteGoodsFromShoppingCart }, dispatch)
)

export default class ShoppingcartV2 extends React.Component {

    constructor(props) {
        super(props)
        this.goPayment = (goods) => this._goPayment(goods);
        this.handleClickLoadMoreGoods = (e) => this._handleClickLoadMoreGoods(e);
    }

    componentWillReceiveProps(nextProps) {
        const { deleteGoodsLoaded } = nextProps;
        if (deleteGoodsLoaded && deleteGoodsLoaded !== this.props.deleteGoodsLoaded) {
            message.success('该门票已成功从购物车中删除!')
        }
    }

    _goPayment(goods) {
        this.props.push(`/pay/ticketinfo/${goods.ticket.ticket_id}`);
    }

    _handleClickLoadMoreGoods(e) {
        e.preventDefault();
        if (!this.props.shoppingcartLoading && this.props.hasMoreGoods) {
            this.props.getShoppingcart()
        }
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
                <Helmet><title>购物车</title></Helmet>
                <div className={styles.content}>
                    { content }
                </div>
                <LoadMoreButton onClick={this.handleClickLoadMoreGoods} hasMore={this.props.hasMoreGoods} isActive={this.props.shoppingcartLoading} />
            </div>
        );
    }
}
