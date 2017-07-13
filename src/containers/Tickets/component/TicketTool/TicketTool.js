import React from 'react';

export default class TicketTool extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = (e) => this._handleClick(e)
    }

    _handleClick(e) {
        e.preventDefault()
        location.href = '/buytickets'
    }
    render() {
        const styles = require('./TicketTool.scss');
        return (
            <div className={styles.tool} onClick={this.handleClick}>
                <img className={styles.cartImg} src="/assets/cart_white_menu.png" alt="cart"/>
                <span className={styles.ticket}>购买门票</span>
            </div>
        );
    }
}
