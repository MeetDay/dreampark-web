import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button } from 'antd';

export default class App extends React.Component {

	render() {
		const styles = require('./App.scss');
		return (
			<div className={styles.app}>
				<h1>Hello App 111</h1>
				<Avatar size="large" icon="user" />
				<Button type="primary">Primary</Button>
				<div>
					{this.props.children}
				</div>
			</div>
		)
	}
}
