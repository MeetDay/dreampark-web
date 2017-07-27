import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { TicketCard, TicketSearchBar } from '../component';

export default class BuyTicket extends React.Component {
    constructor(props) {
        super(props)
        this.handleSearchFocus = (e) => this._handleSearchFocus(e)
    }

    _handleSearchFocus(e) {
        this.props.dispatch(push('/buytickets/search'))
    }

    render() {
        const styles = require('./BuyTicket.scss');
        return (
            <div className={styles.buyTicket}>
                <TicketSearchBar onFocus={this.handleSearchFocus}/>
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
