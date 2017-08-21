import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Modal } from 'antd';
import { isEmptyObject } from '../../../Login/module/login'

export default class Header extends React.Component {
    static propTypes = {
        user: PropTypes.object,
        selectedItemType: PropTypes.string,
        onMenuItemChange: PropTypes.func
    }
    static defaultProps = {
        selectedItemType: 'unused'
    }

    constructor(props) {
        super(props)
        this.handleClick = (e) => this._handleClick(e);
        this.handleClickShowBarcode = (e) => this._handleClickShowBarcode(e);
        this.handleClickCloseBarcode = (e) => this._handleClickCloseBarcode(e);
        this.state = {
            selectedItemType: props.selectedItemType,
            showBarcode: false
        }
    }

    componentWillReceiveProps(nextProps) {
        const { selectedItemType } = nextProps
        this.setState({ selectedItemType: selectedItemType })
    }

    _handleClick(e) {
        e.preventDefault();
        const currentSelectedItem = e.currentTarget.id;
        this.setState({ selectedItemType: currentSelectedItem })
        this.props.onMenuItemChange(currentSelectedItem)
    }

    _handleClickShowBarcode(e) {
        e.preventDefault();
        this.setState({
            showBarcode: true
        })
    }

    _handleClickCloseBarcode(e) {
        e.preventDefault();
        this.setState({
            showBarcode: false
        })
    }

    render() {
        const styles = require('./Header.scss');
        const { user } = this.props;
        const username = !isEmptyObject(user) ? user.username : '未实名认证';
        const isVip = !isEmptyObject(user) ? user.level == 'vip' : false;
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
                    <div onClick={this.handleClickShowBarcode} className={styles.qrcode}><img src="assets/qrcode_big.png" alt="qrcode" /></div>
                    <div>
                        {(!isEmptyObject(user) && user.barcode) &&
                            <Modal visible={this.state.showBarcode} onCancel={this.handleClickCloseBarcode} footer={null}>
                                <div className={styles.userqrcode}>
                                    <div className={styles.userqrcodeWrapper}>
                                        <div className={styles.userqrcodeTop}>
                                            <div className={styles.userInfoDetails}>
                                                <img className={styles.userAvatar} src="/assets/avatar_profile_big.png" alt="avatar" />
                                                <span className={classNames(styles.username, styles.usernameExpand)}>{username}</span>
                                                {isVip && <img className={styles.vip} src="/assets/vip_big.png" alt="vip" />}
                                            </div>
                                            <div className={styles.userIDCard}><span>{`身份证号码: ${user.identity_card}`}</span></div>
                                        </div>
                                        <div className={styles.userqrcodeBottom}>
                                            {isVip && <img className={styles.userBarode} src={user.barcode} alt="barcode" />}
                                            {!isVip &&
                                                <div>
                                                    <span className={styles.buyTip}>为了确保您在梦想盛会中的活动安全，<br />请您购买救援服务。</span>
                                                    <span className={styles.buyTip}>购买救援服务后即可激活个人二维码。</span>
                                                    <a className={styles.buyHelper} href="">立刻购买</a>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        }
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
