import React from 'react';
import { Header, Ticket, TicketTool } from '../component';

export default class Tickets extends React.Component {
    constructor() {
        super();
        this.onMenuItemChange = (value) => this._onMenuItemChange(value);
        this.handleClickBuyTickets = (e) => this._handleClickBuyTickets(e);
    }

    _onMenuItemChange(value) {
        console.log(value);
    }

    _handleClickBuyTickets(e) {
        e.preventDefault();
        console.log('购买门票');
    }

    render() {
        return (
            <div>
                <Header onMenuItemChange={this.onMenuItemChange} />
                <Ticket />
                <TicketTool onClick={this.handleClickBuyTickets} />
            </div>
        );
    }
}
