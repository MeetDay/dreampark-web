import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { Loging } from '../component';
import { userLogin } from '../module/login';
import { legalPhoneNumber, clearWhiteSpaceOf } from '../../../utils/regex';

const MAX_LENGTH_OF_SMS_CODE = 4;
const MAX_LENGTH_OF_PHONE = 11;
const MIN_LENGTH_OF_PASSWORD = 8;
const MAX_LENGTH_OF_PASSWORD = 14;
const MAX_LENGTH_OF_CARD = 18;

@connect(
    state => ({
        user: state.login.user,
        userLoginError: state.login.userLoginError
    }),
    dispatch => bindActionCreators({ push, userLogin }, dispatch)
)

export default class PureLogin extends React.Component {

    constructor(props) {
        super(props);
        this.onPhonenNmberChange = (e) => this._onPhonenNmberChange(e);
        this.onPasswordChange = (e) => this._onPasswordChange(e);
        this.userLogin = (e) => this._userLogin(e);

        this.state = {
            phonenumber: '',
            password: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        const { user: nextUser, userLoginError: nextUserLoginError } = nextProps;
        if (nextUserLoginError && nextUserLoginError !== this.props.userLoginError) {
            message.error(nextUserLoginError.error_message);
        }
        if (nextUser && nextUser !== this.props.user && isFullUser(nextUser)) {
            this.props.push('/tickets')
        }
        if (nextUser && nextUser !== this.props.user && !isFullUser(nextUser)) {
            this.props.push('/register#stepthree');
        }
    }

    _onPhonenNmberChange(e) {
        e.preventDefault()
        const phonenumber = e.target.value;
        const phonenumberWithNoWhiteSpace = clearWhiteSpaceOf(e.target.value);
        if (phonenumberWithNoWhiteSpace.length <= MAX_LENGTH_OF_CARD) {
            this.setState({ phonenumber: phonenumberWithNoWhiteSpace });
        }
    }

    _onPasswordChange(e) {
        e.preventDefault()
        const password = e.target.value;
        if (password.length <= MAX_LENGTH_OF_PASSWORD) {
            this.setState({ password: password });
        }
    }

    _userLogin(e) {
        e.preventDefault()
        const legalPassword = this.state.password.length >= MIN_LENGTH_OF_PASSWORD;
        if (legalPassword) {
            this.props.userLogin(clearWhiteSpaceOf(this.state.phonenumber), this.state.password)
        } else {
            message.error('请输入正确的用户名或密码...');
        }
    }

    render() {
        const loginStyles = require('./Login.scss');
        const styles = require('./PureLogin.scss');
        return (
            <div>
                <div className={loginStyles.loginBack} />
                <div className={styles.forgotpassword}><a className={styles.forgotpasswordLink} href="/user/forgotpassword">忘记密码</a></div>
                <Loging
                    phonenumber={this.state.phonenumber}
                    password={this.state.password}
                    onPhonenNmberChange={this.onPhonenNmberChange}
                    onPasswordChange={this.onPasswordChange}
                    userLogin={this.userLogin}
                />
            </div>
        );
    }
}
