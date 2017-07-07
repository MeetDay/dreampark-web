import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { Launching, Loging, ForgotPassword } from '../component'
import { StepTwo as SMSCode } from '../../Register/component'
import Navbar from '../component/Navbar/Navbar'

@connect(
    state => ({

    })
)

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.onPhonenNmberChange = (e) => this._onPhonenNmberChange(e)
        this.state = {
            phonenumber: ''
        }
    }

    _onPhonenNmberChange(e) {
        e.preventDefault()
        this.setState({ phonenumber: e.target.value })
    }

    render() {
        const styles = require('./Login.scss');
        const { location } = this.props;

        let content = <Loging />;
        if (this.props.location.hash === '#launching') {
            content = (<Launching />);
        } else if (this.props.location.hash === '#forgotpassword') {
            content = (<ForgotPassword phonenumber={this.state.phonenumber} onPhonenNmberChange={this.onPhonenNmberChange}/>);
        } else if (this.props.location.hash === '#smscode') {
            content = (<SMSCode phonenumber={this.state.phonenumber} />)
        }
        return (
            <div>
                <div className={styles.loginBack} />
                <div className={styles.nav}><Navbar /></div>
                { content }
            </div>
        );
    }
}
