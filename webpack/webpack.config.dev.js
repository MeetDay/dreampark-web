var path = require('path');
var webpack = require('webpack');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration')).development();

const projectRootPath = path.resolve(__dirname, '..');
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

const config = {
	devtool: 'inline-source-map',
	context: projectRootPath,
	entry: {
		main: [
			'webpack-hot-middleware/client?reload=true',
			'webpack/hot/dev-server',
			'./src/client.js'
		],
		vendor: [
			'react',
			'react-dom',
			'redux',
			'redux-thunk',
			'redux-promise-middleware',
			'react-redux',
			'react-router',
			'react-router-scroll',
			'react-router-redux',
			'superagent'
		]
	},
	output: {
		path: path.resolve(projectRootPath, 'dist'),
		filename: '[name].min.js',
		chunkFilename: '[name].min.js',
		publicPath: `http://${HOST}:${PORT}/dist`
	},
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		},{
			test: /\.css$/,
			use: [
					{ loader: 'style-loader' }, 
					{ loader: 'css-loader?modules&camelCase&importLoaders=2&sourceMap&localIdentName=[name]__[local]__[hash:base64:5]' },
					{ loader: 'postcss-loader' }
				]
		}, {
			test: /\.scss$/,
			exclude: /node_modules/,
			use: [
					{ loader: 'style-loader' }, 
					{ loader: 'css-loader?modules&camelCase&importLoaders=2&sourceMap&localIdentName=[name]__[local]__[hash:base64:5]' }, 
					{ loader: 'sass-loader', options: { sourceMap: true } },
				]
		},{
			test: /\.less$/,
			use: [
				{ loader: 'style-loader' }, 
				{ loader: 'css-loader?modules&camelCase&importLoaders=1&sourceMap&localIdentName=[name]__[local]__[hash:base64:5]' },
				{ loader: 'less-loader' }
			]
		}, {
			test: webpackIsomorphicToolsPlugin.regular_expression('images'),
			exclude: /node_modules/,
			use: [{ loader: 'url-loader', options: { limit: 10240 }}]
		}]
	},
	resolve: {
		extensions: ['.js', '.jsx', 'json'],
		alias: {
			'react': path.resolve(__dirname, '../node_modules/react'),
			'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
		},
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: ['main', 'vendor', 'manifest'],
			// filename: '[name].[hash].min.js',
			minChunks: Infinity
		}),
		webpackIsomorphicToolsPlugin,
		new webpack.IgnorePlugin(/webpack-stats\.json$/),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
				BABEL_ENV: JSON.stringify('development/client')
			},
			__CLIENT__: true,
			__SERVER__: false,
			__DEV__: true,
			__PROD__: false,
			__DEVTOOLS__: true
		})
	]
};

module.exports = config;
