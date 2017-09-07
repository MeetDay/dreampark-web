/**
 * @Author: WangChao
 * @Date:   2017-09-04T15:06:17+08:00
 * @Email:  crazyitcoder9527@126.com
 * @Project: dreampark-web
 * @Last modified by:   WangChao
 * @Last modified time: 2017-09-07T23:31:28+08:00
 */

import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { bindActionCreators } from 'redux';
import { message } from 'antd';
import { LoginButton } from '../../../components';
import APIClient from '../../../helpers/APIClient';
import { isEmptyObject } from '../../Login/module/login';
import { isVipInfoLoaded, getVipInfo } from '../module/register';
import * as Constant from '../../../utils/constant';

@asyncConnect([{
    deferred: true,
    promise: ({ params, store: { dispatch, getState }, helpers }) => {
        if (!isVipInfoLoaded(getState())) {
            return dispatch(getVipInfo());
        }
    }
}])

@connect(
    state => ({
        authHeaders: state.login.authHeaders,
        vipInfo: state.register.vipInfo,
        vipInfoError: state.register.vipInfoError
    }),
    dispatch => bindActionCreators({ push }, dispatch)
)

export default class ToBeVip extends React.Component {
    constructor(props) {
        super(props)
        this.handleClickSkip = (e) => this._handleClickSkip(e);
        this.handleClickGoPay = (e) => this._handleClickGoPay(e);
        this.state = {
            paying: false
        }
    }

    _handleClickSkip(e) {
        e.preventDefault();
        this.props.push('/tickets');
    }

    _handleClickGoPay(e) {
        if (this.state.paying) return;
        e.preventDefault();
        this.setState({ paying: true });
        const cookies = new Cookies()
        const openID = cookies.get(Constant.USER_OPENID)
        const ticketInfo = {
            amount: this.props.vipInfo.price,
            ticket: {
                id: this.props.vipInfo.id
            }
        }
        const client = new APIClient();
        client.post('/add_order', { headers: this.props.authHeaders, data: ticketInfo })
            .then(orderInfo => client.post('/charge', { headers: this.props.authHeaders, data: { id: orderInfo.orders_id, amount: ticketInfo.amount, open_id: openID, pay_type: 'wx_pub' }}))
            .then(charge => {
                if (charge && !isEmptyObject(charge)) {
                    return new Promise((resolve, reject) => {
                        pingpp.createPayment(charge, function(result, err) {
                            if (result == 'success') {
                                resolve({ code: 10000, success_message: '支付成功' });
                            } else {
                                reject({ code: 10001, error: err, error_message: '支付失败' });
                            }
                        });
                    })
                } else {
                    return Promise.reject({ code: 10002, error_message: '支付失败, charge对象为空' });
                }
            })
            .then(result => {
                message.success(result.success_message);
                this.setState({ paying: false });
                this.props.push('/tickets');
            })
            .catch(err => {
                console.log(err.error);
                message.error(err.error_message);
                this.setState({ paying: false });
            })
    }

    render() {
        const { vipInfo, vipInfoError } = this.props;
        if (vipInfoError && !isEmptyObject(vipInfoError)) {
            return console.log(JSON.parse(JSON.stringify(vipInfoError)));
        }
        const styles = require('./ToBeVip.scss');
        const loginStyle = require('../../Login/container/Login.scss');
        return (
            <div>
                <div className={loginStyle.loginBack} />
                <div className={styles.container}>
                    <div className={styles.containerWrapper}>
                        <div className={styles.skip} onClick={this.handleClickSkip}><span>跳过</span></div>
                        <div className={styles.title}><span>成为VIP</span></div>
                        <div className={styles.description}><span>报名成为梦想VIP会员，开启您的极致梦想体验之旅！</span></div>
                        <div className={styles.priceInfo}>
                            <div className={styles.vipLogo}><img src="/assets/vip_big.png" alt="vip" /><span>会员</span></div>
                            <div className={styles.vipPrice}><span>{`${this.props.vipInfo.price}元`}</span></div>
                        </div>
                        <div className={styles.vipRights}><span>点击查看VIP权益</span><img src="/assets/forward_icon.png" alt="forward_icon" /></div>
                        <div className={styles.goPay}>
                            <LoginButton title={`前往付费 ￥${this.props.vipInfo.price}`} onClick={this.handleClickGoPay} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
