import React from 'react';
import PropTypes from 'prop-types';
import { convertToLocalDate } from '../../../../utils/dateformat';

export default class Ticket extends React.Component {
    static propTypes = {
        type: PropTypes.string,
        ticket: PropTypes.object.isRequired,
        viewTicket: PropTypes.func
    }
    static defaultProps = {
        type: 'unused'
    }

    constructor() {
        super();
        this.viewTicket = (e) => this._viewTicket(e)
        this.handleRefundTicket = (e) => this._handleRefundTicket(e)
    }

    _viewTicket(e) {
        e.preventDefault()
        this.props.viewTicket(this.props.ticket)
    }

    _handleRefundTicket(e) {
        e.stopPropagation();
        console.log('申请退票...');
    }

    render() {
        const styles = require('./Ticket.scss')
        const qrcodeImg = this.props.type === 'unused' ? 'assets/qrcode_small.png' : 'assets/qrcode_small_gray.png';
        const { ticket_name, start_time, end_time, barcode, num: ticketNum } = this.props.ticket;
        const startTime = convertToLocalDate(start_time);
        const endTime = convertToLocalDate(end_time);
        return (
            <div className={styles.ticket}>
                <div className={styles.ticketBorder}><img src="/assets/ticket_border_big.png" alt="ticket_border_big" /></div>
                <div className={styles.ticketWrap}>
                    <div className={styles.info}>
                        <a>
                            <span className={styles.title}>{ticket_name}</span>
                            <span className={styles.date}>{startTime.date}</span>
                            <span className={styles.time}>{`${startTime.time} - ${endTime.time}`}</span>
                        </a>
                        <div className={styles.rest}>
                            <span className={styles.ticketCount}>{`${ticketNum}张票`}</span>
                            <div onClick={this.handleRefundTicket} className={styles.refundTicket}>
                                <img src="/assets/info.png" alt="info"/>
                                <span>申请退票</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.qrcode}>
                        <div className={styles.qrcodeWrap} onClick={this.viewTicket}>
                            <div><img src={qrcodeImg} alt="qrcode"/></div>
                            <span>未使用</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
