import superagent from 'superagent'
import Express from 'express'
var loginRouter = Express.Router()
import APIClient from '../../helpers/APIClient'
import projectConfig from '../../../project.config'

loginRouter.get('/idcard', (req, res) => {
    superagent.get('http://idcard.market.alicloudapi.com/lianzhuo/idcard')
        .set('Authorization', `APPCODE ${projectConfig.appCode}`)
        .query(req.query)
        .end((err, { body } = {}) => {
            if (err) {
                res.status(400).send(body || err)
            } else {
                res.status(200).send(body)
            }
        })
})

loginRouter.get('/wechat', (req, res) => {
    const { code } = req.query;
    if (code) {
        console.log('wechat code', code)
        getWechatToken(code)
            .then((tokenInfo) => getWechatUserInfo(tokenInfo))
            .then((weChatUserInfo) => getUserInfo(weChatUserInfo))
            .then((userInfo) => { res.json({ code: 10000, message: 'success', data: userInfo}) })
            .catch((err) => { res.json(Object.assign({ code: 10001 }, err)) })
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
                    reject({ message: '根据code获取微信token失败', data: body})
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
                    resolve(body)
                }
            })
    })
}

function getUserInfo(weChatUserInfo) {
    const data = {
        union_id: weChatUserInfo.unionid
    }
    return new Promise((resolve, reject) => {
        let baseUrl = __DEV__ ? projectConfig.devBaseUrl : projectConfig.baseUrl
        const linkAccountUrl = baseUrl + '/api/v1/users/link_account'
        superagent.post(linkAccountUrl)
            .send(data)
            .end((err, res) => {
                const body = JSON.parse(res.text)
                if (err || Object.prototype.hasOwnProperty.call(body, 'code')) resolve({ weChatUserInfo, userError: body })
                resolve({ weChatUserInfo, userInfo: body })
            })
    })
}
