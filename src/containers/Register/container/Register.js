import React from 'react'
import { Icon } from 'antd'
import { StepOne, StepTwo, StepThree, StepFour } from '../component'
import { Navbar } from '../../Login/component'
import { clearWhiteSpaceOf } from '../../../utils/regex'

export default class Register extends React.Component {
    constructor() {
        super();
        this.onPhonenNmberChange = (e) => this._onPhonenumberChange(e)
        this.onPasswordChange = (e) => this._onPasswordChange(e)
        this.onSMSCodeChange = (e) => this._onSMSCodeChange(e)
        this.onUsernameChange = (e) => this._onUsernameChange(e)
        this.onCardNumberChange = (e) => this._onCardNumberChange(e)
        this.onClubChange = (e) => this._onClubChange(e)
        this.onProfessionChange = (e) => this._onProfessionChange(e)

        this.state = {
            phonenumber: '',
            password: '',
            code: '',
            username: '',
            cardno: '',
            club: '',
            profession: ''
        };
    }

    /**
     *  register step one
     */
    _onPhonenumberChange(e) {
        e.preventDefault();
        if (clearWhiteSpaceOf(e.target.value).length > 11) return
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
        if (clearWhiteSpaceOf(e.target.value).length > 4) return
        this.setState({ code: e.target.value })
    }

    /**
     *  register step three
     */
    _onUsernameChange(e) {
        e.preventDefault()
        this.setState({ username: e.target.value })

    }
    _onCardNumberChange(e) {
        e.preventDefault()
        this.setState({ cardno: e.target.value })
    }

    /*
     *  register step four
     */
    _onClubChange(e) {
        e.preventDefault()
        this.setState({ club: e.target.value })
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
                    code={this.state.code}
                    phonenumber={this.state.phonenumber}
                    onSMSCodeChange={this.onSMSCodeChange}
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
                    club={this.state.club}
                    profession={this.state.profession}
                    onClubChange={this.onClubChange}
                    onProfessionChange={this.onProfessionChange}
                />
            )
        }
        return (
            <div className={styles.register}>
                <div className={loginStyle.loginBack} />
                <div className={styles.container}>
                    <div className={styles.nav}><Navbar /></div>
                    { content }
                </div>
            </div>
        );
    }
}
