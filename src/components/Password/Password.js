import React from 'react';
import PropTypes from 'prop-types';

export default class Password extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        defaultValue: PropTypes.string,
        onChange: PropTypes.func
    }
    static defaultProps = {
        title: '密码'
    }
    constructor() {
        super();
        this.handleClick = (e) => this._handleClick(e);
        this.state = {
            showpassword: false
        };
    }

    _handleClick(e) {
        this.setState({
            showpassword: !this.state.showpassword
        });
    }

    render() {
        const styles = require('./Password.scss');
        const inputType = this.state.showpassword ? 'text' : 'password';
        const showButtonMsg = this.state.showpassword ? '隐藏' : '显示';
        return (
            <div className={styles.password}>
                <div className={styles.top}>
                    <button>{this.props.title}</button>
                    <button onClick={this.handleClick}>{showButtonMsg}</button>
                </div>
                <div className={styles.bottom}>
                    <input
                        id="password"
                        className={styles.inputpassword}
                        onChange={this.props.onChange}
                        type={inputType}
                        defaultValue={this.props.defaultValue}
                    />
                </div>
            </div>
        );
    }
}
