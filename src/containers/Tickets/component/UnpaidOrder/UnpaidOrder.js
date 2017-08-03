import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { convertToLocalDate } from '../../../../utils/dateformat'

export default class UnpaidOrder extends React.Component {
    static defaultProps = {
        unpaidOrder: PropTypes.object,
        goPayment: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.handlePayment = (e) => this._handlePayment(e)
    }

    _handlePayment(e) {
        e.preventDefault()
        console.log('去支付')
    }

    render() {
        const styles = require('../Ticket/Ticket.scss')
        const unpaidStyles = require('./UnpaidOrder.scss')
        const { count: ticketCount, ticket_name: ticketName, start_time: startTime, end_time: endTime } = this.props.unpaidOrder
        const startTimeDate = convertToLocalDate(startTime)
        const endTimeDate = convertToLocalDate(endTime)
        return (
            <div className={styles.ticket}>
                <div className={styles.ticketBorder}><img src="/assets/ticket_border_big.png" alt="ticket_border_big" /></div>
                <div className={styles.ticketWrap}>
                    <div className={styles.info}>
                        <a href={`/buyticket/ticketinfo/${this.props.unpaidOrder.id}`}>
                            <span className={styles.title}>{ticketName}</span>
                            <span className={styles.date}>{`${startTimeDate.date} ${startTimeDate.week}`}</span>
                            <span className={styles.time}>{`${startTimeDate.time}-${endTimeDate.time}`}</span>
                        </a>
                        <div className={styles.rest}>
                            <span className={styles.ticketCount}>{`${ticketCount}张票`}</span>
                            <div className={classNames(styles.refundTicket, unpaidStyles.cancelOrder)}><span>取消订单</span></div>
                        </div>
                    </div>
                    <div className={styles.qrcode}>
                        <div onClick={this.handlePayment} className={classNames(styles.qrcodeWrap, unpaidStyles.gopayment)}><span>去支付</span></div>
                    </div>
                </div>
            </div>
        )
    }
}
