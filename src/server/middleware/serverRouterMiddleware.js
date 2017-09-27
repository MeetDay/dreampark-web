import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import Cookies from 'universal-cookie';
import { match, RouterContext } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect'
import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'react-router/lib/createMemoryHistory';

import * as Constant from '../../utils/constant';
import Html from '../../helpers/Html';
import APIClient from '../../helpers/APIClient';
import createStore from '../../store';
import routes from '../../routes';
import { loadCookieSync, loadOpenIDOfWechat, isEmptyObject } from '../../containers/Login/module/login';

const serverRouterMiddleware = () => (req, res, next) => {
	if (__DEV__) {
		webpackIsomorphicTools.refresh();
	}

	const client = new APIClient();
	const memoryHistory = createHistory(req.originalUrl);
	const store = createStore(memoryHistory, client);
	if (!isEmptyObject(req.universalCookies.cookies)) {
		const userCookie = req.universalCookies.get(Constant.USER_COOKIE), openID = req.universalCookies.get(Constant.USER_OPENID);
		// store.dispatch(loadOpenIDOfWechat(openID));
		if (!isEmptyObject(userCookie)) {
			console.log(`用户:${userCookie.username} ID:${userCookie.userid} 时间:${new Date().toLocaleString()} 访问:${req.originalUrl}`);
			store.dispatch(loadCookieSync({ userCookie:userCookie, openID: openID }));
		}
	}
	const history = syncHistoryWithStore(memoryHistory, store);
	match({ history, routes: routes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    	if (error) {
      		res.status(500).send(error.message);
    	} else if (redirectLocation) {
      		res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	    } else if (renderProps) {
			global.navigator = {userAgent: req.headers['user-agent']};
			loadOnServer({ ...renderProps, store, helpers: { client, serverSide: true }, filter: (item) => item.deferred }).then(() => {
				const component = (
		    		<Provider store={store} key="provider">
		    			<ReduxAsyncConnect {...renderProps} />
		    		</Provider>
		    	);
				// res.set('Set-Cookie', `${Constant.USER_OPENID}=oUr10wDQslvet8jtmGa_JAoAVvmI; Max-Age=${3600*24*30}; Path=/`)
				res.status(200).send('<!doctype html>\n' + renderToString(<Html component={component} store={store} assets={webpackIsomorphicTools.assets()} />));
			});
	    } else {
     		res.status(404).send('Not found');
	    }
	});
}
export default serverRouterMiddleware;
