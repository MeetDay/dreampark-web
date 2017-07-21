import React from 'react'
import { asyncConnect } from 'redux-async-connect'
import { isWechatInfoLoaded, wechatLogin } from '../../Login/module/login'

@asyncConnect([{
    deferred: true,
    promise: ({ params, store:{ store, dispatch }, helpers }) => {
        if (!isWechatInfoLoaded(getState())) {
            return dispatch(wechatLogin(params.code))
        }
    }
}])

export default class WeChatLoginTransition extends React.Component {

    render() {
        return (
            <div>
                <span>WeChat Login</span>
            </div>
        );
    }
}
