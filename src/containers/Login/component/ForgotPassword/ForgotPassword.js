import React from 'react';
import { Phone, Password, LoginButton } from '../../../../components';

export default class ForgotPassword extends React.Component {
    render() {
        const styles = require('./ForgotPassword.scss')
        return (
            <div className={styles.forgotpassword}>
                <div className={styles.nav} />
                <div className={styles.description}>
                    <span>忘记密码？</span>
                    <span>请输入您的电话号码以查找您的账号。</span>
                </div>
                <div className={styles.bottom}>
                    <Phone />
                    <LoginButton title="获取验证码" />
                </div>
            </div>
        );
    }
}
