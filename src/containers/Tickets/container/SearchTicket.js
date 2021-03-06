import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TicketSearchBar, TicketCard } from '../component'
import { searchTickets } from '../module/tickets'

@connect(
    state => ({
        searchedTickets: state.tickets.searchedTickets,
        searchTicketsLoading: state.tickets.searchTicketsLoading,
        searchTicketsLoaded: state.tickets.searchTicketsLoaded
    }),
    dispatch => bindActionCreators({ searchTickets }, dispatch)
)

export default class SearchTicket extends React.Component {

    constructor(props) {
        super(props)
        this.handleSearch = (value) => this._handleSearch(value)
    }

    componentDidMount() {
        const searchComponent = document.getElementById('ticketsearch')
        searchComponent.focus()
    }

    _handleSearch(value) {
        this.props.searchTickets(value)
    }

    hasTickets(tickets) {
        let hasTickets = false
        if (tickets && Array.isArray(tickets) && tickets.length > 0) {
            hasTickets = true
        }
        return hasTickets
    }

    render() {
        const styles = require('./SearchTicket.scss')
        const { searchedTickets } = this.props;
        const hasTickets = this.hasTickets(searchedTickets)

        return (
            <div className={styles.searchTicket}>
                <Helmet><title>搜索门票</title></Helmet>
                <TicketSearchBar onSearch={this.handleSearch} />
                <div className={styles.contentWrap}>
                    {!hasTickets &&
                        <div className={styles.noSearchResult}>
                            <div className={styles.searchImg}><img src="/assets/search_no_result.png" alt="no_result"/></div>
                            <div className={styles.noSearchDescription}>
                                <span>未能找到相关结果</span>
                                <span>检查您所输入的关键词或从首页<br/>地图浏览园区</span>
                            </div>
                        </div>
                    }
                    {hasTickets &&
                        <div className={styles.items}>
                            { searchedTickets.map(ticket => (<TicketCard key={ticket.poi_id} ticket={ticket} />)) }
                        </div>
                    }
                </div>
            </div>
        );
    }
}
