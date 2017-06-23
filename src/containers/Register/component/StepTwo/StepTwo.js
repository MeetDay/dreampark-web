import React from 'react';
import { LoginButton, Phone, Password } from '../../../../components';

export default class StepTwo extends React.Component {
    constructor() {
        super();
        this.handleClickNextStep = (e) => this._handleClickNextStep(e);
    }

    _handleClickNextStep(e) {
        e.preventDefault();
        location.hash = '#stepthree';
    }

    render() {
        const logingStyle = require('../../../Login/component/Loging/Loging.scss');
        const forgotpasswordStyle = require('../../../Login/component/ForgotPassword/ForgotPassword.scss');
        const styles = require('./StepTwo.scss');
        return (
            <div className={styles.steptwo}>
                <div className={forgotpasswordStyle.description}>
                    <span>输入验证码</span>
                    <span>{`我们向157 2628 5672发送了一个短信验证码。请输入...`}</span>
                </div>
                <div className={logingStyle.loginBottom}>
                    <Phone onChange={e => console.log(111)} />
                    <div>
                        
                    </div>
                    <LoginButton title="下一步" onClick={this.handleClickNextStep} />
                </div>
            </div>
        );
    }
}
