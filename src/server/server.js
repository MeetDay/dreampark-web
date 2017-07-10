var Express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var favicon = require('serve-favicon');
var webpack = require('webpack');
var webpackConfig = require('../../webpack/webpack.config.dev.js');
var serverRouterMiddleware = require('./middleware/serverRouterMiddleware');

var smsCodeRouter = require('./serverRouters/smsCodeRouter');
var loginRouter = require('./serverRouters/loginRouter');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const compiler = webpack(webpackConfig);

var app = new Express();
app.use(compression());
app.use(favicon(path.resolve(__dirname, '../../static/favicon.ico')));
app.use(Express.static(path.resolve(__dirname, '../../static')));

if (process.env.NODE_ENV === 'development' || __DEV__ ) {
	app.use(require('morgan')('tiny'));
	app.use(require('webpack-dev-middleware')(compiler, {
		quiet: true,
	  	noInfo: true,
	  	hot: true,
	  	lazy: false,
	  	inline: true,
	  	publicPath: webpackConfig.output.publicPath,
	  	headers: { 'Access-Control-Allow-Origin': '*' },
	  	stats: { colors: true },
	  	serverSideRender: true
	}));
	app.use(require('webpack-hot-middleware')(compiler, {
		path: '/__webpack_hmr',
		heartbeat: 3 * 1000
	}));
}

app.use(bodyParser.json());
app.use('/actions/user/sms', smsCodeRouter);
app.use('/actions/user/login', loginRouter);

app.use('*', serverRouterMiddleware());

app.listen(PORT, function(error) {
 	if (error) {
 		console.error(eror);
 	} else {
 		console.info(`\n 🌛 Listening on port ${ PORT }. Open up http://localhost:${ PORT } in your browser. \n`);
 	}
})
