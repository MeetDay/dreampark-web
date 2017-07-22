import projectConfig from '../../project.config'

export default function jumpToWeChatAuthorizationUrl() {
    const weChatAuthorizationUrl = getWeChatAuthorizationUrl()
    location.href = weChatAuthorizationUrl
}

export function getWeChatAuthorizationUrl() {
    const redirectUri = 'http%3A%2F%2Fwww.fbpageant.com%2Fwechat';
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${projectConfig.wechatAppID}`
        + `&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=fbpark#wechat_redirect`;
    return url;
}
