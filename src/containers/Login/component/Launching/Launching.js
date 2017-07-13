import React from 'react';
import { LoginButton } from '../../../../components';

export default class Launching extends React.Component {
    constructor() {
        super();
        this.handleClickLoginButton = (e) => this._handleClickLoginButton(e);
    }

    _handleClickLoginButton(e) {
        e.preventDefault();
        location.hash = '#loging';
    }

    handleClickRegisterButton(e) {
        e.preventDefault();
        location.href = '/register';
    }

    handleClickWeChatButton(e) {
        e.preventDefault();
        console.log('weChat button');
    }

    render() {
        const styles = require('./Launching.scss');
        return (
            <div className={styles.launching}>
                <div className={styles.launchingTop}>
                    <button className={styles.loginButton} onClick={this.handleClickLoginButton}>登&nbsp;录</button>
                </div>
                <div className={styles.appLogo}>
                    <img src="/assets/logo.png" alt="appLogo" />
                </div>
                <div className={styles.description}>
                    <span>欢迎来到梦想盛会。</span>
                </div>
                <div className={styles.buttons} >
                    <LoginButton
                        title="注册梦想会员"
                        bgColor="transparent"
                        borderColor="white"
                        textColor="white"
                        onClick={(e) => this.handleClickRegisterButton(e)}
                    />
                    <LoginButton
                        imgShow
                        title="使用微信登陆"
                        onClick={(e) => this.handleClickWeChatButton(e)}
                    />
                </div>
                <div className={styles.declare}>
                    <span>“注册账号”或“登录”表示即代表我同意接受梦想盛会的<a href="/terms/agreement">用户协议</a>及<a href="/terms/privacy">隐私声明</a></span>
                </div>
            </div>
        );
    }
}
