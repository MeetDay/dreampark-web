import React from 'react';
import PropTypes from 'prop-types';

export default class BuyTicketNow extends React.Component {
    static propTypes = {
        onClickCancel: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.handleClickTicketLess = (e) => this._handleClickTicketLess(e);
        this.handleClickTicketMore = (e) => this._handleClickTicketMore(e);
        this.handleClickTicket = (e) => this._handleClickTicket(e);
        this.state = {
            ticketCount: 1,
            selectedTickets: [],
        };
    }

    _handleClickTicketLess(e) {
        e.preventDefault();
        this.setState((preState, props) => ({ ticketCount:  preState.ticketCount > 1 ? preState.ticketCount -1 : preState.ticketCount }))
    }

    _handleClickTicketMore(e) {
        e.preventDefault();
        this.setState((preState, props) => ({ ticketCount:  preState.ticketCount + 1 }))
    }

    _handleClickTicket(e) {
        e.preventDefault();
        console.log(1111);

    }

    render() {
        const toolBarStyles = require('../ToolBar/ToolBar.scss');
        const styles = require('./BuyTicketNow.scss');
        return (
            <div onTouchMove={e => e.preventDefault()} className={styles.buyTicketNow}>

                <div className={styles.ticket}>
                    <div className={styles.header}>
                        <span>购买门票</span>
                        <div onClick={this.props.onClickCancel} className={styles.cancel}>
                            <span>取消</span>
                            <img src="/assets/arrow_down_black.png" alt="arrow_down_black" />
                        </div>
                    </div>
                    <div className={styles.middle}>
                        <div className={styles.tip}>选择购票数量：</div>
                        <div className={styles.ticketCount}>
                            <div>标准票</div>
                            <div className={styles.ticketCountChoice}>
                                <div onClick={this.handleClickTicketLess} className={styles.ticketItem}><img src="/assets/ticket_less.png" alt="ticket_less"/></div>
                                <span>{this.state.ticketCount}张</span>
                                <div onClick={this.handleClickTicketMore} className={styles.ticketItem}><img src="/assets/ticket_more.png" alt="ticket_more"/></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.tip}>选择时间：</div>
                        <div className={styles.choiceTicket}>
                            <div className={styles.choiceTicketWrap}>
                                <TimeSlotTicket onTicketClick={this._handleClickTicket} />
                                <TimeSlotTicket onTicketClick={this._handleClickTicket} />
                                <TimeSlotTicket onTicketClick={this._handleClickTicket} />
                                <TimeSlotTicket onTicketClick={this._handleClickTicket} />
                                <TimeSlotTicket onTicketClick={this._handleClickTicket} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.toolBar}>
                    <div className={toolBarStyles.left}>
                        <span>价格</span>
                        <span className={toolBarStyles.price}>450￥</span>
                        <span>立刻购买</span>
                    </div>
                    <div className={toolBarStyles.right}>
                        <img src="/assets/cart_white_menu.png" alt="cart" />
                        <span>加入购物车</span>
                    </div>
                </div>
            </div>
        );
    }
}

class TimeSlotTicket extends React.Component {
    static propTypes = {
        onTicketClick: PropTypes.func.isRequired,
        selected: PropTypes.bool
    };
    static defaultProps = {
        selected: true
    };

    render() {
        const styles = require('./BuyTicketNow.scss');
        const triangleStyle = { display: this.props.selected ? 'block' : 'none' };
        return (
            <div className={styles.timeSlotTicket} onClick={this.props.onTicketClick}>
                <img className={styles.ticketBorder} src="/assets/ticket_border.png" alt="ticket_border" />
                <div  style={triangleStyle} className={styles.ticketTriangle}>
                    <img src="/assets/triangle.png" alt="triangle" />
                </div>
                <div className={styles.separatorLine} />
                <div className={styles.ticketContent}>
                    <div className={styles.ticketTop}>10月 <span>4日</span></div>
                    <div className={styles.ticketBottom}>8:00-9:00</div>
                </div>
            </div>
        );
    }
}
