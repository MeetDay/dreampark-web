import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
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
	const memoryHistory = createHistory(req.url);
	const store = createStore(memoryHistory, client);
	const history = syncHistoryWithStore(memoryHistory, store);
	match({ history, routes: routes(store), location: req.url }, (error, redirectLocation, renderProps) => {
    	if (error) {
      		// res.status(500).send(error.message);
      		next(error);
    	} else if (redirectLocation) {
      		res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	    } else if (renderProps) {
	    	const component = (
	    		<Provider store={store} key="provider">
	    			<RouterContext {...renderProps} />
	    		</Provider>
	    	);
	 		res.status(200).send('<!doctype html>\n' + renderToString(<Html component={component} store={store} />));
	    } else {
     		res.status(404).send('Not found');
	    }
	});
}
export default serverRouterMiddleware;
