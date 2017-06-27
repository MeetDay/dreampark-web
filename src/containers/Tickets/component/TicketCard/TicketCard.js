import React from 'react';
import PropTypes from 'prop-types';

export default class TicketCard extends React.Component {
    render() {
        const styles = require('./TicketCard.scss');
        return (
            <div className={styles.card} onClick={e => console.log('购票')}>
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
