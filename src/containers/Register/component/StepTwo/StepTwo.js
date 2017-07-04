import React from 'react';
import PropTypes from 'prop-types';
import { LoginButton, Phone, Password } from '../../../../components';

export default class StepTwo extends React.Component {
    static propTypes = {
        phonenumber: PropTypes.string
    }

    static defaultProps = {
        phonenumber: ''
    };
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
                    <span>{`我们向 ${this.props.phonenumber.replace(/(\d)(?=(\d{4})+(?!\d))/g, '$1' + ' ')} 发送了一个短信验证码。请输入...`}</span>
                </div>
                <div className={logingStyle.loginBottom}>
                    <Phone zone={false} title="短信验证码" onChange={e => console.log(111)} />
                    <div className={styles.nextstep}>
                        <LoginButton
                            title="没有收到？重新获取"
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
