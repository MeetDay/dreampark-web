import superagent from 'superagent'
import Express from 'express'
var smsCodeRouter = Express.Router()
var projectConfig = require('../../../project.config')

smsCodeRouter.post('/code', (req, res) => {
    const sendMsgUrl = 'https://webapi.sms.mob.com/sms/sendmsg'
    superagent.post(sendMsgUrl)
        .type('form')
        .accept('application/json')
        .send(Object.assign({ appkey: projectConfig.smsAPPKey }, req.body))
        .end((err, { text } = {}) => err ? res.send(JSON.parse(text) || err) : res.send(JSON.parse(text)))
})

export default smsCodeRouter;
