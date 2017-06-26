import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Header extends React.Component {
    static propTypes = {
        onMenuItemChange: PropTypes.func
    }
    constructor() {
        super();
        this.handleClick = (e) => this._handleClick(e);
        this.state = {
            used: true
        };
    }

    _handleClick(e) {
        e.preventDefault();
        if (e.currentTarget.id === 'used' && !this.state.used) {
            this.setState({ used: true });
        } else {
            this.setState({ used: false })
        }
        this.props.onMenuItemChange(e.currentTarget.id);
    }

    render() {
        const styles = require('./Header.scss');
        const itemStyle = classNames({ [styles.item]: true, [styles.itemActive]: this.state.used });
        return (
            <div>
                <div className={styles.header}>
                    <img className={styles.avatar} src="/assets/avatar_profile_big.png" alt="avatar" />
                    <div className={styles.info}>
                        <div>
                            <span className={styles.username}>崔小川</span>
                            <img className={styles.vip} src="/assets/vip_big.png" alt="vip" />
                        </div>
                        <div className={styles.tip}>点击显示我的二维码</div>
                    </div>
                    <div className={styles.qrcode}>
                        二维码
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div id="used" onClick={this.handleClick}><span className={classNames({ [styles.item]: true, [styles.itemActive]: this.state.used })}>已使用</span></div>
                    <div id="unused" onClick={this.handleClick}><span className={classNames({ [styles.item]: true, [styles.itemActive]: !this.state.used })}>未使用</span></div>
                </div>
            </div>
        );
    }
}
