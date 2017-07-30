import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { TicketCard, TicketSearchBar } from '../component'
import { LoadMoreButton } from '../../../components'

@connect(
    null,
    dispatch => bindActionCreators({ push }, dispatch)
)

export default class BuyTicket extends React.Component {
    constructor(props) {
        super(props)
        this.handleSearchFocus = (e) => this._handleSearchFocus(e)
        this.handleClickLoadMore = (e) => this._handleClickLoadMore(e)
        this.state = {
            isActive: false
        }
    }

    _handleSearchFocus(e) {
        e.preventDefault()
        this.props.push('/buytickets/search')
    }

    _handleClickLoadMore(e) {
        e.preventDefault()
        this.setState({
            isActive: !this.state.isActive
        })
        console.log('click load more...')
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
                <LoadMoreButton onClick={this.handleClickLoadMore} isActive={this.state.isActive} />
            </div>
        );
    }
}
