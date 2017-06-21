import { applyMiddleware, createStore as createReduxStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';
import reduxPayloadMiddleware from './middleware/reduxPayloadMiddleware';
import reducers from '../redux/reducers';

export default function createStore(history, client, preloadedState) {
	const middlewares = [reduxPayloadMiddleware(client), routerMiddleware(history), thunk, promise()];
	if (preloadedState) {
		middlewares.push(logger);
	}
	const store = createReduxStore(
		reducers,
		preloadedState,
		applyMiddleware(...middlewares)
	);
	if (module.hot) {
		module.hot.accept('../redux/reducers', () => {
			store.replaceReducer(require('../redux/reducers'));
		});
	}
	return store;
}
