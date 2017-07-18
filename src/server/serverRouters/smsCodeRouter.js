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
        .end((err, { body, text } = {}) => {
            // if (err) return res.status(400).send(err)
            const result = isEmptyObject(body) ? JSON.parse(text) : body
            res.status(result.status).send(result)
        })
})

function isEmptyObject(object) {
    if (Object.keys(object).length > 0) return false
    return true
}

export default smsCodeRouter;
