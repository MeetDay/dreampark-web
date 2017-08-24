import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import { Tickets, BuyTicket, SearchTicket } from './containers/Tickets';
import Details from './containers/Details';
import HotDetail from './containers/HotDetail';
import Shoppingcart, { CompleteBuyTicketInfo } from './containers/Shoppingcart';
import Login, { WeChatLoginTransition } from './containers/Login';
import Register from './containers/Register';
import TermsOfService from './containers/TermsOfService';
import NotFound from './containers/NotFound';
import projectConfig from '../project.config';
import { isFullUser } from './utils/wechat';

function isEmptyObject(obj) {
	return obj === undefined || obj === null || Object.keys(obj).length === 0
}

const routes = (store) => {
	const requireLogin = (nextState, replaceState, callback) => {
		const callbackUrl = nextState.location.pathname;
		const forwardUrl = callbackUrl ? `/wechat?callbackUrl=${callbackUrl}` : '/wechat';
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

	return (
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="home" component={Home} />
			<Route path="tickets" component={Tickets} onEnter={requireLogin} />
			<Route path="pay/ticketinfo/:id(/:type)" component={CompleteBuyTicketInfo} onEnter={requireLogin} />
			<Route path="buytickets" component={BuyTicket} />
			<Route path="buytickets/search" component={SearchTicket} />
			<Route path="detail/:id" component={Details} />
			<Route path="hotdetail/:id" component={HotDetail} />
			<Route path="shoppingcart" component={Shoppingcart} onEnter={requireLogin} />
			<Route path="login" component={Login} onEnter={checkAlreadyLogin} />
			<Route path="wechat" component={WeChatLoginTransition} />
			<Route path="register" component={Register} onEnter={checkAlreadyLogin} />
			<Route path="terms/:serviceType" component={TermsOfService} />
			<Route path="*" component={NotFound} status={404} />
		</Route>
	)
}
export default routes;
