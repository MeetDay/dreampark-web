import React from 'react';
import PropTypes from 'prop-types';

export default class TitleElement extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        textAlign: PropTypes.string
    }
    static defaultProps = {
        textAlign: 'left'
    }

    render() {
        const styles = require('../Element.scss');
        const inlineStyle = { textAlign: this.props.textAlign }
        return (
            <div style={inlineStyle} className={styles.title}>{this.props.title}</div>
        );
    }
}
