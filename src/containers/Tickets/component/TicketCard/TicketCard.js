import React from 'react';
import PropTypes from 'prop-types';

export default class TicketCard extends React.Component {
    constructor() {
        super();
        this.handleClick = (e) => this._handleClick(e);
    }

    _handleClick(e) {
        e.preventDefault();
        location.href = `hotdetail/${1}`;
    }

    render() {
        const styles = require('./TicketCard.scss');
        return (
            <div className={styles.card} onClick={this.handleClick}>
                <img className={styles.cover} src="http://o9vi0jo2t.bkt.clouddn.com/client_uploads/images/27/71F4FAB2867A8F6C24707C3869E9A76D" alt="ticket-cover" />
                <div className={styles.info}>
                    <span className={styles.title}>腾格里国际音乐节</span>
                    <span>时间：2017.10.1 3:00-4:00</span>
                    <span>场馆：星光大道南侧</span>
                    <span>300元</span>
                </div>
            </div>
        );
    }
}
