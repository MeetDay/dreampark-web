import React from 'react';

export default class TicketTool extends React.Component {
    render() {
        const styles = require('./TicketTool.scss');
        return (
            <div className={styles.tool}>
                <img src="/assets/logo.png" alt="cart" />
                <span>购买门票</span>
            </div>
        );
    }
}
