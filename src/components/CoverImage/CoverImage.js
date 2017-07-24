import React from 'react';
import PropTypes from 'prop-types';
import { appendQiNiuQueryParamsForImageUrl } from '../../helpers/QiNiuHelpers';

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
            backgroundImage: 'url(' + appendQiNiuQueryParamsForImageUrl(this.props.src) + ')',
            backgroundPosition: 'center center',
            backgroundSize: 'cover'
        };
        return (
            <div style={style} />
        );
    }
}
