import * as Constant from './constant'
import { isEmptyObject } from '../containers/Login/module/login'
import projectConfig from '../../project.config'

export function jumpToWeChatAuthorizationUrl(location, urlBeforeLeave) {
    const callbackUrl = urlBeforeLeave ? urlBeforeLeave : location.href;
    const weChatAuthorizationUrl = getWeChatAuthorizationUrl(callbackUrl)
    location.href = weChatAuthorizationUrl
}

export function getWeChatAuthorizationUrl(urlBeforeLeave) {
    if (typeof urlBeforeLeave === 'string' && !(urlBeforeLeave.includes('register') || urlBeforeLeave.includes('login') || urlBeforeLeave.includes('wechat'))) {
        sessionStorage.setItem(Constant.URL_BEFORE_LEAVE, urlBeforeLeave);
    }
    const redirectUri = 'http%3A%2F%2Fwww.fbpageant.com%2Fwechat';
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${projectConfig.wechatAppID}`
        + `&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=fbpark#wechat_redirect`;
    return url;
}

export function isFullUser(user) {
    if (isEmptyObject(user)) return false;
    if (Object.prototype.hasOwnProperty.call(user, 'username') &&
        Object.prototype.hasOwnProperty.call(user, 'userid') &&
        Object.prototype.hasOwnProperty.call(user, 'access_token')) {
        return true;
    }
    return false;
}
