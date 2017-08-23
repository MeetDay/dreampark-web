import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Modal } from 'antd';
import superagent from 'superagent';
import { convertToLocalDate } from '../../../../utils/dateformat';

export default class TicketDetail extends React.Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        ticket: PropTypes.object.isRequired,
    }
    render() {
        const styles = require('./TicketDetail.scss');
        const { ticket_name, start_time, end_time, num, place, barcode } = this.props.ticket;
        const startTime = convertToLocalDate(start_time);
        const endTime = convertToLocalDate(end_time);
        return (
            <Modal style={{ top: 30 }} visible={this.props.visible} onCancel={this.props.onCancel} footer={null}>
                <div className={styles.ticketDetail}>
                    <div className={styles.info}>
                        <div className={styles.title}><span>{ticket_name}</span></div>
                        <div className={styles.date}><span>{startTime.date}</span></div>
                        <div className={styles.time}>
                            <div>
                                <sapn className={classNames(styles.item ,styles.itemTitle)}>开始时间</sapn>
                                <sapn className={classNames(styles.item, styles.itemTime)}>{startTime.time}</sapn>
                            </div>
                            <div>
                                <span className={classNames(styles.item, styles.itemTitle)}>结束时间</span>
                                <span className={classNames(styles.item, styles.itemTime)}>{endTime.time}</span>
                            </div>
                        </div>
                        <div className={styles.location}>
                            <span>{`场馆：${place}`}</span>
                            <span>{`${num}张标准票`}</span>
                        </div>
                    </div>
                    <div className={styles.qrcode}>
                        <div><img className={styles.barcode} src={barcode} alt="qrcode"/></div>
                    </div>
                </div>
            </Modal>
        );
    }
}
