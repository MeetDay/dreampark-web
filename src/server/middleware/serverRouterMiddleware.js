import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'react-router/lib/createMemoryHistory';

import createStore '../../store';
import routes from '../../routes';

const serverRouterMiddleware = () => (req, res, next) => {
	const client = new APIClient();
	const memoryHistory = createHistory(req.url);
	const store = createStore(memoryHistory, client);
	const history = syncHistoryWithStore(memoryHistory, store);
	match({ history, routes: routes(store), location: req.url }, (error, redirectLocation, renderProps) => {
    	if (error) {
      		res.status(500).send(error.message);
    	} else if (redirectLocation) {
      		res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	    } else if (renderProps) {
	    	const component = (
	    		
	    	);
	 		res.status(200).send(renderToString(<RouterContext {...renderProps} />));
	    } else {
     		res.status(404).send('Not found');
	    }
	});
})

	next()
}
export default serverRouterMiddleware;
