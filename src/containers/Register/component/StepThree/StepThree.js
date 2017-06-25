import React from 'react';
import { LoginButton, Phone } from '../../../../components';
export default class StepThree extends React.Component {
    constructor() {
        super();
        this.handleClickNextStep = (e) => this._handleClickNextStep(e);
    }

    _handleClickNextStep(e) {
        e.preventDefault();
        location.hash = '#stepfour';
    }

    render() {
        const logingStyle = require('../../../Login/component/Loging/Loging.scss');
        const forgotpasswordStyle = require('../../../Login/component/ForgotPassword/ForgotPassword.scss');
        const styles = require('./StepThree.scss');
        return (
            <div className={styles.stepthree}>
                <div className={forgotpasswordStyle.description}>
                    <span>完善个人信息（1/2)</span>
                    <span>根据政策法规必须完成实名认证以，成功后获得免费门票</span>
                </div>
                <div className={logingStyle.loginBottom}>
                    <Phone type="text" title="您的真实姓名" zone={false} />
                    <Phone type="number" title="身份证号码" zone={false} />
                    <div className={styles.nextstep}>
                        <LoginButton title="下一步" onClick={this.handleClickNextStep} />
                    </div>
                </div>
            </div>
        );
    }
}
