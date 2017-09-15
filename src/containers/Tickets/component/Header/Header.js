/**
 * @Author: WangChao
 * @Date:   2017-09-04T14:34:57+08:00
 * @Email:  crazyitcoder9527@126.com
 * @Project: dreampark-web
 * @Last modified by:   WangChao
 * @Last modified time: 2017-09-07T17:40:00+08:00
 */

import React from 'react';
import PropTypes from 'prop-types';
import superagent from 'superagent';
import Cookies from 'universal-cookie';
import classNames from 'classnames';
import QRCode from 'qrcode.react';
import { Modal } from 'antd';
import { isEmptyObject } from '../../../Login/module/login';
import * as Constant from '../../../../utils/constant';
import APIClient from '../../../../helpers/APIClient';
import { generatorRandomString, PersonQRCode, encrypt } from '../../utils/tickets';

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
            randomString: generatorRandomString(20),
            selectedItemType: props.selectedItemType,
            showBarcode: false
        }

        if (props.user) {
            const userType = props.user.level === 'vip' ? '02' : '01';
            const personQRCode = new PersonQRCode(props.user.id, userType, props.user.identity_card);
            const formatQRCode = personQRCode.getPersonQRCode();
            const encryptedQRCode = encrypt(formatQRCode, 'godblessyou');
            this.qrcode = formatQRCode + encryptedQRCode.cipherHexText.substr(-6, 6)
        }
    }

    componentWillMount() {
        if (!this.props.user || isEmptyObject(this.props.user)) {
            location.reload();
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
        const timer = setInterval(() => {
            this.setState({ randomString: generatorRandomString(20) })
        }, 1000);
        this.setState({
            showBarcode: true,
            timer: timer
        });
    }

    _handleClickCloseBarcode(e) {
        e.preventDefault();
        clearTimeout(this.state.timer);
        this.setState({
            showBarcode: false,
            timer: null
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
                        {(!isEmptyObject(user) && this.state.showBarcode) &&
                            <Modal style={{ top: 5 }} visible={this.state.showBarcode} onCancel={this.handleClickCloseBarcode} footer={null}>
                                <div className={styles.userqrcode}>
                                    <div className={styles.userqrcodeWrapper}>
                                        <div className={styles.userqrcodeTop}>
                                            <div className={styles.realnameAuthentication}><span>实名认证码</span></div>
                                            <div className={styles.userInfoDetails}>
                                                <img className={styles.userAvatar} src="/assets/avatar_profile_big.png" alt="avatar" />
                                                <span className={classNames(styles.username, styles.usernameExpand)}>{username}</span>
                                                {isVip && <img className={styles.vip} src="/assets/vip_big.png" alt="vip" />}
                                            </div>
                                            <div className={styles.userIDCard}><span>{`身份证号码: ${user.identity_card}`}</span></div>
                                            {!isVip && <div><a className={styles.buyHelper} href="pay/ticketinfo/buy/vip">成为梦想VIP会员</a></div>}
                                        </div>
                                        <div className={styles.userqrcodeBottom}>
                                            <div className={styles.makeQRCode}>
                                                <QRCode value={this.qrcode.toUpperCase()} size={220} />
                                                <span className={styles.qrcodeDescription}>该二维码分享无效</span>
                                                <span className={styles.randomString}>{this.state.randomString}</span>
                                            </div>
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
