import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { home } from '../containers/Home';

export default combineReducers({
	routing: routerReducer,
	home
});
