import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class PageNotExist extends React.Component {
    render() {
        const styles = require('./PageNotExist.scss')
        return (
            <div className={styles.pageNotExist}>
                <center className={classNames(styles.content, styles.realCenter)}>
                    <span>哦 喔...</span><br/>
                    <span>您访问的页面不存在了</span>
                </center>
            </div>
        );
    }
}
