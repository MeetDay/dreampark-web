import React from 'react'
import PropTypes from 'prop-types'
import { appendQiNiuQueryParamsForImageUrl } from '../../../../helpers/QiNiuHelpers'

export default class SearchItem extends React.Component {
    static propTypes = {
        ticket: PropTypes.object
    }

    render() {
        const styles = require('./SearchItem.scss')
        const { id, title, cover_image: coverImage } = this.props.ticket;
        const backgroundStyle = {
            width: '100%',
            height: '100%',
            verticalAlign: 'top',
            backgroundImage: 'url(' + appendQiNiuQueryParamsForImageUrl(coverImage.name, { w: 100 }) + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
        };
        return (
            <div className={styles.item}>
                <a href={`/hotdetail/${id}`}>
                    <div className={styles.contentWrap}>
                        <span className={styles.cover}><div style={backgroundStyle} /></span>
                        <span className={styles.title}>{title}</span>
                        <span className={styles.arrow}><img src="/assets/go_detail_gray.png" alt="arrow" /></span>
                    </div>
                </a>
            </div>
        );
    }
}
