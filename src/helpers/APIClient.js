import superagent from 'superagent';
import projectConfig from '../../project.config';

function formatUrl(path) {
	if (/^https?:\/\//.test(path)) return path;
	const adjustedPath = path[0] !== '/' ? '/' + path : path;
	 let baseUrl = projectConfig.baseUrl;
	 if (process.env.NODE_ENV === 'development' || __DEV__) baseUrl = projectConfig.devBaseUrl;
	return baseUrl + adjustedPath;
}

const methods = ['get', 'post', 'put', 'del'];
export default class APIClient {
	constructor(req) {
		methods.forEach(method => {
			this[method] = (path, { params, data, headers } = {}) => new Promise((resolve, reject) => {
				const request = superagent[method](formatUrl(path));
				request.set('Content-Type', 'application/json');
				request.set('Accept', 'application/json');
				if (params) request.query(params);
				if (data) request.send(data);
				if (headers) {
					Object.keys(headers).forEach(key => {
						request.set(key, headers[key]);
					});
				}
				request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
			});
		});
	}
}
