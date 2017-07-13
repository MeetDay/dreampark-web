import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxAsyncConnect } from 'redux-async-connect'

import { home } from '../containers/Home'
import { shoppingcart } from '../containers/Shoppingcart'
import { tickets } from '../containers/Tickets'
import { login } from '../containers/Login'
import { register } from '../containers/Register'
import { terms } from '../containers/TermsOfService'

export default combineReducers({
	routing: routerReducer,
	reduxAsyncConnect,
	home,
	shoppingcart,
	tickets,
	login,
	register,
	terms
});
