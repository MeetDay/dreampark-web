import React from 'react';
import PropTypes from 'prop-types';

import { Phone } from '../../../../components';

export default class Loging extends React.Component {
    constructor() {
        super();
        this.onChage
    }

    render() {
        const styles = require('./Loging.scss');
        return (
            <div className={styles.loging}>
                <div className={styles.forgotPassword}>
                    <a href="">忘记密码</a>
                </div>
                <div className={styles.loginDescription}>
                    <span>登&nbsp;录</span>
                </div>
                <Phone onChange={e => console.log(111)} />
            </div>
        );
    }
}
