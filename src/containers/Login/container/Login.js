/**
 * @Author: WangChao
 * @Date:   2017-07-11T08:53:12+08:00
 * @Email:  crazyitcoder9527@126.com
 * @Project: dreampark-web
 * @Last modified by:   WangChao
 * @Last modified time: 2017-09-02T15:46:14+08:00
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { message } from 'antd'
import { Launching, Loging, ForgotPassword } from '../component'
import { StepTwo as SMSCode } from '../../Register/component'
import Navbar from '../component/Navbar/Navbar'
import { userLogin } from '../module/login'
import { legalPhoneNumber, clearWhiteSpaceOf } from '../../../utils/regex'
import { isFullUser } from '../../../utils/wechat';

const MAX_LENGTH_OF_SMS_CODE = 4;
const MAX_LENGTH_OF_PHONE = 11;
const MIN_LENGTH_OF_PASSWORD = 8;
const MAX_LENGTH_OF_PASSWORD = 14;

@connect(
    state => ({
        user: state.login.user,
        userLoginError: state.login.userLoginError
    }),
    dispatch => bindActionCreators({ push, userLogin }, dispatch)
)

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.onPhonenNmberChange = (e) => this._onPhonenNmberChange(e)
        this.onPasswordChange = (e) => this._onPasswordChange(e)
        this.onSMSCodeChange = (e) => this._onSMSCodeChange(e)
        this.userLogin = (e) => this._userLogin(e)
        this.state = {
            phonenumber: '',
            password: '',
            code: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        const { userLoginError, user } = nextProps;
        if (userLoginError && userLoginError !== this.props.userLoginError) {
            message.error(userLoginError.error_message);
        }

        if (user && user !== this.props.user && isFullUser(user)) {
            this.props.push('/tickets')
        }
        if (user && user !== this.props.user && !isFullUser(user)) {
            this.props.push('/register#stepthree');
        }
    }

    _onPhonenNmberChange(e) {
        e.preventDefault()
        const phonenumber = e.target.value;
        const phonenumberWithNoWhiteSpace = clearWhiteSpaceOf(e.target.value);
        if (phonenumberWithNoWhiteSpace.length <= MAX_LENGTH_OF_PHONE) {
            this.setState({ phonenumber: phonenumber })
        }
    }

    _onPasswordChange(e) {
        e.preventDefault()
        const password = e.target.value;
        if (password.length <= MAX_LENGTH_OF_PASSWORD) {
            this.setState({ password: password })
        }
    }

    _onSMSCodeChange(e) {
        e.preventDefault()
        const smscode = e.target.value;
        const smscodeWithNoWhiteSpace = clearWhiteSpaceOf(smscode);
        if (smscodeWithNoWhiteSpace.length <= MAX_LENGTH_OF_SMS_CODE) {
            this.setState({ code: smscode })
        }
    }

    _userLogin(e) {
        e.preventDefault()
        const leagalPhone = legalPhoneNumber(this.state.phonenumber);
        const legalPassword = this.state.password.length >= MIN_LENGTH_OF_PASSWORD;
        if (leagalPhone && legalPassword) {
            this.props.userLogin(clearWhiteSpaceOf(this.state.phonenumber), this.state.password)
        } else {
            message.error('请输入正确的用户名或密码...');
        }
    }

    render() {
        const styles = require('./Login.scss');
        const { location } = this.props
        let content = (
            <Loging
                phonenumber={this.state.phonenumber}
                password={this.state.password}
                onPhonenNmberChange={this.onPhonenNmberChange}
                onPasswordChange={this.onPasswordChange}
                userLogin={this.userLogin}
            />
        )
        if (this.props.location.hash === '#launching') {
            content = (<Launching pushState={this.props.push} />);
        } else if (this.props.location.hash === '#forgotpassword') {
            content = (
                <ForgotPassword
                    phonenumber={this.state.phonenumber}
                    onPhonenNmberChange={this.onPhonenNmberChange}
                />
            )
        } else if (this.props.location.hash === '#smscode') {
            content = (
                <SMSCode
                    showNewPasswordComponent
                    code={this.state.code}
                    phonenumber={this.state.phonenumber}
                    onSMSCodeChange={this.onSMSCodeChange}
                    onPasswordChange={this.onPasswordChange}
                />
            )
        }
        return (
            <div>
                <div className={styles.loginBack} />
                {/* {showNavbar && <div className={styles.nav}><Navbar showForgotPassword={false} /></div>} */}
                { content }
            </div>
        );
    }
}
