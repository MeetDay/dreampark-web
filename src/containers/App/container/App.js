import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-async-connect'
import Cookies from 'universal-cookie'
import { Navbar as NavigationBar } from '../../../components'
import { loadCookie, isCookieLoaded } from '../../Login/module/login'

@asyncConnect([{
	deferred: true,
	promise: ({ params, store:{ dispatch, getState }, helpers }) => {
		if (!helpers.serverSide && !isCookieLoaded(getState())) {
			return dispatch(loadCookie())
		}
	}
}])

@connect(
	state => ({
		user: state.login.user
	})
)

export default class App extends React.Component {

	render() {
		require('./Html.css');
		const styles = require('./App.scss');
		return (
			<div className={styles.app}>
				<div>
					{this.props.children}
				</div>
			</div>
		);
	}
}
