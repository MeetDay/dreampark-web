import React from 'react';
import { Icon } from 'antd';
import { StepOne, StepTwo, StepThree, StepFour } from '../component';
import { Navbar } from '../../Login/component';

export default class Register extends React.Component {
    constructor() {
        super();
        this.onPhonenNmberChange = (e) => this._onPhonenumberChange(e);
        this.onPasswordChange = (e) => this._onPasswordChange(e);
        this.state = {

        };
    }

    _onPhonenumberChange(e) {
        e.preventDefault();
        this.setState({
            phonenumber: e.target.value
        });
    }
    _onPasswordChange(e) {
        e.preventDefault();
        console.log(e.target.value)
    }

    render() {
        const loginStyle = require('../../Login/container/Login.scss');
        const styles = require('./Register.scss');

        let content = (
            <StepOne
                phonenumber={this.state.phonenumber}
                onPhonenNmberChange={this.onPhonenNmberChange}
                onPasswordChange={this.onPasswordChange}
            />
        );
        if (this.props.location.hash === '#steptwo') {
            content = (
                <StepTwo
                    phonenumber={this.state.phonenumber}
                />
            );
        } else if (this.props.location.hash === '#stepthree') {
            content = (<StepThree />);
        } else if (this.props.location.hash === '#stepfour') {
            content = (<StepFour />);
        }
        return (
            <div className={styles.register}>
                <div className={loginStyle.loginBack} />
                <div className={styles.container}>
                    {/* <div className={styles.nav}>
                        <Icon type="left" style={{ marginLeft: '15px' }} onClick={e => history.back()} />
                    </div> */}
                    <div className={styles.nav}>
                        <Navbar />
                    </div>
                    { content }
                </div>
            </div>
        );
    }
}
