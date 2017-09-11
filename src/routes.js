/**
 * @Author: WangChao
 * @Date:   2017-09-04T14:34:57+08:00
 * @Email:  crazyitcoder9527@126.com
 * @Project: dreampark-web
 * @Last modified by:   WangChao
 * @Last modified time: 2017-09-07T22:48:56+08:00
 */

import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Cookies from 'universal-cookie';
import App from './containers/App';
import Home from './containers/Home';
import { Tickets, BuyTicket, SearchTicket } from './containers/Tickets';
import Details from './containers/Details';
import HotDetail from './containers/HotDetail';
import Shoppingcart, { CompleteBuyTicketInfo } from './containers/Shoppingcart';
import Login, { WeChatLoginTransition } from './containers/Login';
import Register, { ToBeVip } from './containers/Register';
import TermsOfService from './containers/TermsOfService';
import Download from './containers/Download';
import NotFound from './containers/NotFound';
import projectConfig from '../project.config';
import { isFullUser } from './utils/wechat';
import * as Constant from './utils/constant';

function isEmptyObject(obj) {
	return obj === undefined || obj === null || Object.keys(obj).length === 0
}

const routes = (store) => {
	const requireLogin = (nextState, replaceState, callback) => {
		const callbackUrl = nextState.location.pathname;
		const forwardUrl = `/wechat?callbackUrl=${callbackUrl}`;
		const { user } = store.getState().login;
		if (isEmptyObject(user)) replaceState(forwardUrl)
		callback()
	}

	const checkAlreadyLogin = (nextState, replaceState, callback) => {
		const { user } = store.getState().login
		if (isFullUser(user)) {
			replaceState('/tickets')
		}
		callback()
	}

	const mustbeHaveWechatInfo = (nextState, replaceState, callback) => {
		const { user, weChatInfo, openID } = store.getState().login;
		if (user && isFullUser(user)) {
			replaceState('/tickets');
		} else {
			if (!openID && isEmptyObject(weChatInfo)) {
				const callbackUrl = nextState.location.pathname;
				const forwardUrl = `/wechat?callbackUrl=${callbackUrl}`;
				replaceState(forwardUrl);
			}
		}
		callback();
	}

	return (
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="home" component={Home} />
			<Route path="tickets" component={Tickets} onEnter={requireLogin} />
			<Route path="pay/ticketinfo/buy/vip" component={ToBeVip} onEnter={requireLogin} />
			<Route path="pay/ticketinfo/:id" component={CompleteBuyTicketInfo} onEnter={requireLogin} />
			<Route path="buytickets" component={BuyTicket} />
			<Route path="buytickets/search" component={SearchTicket} />
			<Route path="detail/:id" component={Details} />
			<Route path="hotdetail/:id" component={HotDetail} />
			<Route path="shoppingcart" component={Shoppingcart} onEnter={requireLogin} />
			<Route path="login" component={Login} onEnter={mustbeHaveWechatInfo} />
			<Route path="wechat" component={WeChatLoginTransition} />
			<Route path="register" component={Register} onEnter={mustbeHaveWechatInfo} />
			<Route path="terms/:serviceType" component={TermsOfService} />
			<Route path="app/download" component={Download} />
			<Route path="*" component={NotFound} status={404} />
		</Route>
	)
}
export default routes;
