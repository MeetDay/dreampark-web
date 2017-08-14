import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { asyncConnect } from 'redux-async-connect'
import Cookies from 'universal-cookie'
import * as Constant from '../../../utils/constant'
import { Navbar as NavigationBar } from '../../../components'
import { loadCookie, isCookieLoaded } from '../../Login/module/login'
import { isFullUser } from '../../../utils/wechat'

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
	}),
	dispatch => bindActionCreators({ push }, dispatch)
)

export default class App extends React.Component {

	componentWillReceiveProps(nextProps) {
		const { user: nextUser } = nextProps;
		if (nextUser && nextUser !== this.props.user) {
			if (isFullUser(nextUser)) {
				const cookies = new Cookies()
				cookies.set(Constant.USER_COOKIE, nextProps.user, { path: '/', maxAge: 3600 })
			}
		}
	}

	render() {
		require('./Html.css');
		const styles = require('./App.scss');
		return (
			<div className={styles.app}>
				<Helmet encodeSpecialCharacters={true} defaultTitle="梦想公园" ><meta charSet="utf-8" /></Helmet>
				<div>
					{this.props.children}
				</div>
			</div>
		);
	}
}
