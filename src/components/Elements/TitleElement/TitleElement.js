import React from 'react';
import PropTypes from 'prop-types';

export default class TitleElement extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired
    }
    render() {
        const styles = require('../Element.scss');
        return (
            <div className={styles.title}>{this.props.title}</div>
        );
    }
}
