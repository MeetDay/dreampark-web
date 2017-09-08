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
		store.dispatch(loadCookieSync(req.universalCookies.get(Constant.USER_COOKIE)));
		store.dispatch(loadOpenIDOfWechat(req.universalCookies.get(Constant.USER_OPENID)));
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
				res.status(200).send('<!doctype html>\n' + renderToString(<Html component={component} store={store} assets={webpackIsomorphicTools.assets()} />));
			});
	    } else {
     		res.status(404).send('Not found');
	    }
	});
}
export default serverRouterMiddleware;
