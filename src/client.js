import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

import APIClient from './helpers/APIClient';
import createStore from './store';
import routes from './routes';

const client = new APIClient();
const _browserHistory = useScroll(() => browserHistory)();
const store = createStore(_browserHistory, client, window.__redux__data__);
const history = syncHistoryWithStore(_browserHistory, store);

const dest = document.getElementById("app");
match({ history, routes: routes(store) }, (error, redirectLocation, renderProps) => {
	const component = (
		<Provider store={store} key="provider">
			<Router {...renderProps} />
		</Provider>
	);
 	ReactDOM.render(component, dest);
})

if (__DEV__ && module.hot) {
	module.hot.accept()
}
