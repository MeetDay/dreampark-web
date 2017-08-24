import React from 'react'
import { message } from 'antd'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-async-connect'
import { bindActionCreators } from 'redux'
import { isUsedTicketsLoaded, getUsedTickts,isUnusedTicketsLoaded, getUnusedTikects, isUnpaidTicketsLoaded, getUnpaidTickets, cancelOrder, refundTicket } from '../module/tickets'
import { LoadMoreButton } from '../../../components';
import { Header, Ticket, UnpaidOrder, TicketDetail, TicketTool } from '../component'
import { convertToLocalDate } from '../../../utils/dateformat'
const existedTicketTypes = ['unused', 'used', 'unpaid']

@asyncConnect([{
    deferred: true,
    promise: ({ params, store: { dispatch, getState }, location, helpers }) => {
        const getQueryValueOf = key => decodeURIComponent(location.search.replace(new RegExp('^(?:.*[&\\?]' + escape(key).replace(/[.+*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'))
        const ticketType = getQueryValueOf('type')
        if (!isUsedTicketsLoaded(getState()) && ticketType === 'used') {
            return dispatch(getUsedTickts())
        } else if(!isUnpaidTicketsLoaded(getState()) && ticketType === 'unpaid') {
            return dispatch(getUnpaidTickets())
        } else if (!isUnusedTicketsLoaded(getState())){
            return dispatch(getUnusedTikects())
        }
    }
}])

@connect(
    state => ({
        user: state.tickets.user,

        unusedTickets: state.tickets.unusedTickets,
        unusedTicketsLoading: state.tickets.unusedTicketsLoading,
        hasMoreUnusedTickets: state.tickets.hasMoreUnusedTickets,

        usedTickts: state.tickets.usedTickts,
        usedTicktsLoading: state.tickets.usedTicktsLoading,
        hasMoreUsedTickets: state.tickets.hasMoreUsedTickets,

        unpaidTickets: state.tickets.unpaidTickets,
        unpaidTicketsLoading: state.tickets.unpaidTicketsLoading,
        hasMoreUnpaidTickets: state.tickets.hasMoreUnpaidTickets,

        cancelOrderLoaded: state.tickets.cancelOrderLoaded
    }),
    dispatch => bindActionCreators({ push, getUnusedTikects, getUsedTickts, getUnpaidTickets, cancelOrder, refundTicket }, dispatch)
)

export default class Tickets extends React.Component {
    constructor() {
        super();
        this.onMenuItemChange = (value) => this._onMenuItemChange(value);
        this.viewTicket = (ticket) => this._viewTicket(ticket);
        this.closeViewTickets = (e) => this._closeViewTickets(e);
        this.handleClickTicketToolBar = (e) => this._handleClickTicketToolBar(e);
        this.handleClickLoadMore = (e) => this._handleClickLoadMore(e);
        this.state = {
            used: false,
            selectedItemType: 'unused',
            selectedTicket: null,
            showSelectedTicket: false
        };
    }

    componentDidMount() {
        const getQueryValueOf = key => decodeURIComponent(location.search.replace(new RegExp('^(?:.*[&\\?]' + escape(key).replace(/[.+*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'))
        const ticketType = getQueryValueOf('type')
        if (existedTicketTypes.includes(ticketType)) {
            setTimeout(_ => this.setState({ selectedItemType: ticketType }))
        }
    }

    componentWillReceiveProps(nextProps) {
        const { cancelOrderLoaded } = nextProps
        if (cancelOrderLoaded && cancelOrderLoaded !== this.props.cancelOrderLoaded) {
            message.success('删除订单成功...')
        }
    }

    _handleClickLoadMore(e) {
        e.preventDefault();
        if (this.state.selectedItemType === 'unused') {
            if (!this.props.unusedTicketsLoading && this.props.hasMoreUnusedTickets) {
                this.props.getUnusedTikects();
            }
        } else if (this.state.selectedItemType === 'used') {
            if (!this.props.usedTicktsLoading && this.props.hasMoreUsedTickets) {
                this.props.getUsedTickts();
            }
        } else if (this.state.selectedItemType === 'unpaid') {
            if (!this.props.unpaidTicketsLoading && this.props.hasMoreUnpaidTickets) {
                this.props.getUnpaidTickets();
            }
        }
    }

    _onMenuItemChange(selectedItemType) {
        this.setState({ selectedItemType: selectedItemType });
        const { usedTickts, unusedTickets, unpaidTickets } = this.props;
        if (selectedItemType === 'used') {
            if (!usedTickts || (Array.isArray(usedTickts) && usedTickts.length === 0)) {
                this.props.getUsedTickts()
            }
        } else if (selectedItemType === 'unused') {
            if (!unusedTickets || (Array.isArray(unusedTickets) && unusedTickets.length === 0)) {
                this.props.getUnusedTikects()
            }
        } else if (selectedItemType === 'unpaid') {
            if (!unpaidTickets || (Array.isArray(unpaidTickets) && unpaidTickets.length === 0)) {
                this.props.getUnpaidTickets()
            }
        }
    }

    _viewTicket(ticket) {
        this.setState({ showSelectedTicket: true, selectedTicket: ticket });
    }

    _closeViewTickets(e) {
        e.preventDefault();
        this.setState({ showSelectedTicket: false, selectedTicket: null });
        if (this.state.selectedItemType === 'unused') {
            this.props.getUnusedTikects({ headerRefreshing: true });
        } else if (this.state.selectedItemType === 'used') {
            this.props.getUsedTickts({ headerRefreshing: true });
        } else if (this.state.selectedItemType === 'unpaid') {
            this.props.getUnpaidTickets({ headerRefreshing: true });
        }
    }

    _handleClickTicketToolBar(e) {
        e.preventDefault();
        this.props.push('/buytickets')
    }

    render() {
        const styles = require('./Tickets.scss')
        let isTicketOrder = false,
            ticketType = 'unused',
            tickets = this.props.unusedTickets,
            hasMore = this.props.hasMoreUnusedTickets,
            isActive = this.props.unusedTicketsLoading,
            noTicketsMessage = '您没有任何门票...';
        if (this.state.selectedItemType === 'used') {
            ticketType = 'used';
            tickets = this.props.usedTickts;
            hasMore = this.props.hasMoreUsedTickets;
            isActive = this.props.usedTicktsLoading;
            noTicketsMessage = '您没有任何门票...';
        } else if (this.state.selectedItemType === 'unpaid') {
            isTicketOrder = true;
            ticketType = 'unpaid';
            tickets = this.props.unpaidTickets;
            hasMore = this.props.hasMoreUnpaidTickets;
            isActive = this.props.unpaidTicketsLoading;
            noTicketsMessage = '您没有任何订单信息...';
        }

        let content = null;
        if (this.state.selectedItemType === 'unused' || this.state.selectedItemType === 'used') {
            content = (tickets && tickets.length > 0) && tickets.map((ticket) =>(<Ticket key={ticket.orderTicket_id} viewTicket={this.viewTicket} refundTicket={this.props.refundTicket} type={ticketType} ticket={ticket} />));
        } else if (this.state.selectedItemType === 'unpaid') {
            content = (tickets && tickets.length > 0) && tickets.map((ticket) =>(<UnpaidOrder key={ticket.id} unpaidOrder={ticket} deleteOrder={this.props.cancelOrder} />))
        }

        return (
            <div>
                <Header user={this.props.user} selectedItemType={this.state.selectedItemType} onMenuItemChange={this.onMenuItemChange} />
                <div className={styles.ticketContent}>
                    <div className={styles.ticketWrap}> { content } </div>
                    {(!tickets || (tickets && tickets.length == 0)) && <div className={styles.noTicketsMessage}>{noTicketsMessage}</div>}
                    <LoadMoreButton onClick={this.handleClickLoadMore} hasMore={hasMore} isActive={isActive} />
                </div>
                <TicketTool onTicketToolBarClick={this.handleClickTicketToolBar} />
                {this.state.selectedTicket && <TicketDetail visible={this.state.showSelectedTicket} onCancel={this.closeViewTickets} ticket={this.state.selectedTicket} />}
            </div>
        );
    }
}
