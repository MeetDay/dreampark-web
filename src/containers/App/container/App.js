import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-async-connect'
import { Navbar as NavigationBar } from '../../../components'

@asyncConnect([{
	deferred: true,
	promise: (params, store, helpers) => {

	}
}])

@connect(
	state => ({

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
