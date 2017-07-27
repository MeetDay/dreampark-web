import React from 'react';
import PropTypes from 'prop-types';

export default class TicketTool extends React.Component {
    static propTypes = {
        onTicketToolBarClick: PropTypes.func
    }
    render() {
        const styles = require('./TicketTool.scss');
        return (
            <div className={styles.tool} onClick={this.props.onTicketToolBarClick}>
                <img className={styles.cartImg} src="/assets/cart_white_menu.png" alt="cart"/>
                <span className={styles.ticket}>购买门票</span>
            </div>
        );
    }
}
