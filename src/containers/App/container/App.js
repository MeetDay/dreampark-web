import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import styles from './App.scss';

export default class App extends React.Component {

	render() {
		// const styles = require('./App.scss');
		return (
			<div className={styles.app}>
				<h1>Hello App 111</h1>
				<Avatar size="large" icon="user" />
				<div>
					{this.props.children}
				</div>
			</div>
		)
	}
}
