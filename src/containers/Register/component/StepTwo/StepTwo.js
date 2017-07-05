import React from 'react'
import PropTypes from 'prop-types'
import superagent from 'superagent'
import { message } from 'antd'
import { LoginButton, Phone, Password } from '../../../../components'

export default class StepTwo extends React.Component {
    static propTypes = {
        phonenumber: PropTypes.string
    }
    static defaultProps = {
        phonenumber: ''
    };
    constructor() {
        super()
        this.handleClickNextStep = (e) => this._handleClickNextStep(e)
        this.handleClickRegainCode = (e) => this._handleClickRegainCode(e)
        this.onChange = (e) => this._onChange(e)
        this.state = {
            SMSCode: '',
            msg_id: '06890980-6789-4054-bba9-90fb66ab2fce'
        }
    }

    _handleClickRegainCode(e) {
        e.preventDefault()
        superagent
            .post('https://api.sms.jpush.cn/v1/codes')
            .send({ mobile: this.props.phonenumber, temp_id: 123 })
            .set('Authorization', `Basic ${new Buffer('appKey:masterSecrect').toString('base64')}`)
            .end((error, { body } = {}) => {
                if (error || Object.prototype.hasOwnProperty.call(body, 'error'))
                    return message.error('获取短信验证码失败')
                this.setState({ msg_id: body[msg_id] })
            })
    }

    _handleClickNextStep(e) {
        e.preventDefault()
        if (this.state.msg_id.length <= 0) return
        superagent
            .post(`https://api.sms.jpush.cn/v1/codes/${this.state.msg_id}/valid`)
            .send({ code: this.state.SMSCode })
            .set('Authorization', `Basic ${new Buffer('appKey:masterSecrect').toString('base64')}`)
            .end((error, { body } = {}) => {
                location.hash = '#stepthree';
                if (error || Object.prototype.hasOwnProperty.call(body, 'error'))
                    return message.error('短信验证码错误, 请重新输入')
                location.hash = '#stepthree';
            })
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
                    <span>{`我们向 ${this.props.phonenumber.replace(/(\d)(?=(\d{4})+(?!\d))/g, '$1' + ' ')} 发送了一个短信验证码。请输入...`}</span>
                </div>
                <div className={logingStyle.loginBottom}>
                    <Phone zone={false} title="短信验证码" onChange={this.onChange} />
                    <div className={styles.nextstep}>
                        <LoginButton
                            title="没有收到？重新获取"
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
