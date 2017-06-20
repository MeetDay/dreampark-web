import { applyMiddleware, createStore as createReduxStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';
import reduxPayloadMiddleware from './middleware/reduxPayloadMiddleware';
import reducers from '../redux/reducers';

export default function createStore(history, client, preloadedState) {
	const store = createReduxStore(
		reducers,
		preloadedState,
		applyMiddleware(reduxPayloadMiddleware(client), thunk, promise(), logger)
	);
	if (module.hot) {
		module.hot.accept('../redux/reducers', () => {
			store.replaceReducer(require('../redux/reducers'));
		});
	}
	return store;
}
