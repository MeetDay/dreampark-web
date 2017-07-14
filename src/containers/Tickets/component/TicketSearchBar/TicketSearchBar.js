import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
const Search = Input.Search;

export default class TicketSearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.handleSearch = (value) => this._handleSearch(value)
    }

    _handleSearch(value) {
        console.log(value)
    }

    render() {
        const styles = require('./TicketSearchBar.scss');
        return (
            <div className={styles.searchBar}>
                <div className={styles.back} onClick={() => history.back()}><img src="/assets/back.png" alt="back"/></div>
                <div className={styles.search}><Search style={{ overflow: 'hidden', borderRadius: '14px', border: 'none' }} placeholder="搜索门票" onSearch={this.handleSearch} /></div>
            </div>
        );
    }
}
