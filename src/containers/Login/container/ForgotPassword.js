import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { Phone, LoginButton } from '../../../components';
import { getSMSCodeAccordingTo } from '../../Register/module/register';
import { legalPhoneNumber, clearWhiteSpaceOf } from '../../../utils/regex';

const MAX_LENGTH_OF_PHONE = 11;

@connect(
    state => ({
        smsCodeSuccess: state.register.smsCodeSuccess,
        smsCodeError: state.register.smsCodeError
    }),
    dispatch => bindActionCreators({ push, getSMSCodeAccordingTo }, dispatch)
)

export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.onPhonenNmberChange = (e) => this._onPhonenNmberChange(e);
        this.handleClickGainCode = (e) => this._handleClickGainCode(e);

        this.state = {
            phonenumber: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        const { smsCodeSuccess: nextSmsCodeSuccess, smsCodeError:nextSmsCodeError } = nextProps;
        if (nextSmsCodeSuccess && nextSmsCodeSuccess != this.props.smsCodeSuccess) {
            this.props.push(`/user/forgotpassword/changepassword?phonenumber=${this.state.phonenumber}`);
        } else if (nextSmsCodeError && nextSmsCodeError != this.props.smsCodeError) {
            console.log(JSON.stringify(nextSmsCodeError));
            setTimeout(_ => message.error('获取短信验证码失败, 请重新尝试获取...'), 1000)
        }
    }

    _onPhonenNmberChange(e) {
        e.preventDefault();
        const phonenumber = e.target.value;
        const phonenumberWithNoWhiteSpace = clearWhiteSpaceOf(e.target.value);
        if (phonenumberWithNoWhiteSpace.length <= MAX_LENGTH_OF_PHONE) {
            this.setState({ phonenumber: phonenumberWithNoWhiteSpace })
        }
    }

    _handleClickGainCode(e) {
        e.preventDefault()
        if (legalPhoneNumber(this.state.phonenumber)) {
            this.props.getSMSCodeAccordingTo(this.state.phonenumber)
        }
    }

    render() {
        const loginStyles = require('./Login.scss');
        const styles = require('./ForgotPassword.scss');
        return (
            <div>
                <div className={loginStyles.loginBack} />
                <div className={styles.forgotpassword}>
                    <div className={styles.description}>
                        <span>忘记密码？</span>
                        <span>请输入您的电话号码以查找您的账号。</span>
                    </div>
                    <div className={styles.bottom}>
                        <Phone value={this.state.phonenumber} imgShow={legalPhoneNumber(this.state.phonenumber)} onChange={this.onPhonenNmberChange} />
                        <LoginButton title="获取验证码" onClick={this.handleClickGainCode} />
                    </div>
                </div>
            </div>
        );
    }
}
