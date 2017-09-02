/**
 * @Author: WangChao
 * @Date:   2017-08-22T09:03:03+08:00
 * @Email:  crazyitcoder9527@126.com
 * @Project: dreampark-web
 * @Last modified by:   WangChao
 * @Last modified time: 2017-09-02T11:05:27+08:00
 */

import React from 'react'
import sha256 from 'js-sha256'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { message } from 'antd'
import { StepOne, StepTwo, StepThree, StepFour } from '../component'
import * as Constant from '../../../utils/constant'
import { userSignup, updateUserInfo } from '../../Login/module/login'
import { comfirmUserInfo, getSMSCodeAccordingTo } from '../module/register'
import { clearWhiteSpaceOf } from '../../../utils/regex'
import { isFullUser } from '../../../utils/wechat'

const MIN_LENGTH_OF_PASSWORD = 8;
const MAX_LENGTH_OF_PASSWORD = 14;
const MAX_LENGTH_OF_SMS_CODE = 4;
const MAX_LENGTH_OF_PHONE = 11;

@connect(
    state => ({
        user: state.login.user,
        userSignupError: state.login.userSignupError,
        updateUserError: state.login.updateUserError,
        smsCodeError: state.register.smsCodeError,
        idcardInfo: state.register.idcardInfo,

        weChatInfo: state.login.weChatInfo,
        weChatInfoError: state.login.weChatInfoError,
        accessToken: state.login.accessToken
    }),
    dispatch => bindActionCreators({ push, userSignup, updateUserInfo, getSMSCodeAccordingTo, comfirmUserInfo }, dispatch)
)

export default class Register extends React.Component {
    constructor() {
        super();
        this.onPhonenNmberChange = (e) => this._onPhonenumberChange(e)
        this.onPasswordChange = (e) => this._onPasswordChange(e)
        this.onSMSCodeChange = (e) => this._onSMSCodeChange(e)
        this.onUsernameChange = (e) => this._onUsernameChange(e)
        this.onCardNumberChange = (e) => this._onCardNumberChange(e)
        this.onClubChange = (e) => this._onClubChange(e)
        this.onProfessionChange = (e) => this._onProfessionChange(e)
        this.userSignup = () => this._userSignup()
        this.updateUserInfo = () => this._updateUserInfo()

        this.state = {
            phonenumber: '',
            password: '',
            code: '',
            username: '',
            cardno: '',
            club: '',
            profession: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        const { user, updateUserError, weChatInfoError } = nextProps
        console.log(user)
        if (isFullUser(user)) {
            const forwardUrl = sessionStorage.getItem(Constant.URL_BEFORE_LEAVE)
            this.props.push(forwardUrl || '/tickets')
        } else if (updateUserError && updateUserError !== this.props.updateUserError) {
            message.error('注册失败, 请重新尝试...')
        } else if (weChatInfoError && weChatInfoError !== this.props.weChatInfoError) {
            message.error('微信登录失败, 请重新尝试...')
        }
    }

    // 注册
    _userSignup() {
        if (this.state.password.length < MIN_LENGTH_OF_PASSWORD) {
            message.info(`请输入 ${ MIN_LENGTH_OF_PASSWORD } 至 ${ MAX_LENGTH_OF_PASSWORD } 位的有效密码。。。`);
        } else if (clearWhiteSpaceOf(this.state.code).length != MAX_LENGTH_OF_SMS_CODE) {
            message.info(`请输入 ${ MAX_LENGTH_OF_SMS_CODE } 位有效位数的验证码。。。`);
        } else {
            const { weChatInfo, accessToken } = this.props
            this.props.userSignup({
                phone: clearWhiteSpaceOf(this.state.phonenumber),
                password: sha256(this.state.password),
                zone: 86,
                code: clearWhiteSpaceOf(this.state.code),
                link_account: weChatInfo ? { union_id: weChatInfo.unionid, auth_token: accessToken } : undefined
            })
        }
    }

    // 更新用户信息
    _updateUserInfo() {
        if (this.props.idcardInfo) {
            this.props.updateUserInfo({
                username: this.state.username,
                identity_card: clearWhiteSpaceOf(this.state.cardno),
                birthday: this.props.idcardInfo.data.birthday,
                gender: this.props.idcardInfo.data.sex,
                address: this.props.idcardInfo.data.address,
                club_name: this.state.club,
                trade: this.state.profession
            })
        }
    }

    /**
     *  register step one
     */
    _onPhonenumberChange(e) {
        e.preventDefault();
        const phonenumber = e.target.value;
        const phonenumberWithNoWhiteSpace = clearWhiteSpaceOf(e.target.value);
        if (phonenumberWithNoWhiteSpace && phonenumberWithNoWhiteSpace.length <= MAX_LENGTH_OF_PHONE) {
            this.setState({ phonenumber: phonenumber })
        }
    }
    _onPasswordChange(e) {
        e.preventDefault();
        const password = e.target.value;
        if (password && password.length <= MAX_LENGTH_OF_PASSWORD) {
            this.setState({ password: password })
        }
    }

    /**
     *  register step two
     */
    _onSMSCodeChange(e) {
        e.preventDefault()
        const smscode = e.target.value;
        const smscodeWithNoWhiteSpace = clearWhiteSpaceOf(smscode);
        if (smscodeWithNoWhiteSpace.length <= MAX_LENGTH_OF_SMS_CODE) {
            this.setState({ code: smscode })
        }
    }

    /**
     *  register step three
     */
    _onUsernameChange(e) {
        e.preventDefault()
        this.setState({ username: e.target.value })

    }
    _onCardNumberChange(e) {
        e.preventDefault()
        this.setState({ cardno: e.target.value })
    }

    /*
     *  register step four
     */
    _onClubChange(e) {
        e.preventDefault()
        this.setState({ club: e.target.value })
    }
    _onProfessionChange(e) {
        e.preventDefault()
        this.setState({ profession: e.target.value })
    }

    render() {
        const loginStyle = require('../../Login/container/Login.scss');
        const styles = require('./Register.scss');
        let content = (
            <StepOne
                phonenumber={this.state.phonenumber}
                password={this.state.password}
                onPhonenNmberChange={this.onPhonenNmberChange}
                onPasswordChange={this.onPasswordChange}
                getSMSCode={this.props.getSMSCodeAccordingTo}
            />
        );
        if (this.props.location.hash === '#steptwo') {
            content = (
                <StepTwo
                    code={this.state.code}
                    phonenumber={this.state.phonenumber}
                    onSMSCodeChange={this.onSMSCodeChange}
                    getSMSCode={this.props.getSMSCodeAccordingTo}
                    userSignup={this.userSignup}

                    smsCodeError={this.props.smsCodeError}
                    signUser={this.props.user}
                    userSignupError={this.props.userSignupError}
                />
            )
        } else if (this.props.location.hash === '#stepthree') {
            content = (
                <StepThree
                    idcardInfo={this.props.idcardInfo}
                    username={this.state.username}
                    cardno={this.state.cardno}
                    onUsernameChange={this.onUsernameChange}
                    onCardNumberChange={this.onCardNumberChange}
                    comfirmUserInfo={this.props.comfirmUserInfo}
                />
            )
        } else if (this.props.location.hash === '#stepfour') {
            content = (
                <StepFour
                    club={this.state.club}
                    profession={this.state.profession}
                    onClubChange={this.onClubChange}
                    onProfessionChange={this.onProfessionChange}
                    updateUserInfo={this.updateUserInfo}
                />
            )
        }
        return (
            <div className={styles.register}>
                <div className={loginStyle.loginBack} />
                <div className={styles.container}>
                    { content }
                </div>
            </div>
        );
    }
}
