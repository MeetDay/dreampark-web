import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Navbar extends React.Component {
    static propTypes = {
        showForgotPassword : PropTypes.bool
    }
    static defaultProps = {
        showForgotPassword: false
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
        const logingStyles = require('../Loging/Loging.scss');
        const styles = require('./Navbar.scss');
        return (
            <div className={styles.navbar}>
                <div onClick={this.handleClickBack} className={styles.back}><img src="/assets/back.png" alt="back" /></div>
                {this.props.showForgotPassword &&
                    <div className={classNames(styles.forgot, logingStyles.forgotPassword)}>
                        <a href="/login#forgotpassword">忘记密码</a>
                    </div>
                }
            </div>
        );
    }
}
