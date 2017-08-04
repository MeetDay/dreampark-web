import React from 'react';
import PropTypes from 'prop-types';
import { appendQiNiuQueryParamsForImageUrl } from '../../../../helpers/QiNiuHelpers'

export default class Recommend extends React.Component {
    static propTypes = {
        recommend: PropTypes.object
    }

    render() {
        const styles = require('./Recommend.scss');
        const { id, title, cover_image: coverImage } = this.props.recommend
        const style = { backgroundImage: 'url(' + appendQiNiuQueryParamsForImageUrl(coverImage.name, { w: 200 }) + ')' };
        return (
            <a href={`/hotdetail/${id}`}>
                <div className={styles.cover} style={style}>
                    <span className={styles.title}>{title}</span>
                </div>
            </a>
        );
    }
}
