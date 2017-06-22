import React from 'react';
import { LoginButton } from '../../../../components';

export default class Launching extends React.Component {
    render() {
        const styles = require('./Launching.scss');
        return (
            <div>
                <div className={styles.buttons} >
                    <LoginButton title="注册成为梦想会员" />
                    <LoginButton imgShow title="微信登陆" />
                </div>
            </div>
        );
    }
}
