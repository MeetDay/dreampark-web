import React from 'react';

import { Card, ShopingTool } from '../component';

export default class extends React.Component {

    constructor(props) {
        super(props)
        this.handleClickSettleAccount = (e) => this._handleClickSettleAccount(e)
        this.handleClickAllChecked = (option) => this._handleClickAllChecked(option)
        this.state = {
            allChecked: false
        }
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
    _handleClickAllChecked(option) {
        console.log('全选', option.checked)
        this.setState((preState, props) => ({ allChecked: !preState.allChecked }))
    }

    render() {
        const styles = require('./Shoppingcart.scss');
        return (
            <div className={styles.shoppingcart}>
                <Card allChecked={this.state.allChecked} />
                <Card allChecked={this.state.allChecked} />
                <Card allChecked={this.state.allChecked} />
                <Card allChecked={this.state.allChecked} />
                <Card allChecked={this.state.allChecked} />
                <ShopingTool price={232} onClickSettleAccount={this.handleClickSettleAccount} onClickAllChecked={this.handleClickAllChecked} />
            </div>
        );
    }
}
