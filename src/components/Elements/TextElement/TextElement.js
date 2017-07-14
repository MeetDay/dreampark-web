import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class TextElement extends React.Component {
    static propTypes = {
        text: PropTypes.string
    }
    render() {
        const styles = require('../Element.scss');
        return (
            <div className={classNames(styles.text)}>
                {this.props.text}
            </div>
        );
    }
}
