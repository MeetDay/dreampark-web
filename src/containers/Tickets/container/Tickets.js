import React from 'react';
import PropTypes from 'prop-types';
import { Header, Ticket, TicketDetail, TicketTool } from '../component';

export default class Tickets extends React.Component {
    constructor() {
        super();
        this.onMenuItemChange = (value) => this._onMenuItemChange(value);
        this.viewTickets = (e) => this._viewTickets(e);
        this.closeViewTickets = (e) => this._closeViewTickets(e);
        this.handleClickBuyTickets = (e) => this._handleClickBuyTickets(e);
        this.state = {
            selectedTicket: { username: Math.random()},
            showModal: false
        };
    }

    _onMenuItemChange(value) {
        console.log(value);
    }

    _viewTickets(e) {
        e.preventDefault();
        console.log('查看门票');
        this.setState({
            showModal: true,
            selectedTicket: { username: Math.random()}
        });
    }

    _closeViewTickets(e) {
        e.preventDefault();
        console.log('关闭查看门票页');
        this.setState({
            showModal: false,
            selectedTicket: null
        });
    }

    _handleClickBuyTickets(e) {
        e.preventDefault();
        location.href = '/buytickets';
    }

    render() {
        const styles = require('./Tickets.scss');
        return (
            <div>
                {this.state.selectedTicket &&
                    <TicketDetail
                        visible={this.state.showModal}
                        onCancel={this.closeViewTickets}
                        ticket={this.state.selectedTicket}
                    />
                }
                <Header onMenuItemChange={this.onMenuItemChange} />
                <div className={styles.ticketWrap}>
                    <Ticket viewTickets={this.viewTickets}/>
                    <Ticket />
                    <Ticket />
                    <Ticket />
                    <Ticket />
                    <Ticket />
                </div>
                <TicketTool onClick={this.handleClickBuyTickets} />
            </div>
        );
    }
}
