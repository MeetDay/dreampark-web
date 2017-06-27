import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import { Tickets, BuyTicket } from './containers/Tickets';
import Shoppingcart from './containers/Shoppingcart';
import Login from './containers/Login';
import Register from './containers/Register';
import NotFound from './containers/NotFound';

const routes = (store) => {
	return (
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="/home" component={Home} />
			<Route path="/tickets" component={Tickets} />
			<Route path="/buytickets" component={BuyTicket} />
			<Shoppingcart path="/shoppingcart" component={Shoppingcart} />
			<Route path="/login" component={Login} />
			<Route path="/register" component={Register} />
			<Route path="*" component={NotFound} status={404} />
		</Route>
	)
}
export default routes;
