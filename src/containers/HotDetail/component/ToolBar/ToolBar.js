import React from 'react';
import PropTypes from 'prop-types';

export default class ToolBar extends React.Component {
    render() {
        const styles = require('./ToolBar.scss');
        return (
            <div className={styles.toolBar}>
                <div className={styles.left}>
                    <span>价格</span>
                    <span className={styles.price}>450￥</span>
                    <span>立刻购买</span>
                </div>
                <div className={styles.right}>
                    <img src="/assets/cart_white_menu.png" alt="cart" />
                    <span>加入购物车</span>
                </div>
            </div>
        );
    }
}
