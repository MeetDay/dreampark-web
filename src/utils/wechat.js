import * as Constant from './constant'
import projectConfig from '../../project.config'

export function jumpToWeChatAuthorizationUrl() {
    const weChatAuthorizationUrl = getWeChatAuthorizationUrl(location.href)
    location.href = weChatAuthorizationUrl
}

export function getWeChatAuthorizationUrl(urlBeforeLeave) {
    sessionStorage.setItem(Constant.URL_BEFORE_LEAVE, urlBeforeLeave);
    const redirectUri = 'http%3A%2F%2Fwww.fbpageant.com%2Fwechat';
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${projectConfig.wechatAppID}`
        + `&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=fbpark#wechat_redirect`;
    return url;
}
