import React from 'react';
import PropTypes from 'prop-types';

import { Phone, Password, LoginButton } from '../../../../components';
import Navbar from '../Navbar/Navbar';

export default class Loging extends React.Component {
    constructor() {
        super();
    }

    render() {
        const styles = require('./Loging.scss');
        return (
            <div className={styles.loging}>
                <Navbar showForgotPassword={true} />
                {/* <div className={styles.forgotPassword}>
                    <a href="/login#forgotpassword">忘记密码</a>
                </div> */}
                <div className={styles.loginDescription}>
                    <span>登&nbsp;录</span>
                </div>
                <div className={styles.loginBottom}>
                    <Phone onChange={e => console.log(111)} />
                    <Password onChange={e => console.log(222) }/>
                    <LoginButton title="登录" onClick={e => console.log(333)} />
                </div>
            </div>
        );
    }
}
