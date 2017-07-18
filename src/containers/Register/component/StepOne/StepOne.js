import React from 'react'
import PropTypes from 'prop-types'
import { message } from 'antd'
import { getSMSCodeAccordingTo } from '../../module/register'
import { LoginButton, Phone, Password } from '../../../../components'
import { legalPhoneNumber, clearWhiteSpaceOf } from '../../../../utils/regex'

export default class StepOne extends React.Component {
    static propTypes = {
        phonenumber: PropTypes.string,
        password: PropTypes.string,
        onPhonenNmberChange: PropTypes.func,
        onPasswordChange: PropTypes.func,
        getSMSCode: PropTypes.func
    };

    constructor() {
        super()
        this.handleClickNextStep = (e) => this._handleClickNextStep(e)
        this.state = { phonenumberIllegal: false }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ phonenumberIllegal: legalPhoneNumber(this.props.phonenumber) })
        }, 0);
    }

    _handleClickNextStep(e) {
        e.preventDefault();
        if (!legalPhoneNumber(this.props.phonenumber))
            return message.warn('请输入正确的手机号...')
        this.props.getSMSCode(clearWhiteSpaceOf(this.props.phonenumber))
        location.hash = '#steptwo';
    }

    render() {
        const logingStyle = require('../../../Login/component/Loging/Loging.scss');
        const forgotpasswordStyle = require('../../../Login/component/ForgotPassword/ForgotPassword.scss');
        const styles = require('./StepOne.scss');
        return (
            <div className={styles.stepone}>
                <div className={forgotpasswordStyle.description}>
                    <span>请输入手机号</span>
                    <span>请输入您的电话号码及密码以注册成为梦想会员</span>
                </div>
                <div className={logingStyle.loginBottom}>
                    <Phone onChange={ this.props.onPhonenNmberChange } imgShow={legalPhoneNumber(this.props.phonenumber)} value={this.props.phonenumber} />
                    <Password onChange={ this.props.onPasswordChange } value={this.props.password} />
                    <LoginButton title="下一步" onClick={this.handleClickNextStep} />
                </div>
            </div>
        );
    }
}
