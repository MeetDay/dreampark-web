import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect'

import { home } from '../containers/Home';

export default combineReducers({
	routing: routerReducer,
	reduxAsyncConnect,
	home
});
