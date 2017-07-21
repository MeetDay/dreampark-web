import React from 'react'
import PropTypes from 'prop-types'
import superagent from 'superagent'
import { message } from 'antd'
import { LoginButton, Phone, Password } from '../../../../components'
import countDown from '../../../../Utils/countDown'
import { legalSMSCode, formatPhoneNumber } from '../../../../utils/regex'

export default class StepTwo extends React.Component {
    static propTypes = {
        code: PropTypes.string,
        phonenumber: PropTypes.string,
        showNewPasswordComponent: PropTypes.bool,
        onSMSCodeChange: PropTypes.func,
        onPasswordChange: PropTypes.func,
        getSMSCode: PropTypes.func,
        userSignup: PropTypes.func,

        smsCodeError:PropTypes.object,
        signUser: PropTypes.object,
        userSignupError: PropTypes.object
    }
    static defaultProps = {
        showNewPasswordComponent: false
    }

    constructor() {
        super()
        this.handleClickNextStep = (e) => this._handleClickNextStep(e)
        this.handleClickRegainCode = (e) => this._handleClickRegainCode(e)
        this.state = {
            counterDisabled: false,
            counterMsg: '没有收到？重新获取'
        }
    }

    componentDidMount() {
        if (!this.props.phonenumber || this.props.phonenumber.length <= 0)
            location.hash = ''
    }

    componentWillReceiveProps(nextProps) {
        const { smsCodeError, signUser, userSignupError } = nextProps
        if (smsCodeError && smsCodeError !== this.props.smsCodeError) {
            setTimeout(_ => message.error(smsCodeError.error), 1000)
        }

        if (userSignupError && userSignupError !== this.props.userSignupError) {
            console.log(userSignupError)
        }

        if (signUser && signUser !== this.props.signUser) {
            location.hash = '#stepthree'
        }
    }

    _handleClickRegainCode(e) {
        e.preventDefault()
        if (this.state.counterDisabled) return
        this.props.getSMSCode(this.props.phonenumber)

        const updateCounter = (counter) => {
            this.setState({
                counterDisabled: counter === 0 ? false : true,
                counterMsg: counter === 0 ? '没有收到？重新获取' : `${counter}秒后, 重新获取`
            })
        }
        countDown(60, updateCounter)
    }

    _handleClickNextStep(e) {
        e.preventDefault()
        if (this.props.showNewPasswordComponent) {
            console.log('i don\'t know what next step is ?')
        } else {
            this.props.userSignup()
        }
    }

    render() {
        const logingStyle = require('../../../Login/component/Loging/Loging.scss');
        const forgotpasswordStyle = require('../../../Login/component/ForgotPassword/ForgotPassword.scss');
        const styles = require('./StepTwo.scss');
        return (
            <div className={styles.steptwo}>
                <div className={forgotpasswordStyle.description}>
                    <span>输入验证码</span>
                    <span>{`我们向 ${formatPhoneNumber(this.props.phonenumber)} 发送了一个短信验证码。请输入...`}</span>
                </div>
                <div className={logingStyle.loginBottom}>
                    <Phone zone={false} usedFor="other" title="短信验证码" onChange={this.props.onSMSCodeChange} value={this.props.code} imgShow={legalSMSCode(this.props.code)} />
                    {this.props.showNewPasswordComponent && <Password title="新的密码" onChange={this.props.onPasswordChange} />}
                    <div className={styles.nextstep}>
                        <LoginButton
                            title={this.state.counterMsg}
                            bgColor="tansparent"
                            borderColor="white"
                            textColor="white"
                            onClick={this.handleClickRegainCode}
                        />
                        <LoginButton title="下一步" onClick={this.handleClickNextStep} />
                    </div>
                </div>
            </div>
        );
    }
}
