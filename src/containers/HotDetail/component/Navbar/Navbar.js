import React from 'react';
import PropTypes from 'prop-types';

export default class Navbar extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        isLike: PropTypes.bool,
        onClickLike: PropTypes.func
    }
    constructor() {
        super();
        this.handleClickBack = (e) => this._handleClickBack(e);
    }

    _handleClickBack(e) {
        e.preventDefault();
        history.back();
    }

    render() {
        const styles = require('./Navbar.scss');
        const { title, isLike } = this.props;
        const likeImageUrl = isLike ? '/assets/likes_nav_selected.png' : '/assets/likes_nav.png';
        return (
            <div className={styles.navbar}>
                <div className={styles.imgWrap} onClick={this.handleClickBack}>
                    <img className={styles.back} src="/assets/back.png" alt="back"/>
                </div>
                {title && <div className={styles.title}>{title}</div>}
                <div className={styles.imgWrap} onClick={this.props.onClickLike}>
                    <img className={styles.like} src={likeImageUrl} alt="like"/>
                </div>
            </div>
        );
    }
}
