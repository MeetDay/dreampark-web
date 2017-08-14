import React from 'react';
import PropTypes from 'prop-types';
// import { convertToLocalDate } from '../../../../utils/dateformat';
import { appendQiNiuQueryParamsForImageUrl } from '../../../../helpers/QiNiuHelpers';

export default class TicketCard extends React.Component {
    static propTypes = {
        ticket: PropTypes.object.isRequired
    }

    render() {
        if (!this.props.ticket) return null;
        const styles = require('./TicketCard.scss');
        const { price, ticket_name: ticketName,place, poi_id: poiID, cover_image: coverImage } = this.props.ticket;
        const priceMessage = price > 0 ? `${price}元起` : '免费';
        // const startTime = convertToLocalDate(start_time);
        // const endTime = convertToLocalDate(end_time);
        return (
            <div className={styles.card}>
                <div>
                    <img className={styles.cover} src={appendQiNiuQueryParamsForImageUrl(coverImage.name, { w: 160 })} alt="ticket-cover" />
                    <a className={styles.ticketLink} href={`/hotdetail/${poiID}`}>
                        <div className={styles.info}>
                            <span className={styles.title}>{ticketName}</span>
                            {/* <span>{`时间：${startTime.date} ${startTime.time}-${endTime.time}`}</span> */}
                            <span>{`场馆：${place}`}</span>
                            <span>{priceMessage}</span>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}
