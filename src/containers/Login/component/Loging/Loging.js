/**
 * @Author: WangChao
 * @Date:   2017-07-11T08:53:12+08:00
 * @Email:  crazyitcoder9527@126.com
 * @Project: dreampark-web
 * @Last modified by:   WangChao
 * @Last modified time: 2017-09-02T10:52:17+08:00
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Phone, Password, LoginButton } from '../../../../components'
import { legalPhoneNumber } from '../../../../utils/regex'

export default class Loging extends React.Component {
    static propTypes = {
        phonenumber: PropTypes.string,
        password: PropTypes.string,
        userLogin: PropTypes.func,
        onPhonenNmberChange: PropTypes.func,
        onPasswordChange: PropTypes.func
    }

    render() {
        const styles = require('./Loging.scss');
        return (
            <div className={styles.loging}>
                <div className={styles.loginDescription}><span>登&nbsp;录</span></div>
                <div className={styles.loginBottom}>
                    <Phone usedFor="other" zone={false} type="text" title="电话号码或身份证号码" onChange={this.props.onPhonenNmberChange} value={this.props.phonenumber} />
                    <Password onChange={this.props.onPasswordChange} value={this.props.password} />
                    <LoginButton title="登录" onClick={this.props.userLogin} />
                </div>
            </div>
        );
    }
}
