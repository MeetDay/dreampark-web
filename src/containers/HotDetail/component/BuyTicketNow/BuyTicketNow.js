import React from 'react';
import PropTypes from 'prop-types';

export default class BuyTicketNow extends React.Component {
    render() {
        const toolBarStyles = require('../ToolBar/ToolBar.scss');
        const styles = require('./BuyTicketNow.scss');
        return (
            <div className={styles.buyTicketNow}>
                <div className={styles.ticket}>
                    <div>
                        <span>购买门票</span>
                        <div>
                            <span>取消</span>
                            <img src="/assets/arrow_down_black.png" alt="arrow_down_black" />
                        </div>
                    </div>
                    <div>
                        
                    </div>
                </div>


                <div className={styles.toolBar}>
                    <div className={toolBarStyles.left}>
                        <span>价格</span>
                        <span className={toolBarStyles.price}>450￥</span>
                        <span>立刻购买</span>
                    </div>
                    <div className={toolBarStyles.right}>
                        <img src="/assets/cart_white_menu.png" alt="cart" />
                        <span>加入购物车</span>
                    </div>
                </div>
            </div>
        );
    }
}
