import React from 'react'
import PropTypes from 'prop-types'
import { TicketSearchBar, SearchItem } from '../component'

export default class SearchTicket extends React.Component {

    constructor(props) {
        super(props)
        this.handleSearch = (value) => this._handleSearch(value)
    }

    _handleSearch(value) {
        console.log(value)
    }

    render() {
        const styles = require('./SearchTicket.scss')
        return (
            <div className={styles.searchTicket}>
                <TicketSearchBar onSearch={this.handleSearch} />
                <div className={styles.contentWrap}>
                    <div className={styles.noSearchResult}>
                        <div className={styles.searchImg}><img src="/assets/search_no_result.png" alt="no_result"/></div>
                        <div className={styles.noSearchDescription}>
                            <span>未能找到相关结果</span>
                            <span>检查您所输入的关键词或从首页<br/>地图浏览园区</span>
                        </div>
                    </div>
                    {/* <div className={styles.items}>
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                    </div> */}
                </div>
            </div>
        );
    }
}
