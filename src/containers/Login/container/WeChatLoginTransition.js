import React from 'react'
import { asyncConnect } from 'redux-async-connect'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import * as Constant from '../../../utils/constant'
import { jumpToWeChatAuthorizationUrl } from '../../../utils/wechat'
import { isWechatInfoLoaded, wechatLogin } from '../../Login/module/login'
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
        if (!wechatCode) {
            jumpToWeChatAuthorizationUrl(location, callbackUrl)
        }
    }

    componentWillReceiveProps(nextProps) {
        const { user, weChatInfo, weChatInfoError } = nextProps
        if (weChatInfo && weChatInfoError && weChatInfoError.code === 10080) {
            this.props.push('/register#stepone')
        } else if (weChatInfo && user && !isFullUser(user)) {
            this.props.push('/register#stepthree')
        } else if (weChatInfo && !weChatInfoError && user) {
            const forwardUrl = sessionStorage.getItem(Constant.URL_BEFORE_LEAVE)
            console.log('forwardUrl:', forwardUrl)
            this.props.push(forwardUrl || '/tickets')
        } else {
            console.log(weChatInfoError)
            this.props.push('/login#launching')
        }
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
