/**
 * @Author: WangChao
 * @Date:   2017-06-27T09:02:03+08:00
 * @Email:  crazyitcoder9527@126.com
 * @Project: dreampark-web
 * @Last modified by:   WangChao
 * @Last modified time: 2017-09-04T09:54:16+08:00
 */

var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration'));

const projectRootPath = path.resolve(__dirname, '..');
const config = {
	devtool: 'source-map',
	context: projectRootPath,
	entry: {
		main: [
			'./src/client.js'
		],
		vendor: [
			'react',
			'react-dom',
			'react-redux',
			'redux',
			'redux-thunk',
			'redux-promise-middleware',
			'react-router',
			'react-router-scroll',
			'react-router-redux',
			'superagent'
		]
	},
	output: {
		path: path.resolve(projectRootPath, 'static/dist'),
		filename: '[name].[hash].min.js',
		chunkFilename: '[name].[chunkhash].min.js',
		publicPath: '/dist/'
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader?cacheDirectory'
		}, {
			test: /\.css$/,
			exclude: /node_modules/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [
					{ loader: 'css-loader' },
					{ loader: 'postcss-loader' }
				]
			})
		}, {
			test: /\.scss$/,
			exclude: /node_modules/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [
					{ loader: 'css-loader?modules&camelCase&importLoaders=1&sourceMap&localIdentName=[name]__[local]__[hash:base64:5]' },
					{ loader: 'sass-loader', options: { sourceMap: true } },
					{ loader: 'postcss-loader' }
				]
			})
		}, {
			test: /\.less$/,
			include: /node_modules/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [
					{ loader: 'css-loader' },
					{ loader: 'less-loader' }
				]
			})
		}, {
			test: webpackIsomorphicToolsPlugin.regular_expression('images'),
			exclude: /node_modules/,
			use: [{ loader: 'url-loader', options: { limit: 8192 }}]
		}]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
		alias: {
			'react': path.resolve(__dirname, '../node_modules/react/dist/react.min.js'),
			'react-dom': path.resolve(__dirname, '../node_modules/react-dom/dist/react-dom.min.js'),
			'redux': path.resolve(__dirname, '../node_modules/redux/dist/redux.min.js'),
			'react-redux': path.resolve(__dirname, '../node_modules/react-redux/dist/react-redux.min.js'),
			// 'react-router': path.resolve(__dirname, '../node_modules/react-router/umd/ReactRouter.min.js'),
		}
	},
	plugins: [
		new ExtractTextPlugin('[name].[hash].min.css'),
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false },
			comments: false
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: ['main', 'vendor', 'manifest'],
			// filename: '[name].[hash].min.js',
			minChunks: Infinity
		}),
		// new webpack.IgnorePlugin(/webpack-stats\.json$/),
		webpackIsomorphicToolsPlugin,
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
				BABEL_ENV: JSON.stringify('production/client')
			},
			__CLIENT__: true,
			__SERVER__: false,
			__DEV__: false,
			__PROD__: true,
			__DEVTOOLS__: false
		})
	]
};

module.exports = config;
