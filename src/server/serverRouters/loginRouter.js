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
import { isEmptyObject } from '../../containers/Login/module/login'
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
    if (code) {
        getWechatToken(code)
            .then((tokenInfo) => getWechatUserInfo(tokenInfo))
            .then((weChatUserInfo) => getUserInfo(weChatUserInfo))
            .then((userInfo) => {
                res.set('Set-Cookie', `${Constant.USER_OPENID}=${userInfo.weChatUserInfo.openid}; Max-Age=${3600*24*30}; Path=/`)
                res.json({ code: 10000, message: 'success', data: userInfo})
            })
            .catch((err) => { res.json(Object.assign({ code: 10002 }, data: err)) })
    } else {
        res.json({ code: 10001, message: '缺少参数'})
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
                    reject({ message: '根据code获取微信token失败', data: body })
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
                    reject({ message: '根据token获取微信信息失败', data: body})
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
                if (err || Object.prototype.hasOwnProperty.call(resBody, 'code')) resolve({ weChatUserInfo: weChatUserInfo, accessToken, userError: resBody })
                resolve({ weChatUserInfo: weChatUserInfo, accessToken, userInfo: resBody })
            })
    })
}
