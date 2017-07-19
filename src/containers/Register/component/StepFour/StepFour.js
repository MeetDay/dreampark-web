import React from 'react'
import PropTypes from 'prop-types'
import { LoginButton, Phone } from '../../../../components'

export default class StepFour extends React.Component {
    static propTypes = {
        club: PropTypes.string,
        profession: PropTypes.string,
        onClubChange: PropTypes.func,
        onProfessionChange: PropTypes.func,
        updateUserInfo: PropTypes.func
    }
    constructor(props) {
        super(props)
        this.handleClickNextStep = (e) => this._handleClickNextStep(e)
    }

    _handleClickNextStep(e) {
        e.preventDefault()
        this.props.updateUserInfo()
    }

    render() {
        const logingStyle = require('../../../Login/component/Loging/Loging.scss');
        const forgotpasswordStyle = require('../../../Login/component/ForgotPassword/ForgotPassword.scss');
        const styles = require('./StepFour.scss');
        return (
            <div className={styles.stepfour}>
                <div className={forgotpasswordStyle.description}>
                    <span>完善个人信息</span>
                    <span>填写车牌号码享受停车优惠</span>
                </div>
                <div className={logingStyle.loginBottom}>
                    <Phone type="text" usedFor="other" title="俱乐部" zone={false} value={this.props.club} onChange={this.props.onClubChange} />
                    <Phone type="text" usedFor="other" title="所属行业" zone={false} value={this.props.profession} onChange={this.props.onProfessionChange} />
                    <div className={styles.nextstep}>
                        {/* <LoginButton
                            title="跳过"
                            bgColor="tansparent"
                            borderColor="white"
                            textColor="white"
                            onClick={this.props.userSignup}
                        /> */}
                        <LoginButton title="下一步" onClick={this.handleClickNextStep} />
                    </div>
                </div>
            </div>
        );
    }
}
