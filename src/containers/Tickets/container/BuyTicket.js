import React from 'react';
import PropTypes from 'prop-types';
import { TicketCard, TicketSearchBar } from '../component';

export default class BuyTicket extends React.Component {
    render() {
        const styles = require('./BuyTicket.scss');
        return (
            <div>
                <TicketSearchBar />
                <TicketCard />
                <TicketCard />
                <TicketCard />
                <TicketCard />
                <TicketCard />
                <TicketCard />
                <TicketCard />
            </div>
        );
    }
}
