import React from 'react';
import PropTypes from 'prop-types';

export default class Ticket extends React.Component {
    static propTypes = {
        viewTickets: PropTypes.func
    }
    constructor() {
        super();
        this.handleRefundTicket = (e) => this._handleRefundTicket(e);
    }

    _handleRefundTicket(e) {
        e.stopPropagation();
        console.log('申请退票...');
    }

    render() {
        const styles = require('./Ticket.scss');
        return (
            <div className={styles.ticket}>
                <div className={styles.ticketBorder}>
                    <img src="/assets/ticket_border_big.png" alt="ticket_border_big" />
                </div>
                <div className={styles.ticketWrap} onClick={this.props.viewTickets}>
                    <div className={styles.info}>
                        <span className={styles.title}>腾格里国际音乐节</span>
                        <span className={styles.date}>2017年10月2日 星期三</span>
                        <span className={styles.time}>8:00-9:00</span>
                        <div className={styles.rest}>
                            <span className={styles.ticketCount}>3张标准票</span>
                            <div onClick={this.handleRefundTicket} className={styles.refundTicket}>
                                <img src="/assets/info.png" alt="info"/>
                                <span>申请退票</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.qrcode}>
                        <div className={styles.qrcodeWrap}>
                            <div>二维码</div>
                            <span>未使用</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
