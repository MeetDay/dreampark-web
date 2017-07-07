import React from 'react'
import PropTypes from 'prop-types'
import { Phone, Password, LoginButton } from '../../../../components'
import { legalPhoneNumber } from '../../../../Utils/regex'
import Navbar from '../Navbar/Navbar'

export default class ForgotPassword extends React.Component {
    static propTypes = {
        phonenumber: PropTypes.string,
        onPhonenNmberChange: PropTypes.func
    }
    constructor(props) {
        super(props)
        this.handleClickGainCode = (e) => this._handleClickGainCode(e)
    }

    _handleClickGainCode(e) {
        e.preventDefault()
        location.hash = '#smscode'
    }

    render() {
        const styles = require('./ForgotPassword.scss')
        return (
            <div className={styles.forgotpassword}>
                {/* <div className={styles.nav} /> */}
                {/* <Navbar /> */}
                <div className={styles.description}>
                    <span>忘记密码？</span>
                    <span>请输入您的电话号码以查找您的账号。</span>
                </div>
                <div className={styles.bottom}>
                    <Phone defaultValue={this.props.phonenumber} imgShow={legalPhoneNumber(this.props.phonenumber)} onChange={this.props.onPhonenNmberChange} />
                    <LoginButton title="获取验证码" onClick={this.handleClickGainCode} />
                </div>
            </div>
        );
    }
}
