import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Header extends React.Component {
    static propTypes = {
        user: PropTypes.object,
        onMenuItemChange: PropTypes.func
    }
    constructor(props) {
        super(props)
        this.handleClick = (e) => this._handleClick(e)
        this.state = { selectedItemType: 'unused' }
    }

    _handleClick(e) {
        e.preventDefault();
        const currentSelectedItem = e.currentTarget.id;
        this.setState({ selectedItemType: currentSelectedItem })
        this.props.onMenuItemChange(currentSelectedItem)
    }

    render() {
        const styles = require('./Header.scss');
        const { user } = this.props;
        const username = user ? user.username : '未设置用户名';
        const isVip = user ? user.level == 'vip' : false;
        return (
            <div>
                <div className={styles.header}>
                    <img className={styles.avatar} src="/assets/avatar_profile_big.png" alt="avatar" />
                    <div className={styles.info}>
                        <div>
                            <span className={styles.username}>{username}</span>
                            {isVip&&<img className={styles.vip} src="/assets/vip_big.png" alt="vip" />}
                        </div>
                        <div className={styles.tip}>点击显示我的二维码</div>
                    </div>
                    <div className={styles.qrcode}>
                        二维码
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div id="unused" onClick={this.handleClick}><span className={classNames({ [styles.item]: true, [styles.itemActive]: this.state.selectedItemType === 'unused'  })}>未使用</span></div>
                    <div id="used" onClick={this.handleClick}><span className={classNames({ [styles.item]: true, [styles.itemActive]: this.state.selectedItemType === 'used' })}>已使用</span></div>
                    <div id="unpaid" onClick={this.handleClick}><span className={classNames({ [styles.item]: true, [styles.itemActive]: this.state.selectedItemType === 'unpaid' })}>未支付</span></div>
                </div>
            </div>
        );
    }
}
