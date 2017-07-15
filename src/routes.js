import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import { Tickets, BuyTicket, SearchTicket } from './containers/Tickets';
import Details from './containers/Details';
import HotDetail from './containers/HotDetail';
import Shoppingcart from './containers/Shoppingcart';
import Login from './containers/Login';
import Register from './containers/Register';
import TermsOfService from './containers/TermsOfService';
import NotFound from './containers/NotFound';

const routes = (store) => {
	return (
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="home" component={Home} />
			<Route path="tickets" component={Tickets} />
			<Route path="buytickets" component={BuyTicket} />
			<Route path="buytickets/search" component={SearchTicket} />
			<Route path="details/:id" component={Details} />
			<Route path="hotdetail/:id" component={HotDetail} />
			<Route path="shoppingcart" component={Shoppingcart} />
			<Route path="login" component={Login} />
			<Route path="register" component={Register} />
			<Route path="terms/:serviceType" component={TermsOfService} />
			<Route path="*" component={NotFound} status={404} />
		</Route>
	)
}
export default routes;
