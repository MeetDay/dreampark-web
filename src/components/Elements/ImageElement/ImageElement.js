import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class ImageElement extends React.Component {
    static propTypes = {
        src: PropTypes.string
    }

    render() {
        const styles = require('../Element.scss');
        return (
            <div className={styles.image}>
                <img src={this.props.src} alt="image" />
            </div>
        );
    }
}
