import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { Launching, Loging } from '../component';

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
        const { location } = this.props;

        let content = <Loging />;
        if (this.props.location.hash === '#launching') {
            content = (
                <Launching />
            );
        } else if (this.props.location.hash === '#loging') {
            content = (
                <Loging  />
            );
        }
        return (
            <div>
                <div className={styles.loginBack} />
                { content }
            </div>
        );
    }
}
