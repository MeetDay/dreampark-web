/**
 * @Author: WangChao
 * @Date:   2017-09-04T14:34:57+08:00
 * @Email:  crazyitcoder9527@126.com
 * @Project: dreampark-web
 * @Last modified by:   WangChao
 * @Last modified time: 2017-09-05T20:15:16+08:00
 */

import React from 'react';
import PropTypes from 'prop-types';

export default class TicketTool extends React.Component {
    static propTypes = {
        onTicketToolBarClick: PropTypes.func
    }
    render() {
        const styles = require('./TicketTool.scss');
        return (
            <div className={styles.tool}>
                <div className={styles.toolWrapper}>
                    {/* <div className={styles.item}>
                        <div className={styles.itemWrapper}>
                            <a className={styles.safeLink} href="javascript:void(0)">
                                <img className={styles.cartImg} src="/assets/ticket_white.png" alt="safe"/>
                                <span className={styles.ticket}>购买保险</span>
                            </a>
                        </div>
                    </div> */}
                    <div  className={styles.item} onClick={this.props.onTicketToolBarClick}>
                        <div className={styles.itemWrapper}>
                            <img className={styles.cartImg} src="/assets/ticket_white.png" alt="cart"/>
                            <span className={styles.ticket}>购买门票</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
