import React from 'react';
import PropTypes from 'prop-types';

export default class Home extends React.Component {

	render() {
		const styles = require('./Home.scss');
		return (
			<div>
				<div className={styles.backgroundImage}>
					<div className={styles.gradient} />
					<div><h1 className={styles.title}>欢迎来到梦想盛会</h1></div>
				</div>
			</div>
		)
	}
}
