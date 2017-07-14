import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect'
import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'react-router/lib/createMemoryHistory';

import Html from '../../helpers/Html';
import APIClient from '../../helpers/APIClient';
import createStore from '../../store';
import routes from '../../routes';

const serverRouterMiddleware = () => (req, res, next) => {
	if (__DEV__) {
		webpackIsomorphicTools.refresh();
	}

	const client = new APIClient();
	const memoryHistory = createHistory(req.originalUrl);
	const store = createStore(memoryHistory, client);
	const history = syncHistoryWithStore(memoryHistory, store);
	match({ history, routes: routes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    	if (error) {
      		res.status(500).send(error.message);
    	} else if (redirectLocation) {
      		res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	    } else if (renderProps) {
			global.navigator = {userAgent: req.headers['user-agent']};
			loadOnServer({ ...renderProps, store, helpers: {client}, filter:(item) => item.deferred }).then(() => {
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
