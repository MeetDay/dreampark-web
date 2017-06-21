#!/usr/bin/env node

require('babel-register');
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
var projectRootPath = require('path').resolve(__dirname, '..');

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEV__ = process.env.NODE_ENV === 'development';
global.__PROD__ = process.env.NODE_ENV === 'production';

if (__DEV__) {
  if (!require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.scss$)/i
    })) {
    return;
  }
}

global._disable_server_side_rendering_ = true;
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools-configuration'))
	.server(projectRootPath, function() {
		require('../src/server/server.js');
	});
