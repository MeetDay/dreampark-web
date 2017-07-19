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

	componentWillMount() {
		if (typeof window !== undefined) {
			console.log(this.props)
			sessionStorage.setItem('urlWhenUserLeave', location.pathname)
		}
	}

	componentDidMount() {
		console.log(sessionStorage.getItem('urlWhenUserLeave'))
		// this.props.dispatch(loadCookie())
		// const cookies = new Cookies()
		// cookies.set('dreampark_user_cookie', { userid: 123, timestamp: 12312312, access_token: 123123123 })
	}

	componentWillReceiveProps() {

	}

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
