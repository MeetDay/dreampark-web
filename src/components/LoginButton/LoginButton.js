import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class LoginButton extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        bgColor: PropTypes.string,
        onClick: PropTypes.func,
    }
    render() {
        // const bgColor = this.props.bgColor
        return (
            <div onClick={this.props.onClick} >
                <img src="/assets/wechat.png" alt="wechat" />
                <span>{this.props.title}</span>
            </div>
        );
    }
}
