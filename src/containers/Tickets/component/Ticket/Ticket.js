import React from 'react';
import PropTypes from 'prop-types';
import { Popconfirm } from 'antd'
import { convertToLocalDate } from '../../../../utils/dateformat';

//0或5 是未使用，2,3退款中，4退款失败，6已退款
const STATUS_MESSAGES = ['未使用', '已使用', '退款中', '退款中', '退款失败', '未使用', '已退款'];

export default class Ticket extends React.Component {
    static propTypes = {
        type: PropTypes.string,
        ticket: PropTypes.object.isRequired,
        viewTicket: PropTypes.func,
        refundTicket: PropTypes.func
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
        const supportClick = this.props.type == 'unused' && (this.props.ticket.status == 0 || this.props.ticket.status == 5);
        if (supportClick) {
            this.props.viewTicket(this.props.ticket)
        }
    }

    _handleRefundTicket(e) {
        e.stopPropagation();
        this.props.refundTicket(this.props.ticket.orderTicket_id)
    }

    render() {
        const styles = require('./Ticket.scss')
        const { ticket_name, start_time, end_time, num: ticketNum, status, total } = this.props.ticket;
        const ticketUnused = status == 0 || status == 5;
        const canRefundTickt = ticketUnused && total != 0;
        const qrcodeImg = (this.props.type == 'unused' && ticketUnused) ? 'assets/qrcode_small.png' : 'assets/qrcode_small_gray.png';
        const startTime = convertToLocalDate(start_time);
        const endTime = convertToLocalDate(end_time);
        return (
            <div className={styles.ticket}>
                <div className={styles.ticketBorder}><img src="/assets/ticket_border_big.png" alt="ticket_border_big" /></div>
                <div className={styles.ticketWrap}>
                    <div className={styles.info}>
                        <span className={styles.title}>{ticket_name}</span>
                        <span className={styles.date}>{startTime.date}</span>
                        <span className={styles.time}>{`${startTime.time} - ${endTime.time}`}</span>
                        <div className={styles.rest}>
                            {/* <span className={styles.ticketCount}>{`${ticketNum}张票`}</span> */}
                            {(this.props.type == 'unused' && canRefundTickt) &&
                                <Popconfirm title="确定要退票吗？" onConfirm={this.handleRefundTicket}>
                                    <div className={styles.refundTicket}>
                                        <img src="/assets/info.png" alt="info"/>
                                        <span>申请退票</span>
                                    </div>
                                </Popconfirm>
                            }
                        </div>
                    </div>
                    <div className={styles.qrcode}>
                        <div className={styles.qrcodeWrap} onClick={this.viewTicket}>
                            <div><img src={qrcodeImg} alt="qrcode"/></div>
                            <span>{STATUS_MESSAGES[status]}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
