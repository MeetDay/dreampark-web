import React from 'react'
import PropTypes from 'prop-types'
import { message } from 'antd'
import { LoginButton, Phone } from '../../../../components'
import { illegalCardNunber, clearWhiteSpaceOf } from '../../../../utils/regex'

export default class StepThree extends React.Component {
    static propTypes = {
        idcardInfo: PropTypes.object,
        username: PropTypes.string,
        cardno: PropTypes.string,
        onUsernameChange: PropTypes.func,
        onCardNumberChange: PropTypes.func,
        comfirmUserInfo: PropTypes.func
    }
    constructor() {
        super();
        this.handleClickNextStep = (e) => this._handleClickNextStep(e);
    }

    _handleClickNextStep(e) {
        e.preventDefault();
        if (!illegalCardNunber(this.props.cardno))
            return message.error('请输入正确的身份证号码...')
        this.props.comfirmUserInfo(this.props.username, clearWhiteSpaceOf(this.props.cardno))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.idcardInfo !== this.props.idcardInfo) {
            if (nextProps.idcardInfo && nextProps.idcardInfo.resp.code === 0)
                location.hash = '#stepfour'
        }
    }

    render() {
        const logingStyle = require('../../../Login/component/Loging/Loging.scss');
        const forgotpasswordStyle = require('../../../Login/component/ForgotPassword/ForgotPassword.scss');
        const styles = require('./StepThree.scss');
        return (
            <div className={styles.stepthree}>
                <div className={forgotpasswordStyle.description}>
                    <span>实名认证</span>
                    <span>根据政策法规必须完成实名认证，成功后获得免费门票</span>
                </div>
                <div className={logingStyle.loginBottom}>
                    <Phone type="text" usedFor="other" title="您的真实姓名" zone={false} value={this.props.username} onChange={this.props.onUsernameChange} />
                    <Phone type="tel" usedFor="idcard" title="身份证号码" zone={false} value={this.props.cardno} onChange={this.props.onCardNumberChange} />
                    <div className={styles.nextstep}>
                        <LoginButton title="下一步" onClick={this.handleClickNextStep} />
                    </div>
                </div>
            </div>
        );
    }
}
