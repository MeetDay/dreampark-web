import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
const Search = Input.Search;

export default class TicketSearchBar extends React.Component {
    static propTypes = {
        disabled: PropTypes.bool,
        placeholder: PropTypes.string,
        onFocus: PropTypes.func,
        onSearch: PropTypes.func
    }
    static defaultProps = {
        disabled: false,
        placeholder: '搜索门票'
    }

    render() {
        const styles = require('./TicketSearchBar.scss');
        const searchStyle = { overflow: 'hidden', borderRadius: '14px', border: 'none' };
        return (
            <div className={styles.searchBar}>
                <div className={styles.back} onClick={() => history.back()}><img src="/assets/back.png" alt="back"/></div>
                <div className={styles.search}>
                    <Search id="ticketsearch" style={searchStyle} disabled={this.props.disabled} placeholder={this.props.placeholder} onFocus={this.props.onFocus} onSearch={this.props.onSearch} />
                </div>
            </div>
        );
    }
}
