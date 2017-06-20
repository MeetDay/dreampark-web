import { applyMiddleware, createStore as createReduxStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reduxPayloadMiddleware from './middleware/reduxPayloadMiddleware';
import reducers from '../redux/reducers';

export default function createStore(history, client, preloadedState) {
	const store = createReduxStore(
		reducers,
		preloadedState,
		applyMiddleware(reduxPayloadMiddleware(client), thunk, promise())
	);
	return store;
}
