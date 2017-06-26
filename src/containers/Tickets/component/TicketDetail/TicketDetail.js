import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Modal } from 'antd';

export default class TicketDetail extends React.Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        ticket: PropTypes.object.isRequired,
    }
    render() {
        const styles = require('./TicketDetail.scss');
        return (
            <Modal
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                footer={null}
            >
                <div className={styles.ticketDetail}>
                    <div className={styles.info}>
                        <div className={styles.title}>
                            <span>腾格里国际音乐节</span>
                        </div>
                        <div className={styles.date}>
                            <span>2017年10月2日 星期三</span>
                        </div>
                        <div className={styles.time}>
                            <div>
                                <sapn className={classNames(styles.item ,styles.itemTitle)}>开始时间</sapn>
                                <sapn className={classNames(styles.item, styles.itemTime)}>8:00</sapn>
                            </div>
                            <div>
                                <span className={classNames(styles.item, styles.itemTitle)}>结束时间</span>
                                <span className={classNames(styles.item, styles.itemTime)}>10:30</span>
                            </div>
                        </div>
                        <div className={styles.location}>
                            <span>场馆：梦想航空机场</span>
                            <span>3张标准票</span>
                        </div>
                    </div>
                    <div className={styles.qrcode}>
                        <div />
                    </div>
                </div>
            </Modal>
        );
    }
}
