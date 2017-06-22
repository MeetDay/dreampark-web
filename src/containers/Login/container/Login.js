import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Button } from 'antd';
import { LoginButton } from '../../../components';

export default class Login extends React.Component {
    render() {
        const styles = require('./Login.scss');
        return (
            <div className={styles.loginBack} >
                <div>asdlfkjasdfklj;asdkfj</div>
                <Button  loading />
                <LoginButton title="微信登陆" bgColor="transparent" borderColor="black" onClick={(e) => {console.log('click')}} />
            </div>
        );
    }
}
