import React from 'react'
import { asyncConnect } from 'redux-async-connect'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as Constant from '../../../utils/constant'
import { jumpToWeChatAuthorizationUrl } from '../../../utils/wechat'
import { isWechatInfoLoaded, wechatLogin } from '../../Login/module/login'

@asyncConnect([{
    deferred: true,
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
    })
)

export default class WeChatLoginTransition extends React.Component {

    componentDidMount() {
        const getQueryValueOf = key => decodeURIComponent(this.props.location.search.replace(new RegExp('^(?:.*[&\\?]' + escape(key).replace(/[.+*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'))
        const wechatCode = getQueryValueOf('code')
        if (!wechatCode)
            jumpToWeChatAuthorizationUrl(location)
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        const { user, weChatInfo, weChatInfoError } = nextProps
        if (weChatInfo && weChatInfoError && weChatInfoError.code === 10080) {
            this.props.dispatch(push('/register#stepone'))
        } else if (weChatInfo && user && !Object.hasOwnProperty.call(user, 'username')) {
            this.props.dispatch(push('register#stepthree'))
        } else if (weChatInfo && !weChatInfoError && user) {
            const forwardUrl = sessionStorage.getItem(Constant.URL_BEFORE_LEAVE)
            this.props.dispatch(push(forwardUrl || '/tickets'))
        }
    }

    render() {
        return (
            <div>
                <span>WeChat Login</span>
            </div>
        );
    }
}
