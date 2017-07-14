export default function reduxPayloadMiddleware(client) {
	return store => next => action => {
		if (typeof action === 'function') return next(action)
		if (typeof action.payload === 'function') action.payload = action.payload(client);
		return next(action);
	}
}
