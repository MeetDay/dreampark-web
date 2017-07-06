import superagent from 'superagent'
import Express from 'express'
var smsCodeRouter = Express.Router()

smsCodeRouter.get('/', (req, res) => {
    res.status(200).send('123')
})


export default smsCodeRouter;
