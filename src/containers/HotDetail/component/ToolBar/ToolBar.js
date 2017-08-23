import React from 'react';
import PropTypes from 'prop-types';

export default class ToolBar extends React.Component {
    static propTypes = {
        price: PropTypes.number.isRequired,
        onClickBuyTicketNow: PropTypes.func.isRequired,
        onClickAddToCart: PropTypes.func,
    };

    render() {
        const styles = require('./ToolBar.scss');
        const priceMessage = this.props.price == 0 ? '免费' : `${this.props.price}￥`;
        return (
            <div className={styles.toolBar}>
                <div onClick={this.props.onClickBuyTicketNow} className={styles.content}>
                    <span>价格</span>
                    <span className={styles.price}>{priceMessage}</span>
                    <span>立刻购买</span>
                </div>
                {/* <div onClick={this.props.onClickAddToCart} className={styles.right}>
                    <img src="/assets/cart_white_menu.png" alt="cart" />
                    <span>加入购物车</span>
                </div> */}
            </div>
        );
    }
}
