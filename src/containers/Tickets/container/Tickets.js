import React from 'react';
import { Header, Ticket, TicketTool } from '../component';

export default class Tickets extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Ticket />
                <TicketTool />
            </div>
        );
    }
}
