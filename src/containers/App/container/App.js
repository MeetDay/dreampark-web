import React from 'react';
import PropTypes from 'prop-types';

export default class App extends React.Component {

	render() {
		return (
			<div>
				<h1>Hello App</h1>
				<div>
					{this.props.children}
				</div>
			</div>
		)
	}
}
