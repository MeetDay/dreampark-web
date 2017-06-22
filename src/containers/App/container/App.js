import React from 'react';
import PropTypes from 'prop-types';

export default class App extends React.Component {
	render() {
		const styles = require('./App.scss');
		return (
			<div className={styles.app}>
				<div>navigationbar</div>
				<div>
					{this.props.children}
				</div>
			</div>
		);
	}
}
