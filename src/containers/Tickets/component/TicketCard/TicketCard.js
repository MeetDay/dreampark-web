import React from 'react';
import PropTypes from 'prop-types';
import { appendQiNiuQueryParamsForImageUrl } from '../../../../helpers/QiNiuHelpers';

export default class TicketCard extends React.Component {
    static propTypes = {
        ticket: PropTypes.object
    }

    render() {
        if (!this.props.ticket) return null;
        const styles = require('./TicketCard.scss');
        const { ticket } = this.props;
        return (
            <div className={styles.card}>
                <img className={styles.cover} src={appendQiNiuQueryParamsForImageUrl(ticket.media.name, { w: 80 })} alt="ticket-cover" />
                <a href={`/hotdetail/${ticket.id}`}>
                    <div className={styles.info}>
                        <span className={styles.title}>{ticket.ticket_name}</span>
                        <span>{`时间：${ticket.start_date} ${ticket.start_time}-${ticket.end_time}`}</span>
                        <span>{`场馆：${place}`}</span>
                        <span>{`${ticket.price}元`}</span>
                    </div>
                </a>
            </div>
        );
    }
}
