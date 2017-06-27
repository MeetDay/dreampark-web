import React from 'react';
import PropTypes from 'prop-types';

export default class CoverImage extends React.Component {
    static propTypes = {
        src: PropTypes.string.isRequired,
        height: PropTypes.number,
    };

    static defaultProps = {
        height: 210
    };

    render() {
        const style = {
            width: '100%',
            height: this.props.height,
            backgroundImage: 'url(' + this.props.src + ')',
            backgroundPosition: 'center center',
            backgroundSize: 'cover'
        };
        return (
            <div style={style} />
        );
    }
}
