import superagent from 'superagent';
import Express from 'express';
import projectConfig from '../../../project.config';

var ticketRouter = Express.Router();
const freeTickets = [];

ticketRouter.get('/free', (req, res) => {
    if (freeTickets.length > 0) {
        res.json({ id: freeTickets[0].id });
    } else {
        const url = projectConfig.baseUrl + '/api/v1/users/homepage';
        superagent.get(url)
            .end((error, { body, text } = { }) => {
                const result = isEmptyObject(body) ? JSON.parse(text) : body;
                if (result && result.classifies && result.classifies.length > 0) {
                    result.classifies.forEach(classify => {
                        if (classify.classify_name == '出入口') {
                            if (classify.POIs && classify.POIs.length > 0) {
                                freeTickets.push(...classify.POIs);
                            }
                        }
                    });
                }
                res.json({ id: freeTickets[0].id });
            });
    }
})

export default ticketRouter;

function isEmptyObject(obj) {
    return obj === undefined || obj === null || Object.keys(obj).length === 0
}
