import React from 'react'
import PropTypes from 'prop-types'
import { SearchBar } from '../../../components'
import { SearchItem } from '../component'

export default class SearchTicket extends React.Component {
    render() {
        const styles = require('./SearchTicket.scss')
        return (
            <div className={styles.searchTicket}>
                <SearchBar />
                <div className={styles.items}>
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                </div>
            </div>
        );
    }
}
