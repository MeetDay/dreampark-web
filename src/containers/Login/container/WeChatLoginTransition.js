/**
 * @Author: WangChao
 * @Date:   2017-09-04T14:34:57+08:00
 * @Email:  crazyitcoder9527@126.com
 * @Project: dreampark-web
 * @Last modified by:   WangChao
 * @Last modified time: 2017-09-07T23:25:08+08:00
 */

import React from 'react'
import { asyncConnect } from 'redux-async-connect'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import * as Constant from '../../../utils/constant'
import { jumpToWeChatAuthorizationUrl } from '../../../utils/wechat'
import { isWechatInfoLoaded, wechatLogin, isEmptyObject } from '../../Login/module/login'
import { isFullUser } from '../../../utils/wechat'

@asyncConnect([{
    deferred: false,
    promise: ({ params, store:{ dispatch, getState }, location, helpers }) => {
        const getQueryValueOf = key => decodeURIComponent(location.search.replace(new RegExp('^(?:.*[&\\?]' + escape(key).replace(/[.+*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'))
        if (!helpers.serverSide && !isWechatInfoLoaded(getState())) {
            const wechatCode = getQueryValueOf('code')
            if (wechatCode) {
                return dispatch(wechatLogin(wechatCode))
            }
        }
    }
}])

@connect(
    state => ({
        user: state.login.user,
        weChatInfo: state.login.weChatInfo,
        weChatInfoError: state.login.weChatInfoError
    }),
    dispatch => bindActionCreators({ push }, dispatch)
)

export default class WeChatLoginTransition extends React.Component {

    componentDidMount() {
        const getQueryValueOf = key => decodeURIComponent(this.props.location.search.replace(new RegExp('^(?:.*[&\\?]' + escape(key).replace(/[.+*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'))
        const wechatCode = getQueryValueOf('code')
        const callbackUrl = getQueryValueOf('callbackUrl')
        if (!wechatCode && callbackUrl) {
            jumpToWeChatAuthorizationUrl(location, callbackUrl)
        }
    }

    componentWillReceiveProps(nextProps) {
        const { user, weChatInfo, weChatInfoError } = nextProps;

        // 1. 微信登录成功，但登录fbpark失败, 一律跳到启动页
        if (weChatInfo && weChatInfoError != this.props.weChatInfoError && !isEmptyObject(weChatInfoError)) {
            this.props.push('/login#launching');
            return
        }
        // 2. 微信登录成功, 登录fbpark成功，但用户信息不全, 需要补全信息
        if (weChatInfo && user != this.props.user && !isFullUser(user)) {
            this.props.push('/register#stepthree');
            return
        }

        // 3. 微信登录成功, 登录fbpark成功
        if (user != this.props.user && isFullUser(user)) {
            const forwardUrl = sessionStorage.getItem(Constant.URL_BEFORE_LEAVE);
            this.props.push(forwardUrl || '/tickets');
            return
        }
        console.log('if process arrive here, say code not right');
        console.log(weChatInfoError);
    }

    render() {
        const styles = require('./WeChatLoginTransition.scss')
        return (
            <div className={styles.wechat}>
                <span className={styles.description}>正在登录...</span>
            </div>
        );
    }
}
