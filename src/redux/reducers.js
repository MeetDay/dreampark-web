import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxAsyncConnect } from 'redux-async-connect'

import { home } from '../containers/Home'
import { hotdetail } from '../containers/HotDetail'
import { shoppingcart } from '../containers/Shoppingcart'
import { tickets } from '../containers/Tickets'
import { login } from '../containers/Login'
import { register } from '../containers/Register'
import { dreamparkTerms } from '../containers/TermsOfService'

export default combineReducers({
	routing: routerReducer,
	reduxAsyncConnect,
	home,
	hotdetail,
	shoppingcart,
	tickets,
	login,
	register,
	dreamparkTerms
});
