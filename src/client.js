import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { match, Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect'
import { useScroll } from 'react-router-scroll';

import APIClient from './helpers/APIClient';
import createStore from './store';
import routes from './routes';

const client = new APIClient();
const store = createStore(history, client, window.__redux_data__);
const history = syncHistoryWithStore(browserHistory, store);
const helpers = { client, serverSide: false }

const userReduxConnect = () => ({
	renderRouterContext: (child, props) => (
		<ReduxAsyncConnect {...props} helpers={ helpers }>
			{ child }
		</ReduxAsyncConnect>
	)
});

const dest = document.getElementById("app");
match({ history, routes: routes(store) }, (error, redirectLocation, renderProps) => {
	const component = (
		<Provider store={store} key="provider">
			<Router {...renderProps} history={history} render={ applyRouterMiddleware(useScroll(), userReduxConnect()) } />
		</Provider>
	);
 	ReactDOM.render(component, dest);
})
