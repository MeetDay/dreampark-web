import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import NotFound from './containers/NotFound';

export default const routes = (store) => {
	return (
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="*" component={NotFound} status={404} />
		</Route>
	)
}
