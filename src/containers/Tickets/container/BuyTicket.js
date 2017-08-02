import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { bindActionCreators } from 'redux';
import { isRecommendTicketsLoaded, getRecommendTickets } from '../module/tickets';
import { TicketCard, TicketSearchBar } from '../component';
import { LoadMoreButton } from '../../../components';

@asyncConnect([{
    deferred: true,
    promise: ({ params, store:{ dispatch, getState }, helpers }) => {
        if (!isRecommendTicketsLoaded(getState())) {
            return dispatch(getRecommendTickets())
        }
    }
}])

@connect(
    state => ({
        recommendTicketsLoading: state.tickets.recommendTicketsLoading,
        hasMoreRecommendTickets: state.tickets.hasMoreRecommendTickets,
        recommendTickets: state.tickets.recommendTickets
    }),
    dispatch => bindActionCreators({ push, getRecommendTickets }, dispatch)
)

export default class BuyTicket extends React.Component {
    constructor(props) {
        super(props)
        this.handleSearchFocus = (e) => this._handleSearchFocus(e)
        this.handleClickLoadMore = (e) => this._handleClickLoadMore(e)
    }

    _handleSearchFocus(e) {
        e.preventDefault()
        this.props.push('/buytickets/search')
    }

    _handleClickLoadMore(e) {
        e.preventDefault()
        if (!this.props.recommendTicketsLoading) {
            this.props.getRecommendTickets()
        }
    }

    render() {
        const styles = require('./BuyTicket.scss');
        const { recommendTickets } = this.props;
        return (
            <div className={styles.buyTicket}>
                <TicketSearchBar onFocus={this.handleSearchFocus}/>
                { recommendTickets &&
                    recommendTickets.map(ticket => <TicketCard key={ticket.id} ticket={ticket} />)
                }
                {this.props.hasMoreRecommendTickets && <LoadMoreButton onClick={this.handleClickLoadMore} isActive={this.props.recommendTicketsLoading} />}
            </div>
        );
    }
}
