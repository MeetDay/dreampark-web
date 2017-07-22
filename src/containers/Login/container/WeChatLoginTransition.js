import React from 'react'
import { asyncConnect } from 'redux-async-connect'
import { connect } from 'react-redux'
import { isWechatInfoLoaded, wechatLogin } from '../../Login/module/login'

@asyncConnect([{
    deferred: true,
    promise: ({ params, store:{ store, dispatch }, helpers }) => {
        if (!isWechatInfoLoaded(getState())) {
            return dispatch(wechatLogin(params.code))
        }
    }
}])

@connect(
    state => ({
        user: state.login.user,
        weChatInfo: state.login.weChatInfo
    })
)

export default class WeChatLoginTransition extends React.Component {

    componentWillReceiveProps(nextProps) {
        const { user, weChatInfo } = nextProps
        
    }

    render() {
        return (
            <div>
                <span>WeChat Login</span>
            </div>
        );
    }
}
