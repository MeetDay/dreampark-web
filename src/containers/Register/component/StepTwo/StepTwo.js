import React from 'react'
import PropTypes from 'prop-types'
import superagent from 'superagent'
import { message } from 'antd'
import { LoginButton, Phone, Password } from '../../../../components'
import countDown from '../../../../Utils/countDown'
import { legalSMSCode, formatPhoneNumber } from '../../../../Utils/regex'

export default class StepTwo extends React.Component {
    static propTypes = {
        phonenumber: PropTypes.string
    }
    
    constructor() {
        super()
        this.handleClickNextStep = (e) => this._handleClickNextStep(e)
        this.handleClickRegainCode = (e) => this._handleClickRegainCode(e)
        this.onChange = (e) => this._onChange(e)
        this.state = {
            SMSCode: '',
            counterDisabled: false,
            counterMsg: '没有收到？重新获取'
        }
    }

    _handleClickRegainCode(e) {
        e.preventDefault()
        if (this.state.counterDisabled) return

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
    }

    _onChange(e) {
        e.preventDefault();
        console.log('SMSCode:', e.target.value)
        this.setState({ SMSCode: e.target.value })
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
                    <Phone zone={false} title="短信验证码" onChange={this.onChange} imgShow={legalSMSCode(this.state.SMSCode)} />
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
