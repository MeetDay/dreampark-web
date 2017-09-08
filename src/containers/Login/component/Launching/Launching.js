/**
 * @Author: WangChao
 * @Date:   2017-09-04T14:34:57+08:00
 * @Email:  crazyitcoder9527@126.com
 * @Project: dreampark-web
 * @Last modified by:   WangChao
 * @Last modified time: 2017-09-07T20:55:17+08:00
 */

import React from 'react';
import PropTypes from 'prop-types';
import { LoginButton } from '../../../../components';
import { jumpToWeChatAuthorizationUrl } from '../../../../utils/wechat';

export default class Launching extends React.Component {
    static propTypes = {
        pushState: PropTypes.func
    }

    constructor() {
        super();
        this.handleClickLoginButton = (e) => this._handleClickLoginButton(e);
        this.handleClickRegisterButton = (e) => this._handleClickRegisterButton(e);
        this.handleClickToBeVipButton = (e) => this._handleClickToBeVipButton(e);
        this.handleClickWechatLogin = (e) => this._handleClickWechatLogin(e);
    }

    _handleClickLoginButton(e) {
        e.preventDefault()
        this.props.pushState('/login');
    }

    _handleClickRegisterButton(e) {
        e.preventDefault();
        this.props.pushState('/register')
    }

    _handleClickToBeVipButton(e) {
        e.preventDefault();
        this.props.pushState('/register?type=vip');
    }

    _handleClickWechatLogin(e) {
        e.preventDefault();
        jumpToWeChatAuthorizationUrl(location)
    }

    render() {
        const styles = require('./Launching.scss');
        return (
            <div className={styles.launching}>
                <div className={styles.launchingTop}>
                    <button className={styles.loginButton} onClick={this.handleClickLoginButton}>登&nbsp;录</button>
                </div>
                {/* <div className={styles.appLogo}>
                    <img src="/assets/logo.png" alt="appLogo" />
                </div> */}
                <div className={styles.dreampark}><img src="/assets/dreampark.png" alt="胸章"/></div>
                <div className={styles.description}>
                    <span>欢迎来到梦想盛会</span>
                </div>
                <div className={styles.buttons} >
                    <LoginButton
                        title="实名认证报名"
                        bgColor="transparent"
                        borderColor="white"
                        textColor="white"
                        onClick={this.handleClickRegisterButton}
                    />
                    <LoginButton
                        title="梦想VIP报名"
                        bgColor="transparent"
                        borderColor="white"
                        textColor="white"
                        onClick={this.handleClickToBeVipButton}
                    />
                    {/* <LoginButton
                        imgShow
                        title="使用微信登陆"
                        onClick={this.handleClickWechatLogin}
                    /> */}
                </div>
                <div className={styles.declare}>
                    <span>“注册账号”或“登录”表示即代表我同意接受梦想盛会的<a href="/terms/1">用户协议</a>及<a href="/terms/2">隐私声明</a></span>
                </div>
            </div>
        );
    }
}
