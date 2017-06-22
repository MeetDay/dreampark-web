#!/usr/bin/env node
require('babel-polyfill');
require('../server.babel');

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEV__ = process.env.NODE_ENV === 'development';
global.__PROD__ = process.env.NODE_ENV === 'production';
global._disable_server_side_rendering_ = true;

// if (__DEV__) {
//   if (!require('piping')({
//       hook: true,
//       ignore: /(\/\.|~$|\.json|\.scss$)/i
//     })) {
//     return;
//   }
// }

var projectRootPath = require('path').resolve(__dirname, '..');
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools-configuration'))
	.server(projectRootPath, function() {
		require('../src/server/server.js');
	});
