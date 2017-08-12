import React from 'react';
import PropTypes from 'prop-types';
import { convertToLocalDate } from '../../../../utils/dateformat';
import { appendQiNiuQueryParamsForImageUrl } from '../../../../helpers/QiNiuHelpers';

export default class TicketCard extends React.Component {
    static propTypes = {
        ticket: PropTypes.object.isRequired
    }

    render() {
        if (!this.props.ticket) return null;
        const styles = require('./TicketCard.scss');
        const { start_time, end_time, price, ticket_name: ticketName,place, poi_id: poiID, cover_image: coverImage } = this.props.ticket;
        const startTime = convertToLocalDate(start_time);
        const endTime = convertToLocalDate(end_time);
        return (
            <div className={styles.card}>
                <img className={styles.cover} src={appendQiNiuQueryParamsForImageUrl(coverImage.name, { w: 160 })} alt="ticket-cover" />
                <a href={`/hotdetail/${poiID}`}>
                    <div className={styles.info}>
                        <span className={styles.title}>{ticketName}</span>
                        <span>{`时间：${startTime.date} ${startTime.time}-${endTime.time}`}</span>
                        <span>{`场馆：${place}`}</span>
                        <span>{`${price}元`}</span>
                    </div>
                </a>
            </div>
        );
    }
}
