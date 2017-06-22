import React from 'react';
import PropTypes from 'prop-types';

export default class LoginButton extends React.Component {
    static propTypes = {
        bgColor: PropTypes.string,
        title: PropTypes.string,
        imgSrc: PropTypes.string,
        imgShow: PropTypes.bool,
        onClick: PropTypes.func,
    }

    static defaultProps = {
        bgColor: 'yellow',
        borderColor: 'yellow',
        imgSrc: '/assets/wechat.png',
        imgShow: true
    }
    render() {
        const styles = require('./LoginButton.scss');
        const { borderColor } = this.props;
        const display = this.props.imgShow ? 'inline-block' : 'none';
        return (
            <div
                style={{ backgroundColor: this.props.bgColor, borderColor }}
                className={styles.button}
                onClick={this.props.onClick}
            >
                <img style={{ display }} className={styles.logo} src={this.props.imgSrc} alt="wechat" />
                <span className={styles.buttonText}>{this.props.title}</span>
            </div>
        );
    }
}
