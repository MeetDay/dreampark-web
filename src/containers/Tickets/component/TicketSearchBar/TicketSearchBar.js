import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
const Search = Input.Search;

export default class TicketSearchBar extends React.Component {
    render() {
        const styles = require('./TicketSearchBar.scss');
        return (
            <div className={styles.searchBar}>
                <Search
                    style={{ borderRadius: '50% !important' }}
                    placeholder="搜索门票"
                    onSearch={value => console.log(value)}
                />
            </div>
        );
    }
}
