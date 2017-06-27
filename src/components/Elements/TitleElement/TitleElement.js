import React from 'react';
import PropTypes from 'prop-types';

export default class TitleElement extends React.Component {
    render() {
        const styles = require('../Element.scss');
        return (
            <div className={styles.title}>Black Rebel Motorcycle Club 阿拉善音乐会</div>
        );
    }
}
