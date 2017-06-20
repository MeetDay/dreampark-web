require('babel-register');

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEV__ = process.env.NODE_ENV === 'development';
global.__PROD__ = process.env.NODE_ENV === 'production';

require('../src/server/server.js');
