import React from 'react'
import { asyncConnect } from 'redux-async-connect'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as Constant from '../../../utils/constant'
import { jumpToWeChatAuthorizationUrl } from '../../../utils/wechat'
import { isWechatInfoLoaded, wechatLogin } from '../../Login/module/login'

@asyncConnect([{
    deferred: true,
    promise: ({ params, store:{ dispatch, getState }, helpers }) => {
        if (!helpers.serverSide && !isWechatInfoLoaded(getState())) {
            return dispatch(wechatLogin(params.code))
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
        if (!Object.hasOwnProperty.call(this.props.location, 'code'))
            jumpToWeChatAuthorizationUrl()
    }

    componentWillReceiveProps(nextProps) {
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
