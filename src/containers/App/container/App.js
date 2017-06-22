import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button } from 'antd';
// import Button from 'antd/lib/button';
// import Avatar from 'antd/lib/avatar';

import styles from './App.scss';

export default class App extends React.Component {

	render() {
		// const styles = require('./App.scss');
		// require('antd/lib/button/style');
		// require('antd/lib/avatar/style');
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
