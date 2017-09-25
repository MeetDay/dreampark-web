/**
 * @Author: WangChao
 * @Date:   2017-09-04T14:34:57+08:00
 * @Email:  crazyitcoder9527@126.com
 * @Project: dreampark-web
 * @Last modified by:   WangChao
 * @Last modified time: 2017-09-07T22:57:41+08:00
 */

import superagent from 'superagent'
import * as Constant from '../../utils/constant'
import Express from 'express'
var loginRouter = Express.Router()
import { isEmptyObject, generatorAuthHeadersForUser } from '../../containers/Login/module/login'
import APIClient from '../../helpers/APIClient'
import projectConfig from '../../../project.config'

loginRouter.get('/idcard', (req, res) => {
    superagent.get('http://idcard.market.alicloudapi.com/lianzhuo/idcard')
        .set('Authorization', `APPCODE ${projectConfig.appCode}`)
        .query(req.query)
        .end((err, { body } = {}) => {
            if (err) {
                res.status(400).json(body || err)
            } else {

                res.status(200).json(body)
            }
        })
})

loginRouter.get('/wechat', (req, res) => {
    const { code } = req.query;
    const userCookie = req.universalCookies.get(Constant.USER_COOKIE);
    if (code) {
        if (!isEmptyObject(userCookie)) {
            getWechatToken(code)
                .then((tokenInfo) => getWechatUserInfo(tokenInfo, userCookie))
                .then((weChatUserInfo) => bindWechatInfo(weChatUserInfo, userCookie))
                .then(result => {
                    res.set('Set-Cookie', `${Constant.USER_COOKIE}=${result.userInfo}; Max-Age=${3600*24*30}; Path=/`);
                    res.set('Set-Cookie', `${Constant.USER_OPENID}=${result.weChatUserInfo.openid}; Max-Age=${3600*24*30}; Path=/`);
                    res.redirect(301, '/tickets');
                })
                .catch((err) => { res.status(400).json(Object.assign({ code: 10002 }, err)) })
        } else {
            getWechatToken(code)
                .then((tokenInfo) => getWechatUserInfo(tokenInfo))
                .then((weChatUserInfo) => getUserInfo(weChatUserInfo))
                .then((userInfo) => {
                    const { userInfo: userCookie } = userInfo;
                    if (userCookie && !isEmptyObject(userCookie)) {
                        res.set('Set-Cookie', `${Constant.USER_COOKIE}=${userCookie}; Max-Age=${3600*24*30}; Path=/`);
                    }
                    res.set('Set-Cookie', `${Constant.USER_OPENID}=${userInfo.weChatUserInfo.openid}; Max-Age=${3600*24*30}; Path=/`)
                    res.json({ code: 10000, message: 'success', data: userInfo})
                })
                .catch((err) => { res.status(400).json(Object.assign({ code: 10002 }, err)) })
        }
    } else {
        res.status(400).json({ code: 10001, error_message: '缺少参数'})
    }
})

export default loginRouter

function getWechatToken(code) {
    const tokenUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${projectConfig.wechatAppID}&secret=${projectConfig.wechatAppSecret}&code=${code}&grant_type=authorization_code`;
    return new Promise((resolve, reject) => {
        superagent.get(tokenUrl)
            .end((err, res) => {
                const body = JSON.parse(res.text)
                if (err || Object.prototype.hasOwnProperty.call(body, 'errcode')) {
                    reject({ error_message: '根据code获取微信token失败', data: body })
                } else {
                    resolve(body)
                }
            })
    })
}

function getWechatUserInfo(tokenInfo) {
    const userInfoUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${tokenInfo.access_token}&openid=${tokenInfo.openid}&lang=zh_CN`;
    return new Promise((resolve, reject) => {
        superagent.get(userInfoUrl)
            .end((err, res) => {
                const body = JSON.parse(res.text)
                if (err || Object.prototype.hasOwnProperty.call(body, 'errcode')) {
                    reject({ error_message: '根据token获取微信信息失败', data: body})
                } else {
                    resolve({  weChatUserInfo: body, accessToken: tokenInfo.access_token })
                }
            })
    })
}

function getUserInfo(weChatInfo) {
    const { weChatUserInfo, accessToken } = weChatInfo
    console.log(weChatUserInfo)
    const data = {
        auth_token: accessToken,
        union_id: weChatUserInfo.unionid
    }
    return new Promise((resolve, reject) => {
        let baseUrl = __DEV__ ? projectConfig.devBaseUrl : projectConfig.baseUrl
        const linkAccountUrl = baseUrl + '/api/v1/users/login/linked_account'
        superagent.post(linkAccountUrl)
            .send(data)
            .end((err, { body, text } = {}) => {
                const resBody = isEmptyObject(body) ? JSON.parse(text) : body
                console.log(resBody)
                if (err || Object.prototype.hasOwnProperty.call(resBody, 'code')) {
                    resolve({ weChatUserInfo: weChatUserInfo, accessToken, userError: resBody })
                } else {
                    resolve({ weChatUserInfo: weChatUserInfo, accessToken, userInfo: resBody })
                }
            })
    })
}

function bindWechatInfo(weChatInfo, userCookie) {
    const { weChatUserInfo, accessToken } = weChatInfo
    const data = {
        auth_token: accessToken,
        union_id: weChatUserInfo.unionid
    };
    console.log(userCookie);
    return new Promise((resolve, reject) => {
        let baseUrl = __DEV__ ? projectConfig.devBaseUrl : projectConfig.baseUrl
        const bindWechatInfoUrl = baseUrl + '/api/v1/users/bind_wechat';
        superagent.post(bindWechatInfoUrl)
            .set(generatorAuthHeadersForUser(userCookie))
            .send(data)
            .end((err, { body, text } = {}) => {
                const resBody = isEmptyObject(body) ? JSON.parse(text) : body;
                if (err || Object.prototype.hasOwnProperty.call(resBody, 'code')) {
                    resolve({ weChatUserInfo: weChatUserInfo, accessToken, userError: resBody, linkedWechat: false })
                } else {
                    resolve({ weChatUserInfo: weChatUserInfo, accessToken, userInfo: userCookie, linkedWechat: true })
                }
            })
    });
}
