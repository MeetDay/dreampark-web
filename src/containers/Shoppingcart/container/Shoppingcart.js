import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Card, ShopingTool } from '../component'
import { checkedItem, uncheckedItem, checkedAllItems, unCheckedAllItems, getShoppingcart, deleteGoodsFromShoppingCart } from '../module/shoppingcart'

@connect(
    state => ({
        shoppingcarts: state.shoppingcart.shoppingcarts,
        checkedItems: state.shoppingcart.checkedItems,
        totalPrice: state.shoppingcart.totalPrice
    }),
    dispatch => bindActionCreators({
        checkedItem,
        uncheckedItem,
        checkedAllItems,
        unCheckedAllItems,
        getShoppingcart,
        deleteGoodsFromShoppingCart
    }, dispatch)
)

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.handleClickSettleAccount = (e) => this._handleClickSettleAccount(e)
        this.handleClickAllChecked = (option) => this._handleClickAllChecked(option)
        this.mapCheckedItems = (shoppingcarts) => this._mapCheckedItems(shoppingcarts)
    }

    /**
     *  card click event
     */


    /**
     *  shopping tool click event
     */
    _handleClickSettleAccount(e) {
        e.preventDefault()
        console.log('结算')
    }

    // click all checked
    _handleClickAllChecked(option) {
        if (option.checked) {
            this.props.checkedAllItems()
        } else {
            this.props.unCheckedAllItems()
        }
    }

    // mapped checked items
    _mapCheckedItems(checkedImtes) {
        return function(item) {
            if (checkedImtes.includes(item)) return Object.assign({ checked: true }, item)
            return item
        }
    }

    render() {
        const styles = require('./Shoppingcart.scss')
        const { shoppingcarts, checkedItems } = this.props
        const allChecked = this.props.shoppingcarts.length === this.props.checkedItems.length
        return (
            <div className={styles.shoppingcart}>
                <div>{JSON.stringify(this.props.checkedItems)}</div>
                {
                    shoppingcarts
                        .map(this.mapCheckedItems(checkedItems))
                        .map((goods) => (<Card key={goods.id} goods={goods} checkedItem={this.props.checkedItem} uncheckedItem={this.props.uncheckedItem} deleteGoodsFromShoppingCart={this.props.deleteGoodsFromShoppingCart} />))
                }
                <ShopingTool price={this.props.totalPrice} allChecked={allChecked} onClickSettleAccount={this.handleClickSettleAccount} onClickAllChecked={this.handleClickAllChecked} />
            </div>
        );
    }
}
