/**
 * @Author: WangChao
 * @Date:   2017-09-04T14:34:57+08:00
 * @Email:  crazyitcoder9527@126.com
 * @Project: dreampark-web
 * @Last modified by:   WangChao
 * @Last modified time: 2017-09-07T16:41:37+08:00
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';

export default class Html extends React.Component {
	static propTypes = {
		assets: PropTypes.object,
		component: PropTypes.node.isRequired,
		store: PropTypes.object,
	}

	render() {
		const { assets, component, store } = this.props;
		const content = component ? renderToString(component) : '';
		const helmet = Helmet.renderStatic();
		const htmlAttrs = helmet.htmlAttributes.toComponent();
		const bodyAttrs = helmet.bodyAttributes.toComponent();
		return (
			<html lang="en-US" {...htmlAttrs}>
				<head>
					{helmet.title.toComponent()}
					{helmet.base.toComponent()}
					{helmet.meta.toComponent()}
					{helmet.link.toComponent()}
		            <meta name="msapplication-TileColor" content="#ffffff" />
		            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
		            <meta name="theme-color" content="#ffffff" />
		            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
					{
						Object.keys(assets.styles)
							.map((style) => (<link key={style} type="text/css" rel="stylesheet" media="screen, projection" href={assets.styles[style]} charSet="utf-8" />))
					}
		        </head>
	            <body {...bodyAttrs}>
	           		<div id="app" dangerouslySetInnerHTML={{ __html: content }} />
	           		<script dangerouslySetInnerHTML={{ __html: `window.__redux_data__=${serialize(store.getState())};` }} charSet="UTF-8" />
					{
						Object.keys(assets.javascript)
							.reverse()
							.map((js) => (<script type="text/javascript" key={js} src={assets.javascript[js]} charSet="utf-8" deffer />))
					}
					<script type="text/javascript" src="/pingpp/pingpp.js" />
	            </body>
			</html>
		);
	}
}
