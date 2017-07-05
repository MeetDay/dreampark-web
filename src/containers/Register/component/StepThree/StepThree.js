import React from 'react'
import PropTypes from 'prop-types'
import { LoginButton, Phone } from '../../../../components'

export default class StepThree extends React.Component {
    static propTypes = {
        username: PropTypes.string,
        cardno: PropTypes.string,
        onUsernameChange: PropTypes.func.isRequried,
        onCardNumberChange: PropTypes.func.isRequried
    }
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
                    <span>根据政策法规必须完成实名认证，成功后获得免费门票</span>
                </div>
                <div className={logingStyle.loginBottom}>
                    <Phone type="text" title="您的真实姓名" zone={false} defaultValue={this.props.username} onChange={this.props.onUsernameChange} />
                    <Phone type="number" title="身份证号码" zone={false} defaultValue={this.props.cardno} onChange={this.props.onCardNumberChange} />
                    <div className={styles.nextstep}>
                        <LoginButton title="下一步" onClick={this.handleClickNextStep} />
                    </div>
                </div>
            </div>
        );
    }
}
