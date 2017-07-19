export default function reduxPayloadMiddleware(client) {
	return store => next => action => {
		if (typeof action === 'function') return next(action)
		const { payload } = action
		if (payload && typeof payload === 'function') action.payload = payload(client);
		return next(action);
	}
}
