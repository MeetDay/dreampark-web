import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Popconfirm } from 'antd'
import { convertToLocalDate } from '../../../../utils/dateformat'

const MESSAGES = ['去支付', '已过期', '已售完', '余票不足', '已失效'];

export default class UnpaidOrder extends React.Component {
    static defaultProps = {
        unpaidOrder: PropTypes.object,
        deleteOrder: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.confirm = (e) => this._confirm(e);
    }

    _confirm(e) {
        this.props.deleteOrder(this.props.unpaidOrder.id)
    }

    render() {
        const styles = require('../Ticket/Ticket.scss')
        const unpaidStyles = require('./UnpaidOrder.scss')
        const { count: ticketCount, ticket_name: ticketName, start_time: startTime, end_time: endTime, type } = this.props.unpaidOrder
        const startTimeDate = convertToLocalDate(startTime)
        const endTimeDate = convertToLocalDate(endTime)

        return (
            <div className={styles.ticket}>
                <div className={styles.ticketBorder}><img src="/assets/ticket_border_big.png" alt="ticket_border_big" /></div>
                <div className={styles.ticketWrap}>
                    <div className={styles.info}>
                        <span className={styles.title}>{ticketName}</span>
                        <span className={styles.date}>{`${startTimeDate.date} ${startTimeDate.week}`}</span>
                        <span className={styles.time}>{`${startTimeDate.time}-${endTimeDate.time}`}</span>
                        <div className={styles.rest}>
                            <span className={styles.ticketCount}>{`${ticketCount}张票`}</span>
                            {(type == 0) &&
                                <Popconfirm title="确定要取消订单吗？" onConfirm={this.confirm}>
                                    <div className={classNames(styles.refundTicket, unpaidStyles.cancelOrder)}><span>取消订单</span></div>
                                </Popconfirm>
                            }
                        </div>
                    </div>
                    <div className={styles.qrcode}>
                        {(type == 0) &&
                            <a href={`/pay/ticketinfo/${this.props.unpaidOrder.orders_no}?ticketType=ticketorder`}>
                                <div className={classNames(styles.qrcodeWrap, unpaidStyles.gopayment)}><span>去支付</span></div>
                            </a>
                        }
                        {(type != 0) &&
                            <div className={classNames(unpaidStyles.center, unpaidStyles.others)}><span>{MESSAGES[type]}</span></div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
