export default function reduxPayloadMiddleware(client) {
	return store => next => action => {
		const { payload } = action;
		if (typeof payload === 'function') action.payload = payload(client);
		next(action);
	}
}
