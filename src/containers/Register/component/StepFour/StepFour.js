import React from 'react'
import PropTypes from 'prop-types'
import { LoginButton, Phone } from '../../../../components'

export default class StepFour extends React.Component {
    static propTypes = {
        carno: PropTypes.string,
        profession: PropTypes.string,
        onCarNumberChange: PropTypes.func.isRequired,
        onProfessionChange: PropTypes.func.isRequired
    }
    constructor() {
        super();
        this.skip = (e) => this._skip(e)
        this.handleClickNextStep = (e) => this._handleClickNextStep(e)
    }

    _skip(e) {
        e.preventDefault()
    }

    _handleClickNextStep(e) {
        e.preventDefault()
    }

    render() {
        const logingStyle = require('../../../Login/component/Loging/Loging.scss');
        const forgotpasswordStyle = require('../../../Login/component/ForgotPassword/ForgotPassword.scss');
        const styles = require('./StepFour.scss');
        return (
            <div className={styles.stepfour}>
                <div className={forgotpasswordStyle.description}>
                    <span>完善个人信息（2/2）</span>
                    <span>填写车牌号码享受停车优惠</span>
                </div>
                <div className={logingStyle.loginBottom}>
                    <Phone type="text" title="车牌号码" zone={false} defaultValue={this.props.cardno} onChange={this.props.onCarNumberChange} />
                    <Phone type="text" title="所属行业" zone={false} defaultValue={this.props.profession} onChange={this.props.onProfessionChange} />
                    <div className={styles.nextstep}>
                        <LoginButton
                            title="跳过"
                            bgColor="tansparent"
                            borderColor="white"
                            textColor="white"
                            onClick={this.handleClickNextStep}
                        />
                        <LoginButton title="下一步" onClick={this.handleClickNextStep} />
                    </div>
                </div>
            </div>
        );
    }
}
