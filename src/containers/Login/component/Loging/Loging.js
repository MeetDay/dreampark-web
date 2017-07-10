import React from 'react';
import PropTypes from 'prop-types';

import { Phone, Password, LoginButton } from '../../../../components'
import { legalPhoneNumber } from '../../../../utils/regex'

export default class Loging extends React.Component {
    static propTypes = {
        phonenumber: PropTypes.string,
        userLogin: PropTypes.func,
        onPhonenNmberChange: PropTypes.func,
        onPasswordChange: PropTypes.func
    }

    render() {
        const styles = require('./Loging.scss');
        return (
            <div className={styles.loging}>
                {/* <div className={styles.forgotPassword}>
                    <a href="/login#forgotpassword">忘记密码</a>
                </div> */}
                <div className={styles.loginDescription}>
                    <span>登&nbsp;录</span>
                </div>
                <div className={styles.loginBottom}>
                    <Phone onChange={this.props.onPhonenNmberChange} defaultValue={this.props.phonenumber} imgShow={legalPhoneNumber(this.props.phonenumber)} />
                    <Password onChange={this.props.onPasswordChange} />
                    <LoginButton title="登录" onClick={this.props.userLogin} />
                </div>
            </div>
        );
    }
}
