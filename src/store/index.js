if (process.env.NODE_ENV === 'production' || __PROD__) {
	module.exports = require('./createStore.prod.js');
} else {
	module.exports = require('./createStore.dev.js');
}
