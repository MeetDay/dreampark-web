import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet'
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
        if (!this.props.recommendTicketsLoading && this.props.hasMoreRecommendTickets) {
            this.props.getRecommendTickets()
        }
    }

    render() {
        const styles = require('./BuyTicket.scss');
        const { hasMoreRecommendTickets, recommendTickets } = this.props;
        let content = null;
        if (!recommendTickets || recommendTickets.length == 0) {
            content = (<div className={styles.noRecomedDescription}>噢 喔...<br /> 暂时没有任何推荐的门票!</div>);
        } else if (recommendTickets && recommendTickets.length > 0) {
            content = (
                <div>
                    {recommendTickets.map(ticket => <TicketCard key={ticket.poi_id} ticket={ticket} />)}
                    <LoadMoreButton onClick={this.handleClickLoadMore} hasMore={hasMoreRecommendTickets}isActive={this.props.recommendTicketsLoading} />
                </div>
            );
        }

        return (
            <div className={styles.buyTicket}>
                <Helmet><title>购买门票</title></Helmet>
                <TicketSearchBar onFocus={this.handleSearchFocus}/>
                {content}
            </div>
        );
    }
}
