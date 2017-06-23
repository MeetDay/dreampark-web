import React from 'react';
import { Icon } from 'antd';
import { StepOne, StepTwo, StepThree, StepFour } from '../component';

export default class Register extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        const loginStyle = require('../../Login/container/Login.scss');
        const styles = require('./Register.scss');

        let content = (<StepOne />);
        if (this.props.location.hash === '#steptwo') {
            content = (<StepTwo />);
        } else if (this.props.location.hash === '#stepthree') {
            content = (<StepThree />);
        } else if (this.props.location.hash === '#stepfour') {
            content = (<StepFour />);
        }
        return (
            <div className={styles.register}>
                <div className={loginStyle.loginBack} />
                <div className={styles.container}>
                    <div className={styles.nav}>
                        <Icon type="left" style={{ marginLeft: '15px' }} onClick={e => history.back()} />
                    </div>
                    { content }
                </div>
            </div>
        );
    }
}
