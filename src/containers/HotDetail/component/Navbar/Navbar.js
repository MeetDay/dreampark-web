import React from 'react';
import PropTypes from 'prop-types';

export default class Navbar extends React.Component {
    constructor() {
        super();
        this.handleClickBack = (e) => this._handleClickBack(e);
        this.handleClickLike = (e) => this._handleClickLike(e);
    }

    _handleClickBack(e) {
        e.preventDefault();
        history.back();
    }

    _handleClickLike(e) {
        e.preventDefault();
    }

    render() {
        const styles = require('./Navbar.scss');
        return (
            <div className={styles.navbar}>
                <div className={styles.imgWrap} onClick={this.handleClickBack}>
                    <img className={styles.back} src="/assets/back.png" alt="back"/>
                </div>
                <div className={styles.title}>梦想车展</div>
                <div className={styles.imgWrap} onClick={this.handleClickLike}>
                    <img className={styles.like} src="/assets/likes_nav_selected.png" alt="like"/>
                </div>
            </div>
        );
    }
}
