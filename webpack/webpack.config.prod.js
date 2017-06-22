var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration')).development(false);

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
		chunkFilename: '[name].[hash].min.js',
		publicPath: '/dist/'
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			options: {
				plugins: [['import', { libraryName: 'antd', style: 'css' }]],
				cacheDirectory: true
			}
		}, {
			test: /\.css$/,
			exclude: /node_modules/,
			use: [
				{ loader: 'style-loader'}, 
				{ loader: 'css-loader?modules&camelCase&importLoaders=1&sourceMap&localIdentName=[name]__[local]__[hash:base64:5]' },
				{ loader: 'postcss-loader' }
			]
		}, {
			test: /\.(css|scss)$/,
			exclude: /node_modules/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [
					{ loader: 'css-loader?modules&camelCase&importLoaders=1&sourceMap&localIdentName=[name]__[local]__[hash:base64:5]' }, 
					{ loader: 'sass-loader', options: { sourceMap: true } }
				]
			})
		}, {
			test: /\.less$/,
			use: [
				{ loader: 'style-loader' }, 
				{ loader: 'css-loader' },
				{ loader: 'less-loader' }
			]
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
			'react-dom': path.resolve(__dirname, '../node_modules/react-dom/dist/react-dom.min.js')
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
		new webpack.IgnorePlugin(/webpack-stats\.json$/),
		webpackIsomorphicToolsPlugin,
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
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
