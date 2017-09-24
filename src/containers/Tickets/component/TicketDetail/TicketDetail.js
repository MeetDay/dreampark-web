import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import QRCode from 'qrcode.react';
import { Modal } from 'antd';
import superagent from 'superagent';
import { convertToLocalDate } from '../../../../utils/dateformat';
import { generatorRandomString, TicketQRCode, encrypt } from '../../utils/tickets';

export default class TicketDetail extends React.Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        ticket: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            isHotelTicket: props.ticket.ticket_type === "hotel",
            randomString: generatorRandomString(20)
        }
        if (props.ticket) {
            const checkRule = props.ticket.checking_rule === 'more' ? '02' : "01";
            let ticketDateString = '0.0.0.0';
            if (props.ticket.ticket_type === 'hotel') {
                const { start_day: startDay, end_day: endDay } = props.ticket;
                const startDayArray = startDay.split('-'), endDayArray = endDay.split('-');
                startDayArray.shift(); endDayArray.shift();
                ticketDateString = [...startDayArray, ...endDayArray].join(".");
            }
            const ticketQRCode = new TicketQRCode(props.ticket.poi_id, props.ticket.ticket_id, ticketDateString, props.ticket.identity_card, checkRule);
            const formatQRCode = ticketQRCode.getTicketQRCode();
            const encryptedQRCode = encrypt(formatQRCode, 'godblessyou');
            this.qrcode = formatQRCode + encryptedQRCode.cipherHexText.substr(-6, 6)
        }
    }

    componentWillMount() {
        const timer = setInterval(() => {
            this.setState({ randomString: generatorRandomString(20) })
        }, 1000);
        this.setState({ timer: timer });
    }

    componentWillUnmount() {
        clearTimeout(this.state.timer);
        this.setState({ timer: null })
    }

    render() {
        const styles = require('./TicketDetail.scss');
        const headerStyles = require('../Header/Header.scss');
        const { ticket_name, start_time, end_time, num, place, barcode, room_type: roomType } = this.props.ticket;
        const { start_day: startDay, end_day: endDay } = this.props.ticket;
        const startTime = convertToLocalDate(start_time), endTime = convertToLocalDate(end_time);
        const formatStartTime = this.state.isHotelTicket ? startDay : startTime.time;
        const formatEndTime = this.state.isHotelTicket ? endDay : endTime.time;
        return (
            <Modal style={{ top: 20 }} visible={this.props.visible} onCancel={this.props.onCancel} footer={null}>
                <div className={styles.ticketDetail}>
                    <div className={styles.info}>
                        <div className={styles.title}><span>{ticket_name}</span></div>
                        {!this.state.isHotelTicket && <div className={styles.date}><span>{startTime.date}</span></div>}
                        <div className={styles.time}>
                            <div>
                                <sapn className={classNames(styles.item ,styles.itemTitle)}>开始时间</sapn>
                                <sapn className={classNames({[styles.item]: true, [styles.itemTime]: true, [styles.itemHotel]: this.state.isHotelTicket})}>{formatStartTime}</sapn>
                            </div>
                            <div>
                                <span className={classNames(styles.item, styles.itemTitle)}>结束时间</span>
                                <span className={classNames({[styles.item]: true, [styles.itemTime]: true, [styles.itemHotel]: this.state.isHotelTicket})}>{formatEndTime}</span>
                            </div>
                        </div>
                        {this.state.isHotelTicket &&
                            <div className={styles.roomType}><span>{roomType}</span></div>
                        }
                        {(place && place.length > 0) &&
                            <div className={styles.location}>
                                <span>{`场馆：${place}`}</span>
                                {/* <span>{`${num}张标准票`}</span> */}
                                <span></span>
                            </div>
                        }
                    </div>
                    <div>
                        {/* <div><img className={styles.barcode} src={barcode} alt="qrcode"/></div> */}
                        <div className={classNames(headerStyles.makeQRCode, styles.customQRCode)}>
                            <QRCode value={this.qrcode.toUpperCase()} size={180} />
                            <span className={headerStyles.qrcodeDescription}>该二维码分享无效</span>
                            <span className={headerStyles.randomString}>{this.state.randomString}</span>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}
