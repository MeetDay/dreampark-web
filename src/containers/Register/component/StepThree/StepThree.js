/**
 * @Author: WangChao
 * @Date:   2017-09-04T14:34:57+08:00
 * @Email:  crazyitcoder9527@126.com
 * @Project: dreampark-web
 * @Last modified by:   WangChao
 * @Last modified time: 2017-09-05T10:52:06+08:00
 */

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { message } from 'antd'
import { LoginButton, Phone } from '../../../../components'
import { illegalCardNumber, clearWhiteSpaceOf } from '../../../../utils/regex'

export default class StepThree extends React.Component {
    static propTypes = {
        isForVip: PropTypes.bool,
        idcardInfo: PropTypes.object,
        username: PropTypes.string,
        cardno: PropTypes.string,

        onUsernameChange: PropTypes.func,
        onCardNumberChange: PropTypes.func,
        comfirmUserInfo: PropTypes.func,
        updateUserInfo: PropTypes.func
    }
    constructor() {
        super();
        this.handleClickNextStep = (e) => this._handleClickNextStep(e);
    }

    _handleClickNextStep(e) {
        e.preventDefault()
        if (this.props.username.length > 0 && illegalCardNumber(this.props.cardno)) {
            this.props.comfirmUserInfo(this.props.username, clearWhiteSpaceOf(this.props.cardno))
        } else {
            message.warning('请输入正确的姓名和身份证号码。')
        }
    }

    componentWillReceiveProps(nextProps) {
        const { idcardInfo } = nextProps
        if (idcardInfo !== this.props.idcardInfo) {
            if (idcardInfo && idcardInfo.resp.code === 0) {
                this.props.updateUserInfo();
            } else {
                message.error('姓名和身份证号码不匹配。')
            }
        }
    }

    render() {
        const logingStyle = require('../../../Login/component/Loging/Loging.scss');
        const forgotpasswordStyle = require('../../../Login/component/ForgotPassword/ForgotPassword.scss');
        const styles = require('./StepThree.scss');
        const { isForVip } = this.props;
        const okButtonMessage = isForVip ? '下一步': '确 定';

        return (
            <div className={styles.stepthree}>
                <div className={forgotpasswordStyle.description}>
                    <span>实名认证</span>
                    <span>根据政策法规必须完成实名认证，成功后获得免费门票</span>
                </div>
                <div className={logingStyle.loginBottom}>
                    <Phone type="text" usedFor="other" title="您的真实姓名" zone={false} value={this.props.username} onChange={this.props.onUsernameChange} />
                    <Phone type="text" usedFor="idcard" title="身份证号码" zone={false} value={this.props.cardno} onChange={this.props.onCardNumberChange} />
                    <div className={classNames({ [styles.nextstep]: isForVip, [styles.confirm]: !isForVip })}>
                        <LoginButton title={okButtonMessage} onClick={this.handleClickNextStep} />
                    </div>
                </div>
            </div>
        );
    }
}
