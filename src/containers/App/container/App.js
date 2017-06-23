import React from 'react';
import PropTypes from 'prop-types';
import { Navbar as NavigationBar } from '../../../components';

export default class App extends React.Component {
	render() {
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
