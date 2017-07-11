import React from 'react'
import { Icon } from 'antd'
import { StepOne, StepTwo, StepThree, StepFour } from '../component'
import { Navbar } from '../../Login/component'

export default class Register extends React.Component {
    constructor() {
        super();
        this.onPhonenNmberChange = (e) => this._onPhonenumberChange(e)
        this.onPasswordChange = (e) => this._onPasswordChange(e)
        this.onSMSCodeChange = (e) => this._onSMSCodeChange(e)
        this.onUsernameChange = (e) => this._onUsernameChange(e)
        this.onCardNumberChange = (e) => this._onCardNumberChange(e)
        this.onCarNumberChange = (e) => this._onCarNumberChange(e)
        this.onProfessionChange = (e) => this._onProfessionChange(e)

        this.state = {
            phonenumber: '',
            password: '',
            code: '',
            username: '',
            cardno: '',
            carno: '',
            profession: ''
        };
    }

    /**
     *  register step one
     */
    _onPhonenumberChange(e) {
        e.preventDefault();
        this.setState({ phonenumber: e.target.value });
    }
    _onPasswordChange(e) {
        e.preventDefault();
        this.setState({ password: e.target.value });
    }

    /**
     *  register step two
     */
    _onSMSCodeChange(e) {
        e.preventDefault()
        this.setState({ code: e.target.value })
    }

    /**
     *  register step three
     */
    _onUsernameChange(e) {
        e.preventDefault()
        console.log('username:', e.target.value)
        this.setState({ username: e.target.value })

    }
    _onCardNumberChange(e) {
        e.preventDefault()
        console.log('cardno:', e.target.value)
        this.setState({ cardno: e.target.value })
    }

    /*
     *  register step four
     */
    _onCarNumberChange(e) {
        e.preventDefault()
        console.log('carnumber:', e.target.value)
        this.setState({ carno: e.target.value })
    }
    _onProfessionChange(e) {
        e.preventDefault()
        console.log('profession:', e.target.value)
        this.setState({ profession: e.target.value })
    }

    render() {
        const loginStyle = require('../../Login/container/Login.scss');
        const styles = require('./Register.scss');

        let content = (
            <StepOne
                phonenumber={this.state.phonenumber}
                password={this.state.password}
                onPhonenNmberChange={this.onPhonenNmberChange}
                onPasswordChange={this.onPasswordChange}
            />
        );
        if (this.props.location.hash === '#steptwo') {
            content = (
                <StepTwo
                    phonenumber={this.state.phonenumber}
                    onSMSCodeChange={this.props}
                />
            )
        } else if (this.props.location.hash === '#stepthree') {
            content = (
                <StepThree
                    username={this.state.username}
                    cardno={this.state.cardno}
                    onUsernameChange={this.onUsernameChange}
                    onCardNumberChange={this.onCardNumberChange}
                />
            )
        } else if (this.props.location.hash === '#stepfour') {
            content = (
                <StepFour
                    carno={this.state.carno}
                    profession={this.state.profession}
                    onCarNumberChange={this.onCarNumberChange}
                    onProfessionChange={this.onProfessionChange}
                />
            )
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
