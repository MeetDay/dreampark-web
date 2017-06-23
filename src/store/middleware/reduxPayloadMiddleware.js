export default function reduxPayloadMiddleware(client) {
	return store => next => action => {
		const { promise } = action;
		if (typeof promise === 'function') action.payload = promise(client);
		next(action);
	}
}
