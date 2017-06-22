import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { Launching } from '../component';

@connect(
    state => ({

    })
)

export default class Login extends React.Component {
    constructor() {
        super();
        this.handleClick = (e) => this._handleClick(e);
    }

    _handleClick(e) {
        e.preventDefault();
        console.log(111);
        this.props.dispatch(push('/register'));
    }

    render() {
        const styles = require('./Login.scss');
        console.log(this.props);
        return (
            <div className={styles.loginBack} >
                <div onClick={this.handleClick}>asdlfkjasdfklj;asdkfj</div>
                <Launching />
            </div>
        );
    }
}
