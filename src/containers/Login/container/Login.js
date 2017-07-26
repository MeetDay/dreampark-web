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

@connect(
    state => ({

    }),
    dispatch => bindActionCreators({ userLogin }, dispatch)
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

    _onPhonenNmberChange(e) {
        e.preventDefault()
        if (clearWhiteSpaceOf(e.target.value).length > 11) return
        this.setState({ phonenumber: e.target.value })
    }

    _onPasswordChange(e) {
        e.preventDefault()
        const password = e.target.value
        this.setState({ password: password })
    }

    _onSMSCodeChange(e) {
        e.preventDefault()
        if (clearWhiteSpaceOf(e.target.value).length > 4) return
        this.setState({ code: e.target.value })
    }

    _userLogin(e) {
        e.preventDefault()
        if (legalPhoneNumber(this.state.phonenumber) && this.state.password.length >= 8) {
            this.props.userLogin(clearWhiteSpaceOf(this.state.phonenumber), this.state.password)
        } else {
            message.error('用户名或密码错误...')
        }
    }

    render() {
        const styles = require('./Login.scss');
        const { location } = this.props
        const showForgotPassword = (location.hash === '#loging' || location.hash === '')
        let content = (
            <Loging
                phonenumber={this.state.phonenumber}
                onPhonenNmberChange={this.onPhonenNmberChange}
                onPasswordChange={this.onPasswordChange}
                userLogin={this.userLogin}
            />
        )
        if (this.props.location.hash === '#launching') {
            content = (<Launching />);
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
                {this.props.location.hash !== '#launching' && <div className={styles.nav}><Navbar showForgotPassword={showForgotPassword} /></div>}
                { content }
            </div>
        );
    }
}
