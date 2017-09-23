import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { message } from 'antd';
import { LoginButton, Phone, Password } from '../../../components/index';
import { getSMSCodeAccordingTo } from '../../Register/module/register';
import { forgotpassword } from '../module/login';
import { legalSMSCode, formatPhoneNumber, clearWhiteSpaceOf } from '../../../utils/regex';
import countDown from '../../../utils/countDown';

@connect(
    state => ({
        smsCodeSuccess: state.register.smsCodeSuccess,
        smsCodeError: state.register.smsCodeError,

        user: state.login.user,
        forgotpasswordError: state.login.forgotpasswordError
    }),
    dispatch => bindActionCreators({ push, getSMSCodeAccordingTo, forgotpassword }, dispatch)
)

export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.onSMSCodeChange = (e) => this._onSMSCodeChange(e);
        this.onPasswordChange = (e) => this._onPasswordChange(e);
        this.handleClickRegainCode = (e) => this._handleClickRegainCode(e);
        this.handleClickNextStep = (e) => this._handleClickNextStep(e);
        this.state = {
            phonenumber: props.location.query.phonenumber,
            smsCode: '',
            password: '',
            counterDisabled: false,
            counterMsg: '没有收到？重新获取'
        };
    }

    componentWillReceiveProps(nextProps) {
        const { user: nextUser, forgotpasswordError } = nextProps;
        if (nextUser && nextUser != this.props.user) {
            this.props.push('/tickets');
        } else if (forgotpasswordError && forgotpasswordError != this.props.forgotpasswordError) {
            console.log(JSON.stringify(forgotpasswordError));
            message.error(forgotpasswordError.error_message || '更换密码失败...');
        }
    }

    _onSMSCodeChange(e) {
        e.preventDefault()
        const smsCode = e.target.value;
        const smsCodeWithNoWhiteSpace = clearWhiteSpaceOf(smsCode);
        if (smsCodeWithNoWhiteSpace.length <= 4) {
            this.setState({
                smsCode: smsCodeWithNoWhiteSpace
            });
        }
    }

    _onPasswordChange(e) {
        e.preventDefault();
        const password = e.target.value;
        const passwordWithNoWhiteSpace = clearWhiteSpaceOf(password);
        if (passwordWithNoWhiteSpace.length <= 14) {
            this.setState({
                password: passwordWithNoWhiteSpace
            });
        }
    }

    // 更新密码
    _handleClickNextStep(e) {
        e.preventDefault();
        if (this.state.smsCode.length !== 4) {
            message.error(`请输入4位有效短信验证码`); return;
        }
        if (this.state.password.length < 8 || this.state.password.length > 14) {
            message.error('请输入 8 至 14 位的有效密码'); return;
        }
        this.props.forgotpassword({
            phone: this.state.phonenumber,
            code: this.state.smsCode,
            password: this.state.password
        });
    }

    //  获取验证码
    _handleClickRegainCode(e) {
        e.preventDefault()
        if (this.state.counterDisabled) return
        this.props.getSMSCodeAccordingTo(clearWhiteSpaceOf(this.props.location.query.phonenumber))

        const updateCounter = (counter) => {
            this.setState({
                counterDisabled: counter === 0 ? false : true,
                counterMsg: counter === 0 ? '没有收到？重新获取' : `${counter}秒后, 重新获取`
            })
        }
        countDown(60, updateCounter)
    }

    render() {
        const loginStyles = require('./Login.scss');
        const styles = require('./ChangePassword.scss');
        return (
            <div>
                <div className={loginStyles.loginBack} />
                <div className={styles.changepassword}>
                    <div className={styles.description}>
                        <span>重置密码</span>
                        <span>{`我们向 ${formatPhoneNumber(this.state.phonenumber)} 发送了一个短信验证码。请输入以重置密码`}</span>
                    </div>
                    <div className={styles.interaction}>
                        <Phone zone={false} usedFor="other" title="短信验证码" onChange={this.onSMSCodeChange} value={this.state.smsCode} imgShow={legalSMSCode(this.state.smsCode)} />
                        <Password title="新的密码" onChange={this.onPasswordChange} value={this.state.password} />
                    </div>
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
