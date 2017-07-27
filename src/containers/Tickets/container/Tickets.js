import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-async-connect'
import { bindActionCreators } from 'redux'
import { isUsedTicketsLoaded, getUsedTickts,isUnusedTicketsLoaded, getUnusedTikects } from '../module/tickets'
import { Header, Ticket, TicketDetail, TicketTool } from '../component'

@asyncConnect([{
    deferred: true,
    promise: ({ params, store: { dispatch, getState }, location, helpers }) => {
        const getQueryValueOf = key => decodeURIComponent(this.props.location.search.replace(new RegExp('^(?:.*[&\\?]' + escape(key).replace(/[.+*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'))
        const ticketType = getQueryValueOf('type')
        if (!isUnusedTicketsLoaded(getState()) && ticketType === 'used') {
            return dispatch(getUsedTickts())
        } else if(!isUsedTicketsLoaded(getState())) {
            return dispatch(getUnusedTikects())
        }
    }
}])

@connect(
    state => ({
        user: state.tickets.user,
        unusedTikects: state.tickets.unusedTikects,
        usedTickts: state.tickets.usedTickts
    }),
    dispatch => bindActionCreators({ push, getUnusedTikects, getUsedTickts }, dispatch)
)

export default class Tickets extends React.Component {
    constructor() {
        super();
        this.onMenuItemChange = (value) => this._onMenuItemChange(value);
        this.viewTicket = (e) => this._viewTicket(e);
        this.closeViewTickets = (e) => this._closeViewTickets(e);
        this.handleClickTicketToolBar = (e) => this._handleClickTicketToolBar(e);
        this.state = {
            used: true,
            selectedTicket: null,
            showSelectedTicket: false
        };
    }

    _onMenuItemChange(used) {
        this.setState({ used })
        if (used && this.props.usedTickts.length === 0) {
            this.props.getUsedTickts()
        }
        if (!used && this.props.unusedTikects.length === 0) {
            this.props.getUnusedTikects()
        }
    }

    _viewTicket(ticket) {
        this.setState({ showSelectedTicket: true, selectedTicket: ticket });
    }

    _closeViewTickets(e) {
        e.preventDefault();
        this.setState({ showSelectedTicket: false, selectedTicket: null });
    }

    _handleClickTicketToolBar(e) {
        e.preventDefault();
        this.props.push('/buytickets')
    }

    render() {
        const styles = require('./Tickets.scss')
        const tickets = this.state.used ? this.props.usedTickts : this.props.unusedTikects
        return (
            <div>
                {this.state.selectedTicket && <TicketDetail visible={this.state.showSelectedTicket} onCancel={this.closeViewTickets} ticket={this.state.selectedTicket} />}
                <Header user={this.props.user} onMenuItemChange={this.onMenuItemChange} />
                <div className={styles.ticketWrap}>
                    { tickets.map((ticket) =>(<Ticket key={ticket.id} viewTicket={this.viewTicket} ticket={ticket} />)) }
                </div>
                <TicketTool onTicketToolBarClick={this.handleClickTicketToolBar} />
            </div>
        );
    }
}
