import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ticketExisted } from './ticketHelper'

export default class BuyTicketNow extends React.Component {
    static propTypes = {
        tickets: PropTypes.array,
        show: PropTypes.bool,
        onClickCancel: PropTypes.func.isRequired
    }
    static defaultProps = {
        tickets: [{id:1, price: 450}, {id:2, price: 300}, {id:3, price: 128}, {id: 4, price: 934}],
        show: false
    }

    constructor(props) {
        super(props);
        this.handleClickTicketLess = (e) => this._handleClickTicketLess(e);
        this.handleClickTicketMore = (e) => this._handleClickTicketMore(e);
        this.handleClickTicket = (ticket) => this._handleClickTicket(ticket);
        this.state = {
            visible: false,
            showBackgroundColor: false,
            ticketCount: 1,
            totalPrice: 0,
            selectedTickets: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show) {
            setTimeout(() => { this.setState({ visible: nextProps.show, showBackgroundColor: nextProps.show }) }, 0)
        } else {
            setTimeout(() => { this.setState({ showBackgroundColor: nextProps.show }) }, 500)
            setTimeout(() => { this.setState({ visible: nextProps.show }) }, 600)
        }
    }

    _handleClickTicketLess(e) {
        e.preventDefault();
        this.setState((preState, props) => ({ ticketCount:  preState.ticketCount > 1 ? preState.ticketCount -1 : preState.ticketCount }))
    }

    _handleClickTicketMore(e) {
        e.preventDefault();
        this.setState((preState, props) => ({ ticketCount:  preState.ticketCount + 1 }))
    }

    _handleClickTicket(ticket) {
        if (ticketExisted(this.state.selectedTickets, ticket)) {
            const selectedTickets = this.state.selectedTickets.filter((item) => item.id !== ticket.id)
            this.setState((preState) => ({
                selectedTickets: [...selectedTickets],
                totalPrice: preState.totalPrice - ticket.price
            }))
        } else {
            this.setState((preState) => ({
                selectedTickets: [...this.state.selectedTickets, ticket],
                totalPrice: preState.totalPrice + ticket.price
            }))
        }
    }

    render() {
        const toolBarStyles = require('../ToolBar/ToolBar.scss')
        const styles = require('./BuyTicketNow.scss')
        const buyTicketNowStyle = {
            backgroundColor: this.state.showBackgroundColor ? 'rgba(0, 0, 0, .4)' : 'rgba(0, 0, 0, 0)',
            visibility: this.state.visible ? 'visible' : 'hidden'
        }
        const ticketStyle = { bottom: this.props.show ? '0' : '-410px' }
        return (
            <div style={buyTicketNowStyle} className={classNames(styles.backgroundTransition, styles.buyTicketNow)}>
                <div style={ticketStyle} className={classNames(styles.ticket, styles.ticketTransition)}>
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
                                { this.props.tickets &&
                                    this.props.tickets.map(ticket => (<TimeSlotTicket key={ticket.id} ticket={ticket} selected={ticketExisted(this.state.selectedTickets, ticket)} onTicketClick={this.handleClickTicket} />))
                                 }
                            </div>
                        </div>
                    </div>

                    <div className={styles.toolBar}>
                        <div className={classNames(toolBarStyles.left, styles.toolBarSupplement)}>
                            <span>价格</span>
                            <span className={toolBarStyles.price}>{`${this.state.totalPrice}￥`}</span>
                            <span>立刻购买</span>
                        </div>
                        <div className={toolBarStyles.right}>
                            <img src="/assets/cart_white_menu.png" alt="cart" />
                            <span>加入购物车</span>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

class TimeSlotTicket extends React.Component {
    static propTypes = {
        ticket: PropTypes.object,
        onTicketClick: PropTypes.func.isRequired,
        selected: PropTypes.bool
    };
    static defaultProps = {
        selected: false
    };

    constructor(props) {
        super(props)
        this.handleClick = (e) => this._handleClick(e)
    }

    _handleClick(e) {
        e.preventDefault()
        this.props.onTicketClick(this.props.ticket)
    }

    render() {
        const styles = require('./BuyTicketNow.scss');
        const triangleStyle = { display: this.props.selected ? 'block' : 'none' };
        return (
            <div className={styles.timeSlotTicket} onClick={this.handleClick}>
                <img className={styles.ticketBorder} src="/assets/ticket_border.png" alt="ticket_border" />
                <div  style={triangleStyle} className={styles.ticketTriangle}>
                    <img src="/assets/triangle.png" alt="triangle" />
                </div>
                {/* <div className={styles.separatorLine} /> */}
                <div className={styles.ticketContent}>
                    <div className={styles.ticketTop}>10月 <span>4日</span></div>
                    <div className={styles.ticketBottom}>8:00-9:00</div>
                </div>
            </div>
        );
    }
}
